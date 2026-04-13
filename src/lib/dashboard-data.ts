import { supabaseAdmin } from "./supabase";
import type {
  DashboardDistributionItem,
  DashboardFeaturedItem,
  DashboardLatestItem,
  DashboardMetric,
  DashboardSnapshot,
} from "./types";

interface KnowledgeMetaRow {
  title: string | null;
  source_url: string | null;
  doc_type: string | null;
  created_at: string | null;
  total_chunks: number | null;
  chunk_index: number | null;
  char_count: number | null;
}

interface KnowledgeContentRow {
  title: string | null;
  source_url: string | null;
  content: string | null;
  chunk_index: number | null;
  char_count: number | null;
  created_at: string | null;
}

interface AggregatedDocument {
  key: string;
  title: string;
  sourceUrl: string;
  docType: string;
  latestCreatedAt: string;
  totalChunks: number;
  indexedChunks: number;
  group: string;
}

const BATCH_SIZE = 1000;
const CHART_COLORS = ["#7c3aed", "#06b6d4", "#10b981", "#f59e0b", "#4a4a68"];

function makeDocumentKey(title: string, sourceUrl: string): string {
  return `${title.trim().toLowerCase()}::${sourceUrl.trim().toLowerCase()}`;
}

function getFallbackTitle(sourceUrl: string): string {
  if (!sourceUrl) return "Untitled PKSF Item";

  try {
    const url = new URL(sourceUrl);
    const lastSegment = url.pathname.split("/").filter(Boolean).pop();
    if (!lastSegment) return url.hostname;
    return lastSegment.replace(/[-_]+/g, " ").replace(/\.[a-z0-9]+$/i, "").trim() || url.hostname;
  } catch {
    return sourceUrl;
  }
}

function cleanSnippet(content: string | null | undefined, maxLength = 140): string {
  const plain = (content ?? "")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/\|/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!plain) return "No preview available for this item.";
  if (plain.length <= maxLength) return plain;
  return `${plain.slice(0, maxLength).trimEnd()}...`;
}

function formatCompactNumber(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(value >= 10_000_000 ? 0 : 1).replace(/\.0$/, "")}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(value >= 10_000 ? 0 : 1).replace(/\.0$/, "")}K`;
  }
  return value.toString();
}

function formatPercent(value: number): string {
  return `${value.toFixed(1).replace(/\.0$/, "")}%`;
}

function formatAbsoluteTime(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffMinutes = Math.max(0, Math.floor(diffMs / 60_000));

  if (diffMinutes < 1) return "just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;

  return formatAbsoluteTime(iso);
}

function getSourceHost(sourceUrl: string): string {
  try {
    return new URL(sourceUrl).hostname.replace(/^www\./, "");
  } catch {
    return "source unavailable";
  }
}

function getSourceGroup(sourceUrl: string, docType: string, title: string): string {
  const haystack = `${sourceUrl} ${title}`.toLowerCase();

  if (docType === "pdf") return "PDF Reports";
  if (/knowledge|news|meeting|training|workshop|event|hub/.test(haystack)) return "Knowledge Hub";
  if (/about|governing|governance|organogram|managing-director|citizen|general-body/.test(haystack)) {
    return "About & Governance";
  }
  if (/program|project|microcredit|loan|livelihood|agriculture/.test(haystack)) return "Programs & Projects";
  if (/risk|disaster|climate|mitigation|resilience/.test(haystack)) return "Risk & Resilience";
  return "Website Pages";
}

async function fetchAllKnowledgeMeta(): Promise<KnowledgeMetaRow[]> {
  const allRows: KnowledgeMetaRow[] = [];

  for (let from = 0; ; from += BATCH_SIZE) {
    const { data, error } = await supabaseAdmin
      .from("pksf_knowledge")
      .select("title, source_url, doc_type, created_at, total_chunks, chunk_index, char_count")
      .range(from, from + BATCH_SIZE - 1);

    if (error) throw error;
    if (!data || data.length === 0) break;

    allRows.push(...data);

    if (data.length < BATCH_SIZE) break;
  }

  return allRows;
}

function aggregateDocuments(rows: KnowledgeMetaRow[]): AggregatedDocument[] {
  const docs = new Map<string, AggregatedDocument>();

  for (const row of rows) {
    const sourceUrl = row.source_url?.trim() ?? "";
    const title = row.title?.trim() || getFallbackTitle(sourceUrl);
    const key = makeDocumentKey(title, sourceUrl);
    const latestCreatedAt = row.created_at ?? new Date(0).toISOString();
    const totalChunks = Math.max(1, row.total_chunks ?? 1);
    const docType = row.doc_type?.trim() || "unknown";

    const existing = docs.get(key);
    if (!existing) {
      docs.set(key, {
        key,
        title,
        sourceUrl,
        docType,
        latestCreatedAt,
        totalChunks,
        indexedChunks: 1,
        group: getSourceGroup(sourceUrl, docType, title),
      });
      continue;
    }

    existing.indexedChunks += 1;
    existing.totalChunks = Math.max(existing.totalChunks, totalChunks);
    if (new Date(latestCreatedAt).getTime() > new Date(existing.latestCreatedAt).getTime()) {
      existing.latestCreatedAt = latestCreatedAt;
    }
  }

  return [...docs.values()];
}

async function fetchSnippetsForDocuments(documents: AggregatedDocument[]): Promise<Map<string, string>> {
  const docsByTitle = new Map<string, AggregatedDocument[]>();
  for (const doc of documents) {
    const bucket = docsByTitle.get(doc.title) ?? [];
    bucket.push(doc);
    docsByTitle.set(doc.title, bucket);
  }

  const titles = [...docsByTitle.keys()];
  const bestRows = new Map<string, { score: number; snippet: string }>();

  for (let index = 0; index < titles.length; index += 20) {
    const titleChunk = titles.slice(index, index + 20);
    const { data, error } = await supabaseAdmin
      .from("pksf_knowledge")
      .select("title, source_url, content, chunk_index, char_count, created_at")
      .in("title", titleChunk);

    if (error) throw error;

    for (const row of (data ?? []) as KnowledgeContentRow[]) {
      const title = row.title?.trim();
      const sourceUrl = row.source_url?.trim() ?? "";
      if (!title) continue;

      const candidates = docsByTitle.get(title) ?? [];
      const match = candidates.find((doc) => doc.sourceUrl === sourceUrl);
      if (!match) continue;

      const key = match.key;
      const isPrimaryChunk = (row.chunk_index ?? 9999) === 0 ? 1_000_000 : 0;
      const isLatestSnapshot = row.created_at === match.latestCreatedAt ? 100_000 : 0;
      const score = isPrimaryChunk + isLatestSnapshot + (row.char_count ?? 0);
      const current = bestRows.get(key);

      if (!current || score > current.score) {
        bestRows.set(key, { score, snippet: cleanSnippet(row.content) });
      }
    }
  }

  const snippets = new Map<string, string>();
  for (const doc of documents) {
    snippets.set(doc.key, bestRows.get(doc.key)?.snippet ?? "No preview available for this item.");
  }

  return snippets;
}

function buildMetrics(
  totalChunks: number,
  uniqueTitleCount: number,
  webpageCount: number,
  pdfCount: number
): DashboardMetric[] {
  const webpageShare = totalChunks === 0 ? 0 : (webpageCount / totalChunks) * 100;
  const pdfShare = totalChunks === 0 ? 0 : (pdfCount / totalChunks) * 100;

  return [
    {
      id: "knowledge-chunks",
      label: "Total Knowledge Chunks",
      value: formatCompactNumber(totalChunks),
      change: "Ingested rows",
      trend: "stable",
    },
    {
      id: "unique-titles",
      label: "Unique Document/Page Titles",
      value: formatCompactNumber(uniqueTitleCount),
      change: "Distinct titles",
      trend: "stable",
    },
    {
      id: "web-items",
      label: "Webpage Items",
      value: formatCompactNumber(webpageCount),
      change: formatPercent(webpageShare),
      trend: "stable",
    },
    {
      id: "pdf-items",
      label: "PDF Items",
      value: formatCompactNumber(pdfCount),
      change: formatPercent(pdfShare),
      trend: "stable",
    },
  ];
}

function buildDistribution(documents: AggregatedDocument[]): DashboardDistributionItem[] {
  const groupCounts = new Map<string, number>();

  for (const doc of documents) {
    groupCounts.set(doc.group, (groupCounts.get(doc.group) ?? 0) + 1);
  }

  const totalDocs = documents.length || 1;

  return [...groupCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count], index) => ({
      name,
      count,
      value: Number(((count / totalDocs) * 100).toFixed(2)),
      color: CHART_COLORS[index % CHART_COLORS.length],
    }));
}

function buildLatestItems(
  documents: AggregatedDocument[],
  snippets: Map<string, string>
): DashboardLatestItem[] {
  return [...documents]
    .sort((a, b) => new Date(b.latestCreatedAt).getTime() - new Date(a.latestCreatedAt).getTime())
    .slice(0, 5)
    .map((doc, index) => {
      const severity: DashboardLatestItem["severity"] =
        doc.docType === "pdf" ? "warning" : index === 0 ? "critical" : "info";

      return {
        id: doc.key,
        severity,
        title: doc.title,
        detail: `${snippets.get(doc.key) ?? "No preview available."} Source: ${getSourceHost(doc.sourceUrl)}.`,
        time: formatRelativeTime(doc.latestCreatedAt),
        sourceUrl: doc.sourceUrl,
        docType: doc.docType,
        createdAt: doc.latestCreatedAt,
      };
    });
}

function buildFeaturedItems(
  documents: AggregatedDocument[],
  snippets: Map<string, string>
): DashboardFeaturedItem[] {
  return [...documents]
    .sort((a, b) => {
      if (b.totalChunks !== a.totalChunks) return b.totalChunks - a.totalChunks;
      return new Date(b.latestCreatedAt).getTime() - new Date(a.latestCreatedAt).getTime();
    })
    .slice(0, 8)
    .map((doc) => {
      const progressPct = Math.max(
        2,
        Math.min(100, Math.round((doc.indexedChunks / doc.totalChunks) * 100))
      );
      const isPdf = doc.docType === "pdf";

      return {
        id: doc.key,
        title: doc.title,
        source: getSourceHost(doc.sourceUrl),
        badgeLabel: isPdf ? "PDF" : "WEB",
        status: isPdf ? "watch" : progressPct === 100 ? "live" : "stable",
        progressPct,
        progressLabel: `${Math.min(doc.indexedChunks, doc.totalChunks)}/${doc.totalChunks} chunks indexed`,
        snippet: snippets.get(doc.key) ?? "No preview available for this item.",
        sourceUrl: doc.sourceUrl,
      };
    });
}

export async function getDashboardSnapshot(): Promise<DashboardSnapshot> {
  const [totalChunksRes, webpageCountRes, pdfCountRes, allRows] = await Promise.all([
    supabaseAdmin.from("pksf_knowledge").select("*", { count: "exact", head: true }),
    supabaseAdmin
      .from("pksf_knowledge")
      .select("*", { count: "exact", head: true })
      .eq("doc_type", "webpage"),
    supabaseAdmin
      .from("pksf_knowledge")
      .select("*", { count: "exact", head: true })
      .eq("doc_type", "pdf"),
    fetchAllKnowledgeMeta(),
  ]);

  if (totalChunksRes.error) throw totalChunksRes.error;
  if (webpageCountRes.error) throw webpageCountRes.error;
  if (pdfCountRes.error) throw pdfCountRes.error;

  const documents = aggregateDocuments(allRows);
  const uniqueTitleCount = new Set(documents.map((doc) => doc.title)).size;
  const latestAsOf =
    documents
      .map((doc) => doc.latestCreatedAt)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0] ?? new Date(0).toISOString();

  const latestDocs = [...documents]
    .sort((a, b) => new Date(b.latestCreatedAt).getTime() - new Date(a.latestCreatedAt).getTime())
    .slice(0, 5);
  const featuredDocs = [...documents]
    .sort((a, b) => {
      if (b.totalChunks !== a.totalChunks) return b.totalChunks - a.totalChunks;
      return new Date(b.latestCreatedAt).getTime() - new Date(a.latestCreatedAt).getTime();
    })
    .slice(0, 8);

  const snippets = await fetchSnippetsForDocuments(
    [...new Map([...latestDocs, ...featuredDocs].map((doc) => [doc.key, doc])).values()]
  );

  return {
    asOf: latestAsOf,
    subtitle: `Live index from pksf_knowledge | Updated ${formatAbsoluteTime(latestAsOf)}`,
    kpis: buildMetrics(
      totalChunksRes.count ?? allRows.length,
      uniqueTitleCount,
      webpageCountRes.count ?? 0,
      pdfCountRes.count ?? 0
    ),
    distribution: buildDistribution(documents),
    latestItems: buildLatestItems(latestDocs, snippets),
    featuredItems: buildFeaturedItems(featuredDocs, snippets),
  };
}
