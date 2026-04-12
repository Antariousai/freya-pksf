export interface Attachment {
  name: string;
  type: string;       // MIME type
  previewUrl?: string; // object URL for image thumbnails
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  attachments?: Attachment[];
  // Structured output from Freya (assistant only)
  brief?: { title: string; html: string } | null;
  discrepancies?: { title: string; html: string } | null;
  recommendations?: { title: string; html: string } | null;
}

export interface OutputTab {
  title: string;
  html: string;
  timestamp: Date;
}

/** Live session record from Supabase */
export interface ChatSession {
  id: string;
  title: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface FreyaResponse {
  answer: string;
  brief: { title: string; html: string } | null;
  discrepancies: { title: string; html: string } | null;
  recommendations: { title: string; html: string } | null;
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
