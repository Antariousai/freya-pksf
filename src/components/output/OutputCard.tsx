"use client";

import { useState } from "react";
import { FileDown, Loader2, Maximize2, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { OutputPanel } from "@/lib/types";

interface OutputCardProps {
  item: OutputPanel;
  iconColor: string;
  iconBg: string;
  tabIcon: React.ElementType;
}

// ── Shared markdown prose styles ────────────────────────────────────────────
const proseStyle: React.CSSProperties = {
  color: "var(--text-primary)",
  fontSize: "12px",
  lineHeight: 1.7,
};

// ── Markdown component overrides ─────────────────────────────────────────────
function markdownComponents(iconColor: string) {
  return {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 style={{ color: "var(--text-primary)", fontSize: "15px", fontWeight: 700, margin: "0 0 10px", lineHeight: 1.3 }}>{children}</h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 style={{ color: iconColor, fontSize: "11px", fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase" as const, margin: "16px 0 8px", paddingBottom: "4px", borderBottom: `1px solid ${iconColor}30` }}>{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 style={{ color: "var(--text-secondary)", fontSize: "11px", fontWeight: 600, margin: "12px 0 6px" }}>{children}</h3>
    ),
    p: ({ children }: { children?: React.ReactNode }) => (
      <p style={{ margin: "0 0 8px", color: "var(--text-secondary)", fontSize: "12px", lineHeight: 1.65 }}>{children}</p>
    ),
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>{children}</strong>
    ),
    ul: ({ children }: { children?: React.ReactNode }) => (
      <ul style={{ margin: "0 0 10px", paddingLeft: "16px", display: "flex", flexDirection: "column" as const, gap: "4px" }}>{children}</ul>
    ),
    ol: ({ children }: { children?: React.ReactNode }) => (
      <ol style={{ margin: "0 0 10px", paddingLeft: "18px", display: "flex", flexDirection: "column" as const, gap: "4px" }}>{children}</ol>
    ),
    li: ({ children }: { children?: React.ReactNode }) => (
      <li style={{ color: "var(--text-secondary)", fontSize: "12px", lineHeight: 1.6 }}>{children}</li>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote style={{ margin: "10px 0", padding: "8px 12px", background: "rgba(239,68,68,0.08)", borderLeft: "3px solid #ef4444", borderRadius: "0 6px 6px 0" }}>
        <div style={{ color: "#f87171", fontSize: "12px", lineHeight: 1.6 }}>{children}</div>
      </blockquote>
    ),
    table: ({ children }: { children?: React.ReactNode }) => (
      <div style={{ overflowX: "auto", marginBottom: "12px", borderRadius: "8px", border: "1px solid var(--glass-border)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" as const }}>{children}</table>
      </div>
    ),
    thead: ({ children }: { children?: React.ReactNode }) => (
      <thead style={{ background: `${iconColor}10` }}>{children}</thead>
    ),
    th: ({ children }: { children?: React.ReactNode }) => (
      <th style={{ padding: "6px 10px", textAlign: "left" as const, color: iconColor, fontSize: "9px", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase" as const, borderBottom: `1px solid ${iconColor}25` }}>{children}</th>
    ),
    td: ({ children }: { children?: React.ReactNode }) => (
      <td style={{ padding: "6px 10px", color: "var(--text-secondary)", fontSize: "11px", borderBottom: "1px solid var(--glass-border)" }}>{children}</td>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code style={{ background: "rgba(167,139,250,0.1)", color: "#a78bfa", padding: "1px 5px", borderRadius: "4px", fontSize: "11px", fontFamily: "var(--font-jetbrains-mono), monospace" }}>{children}</code>
    ),
    hr: () => (
      <hr style={{ border: "none", borderTop: "1px solid var(--glass-border)", margin: "14px 0" }} />
    ),
  };
}

// ── Download helper ──────────────────────────────────────────────────────────
async function downloadDocx(item: OutputPanel, setDownloading: (v: boolean) => void) {
  setDownloading(true);
  try {
    const res = await fetch("/api/doc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: item.title,
        content: item.content,
        label: item.label,
        timestamp: item.timestamp?.toISOString(),
      }),
    });
    if (!res.ok) throw new Error("Doc generation failed");
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const safeName = item.title.replace(/[^a-z0-9]/gi, "_").toLowerCase().replace(/^_+|_+$/g, "") || "freya_output";
    a.download = `${safeName}.docx`;
    a.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Download failed:", err);
  } finally {
    setDownloading(false);
  }
}

// ── Expand modal ─────────────────────────────────────────────────────────────
function ExpandModal({
  item,
  iconColor,
  tabIcon: Icon,
  onClose,
  onDownload,
  downloading,
}: {
  item: OutputPanel;
  iconColor: string;
  tabIcon: React.ElementType;
  onClose: () => void;
  onDownload: () => void;
  downloading: boolean;
}) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 900,
        background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg-1)",
          border: "1px solid var(--glass-border)",
          borderRadius: "14px",
          width: "100%",
          maxWidth: "860px",
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
        }}
      >
        {/* Modal header */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 16px", borderBottom: "1px solid var(--glass-border)", flexShrink: 0 }}>
          <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: `${iconColor}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon size={15} color={iconColor} strokeWidth={2} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 700, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {item.title}
            </p>
            <p style={{ color: "var(--text-dim)", fontSize: "9px", fontFamily: "var(--font-jetbrains-mono), monospace", margin: "2px 0 0" }}>
              {item.timestamp?.toLocaleString([], { dateStyle: "medium", timeStyle: "short" }) ?? ""}
            </p>
          </div>
          <button
            onClick={onDownload}
            disabled={downloading}
            style={{
              display: "flex", alignItems: "center", gap: "5px",
              padding: "6px 12px", borderRadius: "7px",
              background: `${iconColor}15`, border: `1px solid ${iconColor}30`,
              color: iconColor, fontSize: "11px", fontWeight: 600, cursor: downloading ? "wait" : "pointer",
              fontFamily: "var(--font-jetbrains-mono), monospace",
            }}
          >
            {downloading ? <Loader2 size={12} style={{ animation: "spin 1s linear infinite" }} /> : <FileDown size={12} />}
            {downloading ? "Building…" : "Download .docx"}
          </button>
          <button
            onClick={onClose}
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid var(--glass-border)", borderRadius: "7px", padding: "6px", cursor: "pointer", color: "var(--text-muted)", display: "flex" }}
          >
            <X size={14} />
          </button>
        </div>
        {/* Modal body */}
        <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "20px 24px", ...proseStyle }}>
          <ReactMarkdown components={markdownComponents(iconColor)}>
            {item.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

// ── Main card ────────────────────────────────────────────────────────────────
export default function OutputCard({ item, iconColor, iconBg, tabIcon: Icon }: OutputCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => downloadDocx(item, setDownloading);

  return (
    <>
      {expanded && (
        <ExpandModal
          item={item}
          iconColor={iconColor}
          tabIcon={Icon}
          onClose={() => setExpanded(false)}
          onDownload={handleDownload}
          downloading={downloading}
        />
      )}

      <div
        style={{
          background: "var(--glass-bg)",
          border: "1px solid var(--glass-border)",
          borderRadius: "12px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* Card header */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderBottom: "1px solid var(--glass-border)", background: "rgba(255,255,255,0.01)" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon size={14} color={iconColor} strokeWidth={2} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: "var(--text-primary)", fontSize: "12px", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {item.title}
            </div>
            <div suppressHydrationWarning style={{ color: "var(--text-dim)", fontSize: "9px", fontFamily: "var(--font-jetbrains-mono), monospace", marginTop: "1px" }}>
              {item.timestamp?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) ?? ""}
            </div>
          </div>
          <button
            onClick={() => setExpanded(true)}
            title="Expand"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "6px", padding: "4px 6px", cursor: "pointer", color: "var(--text-dim)", display: "flex" }}
          >
            <Maximize2 size={11} />
          </button>
        </div>

        {/* Card body — markdown rendered */}
        <div style={{ flex: 1, padding: "12px 14px", overflowY: "auto", overflowX: "hidden", minHeight: 0, ...proseStyle }}>
          <ReactMarkdown components={markdownComponents(iconColor)}>
            {item.content}
          </ReactMarkdown>
        </div>

        {/* Card footer */}
        <div style={{ display: "flex", gap: "6px", padding: "8px 12px", borderTop: "1px solid var(--glass-border)", background: "rgba(255,255,255,0.01)" }}>
          <button
            onClick={handleDownload}
            disabled={downloading}
            style={{
              display: "flex", alignItems: "center", gap: "5px",
              padding: "5px 10px", borderRadius: "6px",
              background: `${iconColor}12`, border: `1px solid ${iconColor}25`,
              color: iconColor, fontSize: "10px", fontWeight: 600,
              cursor: downloading ? "wait" : "pointer",
              fontFamily: "var(--font-jetbrains-mono), monospace",
              transition: "all 0.15s",
              opacity: downloading ? 0.7 : 1,
            }}
          >
            {downloading
              ? <Loader2 size={11} strokeWidth={2} style={{ animation: "spin 1s linear infinite" }} />
              : <FileDown size={11} strokeWidth={2} />}
            {downloading ? "Building…" : "Download .docx"}
          </button>
          <button
            onClick={() => setExpanded(true)}
            style={{
              display: "flex", alignItems: "center", gap: "5px",
              padding: "5px 10px", borderRadius: "6px",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
              color: "#6a6a90", fontSize: "10px", fontWeight: 600, cursor: "pointer",
              fontFamily: "var(--font-jetbrains-mono), monospace",
            }}
          >
            <Maximize2 size={11} strokeWidth={2} />
            Full View
          </button>
        </div>
      </div>
    </>
  );
}
