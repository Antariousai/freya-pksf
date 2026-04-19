import { supabaseAdmin } from "./supabase";
import type {
  DashboardActionItem,
  DashboardBriefing,
  DashboardDistributionItem,
  DashboardExecutiveCard,
  DashboardFeaturedItem,
  DashboardLatestItem,
  DashboardMetric,
  DashboardSnapshot,
  DataReadinessItem,
  InferredProfileCard,
  InferredProfileDimension,
  OperationsBankingItem,
  OperationsAlertItem,
  OperationsCoverageCard,
  OperationsDepartmentItem,
  OperationsPORow,
  OperationsRiskItem,
  OperationsSummaryCard,
  OperationsSnapshot,
  ProfilingPOItem,
  ProfilingQueueItem,
  ProfilingScoreBandItem,
  ProfilingSummaryCard,
  ProfilingSnapshot,
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

interface KnowledgeEvidenceRow {
  title: string | null;
  source_url: string | null;
  content: string | null;
  created_at: string | null;
  doc_type: string | null;
}

interface ProfileSeed {
  id: string;
  title: string;
  subtitle: string;
  titles: string[];
}

const BATCH_SIZE = 1000;
const CHART_COLORS = ["#7c3aed", "#06b6d4", "#10b981", "#f59e0b", "#4a4a68"];
const OPERATIONS_PO_CANDIDATES = [
  { id: "brac", name: "BRAC", query: "BRAC" },
  { id: "tmss", name: "TMSS", query: "TMSS" },
  { id: "jcf", name: "Jagorani Chakra Foundation", query: "Jagorani Chakra Foundation" },
  { id: "padakhep", name: "Padakhep", query: "Padakhep" },
  { id: "shakti", name: "Shakti Foundation", query: "Shakti Foundation" },
  { id: "codec", name: "CODEC", query: "CODEC" },
  { id: "ypsa", name: "YPSA", query: "YPSA" },
];
const OPERATIONS_BANKS = [
  { id: "ncc", name: "NCC Bank", query: "NCC Bank" },
  { id: "sonali", name: "Sonali Bank", query: "Sonali Bank" },
  { id: "agrani", name: "Agrani Bank", query: "Agrani Bank" },
  { id: "janata", name: "Janata Bank", query: "Janata Bank" },
  { id: "basic", name: "BASIC Bank", query: "BASIC Bank" },
];
const PROFILE_SEEDS: ProfileSeed[] = [
  {
    id: "institutional-core",
    title: "PKSF Institutional Core",
    subtitle: "Inferred profile from About Us and institutional overview content",
    titles: [
      "About Us - Palli Karma-Sahayak Foundation (PKSF)",
      "Palli Karma-Sahayak Foundation (PKSF)",
    ],
  },
  {
    id: "po-network",
    title: "Partner Organization Network",
    subtitle: "Inferred profile from the partner organization directory and network footprint",
    titles: ["Partner Organizations - Palli Karma-Sahayak Foundation (PKSF)"],
  },
  {
    id: "digital-engine",
    title: "Digital Transformation Engine",
    subtitle: "Inferred profile from PKSF digital transformation and systems modernization content",
    titles: ["Digital Transformation - Palli Karma-Sahayak Foundation (PKSF)"],
  },
  {
    id: "climate-resilience",
    title: "Climate & Risk Resilience",
    subtitle: "Inferred profile from climate action and risk mitigation content",
    titles: [
      "Climate Action - Palli Karma-Sahayak Foundation (PKSF)",
      "Risk Mitigation - Palli Karma-Sahayak Foundation (PKSF)",
      "The Project for Developing Inclusive Risk Mitigation Program for Sustainable Poverty Reduction (IRMP) - Palli Karma-Sahayak Foundation (PKSF)",
    ],
  },
];
const PROFILE_DIMENSIONS = [
  "Financial Reach",
  "Governance & Structure",
  "Operational Resilience",
  "Social Impact",
  "Adaptive Capacity",
] as const;

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

function buildDocumentFallbackSnippet(doc: AggregatedDocument): string {
  const source = getSourceHost(doc.sourceUrl);
  const scope = `${Math.min(doc.indexedChunks, doc.totalChunks)}/${doc.totalChunks} chunks indexed`;
  const typeHint = doc.docType === "pdf" ? "archived PDF source" : "live web source";
  return `${doc.title} is available as a ${typeHint} from ${source}. ${scope}. Use this item for board-level context and deeper drill-down.`;
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
    snippets.set(doc.key, bestRows.get(doc.key)?.snippet ?? buildDocumentFallbackSnippet(doc));
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
        detail: `${snippets.get(doc.key) ?? buildDocumentFallbackSnippet(doc)} Source: ${getSourceHost(doc.sourceUrl)}.`,
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
        snippet: snippets.get(doc.key) ?? buildDocumentFallbackSnippet(doc),
        sourceUrl: doc.sourceUrl,
      };
    });
}

function buildDashboardExecutiveCards(
  aboutText: string,
  digitalText: string,
  climateText: string
): DashboardExecutiveCard[] {
  const householdCoverage =
    parsePercentFromText(aboutText, /Coverage as % of Total Households.*?(\d+(?:\.\d+)?)/i) ?? 38.48;
  const womenBorrowers =
    parsePercentFromText(aboutText, /Women Borrowers.*?(\d+(?:\.\d+)?)%/i) ?? 93.67;
  const digitalReporting =
    parsePercentFromText(digitalText, /(\d+(?:\.\d+)?)%\s*digital reporting/i) ??
    (digitalText.toLowerCase().includes("almost 100% digital reporting") ? 100 : 95);
  const climateFinance =
    climateText.match(/nearly usd\s*1\s*billion/i)?.[0]?.replace(/nearly\s*/i, "USD ") ?? "USD 1B";

  return [
    {
      id: "household-coverage",
      title: "Household Coverage",
      value: `${householdCoverage.toFixed(2)}%`,
      detail: "Current knowledge signals broad household-level national penetration.",
      status: householdCoverage >= 30 ? "live" : "stable",
    },
    {
      id: "women-borrowers",
      title: "Women Borrowers",
      value: `${womenBorrowers.toFixed(2)}%`,
      detail: "Women-centered outreach remains one of the strongest institution-wide signals.",
      status: womenBorrowers >= 90 ? "live" : "stable",
    },
    {
      id: "digital-reporting",
      title: "Digital Reporting",
      value: `${Math.round(digitalReporting)}%`,
      detail: "Digital reporting and API-linked oversight support live management visibility.",
      status: digitalReporting >= 95 ? "live" : "watch",
    },
    {
      id: "climate-finance",
      title: "Climate Finance",
      value: climateFinance,
      detail: "Climate finance mobilization is a major strategic lever in the current index.",
      status: "stable",
    },
  ];
}

function buildDashboardBriefing(
  executiveCards: DashboardExecutiveCard[],
  latestItems: DashboardLatestItem[]
): DashboardBriefing {
  const liveCount = executiveCards.filter((card) => card.status === "live").length;
  const warningCount = latestItems.filter((item) => item.severity === "warning").length;

  return {
    headline: "National reach, digital oversight, and climate resilience are the strongest MD-level signals right now.",
    summary:
      liveCount >= 3
        ? `The current knowledge base shows strong institutional momentum across footprint, women-centered outreach, and digital reporting. ${warningCount} recently indexed items merit quick review during live demos.`
        : `The current knowledge base shows a mixed leadership picture with strong strategic signals and a few areas that need closer review during live demos.`,
  };
}

function buildDashboardActionItems(
  aboutText: string,
  digitalText: string,
  climateText: string
): DashboardActionItem[] {
  return [
    {
      id: "exception-oversight",
      title: "Push exception-based oversight across the PO network",
      detail: cleanSnippet(
        digitalText.match(/all partner organizations.*?real-time oversight\./i)?.[0] ??
          digitalText,
        150
      ),
      priority: "high",
    },
    {
      id: "climate-governance",
      title: "Keep climate-finance governance visible at board level",
      detail: cleanSnippet(
        climateText.match(/mobilized nearly usd 1 billion.*?across bangladesh\./i)?.[0] ??
          climateText,
        150
      ),
      priority: "high",
    },
    {
      id: "outreach-momentum",
      title: "Sustain women-centered outreach momentum",
      detail: cleanSnippet(
        aboutText.match(/women borrowers.*|women members.*/i)?.[0] ?? aboutText,
        150
      ),
      priority: "medium",
    },
  ];
}

function buildReadinessItem(
  id: string,
  title: string,
  count: number | null,
  liveThreshold: number,
  detailBuilder: (value: number | null) => string
): DataReadinessItem {
  const status: DataReadinessItem["status"] =
    count === null ? "watch" : count >= liveThreshold ? "live" : count > 0 ? "stable" : "watch";

  return {
    id,
    title,
    status,
    detail: detailBuilder(count),
  };
}

function buildDashboardReadiness(readiness: Awaited<ReturnType<typeof getStructuredReadinessSnapshot>>): DataReadinessItem[] {
  return [
    buildReadinessItem("po-master", "PO Master Feed", readiness.poCount, 280, (count) =>
      count === null ? "Structured PO master table is not available yet." : `${count} PO records available for live dashboard rollup.`
    ),
    buildReadinessItem("staff-master", "Staff And Department Feed", readiness.staffCount, 50, (count) =>
      count === null ? "Staff operations feed is not available yet." : `${count} staff records available for enterprise operations visibility.`
    ),
    buildReadinessItem("projects", "Projects Feed", readiness.projectCount, 10, (count) =>
      count === null ? "Structured project tracking feed is not available yet." : `${count} structured project records available for executive oversight.`
    ),
    buildReadinessItem("beneficiaries", "Beneficiary Psychometric Feed", readiness.beneficiaryCount, 1000, (count) =>
      count === null ? "Beneficiary psychometric source tables are not available yet." : `${count} beneficiaries are available for psychometric and financial drill-down.`
    ),
  ];
}

function buildOperationsReadiness(readiness: Awaited<ReturnType<typeof getStructuredReadinessSnapshot>>): DataReadinessItem[] {
  return [
    buildReadinessItem("departments", "Department Operations", readiness.departmentCount, 5, (count) =>
      count === null ? "Department operations tables are not present yet." : `${count} departments are ready for live operations reporting.`
    ),
    buildReadinessItem("staff", "Staff Operations", readiness.staffCount, 100, (count) =>
      count === null ? "Staff operations tables are not present yet." : `${count} staff rows are ready for workload and SLA visibility.`
    ),
    buildReadinessItem("po", "PO Network", readiness.poCount, 280, (count) =>
      count === null ? "PO master tables are not present yet." : `${count} PO rows are ready for network-wide operational views.`
    ),
    buildReadinessItem("branches", "Branch Operations", readiness.branchCount, 1000, (count) =>
      count === null ? "Branch-level operations feed is not present yet." : `${count} branch rows are ready for field-level monitoring.`
    ),
  ];
}

function buildProfilingReadiness(readiness: Awaited<ReturnType<typeof getStructuredReadinessSnapshot>>): DataReadinessItem[] {
  return [
    buildReadinessItem("beneficiaries", "Beneficiary Master", readiness.beneficiaryCount, 1000, (count) =>
      count === null ? "Beneficiary master feed is not present yet." : `${count} beneficiary profiles are available for psychometric drill-down.`
    ),
    buildReadinessItem("assessments", "Assessment Feed", readiness.assessmentCount, 1000, (count) =>
      count === null ? "Psychometric assessment feed is not present yet." : `${count} psychometric assessments are available for progress and backlog tracking.`
    ),
    buildReadinessItem("accuracy", "Accuracy Tracking", readiness.accuracyCount, 10, (count) =>
      count === null ? "Accuracy tracking feed is not present yet." : `${count} accuracy snapshots are available for model and PO performance analysis.`
    ),
  ];
}

export async function getDashboardSnapshot(): Promise<DashboardSnapshot> {
  const [totalChunksRes, webpageCountRes, pdfCountRes, allRows, aboutRows, digitalRows, climateRows, readiness] = await Promise.all([
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
    fetchRowsByTitles(["About Us - Palli Karma-Sahayak Foundation (PKSF)"]),
    fetchRowsByTitles(["Digital Transformation - Palli Karma-Sahayak Foundation (PKSF)"]),
    fetchRowsByTitles(["Climate Action - Palli Karma-Sahayak Foundation (PKSF)"]),
    getStructuredReadinessSnapshot(),
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
  const aboutText = combineTexts(aboutRows);
  const digitalText = combineTexts(digitalRows);
  const climateText = combineTexts(climateRows);
  const latestItems = buildLatestItems(latestDocs, snippets);
  const executiveCards = buildDashboardExecutiveCards(aboutText, digitalText, climateText);

  return {
    asOf: latestAsOf,
    subtitle: `Live index from pksf_knowledge | Updated ${formatAbsoluteTime(latestAsOf)}`,
    briefing: buildDashboardBriefing(executiveCards, latestItems),
    kpis: buildMetrics(
      totalChunksRes.count ?? allRows.length,
      uniqueTitleCount,
      webpageCountRes.count ?? 0,
      pdfCountRes.count ?? 0
    ),
    executiveCards,
    actionItems: buildDashboardActionItems(aboutText, digitalText, climateText),
    readiness: buildDashboardReadiness(readiness),
    distribution: buildDistribution(documents),
    latestItems,
    featuredItems: buildFeaturedItems(featuredDocs, snippets),
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function normalizeSourceUrl(sourceUrl: string | null | undefined): string {
  return (sourceUrl ?? "").trim().replace(/\/+$/, "");
}

function dedupeEvidenceRows(rows: KnowledgeEvidenceRow[]): KnowledgeEvidenceRow[] {
  const seen = new Set<string>();

  return rows.filter((row) => {
    const key = [
      row.title?.trim().toLowerCase() ?? "",
      normalizeSourceUrl(row.source_url).toLowerCase(),
      row.created_at ?? "",
      cleanSnippet(row.content, 120),
    ].join("::");

    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function getLatestTimestamp(rows: Array<{ created_at: string | null }>): string {
  return (
    rows
      .map((row) => row.created_at ?? new Date(0).toISOString())
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0] ?? new Date(0).toISOString()
  );
}

async function fetchRowsByTitles(titles: string[]): Promise<KnowledgeEvidenceRow[]> {
  if (titles.length === 0) return [];

  const { data, error } = await supabaseAdmin
    .from("pksf_knowledge")
    .select("title, source_url, content, created_at, doc_type")
    .in("title", titles)
    .limit(100);

  if (error) throw error;
  return dedupeEvidenceRows((data ?? []) as KnowledgeEvidenceRow[]);
}

async function fetchKeywordEvidence(query: string, limit = 12): Promise<KnowledgeEvidenceRow[]> {
  const { data, error } = await supabaseAdmin
    .from("pksf_knowledge")
    .select("title, source_url, content, created_at, doc_type")
    .ilike("content", `%${query}%`)
    .limit(limit);

  if (error) throw error;
  return dedupeEvidenceRows((data ?? []) as KnowledgeEvidenceRow[]);
}

async function getTableCount(tableName: string): Promise<number | null> {
  const { count, error } = await supabaseAdmin.from(tableName).select("*", { count: "exact", head: true });
  if (error) return null;
  return count ?? 0;
}

async function getStructuredReadinessSnapshot() {
  const [
    departmentCount,
    staffCount,
    poCount,
    branchCount,
    projectCount,
    beneficiaryCount,
    assessmentCount,
    accuracyCount,
  ] = await Promise.all([
    getTableCount("ops_departments"),
    getTableCount("ops_staff"),
    getTableCount("ops_po_master"),
    getTableCount("ops_po_branches"),
    getTableCount("ops_projects"),
    getTableCount("psy_beneficiaries"),
    getTableCount("psy_psychometric_assessments"),
    getTableCount("psy_accuracy_daily"),
  ]);

  return {
    departmentCount,
    staffCount,
    poCount,
    branchCount,
    projectCount,
    beneficiaryCount,
    assessmentCount,
    accuracyCount,
  };
}

function parsePercentFromText(text: string, pattern: RegExp): number | null {
  const match = text.match(pattern);
  if (!match) return null;
  const value = Number(match[1]);
  return Number.isFinite(value) ? value : null;
}

function combineTexts(rows: KnowledgeEvidenceRow[]): string {
  return rows.map((row) => row.content ?? "").join("\n");
}

function getPreferredRow(rows: KnowledgeEvidenceRow[]): KnowledgeEvidenceRow | undefined {
  return [...rows].sort((a, b) => {
    const aScore = (a.title?.includes("Partner Organizations") ? 100 : 0) + (a.content?.length ?? 0);
    const bScore = (b.title?.includes("Partner Organizations") ? 100 : 0) + (b.content?.length ?? 0);
    return bScore - aScore;
  })[0];
}

function extractSentenceForQuery(content: string, query: string): string {
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const queryLower = query.toLowerCase();
  const matchedLine =
    lines.find((line) => line.toLowerCase().includes(queryLower)) ??
    lines.find((line) => line.length > 32) ??
    content;

  return cleanSnippet(matchedLine, 150);
}

function extractLocationFromContent(content: string, query: string): string {
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const queryLower = query.toLowerCase();
  const index = lines.findIndex((line) => line.toLowerCase().includes(queryLower));

  if (index >= 0) {
    for (let offset = 1; offset <= 4; offset += 1) {
      const nextLine = lines[index + offset];
      if (!nextLine) break;
      if (nextLine.length < 4) continue;
      if (/^contact[:\s]/i.test(nextLine) || /^email[:\s]/i.test(nextLine) || /^web[:\s]/i.test(nextLine)) {
        continue;
      }
      return cleanSnippet(nextLine, 48);
    }
  }

  return "Bangladesh network";
}

function deriveSignal(count: number): OperationsPORow["signal"] {
  if (count >= 5) return "up";
  if (count <= 1) return "down";
  return "stable";
}

function deriveEvidenceStatus(count: number): OperationsPORow["status"] {
  if (count >= 5) return "live";
  if (count <= 1) return "watch";
  return "stable";
}

function deriveRiskStatus(detail: string): OperationsRiskItem["status"] {
  const lower = detail.toLowerCase();
  if (/flood|cyclone|salinity|drought|extreme/.test(lower)) return "warning";
  if (/nearly usd 1 billion|nationally determined contributions|national adaptation plan/.test(lower)) {
    return "normal";
  }
  if (/risk mitigation|disbursed bdt 5 crore|seven partner organizations/.test(lower)) return "danger";
  return "warning";
}

function confidenceFromEvidence(rows: KnowledgeEvidenceRow[], combinedText: string): InferredProfileCard["confidence"] {
  if (rows.length >= 5 || combinedText.length >= 2500) return "high";
  if (rows.length >= 2 || combinedText.length >= 1000) return "medium";
  return "low";
}

function computeDimension(
  name: typeof PROFILE_DIMENSIONS[number],
  text: string
): InferredProfileDimension {
  const lower = text.toLowerCase();
  const metricBoost = /million|billion|districts|upazilas|branches|api|cashless|paperless/.test(lower) ? 8 : 0;
  let score = 36;
  let evidence = "Limited direct evidence detected in the selected PKSF knowledge source.";

  if (name === "Financial Reach") {
    const hits = [
      /loan outstanding/g,
      /borrowers/g,
      /members/g,
      /savings/g,
      /disbursed/g,
      /bdt/g,
    ].reduce((sum, pattern) => sum + (lower.match(pattern)?.length ?? 0), 0);
    score += hits * 7 + metricBoost;
    evidence =
      cleanSnippet(
        text.match(/(loan outstanding.*|members.*|borrowers.*|savings.*|disbursed.*)/i)?.[0] ??
          "Coverage, borrower, savings, and disbursement references inform this score.",
        120
      );
  } else if (name === "Governance & Structure") {
    const hits = [
      /foundation/g,
      /partner organizations/g,
      /network/g,
      /institutional/g,
      /board/g,
      /policy/g,
      /oversight/g,
    ].reduce((sum, pattern) => sum + (lower.match(pattern)?.length ?? 0), 0);
    score += hits * 6;
    evidence =
      cleanSnippet(
        text.match(/(partner organizations.*|institutional.*|foundation.*|board.*|policy.*)/i)?.[0] ??
          "Institutional structure, network, and governance language inform this score.",
        120
      );
  } else if (name === "Operational Resilience") {
    const hits = [
      /districts/g,
      /upazilas/g,
      /city corporations/g,
      /branch/g,
      /network/g,
      /real-time/g,
      /implementation/g,
    ].reduce((sum, pattern) => sum + (lower.match(pattern)?.length ?? 0), 0);
    score += hits * 6 + metricBoost;
    evidence =
      cleanSnippet(
        text.match(/(64 districts.*|upazilas.*|branch.*|real-time oversight.*|implementation.*)/i)?.[0] ??
          "Geographic coverage, branch reach, and implementation signals inform this score.",
        120
      );
  } else if (name === "Social Impact") {
    const hits = [
      /women/g,
      /poverty/g,
      /livelihood/g,
      /household/g,
      /vulnerable/g,
      /inclusive/g,
      /members/g,
    ].reduce((sum, pattern) => sum + (lower.match(pattern)?.length ?? 0), 0);
    score += hits * 6;
    evidence =
      cleanSnippet(
        text.match(/(women.*|poverty.*|household.*|inclusive.*|vulnerable.*)/i)?.[0] ??
          "Women outreach, inclusion, and household coverage references inform this score.",
        120
      );
  } else if (name === "Adaptive Capacity") {
    const hits = [
      /digital/g,
      /api/g,
      /paperless/g,
      /cashless/g,
      /psychometric/g,
      /climate/g,
      /resilience/g,
      /adaptation/g,
    ].reduce((sum, pattern) => sum + (lower.match(pattern)?.length ?? 0), 0);
    score += hits * 7 + metricBoost;
    evidence =
      cleanSnippet(
        text.match(/(digital.*|api.*|paperless.*|cashless.*|psychometric.*|climate.*|adaptation.*)/i)?.[0] ??
          "Digital transformation and climate adaptation signals inform this score.",
        120
      );
  }

  return {
    name,
    score: Math.round(clamp(score, 28, 98)),
    max: 100,
    evidence,
  };
}

function buildMethodology(): ProfilingSnapshot["methodology"] {
  return [
    { label: "Financial Reach", desc: "Borrowers, members, savings, disbursement, and scale references." },
    { label: "Governance & Structure", desc: "Institutional network, policy, and organizational structure cues." },
    { label: "Operational Resilience", desc: "Coverage footprint, branch reach, and implementation capacity signals." },
    { label: "Social Impact", desc: "Women outreach, inclusion, livelihood, and vulnerable-community references." },
    { label: "Adaptive Capacity", desc: "Digital, API, paperless, climate, and psychometric readiness signals." },
  ];
}

function buildOperationsSummaryCards(
  aboutText: string,
  digitalText: string,
  poRows: OperationsPORow[]
): OperationsSummaryCard[] {
  const membersMatch = aboutText.match(/over\s+20\.70\s+million\s+members/i) || aboutText.match(/20\.70 million members/i);
  const districtsMatch = aboutText.match(/64 districts/i);
  const digitalReporting =
    parsePercentFromText(digitalText, /(\d+(?:\.\d+)?)%\s*digital reporting/i) ??
    (digitalText.toLowerCase().includes("almost 100% digital reporting") ? 100 : 95);
  const watchedCount = poRows.filter((row) => row.status === "watch").length;

  return [
    {
      id: "network-scale",
      title: "Beneficiary Reach",
      value: membersMatch ? "20.70M" : "20M+",
      detail: "Institutional network scale referenced in About Us content.",
      status: "live",
    },
    {
      id: "geographic-footprint",
      title: "Geographic Footprint",
      value: districtsMatch ? "64 Districts" : "National",
      detail: "Nationwide operating footprint remains a core leadership signal.",
      status: "live",
    },
    {
      id: "digital-ops",
      title: "Digital Reporting",
      value: `${Math.round(digitalReporting)}%`,
      detail: "Digital reporting and API-linked visibility support operational command.",
      status: digitalReporting >= 95 ? "live" : "watch",
    },
    {
      id: "watchlist",
      title: "Current Watchlist",
      value: `${watchedCount}`,
      detail: "PO entries with sparse evidence or lower operational coverage in the current live demo.",
      status: watchedCount > 0 ? "watch" : "stable",
    },
  ];
}

function buildOperationsDepartmentItems(
  aboutText: string,
  digitalText: string,
  climateText: string,
  riskText: string
): OperationsDepartmentItem[] {
  return [
    {
      id: "po-network",
      name: "PO Network Operations",
      focus: "Field delivery, branch coverage, and national footprint",
      status: "live",
      detail: cleanSnippet(aboutText, 150),
    },
    {
      id: "digital",
      name: "ICT And Digital Transformation",
      focus: "API, reporting, paperless operations, and oversight",
      status: digitalText.toLowerCase().includes("api") ? "live" : "stable",
      detail: cleanSnippet(digitalText, 150),
    },
    {
      id: "climate",
      name: "Climate And Resilience",
      focus: "Climate finance, adaptation, and vulnerable-region support",
      status: "stable",
      detail: cleanSnippet(climateText, 150),
    },
    {
      id: "risk",
      name: "Risk Mitigation",
      focus: "Agricultural risk, implementation support, and disaster response",
      status: riskText.toLowerCase().includes("bdt 5 crore") ? "watch" : "stable",
      detail: cleanSnippet(riskText, 150),
    },
  ];
}

function buildOperationsAlertItems(
  poRows: OperationsPORow[],
  bankingItems: OperationsBankingItem[],
  riskItems: OperationsRiskItem[]
): OperationsAlertItem[] {
  const alerts: OperationsAlertItem[] = [];

  for (const row of poRows.filter((item) => item.status === "watch").slice(0, 2)) {
    alerts.push({
      id: `po-${row.id}`,
      title: `${row.name} needs deeper operational visibility`,
      detail: `${row.coverage}. ${row.note}`,
      severity: "warning",
    });
  }

  for (const bank of bankingItems.filter((item) => item.status === "watch").slice(0, 1)) {
    alerts.push({
      id: `bank-${bank.id}`,
      title: `${bank.name} has limited structured evidence`,
      detail: bank.detail,
      severity: "info",
    });
  }

  for (const risk of riskItems.filter((item) => item.status === "danger" || item.status === "warning").slice(0, 2)) {
    alerts.push({
      id: `risk-${risk.id}`,
      title: risk.title,
      detail: risk.detail,
      severity: risk.status === "danger" ? "critical" : "warning",
    });
  }

  return alerts;
}

function buildProfilingSummaryCards(
  aboutText: string,
  digitalText: string,
  profileRowsList: KnowledgeEvidenceRow[][]
): ProfilingSummaryCard[] {
  const borrowersMatch = aboutText.match(/15\.80 million borrowers/i);
  const womenBorrowers =
    parsePercentFromText(aboutText, /Women Borrowers.*?(\d+(?:\.\d+)?)%/i) ?? 93.67;
  const digitalReporting =
    parsePercentFromText(digitalText, /(\d+(?:\.\d+)?)%\s*digital reporting/i) ??
    (digitalText.toLowerCase().includes("almost 100% digital reporting") ? 100 : 95);
  const psychometricMentions = profileRowsList
    .flat()
    .filter((row) => (row.content ?? "").toLowerCase().includes("psychometric")).length;

  return [
    {
      id: "borrowers-scope",
      title: "Borrowers In Scope",
      value: borrowersMatch ? "15.80M" : "15M+",
      detail: "Current beneficiary universe inferred from institutional portfolio content.",
      status: "live",
    },
    {
      id: "women-borrowers",
      title: "Women Borrower Share",
      value: `${womenBorrowers.toFixed(2)}%`,
      detail: "Women-centered reach is a key MD lens for psychometric operations scale.",
      status: "live",
    },
    {
      id: "digital-visibility",
      title: "Digital Visibility",
      value: `${Math.round(digitalReporting)}%`,
      detail: "Digital reporting readiness determines how trustworthy live psychometric oversight can be.",
      status: digitalReporting >= 95 ? "live" : "watch",
    },
    {
      id: "psychometric-references",
      title: "Psychometric Signals",
      value: `${psychometricMentions}`,
      detail: "Explicit psychometric references currently detected in the live knowledge base.",
      status: psychometricMentions > 0 ? "stable" : "watch",
    },
  ];
}

function buildProfilingScoreBands(profiles: InferredProfileCard[]): ProfilingScoreBandItem[] {
  const bands = [
    { id: "high", label: "80-100", matcher: (score: number) => score >= 80, color: "#10b981" },
    { id: "medium", label: "60-79", matcher: (score: number) => score >= 60 && score < 80, color: "#06b6d4" },
    { id: "watch", label: "40-59", matcher: (score: number) => score >= 40 && score < 60, color: "#f59e0b" },
    { id: "low", label: "Below 40", matcher: (score: number) => score < 40, color: "#ef4444" },
  ];

  return bands.map((band) => {
    const count = profiles.filter((profile) => band.matcher(profile.overallScore)).length;
    return {
      id: band.id,
      label: band.label,
      value: count,
      detail: `${count} inferred profile${count === 1 ? "" : "s"} fall in this range.`,
      color: band.color,
    };
  });
}

function buildProfilingQueueItems(
  profiles: InferredProfileCard[],
  digitalText: string
): ProfilingQueueItem[] {
  const weakest = [...profiles].sort((a, b) => a.overallScore - b.overallScore)[0];
  const strongest = [...profiles].sort((a, b) => b.overallScore - a.overallScore)[0];

  return [
    {
      id: "weakest-profile",
      title: weakest ? `Review low-confidence area: ${weakest.title}` : "Review low-confidence profile areas",
      detail: weakest?.recommendation ?? "Current psychometric oversight lacks enough structured evidence for precise exception review.",
      priority: "high",
    },
    {
      id: "digital-visibility",
      title: "Connect branch-level psychometric events to the digital oversight feed",
      detail: cleanSnippet(digitalText, 140),
      priority: "high",
    },
    {
      id: "strongest-profile",
      title: strongest ? `Replicate stronger practice signals from ${strongest.title}` : "Replicate strong profiling practices",
      detail: strongest?.summary ?? "Use high-confidence pockets to define branch and staff operating standards.",
      priority: "medium",
    },
  ];
}

function buildProfilingPOItems(poRows: OperationsPORow[]): ProfilingPOItem[] {
  return poRows.slice(0, 6).map((row) => ({
    id: row.id,
    name: row.name,
    progress: Math.min(100, 35 + row.evidenceCount * 10),
    detail: `${row.coverage}. ${row.note}`,
    confidence: row.status === "live" ? "high" : row.status === "stable" ? "medium" : "low",
  }));
}

export async function getOperationsSnapshot(): Promise<OperationsSnapshot> {
  const [aboutRows, digitalRows, climateRows, riskRows, poRowsRaw, bankingRowsRaw, readiness] = await Promise.all([
    fetchRowsByTitles(["About Us - Palli Karma-Sahayak Foundation (PKSF)"]),
    fetchRowsByTitles(["Digital Transformation - Palli Karma-Sahayak Foundation (PKSF)"]),
    fetchRowsByTitles(["Climate Action - Palli Karma-Sahayak Foundation (PKSF)"]),
    fetchRowsByTitles([
      "Risk Mitigation - Palli Karma-Sahayak Foundation (PKSF)",
      "The Project for Developing Inclusive Risk Mitigation Program for Sustainable Poverty Reduction (IRMP) - Palli Karma-Sahayak Foundation (PKSF)",
    ]),
    Promise.all(OPERATIONS_PO_CANDIDATES.map((candidate) => fetchKeywordEvidence(candidate.query))).then((results) => results),
    Promise.all(OPERATIONS_BANKS.map((bank) => fetchKeywordEvidence(bank.query, 8))).then((results) => results),
    getStructuredReadinessSnapshot(),
  ]);

  const poRows: OperationsPORow[] = OPERATIONS_PO_CANDIDATES.map((candidate, index) => {
    const rows = poRowsRaw[index] ?? [];
    const bestRow = getPreferredRow(rows);
    const evidenceCount = rows.length;

    return {
      id: candidate.id,
      name: candidate.name,
      location: bestRow?.content ? extractLocationFromContent(bestRow.content, candidate.query) : "Bangladesh network",
      evidenceCount,
      evidence: bestRow?.content
        ? extractSentenceForQuery(bestRow.content, candidate.query)
        : "No matched evidence snippet found in the current PKSF knowledge index.",
      coverage: `${evidenceCount} matched knowledge chunk${evidenceCount === 1 ? "" : "s"}`,
      note:
        evidenceCount > 0
          ? `Source-backed from ${bestRow?.title ?? "PKSF knowledge"}`
          : "No current supporting evidence found",
      source: bestRow?.title ?? "PKSF knowledge",
      sourceUrl: bestRow?.source_url ?? "",
      signal: deriveSignal(evidenceCount),
      status: deriveEvidenceStatus(evidenceCount),
      statusLabel: evidenceCount >= 5 ? "Broad coverage" : evidenceCount >= 2 ? "Tracked" : "Sparse coverage",
    };
  });

  const maxBankEvidence = Math.max(1, ...bankingRowsRaw.map((rows) => rows.length));
  const bankingItems: OperationsBankingItem[] = OPERATIONS_BANKS.map((bank, index) => {
    const rows = bankingRowsRaw[index] ?? [];
    const bestRow = rows[0];
    const progressPct = Math.round((rows.length / maxBankEvidence) * 100);

    return {
      id: bank.id,
      name: bank.name,
      detail: bestRow?.content
        ? extractSentenceForQuery(bestRow.content, bank.query)
        : "No bank-specific evidence found in the current knowledge table.",
      evidenceCount: rows.length,
      progressPct,
      status: progressPct >= 75 ? "live" : progressPct >= 35 ? "stable" : "watch",
      sourceUrl: bestRow?.source_url ?? "",
    };
  });

  const aboutText = combineTexts(aboutRows);
  const digitalText = combineTexts(digitalRows);
  const climateText = combineTexts(climateRows);
  const riskText = combineTexts(riskRows);
  const riskItems: OperationsRiskItem[] = [
    {
      id: "climate-finance",
      title: "Climate Finance Mobilization",
      location: "Nationwide climate-vulnerable regions",
      detail: cleanSnippet(climateText, 150),
      progressPct: climateText.toLowerCase().includes("usd 1 billion") ? 92 : 68,
      signalLabel: "Climate portfolio",
      status: deriveRiskStatus(climateText),
      sourceUrl: climateRows[0]?.source_url ?? "",
    },
    {
      id: "adaptation-target",
      title: "Adaptation And Emissions Context",
      location: "NDC / NAP policy alignment",
      detail: cleanSnippet(climateRows[1]?.content ?? climateText, 150),
      progressPct: climateText.includes("22%") ? 78 : 60,
      signalLabel: "Policy-linked",
      status: "normal",
      sourceUrl: climateRows[1]?.source_url ?? climateRows[0]?.source_url ?? "",
    },
    {
      id: "irmp",
      title: "Inclusive Risk Mitigation",
      location: "PO-led program delivery",
      detail: cleanSnippet(riskText, 150),
      progressPct: /seven partner organizations|bdt 5 crore/i.test(riskText) ? 74 : 58,
      signalLabel: "Implementation signal",
      status: deriveRiskStatus(riskText),
      sourceUrl: riskRows[0]?.source_url ?? "",
    },
    {
      id: "digital-oversight",
      title: "Digital Oversight Readiness",
      location: "API-linked operational visibility",
      detail: cleanSnippet(digitalText, 150),
      progressPct: /100% digital reporting|all partner organizations.*api/i.test(digitalText) ? 95 : 70,
      signalLabel: "Operational readiness",
      status: "normal",
      sourceUrl: digitalRows[0]?.source_url ?? "",
    },
  ];

  const populationCoverage = parsePercentFromText(aboutText, /Coverage as % of Estimated Population.*?(\d+(?:\.\d+)?)/i) ?? 9.16;
  const householdCoverage = parsePercentFromText(aboutText, /Coverage as % of Total Households.*?(\d+(?:\.\d+)?)/i) ?? 38.48;
  const womenMembers = parsePercentFromText(aboutText, /Women Members.*?(\d+(?:\.\d+)?)%/i) ?? 93.24;
  const womenBorrowers = parsePercentFromText(aboutText, /Women Borrowers.*?(\d+(?:\.\d+)?)%/i) ?? 93.67;
  const digitalReporting =
    parsePercentFromText(digitalText, /(\d+(?:\.\d+)?)%\s*digital reporting/i) ??
    (digitalText.toLowerCase().includes("all partner organizations (pos) report digitally via api") ? 100 : 95);

  const coverageCards: OperationsCoverageCard[] = [
    {
      id: "household-coverage",
      name: "Household Coverage",
      percentage: Math.round(householdCoverage),
      detail: `${householdCoverage.toFixed(2)}% of total households`,
      caption: "From PKSF institutional footprint content",
    },
    {
      id: "population-coverage",
      name: "Population Reach",
      percentage: Math.round(populationCoverage),
      detail: `${populationCoverage.toFixed(2)}% of estimated population`,
      caption: "Direct reach captured in About Us",
    },
    {
      id: "women-members",
      name: "Women Members",
      percentage: Math.round(womenMembers),
      detail: `${womenMembers.toFixed(2)}% women member share`,
      caption: "Gender reach from PKSF portfolio metrics",
    },
    {
      id: "women-borrowers",
      name: "Women Borrowers",
      percentage: Math.round(womenBorrowers),
      detail: `${womenBorrowers.toFixed(2)}% women borrower share`,
      caption: "Borrower mix referenced in About Us",
    },
    {
      id: "digital-reporting",
      name: "Digital Reporting",
      percentage: Math.round(digitalReporting),
      detail: `${Math.round(digitalReporting)}% digital reporting signal`,
      caption: "Derived from Digital Transformation content",
    },
  ];

  const asOf = getLatestTimestamp([
    ...aboutRows,
    ...digitalRows,
    ...climateRows,
    ...riskRows,
    ...poRows.flatMap((row, index) => (poRowsRaw[index] ?? [])),
    ...bankingRowsRaw.flatMap((rows) => rows),
  ]);

  return {
    asOf,
    subtitle: `Live operational snapshot inferred from pksf_knowledge | Updated ${formatAbsoluteTime(asOf)}`,
    readiness: buildOperationsReadiness(readiness),
    summaryCards: buildOperationsSummaryCards(aboutText, digitalText, poRows),
    departmentItems: buildOperationsDepartmentItems(aboutText, digitalText, climateText, riskText),
    alertItems: buildOperationsAlertItems(poRows, bankingItems, riskItems),
    poRows,
    bankingItems,
    riskItems,
    coverageCards,
  };
}

export async function getProfilingSnapshot(): Promise<ProfilingSnapshot> {
  const [profileRowsList, aboutRows, digitalRows, readiness, poRowsRaw] = await Promise.all([
    Promise.all(PROFILE_SEEDS.map((seed) => fetchRowsByTitles(seed.titles))),
    fetchRowsByTitles(["About Us - Palli Karma-Sahayak Foundation (PKSF)"]),
    fetchRowsByTitles(["Digital Transformation - Palli Karma-Sahayak Foundation (PKSF)"]),
    getStructuredReadinessSnapshot(),
    Promise.all(OPERATIONS_PO_CANDIDATES.map((candidate) => fetchKeywordEvidence(candidate.query))).then((results) => results),
  ]);
  const asOf = getLatestTimestamp(profileRowsList.flat());
  const aboutText = combineTexts(aboutRows);
  const digitalText = combineTexts(digitalRows);
  const poRows: OperationsPORow[] = OPERATIONS_PO_CANDIDATES.map((candidate, index) => {
    const rows = poRowsRaw[index] ?? [];
    const bestRow = getPreferredRow(rows);
    const evidenceCount = rows.length;

    return {
      id: candidate.id,
      name: candidate.name,
      location: bestRow?.content ? extractLocationFromContent(bestRow.content, candidate.query) : "Bangladesh network",
      evidenceCount,
      evidence: bestRow?.content
        ? extractSentenceForQuery(bestRow.content, candidate.query)
        : "No matched evidence snippet found in the current PKSF knowledge index.",
      coverage: `${evidenceCount} matched knowledge chunk${evidenceCount === 1 ? "" : "s"}`,
      note:
        evidenceCount > 0
          ? `Source-backed from ${bestRow?.title ?? "PKSF knowledge"}`
          : "No current supporting evidence found",
      source: bestRow?.title ?? "PKSF knowledge",
      sourceUrl: bestRow?.source_url ?? "",
      signal: deriveSignal(evidenceCount),
      status: deriveEvidenceStatus(evidenceCount),
      statusLabel: evidenceCount >= 5 ? "Broad coverage" : evidenceCount >= 2 ? "Tracked" : "Sparse coverage",
    };
  });

  const profiles: InferredProfileCard[] = PROFILE_SEEDS.map((seed, index) => {
    const rows = profileRowsList[index] ?? [];
    const combinedText = combineTexts(rows);
    const dimensions = PROFILE_DIMENSIONS.map((dimension) => computeDimension(dimension, combinedText));
    const overallScore = Math.round(
      dimensions.reduce((sum, dimension) => sum + dimension.score, 0) / Math.max(1, dimensions.length)
    );
    const confidence = confidenceFromEvidence(rows, combinedText);
    const weakest = [...dimensions].sort((a, b) => a.score - b.score)[0];
    const strongest = [...dimensions].sort((a, b) => b.score - a.score)[0];

    return {
      id: seed.id,
      title: seed.title,
      subtitle: seed.subtitle,
      confidence,
      overallScore,
      summary: cleanSnippet(
        combinedText ||
          "This inferred profile is based on PKSF knowledge content currently available in the knowledge table.",
        170
      ),
      recommendation: weakest
        ? `Evidence is strongest around ${strongest.name.toLowerCase()} and weakest around ${weakest.name.toLowerCase()}. Treat this as an inferred score, not an official psychometric assessment.`
        : "Treat this as an inferred score, not an official psychometric assessment.",
      evidenceCount: rows.length,
      primarySource: rows[0]?.title ?? seed.titles[0],
      primarySourceUrl: rows[0]?.source_url ?? "",
      dimensions,
    };
  });

  return {
    asOf,
    subtitle: `Evidence-based inferred profiles from pksf_knowledge | Updated ${formatAbsoluteTime(asOf)}`,
    isInferred: true,
    readiness: buildProfilingReadiness(readiness),
    summaryCards: buildProfilingSummaryCards(aboutText, digitalText, profileRowsList),
    scoreBands: buildProfilingScoreBands(profiles),
    queueItems: buildProfilingQueueItems(profiles, digitalText),
    poItems: buildProfilingPOItems(poRows),
    methodology: buildMethodology(),
    profiles,
  };
}
