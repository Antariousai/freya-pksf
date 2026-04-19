import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-server";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  ShadingType,
  AlignmentType,
} from "docx";

export const maxDuration = 30;

// ── Markdown → docx paragraph converter ────────────────────────────────────

function parseBoldInline(text: string): TextRun[] {
  const runs: TextRun[] = [];
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  for (const part of parts) {
    if (part.startsWith("**") && part.endsWith("**")) {
      runs.push(new TextRun({ text: part.slice(2, -2), bold: true, size: 22, font: "Calibri" }));
    } else if (part) {
      runs.push(new TextRun({ text: part, size: 22, font: "Calibri" }));
    }
  }
  return runs;
}

function markdownToDocxElements(markdown: string): (Paragraph | Table)[] {
  const elements: (Paragraph | Table)[] = [];
  const lines = markdown.split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Blank line
    if (!line.trim()) {
      elements.push(new Paragraph({ text: "", spacing: { after: 60 } }));
      i++;
      continue;
    }

    // H2
    if (line.startsWith("## ")) {
      elements.push(
        new Paragraph({
          text: line.slice(3).trim(),
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 280, after: 100 },
          border: {
            bottom: { style: BorderStyle.SINGLE, size: 4, color: "A78BFA", space: 4 },
          },
        })
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      elements.push(
        new Paragraph({
          text: line.slice(4).trim(),
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 180, after: 80 },
        })
      );
      i++;
      continue;
    }

    // H1
    if (line.startsWith("# ")) {
      elements.push(
        new Paragraph({
          text: line.slice(2).trim(),
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 360, after: 160 },
        })
      );
      i++;
      continue;
    }

    // Blockquote (critical alert)
    if (line.startsWith("> ")) {
      elements.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "⚠ " + line.slice(2).trim(),
              bold: true,
              color: "EF4444",
              size: 22,
              font: "Calibri",
            }),
          ],
          shading: { type: ShadingType.SOLID, color: "FEF2F2", fill: "FEF2F2" },
          indent: { left: 360 },
          spacing: { before: 100, after: 100 },
          border: {
            left: { style: BorderStyle.SINGLE, size: 12, color: "EF4444", space: 8 },
          },
        })
      );
      i++;
      continue;
    }

    // Bullet list
    if (line.match(/^[-*] /)) {
      elements.push(
        new Paragraph({
          children: parseBoldInline(line.replace(/^[-*] /, "").trim()),
          bullet: { level: 0 },
          spacing: { after: 80 },
        })
      );
      i++;
      continue;
    }

    // Numbered list
    const numMatch = line.match(/^(\d+)\. (.+)$/);
    if (numMatch) {
      elements.push(
        new Paragraph({
          children: parseBoldInline(numMatch[2].trim()),
          numbering: { reference: "decimal-list", level: 0 },
          spacing: { after: 80 },
        })
      );
      i++;
      continue;
    }

    // Markdown table — collect all rows first
    if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }

      // Filter out separator lines like |---|---|
      const dataRows = tableLines.filter((l) => !l.match(/^\|[\s\-|:]+\|$/));
      if (dataRows.length > 0) {
        const rows = dataRows.map((rowLine, rowIdx) => {
          const cells = rowLine
            .split("|")
            .filter((_, ci) => ci > 0 && ci < rowLine.split("|").length - 1)
            .map((cell) => cell.trim());

          return new TableRow({
            children: cells.map(
              (cellText) =>
                new TableCell({
                  children: [
                    new Paragraph({
                      children: parseBoldInline(cellText),
                      alignment: AlignmentType.LEFT,
                    }),
                  ],
                  shading: rowIdx === 0
                    ? { type: ShadingType.SOLID, color: "F3F0FF", fill: "F3F0FF" }
                    : undefined,
                  margins: { top: 80, bottom: 80, left: 120, right: 120 },
                })
            ),
          });
        });

        elements.push(
          new Table({
            rows,
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 4, color: "E2E8F0" },
              bottom: { style: BorderStyle.SINGLE, size: 4, color: "E2E8F0" },
              left: { style: BorderStyle.SINGLE, size: 4, color: "E2E8F0" },
              right: { style: BorderStyle.SINGLE, size: 4, color: "E2E8F0" },
            },
          })
        );
        elements.push(new Paragraph({ text: "", spacing: { after: 120 } }));
      }
      continue;
    }

    // Horizontal rule
    if (line.match(/^[-*_]{3,}$/)) {
      elements.push(
        new Paragraph({
          text: "",
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "E2E8F0", space: 2 } },
          spacing: { before: 120, after: 120 },
        })
      );
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      new Paragraph({
        children: parseBoldInline(line.trim()),
        spacing: { after: 100 },
      })
    );
    i++;
  }

  return elements;
}

// ── POST handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const auth = await requireAuth(req);
  if (!auth.ok) return auth.response;

  try {
    const { title, content, label, timestamp } = await req.json() as {
      title: string;
      content: string;
      label: string;
      timestamp?: string;
    };

    if (!content) {
      return NextResponse.json({ error: "No content" }, { status: 400 });
    }

    const generatedAt = timestamp
      ? new Date(timestamp).toLocaleString("en-GB", { dateStyle: "long", timeStyle: "short" })
      : new Date().toLocaleString("en-GB", { dateStyle: "long", timeStyle: "short" });

    const doc = new Document({
      numbering: {
        config: [
          {
            reference: "decimal-list",
            levels: [
              {
                level: 0,
                format: "decimal",
                text: "%1.",
                alignment: AlignmentType.START,
                style: { paragraph: { indent: { left: 360, hanging: 260 } } },
              },
            ],
          },
        ],
      },
      styles: {
        default: {
          document: {
            run: { font: "Calibri", size: 22, color: "1E293B" },
            paragraph: { spacing: { after: 120 } },
          },
        },
        paragraphStyles: [
          {
            id: "Heading1",
            name: "Heading 1",
            basedOn: "Normal",
            next: "Normal",
            run: { bold: true, size: 32, color: "1E293B", font: "Calibri" },
            paragraph: { spacing: { before: 360, after: 160 } },
          },
          {
            id: "Heading2",
            name: "Heading 2",
            basedOn: "Normal",
            next: "Normal",
            run: { bold: true, size: 26, color: "7C3AED", font: "Calibri" },
            paragraph: { spacing: { before: 280, after: 100 } },
          },
          {
            id: "Heading3",
            name: "Heading 3",
            basedOn: "Normal",
            next: "Normal",
            run: { bold: true, size: 23, color: "334155", font: "Calibri" },
            paragraph: { spacing: { before: 200, after: 80 } },
          },
        ],
      },
      sections: [
        {
          properties: {
            page: {
              margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 },
            },
          },
          children: [
            // Document header block
            new Paragraph({
              children: [
                new TextRun({
                  text: "PKSF  ·  FREYA AI INTELLIGENCE",
                  bold: true,
                  size: 16,
                  color: "94A3B8",
                  font: "Calibri",
                  allCaps: true,
                }),
              ],
              spacing: { after: 40 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `${label.toUpperCase()}  ·  ${generatedAt}`,
                  size: 16,
                  color: "94A3B8",
                  font: "Calibri",
                }),
              ],
              border: {
                bottom: { style: BorderStyle.SINGLE, size: 8, color: "7C3AED", space: 8 },
              },
              spacing: { after: 240 },
            }),

            // Document title
            new Paragraph({
              children: [
                new TextRun({
                  text: title,
                  bold: true,
                  size: 40,
                  color: "1E293B",
                  font: "Calibri",
                }),
              ],
              spacing: { before: 0, after: 320 },
            }),

            // Panel content converted from Markdown
            ...markdownToDocxElements(content),

            // Footer note
            new Paragraph({
              children: [
                new TextRun({
                  text: `Generated by Freya AI · PKSF Financial Intelligence Platform · ${generatedAt}`,
                  size: 16,
                  color: "94A3B8",
                  italics: true,
                  font: "Calibri",
                }),
              ],
              border: {
                top: { style: BorderStyle.SINGLE, size: 4, color: "E2E8F0", space: 8 },
              },
              spacing: { before: 480 },
            }),
          ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    // Convert Node Buffer → Uint8Array so NextResponse accepts it
    const bytes = new Uint8Array(buffer);

    const safeName = title
      .replace(/[^a-z0-9\s]/gi, "")
      .trim()
      .replace(/\s+/g, "_")
      .toLowerCase()
      .slice(0, 50) || "freya_analysis";

    return new NextResponse(bytes, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${safeName}.docx"`,
      },
    });
  } catch (err) {
    console.error("Doc generation error:", err);
    return NextResponse.json({ error: "Failed to generate document" }, { status: 500 });
  }
}
