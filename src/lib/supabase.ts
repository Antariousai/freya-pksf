import { createClient } from "@supabase/supabase-js";

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseService = process.env.SUPABASE_SERVICE_KEY ?? supabaseAnon;

// Browser-safe client (anon key)
export const supabase = createClient(supabaseUrl, supabaseAnon);

// Server-side client (service key — bypasses RLS when needed)
export const supabaseAdmin = createClient(supabaseUrl, supabaseService, {
  auth: { persistSession: false },
});

// ── Types mirroring DB schema ───────────────────────────────
export interface KBDocument {
  id: string;
  title: string;
  category: string;
  content: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface DBSession {
  id: string;
  title: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface DBMessage {
  id: string;
  session_id: string;
  role: "user" | "assistant";
  content: string;
  brief_title?: string;
  brief_html?: string;
  discrepancies_title?: string;
  discrepancies_html?: string;
  recommendations_title?: string;
  recommendations_html?: string;
  created_at: string;
}
