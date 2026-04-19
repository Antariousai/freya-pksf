export interface Attachment {
  name: string;
  type: string;       // MIME type
  previewUrl?: string; // object URL for image thumbnails
}

/** A single structured output panel produced by Freya */
export interface OutputPanel {
  id?: string;     // unique tab identifier — assigned client-side; undefined on raw server response
  type: string;    // e.g. "brief" | "summary" | "discrepancies" | "recommendations" | "risk_analysis" | ...
  label: string;   // display name shown in the tab
  title: string;   // card heading
  content: string;  // Markdown text — rendered in the UI and used to generate .docx
  timestamp?: Date; // added client-side after API response; optional so FreyaResponse panels typecheck
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  attachments?: Attachment[];
  panels?: OutputPanel[];   // structured output from Freya (assistant only)
}

/** Live session record from Supabase */
export interface ChatSession {
  id: string;
  title: string;
  color: string;
  persona: string;   // persona id — e.g. "analyst" | "project_manager" | "risk_officer" etc.
  created_at: string;
  updated_at: string;
}

export interface FreyaResponse {
  answer: string;
  panels?: OutputPanel[];
  /** When true the panels come from history — they go to archive, not active tabs */
  isHistory?: boolean;
}

export interface POProfile {
  id: string;
  name: string;
  tier: "A" | "B" | "C" | "D";
  recoveryRate: number;
  par30: number;
  compliance: number;
  members: number;
  outstanding: number;
  trend: "up" | "down" | "stable";
  alert?: string;
}

export interface BankUtilization {
  name: string;
  allocated: number;
  utilized: number;
  percentage: number;
}

export interface RiverStation {
  name: string;
  location: string;
  currentLevel: number;
  dangerLevel: number;
  warningLevel: number;
  status: "normal" | "warning" | "danger" | "critical";
}

export interface Project {
  id: string;
  name: string;
  funder: string;
  amount: string;
  burnRate: number;
  status: "on-track" | "at-risk" | "closing" | "critical";
  dueIn?: string;
}

export interface DashboardMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "stable";
}

export interface DashboardDistributionItem {
  name: string;
  value: number;
  count: number;
  color: string;
}

export interface DashboardLatestItem {
  id: string;
  severity: "critical" | "warning" | "info";
  title: string;
  detail: string;
  time: string;
  sourceUrl: string;
  docType: string;
  createdAt: string;
}

export interface DashboardFeaturedItem {
  id: string;
  title: string;
  source: string;
  badgeLabel: string;
  status: "live" | "watch" | "stable";
  progressPct: number;
  progressLabel: string;
  snippet: string;
  sourceUrl: string;
}

export interface DashboardBriefing {
  headline: string;
  summary: string;
}

export interface DashboardExecutiveCard {
  id: string;
  title: string;
  value: string;
  detail: string;
  status: "live" | "watch" | "stable";
}

export interface DashboardActionItem {
  id: string;
  title: string;
  detail: string;
  priority: "high" | "medium" | "low";
}

export interface DataReadinessItem {
  id: string;
  title: string;
  status: "live" | "watch" | "stable";
  detail: string;
}

export interface DashboardSnapshot {
  asOf: string;
  subtitle: string;
  briefing: DashboardBriefing;
  kpis: DashboardMetric[];
  executiveCards: DashboardExecutiveCard[];
  actionItems: DashboardActionItem[];
  readiness: DataReadinessItem[];
  distribution: DashboardDistributionItem[];
  latestItems: DashboardLatestItem[];
  featuredItems: DashboardFeaturedItem[];
}

export interface OperationsPORow {
  id: string;
  name: string;
  location: string;
  evidenceCount: number;
  evidence: string;
  coverage: string;
  note: string;
  source: string;
  sourceUrl: string;
  signal: "up" | "down" | "stable";
  status: "live" | "watch" | "stable";
  statusLabel?: string;
}

export interface OperationsBankingItem {
  id: string;
  name: string;
  detail: string;
  evidenceCount: number;
  progressPct: number;
  status: "live" | "watch" | "stable";
  sourceUrl: string;
}

export interface OperationsRiskItem {
  id: string;
  title: string;
  location: string;
  detail: string;
  progressPct: number;
  signalLabel: string;
  status: "normal" | "warning" | "danger" | "critical";
  sourceUrl: string;
}

export interface OperationsCoverageCard {
  id: string;
  name: string;
  percentage: number;
  detail: string;
  caption: string;
}

export interface OperationsSummaryCard {
  id: string;
  title: string;
  value: string;
  detail: string;
  status: "live" | "watch" | "stable";
}

export interface OperationsDepartmentItem {
  id: string;
  name: string;
  focus: string;
  status: "live" | "watch" | "stable";
  detail: string;
}

export interface OperationsAlertItem {
  id: string;
  title: string;
  detail: string;
  severity: "critical" | "warning" | "info";
}

export interface OperationsSnapshot {
  asOf: string;
  subtitle: string;
  readiness: DataReadinessItem[];
  summaryCards: OperationsSummaryCard[];
  departmentItems: OperationsDepartmentItem[];
  alertItems: OperationsAlertItem[];
  poRows: OperationsPORow[];
  bankingItems: OperationsBankingItem[];
  riskItems: OperationsRiskItem[];
  coverageCards: OperationsCoverageCard[];
}

export interface InferredProfileDimension {
  name: string;
  score: number;
  max: number;
  evidence: string;
}

export interface InferredProfileCard {
  id: string;
  title: string;
  subtitle: string;
  confidence: "high" | "medium" | "low";
  overallScore: number;
  summary: string;
  recommendation: string;
  evidenceCount: number;
  primarySource: string;
  primarySourceUrl: string;
  dimensions: InferredProfileDimension[];
}

export interface ProfilingSummaryCard {
  id: string;
  title: string;
  value: string;
  detail: string;
  status: "live" | "watch" | "stable";
}

export interface ProfilingScoreBandItem {
  id: string;
  label: string;
  value: number;
  detail: string;
  color: string;
}

export interface ProfilingQueueItem {
  id: string;
  title: string;
  detail: string;
  priority: "high" | "medium" | "low";
}

export interface ProfilingPOItem {
  id: string;
  name: string;
  progress: number;
  detail: string;
  confidence: "high" | "medium" | "low";
}

export interface ProfilingSnapshot {
  asOf: string;
  subtitle: string;
  isInferred: true;
  readiness: DataReadinessItem[];
  summaryCards: ProfilingSummaryCard[];
  scoreBands: ProfilingScoreBandItem[];
  queueItems: ProfilingQueueItem[];
  poItems: ProfilingPOItem[];
  methodology: Array<{ label: string; desc: string }>;
  profiles: InferredProfileCard[];
}
