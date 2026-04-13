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
  html: string;
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

export interface DashboardSnapshot {
  asOf: string;
  subtitle: string;
  kpis: DashboardMetric[];
  distribution: DashboardDistributionItem[];
  latestItems: DashboardLatestItem[];
  featuredItems: DashboardFeaturedItem[];
}
