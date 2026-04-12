/**
 * POST /api/kb/seed
 * Seeds the PKSF knowledge base into Supabase.
 * Protected by a SEED_SECRET env var — call once after DB setup.
 * Usage: POST /api/kb/seed  { "secret": "your-seed-secret" }
 */

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { PKSF_KNOWLEDGE_BASE } from "@/lib/pksf-knowledge-base";

export async function POST(req: NextRequest) {
  try {
    const { secret } = await req.json().catch(() => ({}));

    // Basic protection — set SEED_SECRET in .env.local
    const expected = process.env.SEED_SECRET ?? "pksf-freya-seed-2025";
    if (secret !== expected) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Clear existing documents
    await supabaseAdmin.from("kb_documents").delete().neq("id", "00000000-0000-0000-0000-000000000000");

    // Insert all chunks
    const rows = PKSF_KNOWLEDGE_BASE.map((chunk) => ({
      title: chunk.title,
      category: chunk.category,
      content: chunk.content,
      metadata: chunk.metadata ?? {},
    }));

    const { data, error } = await supabaseAdmin
      .from("kb_documents")
      .insert(rows)
      .select("id, title, category");

    if (error) throw error;

    return NextResponse.json({
      success: true,
      seeded: data?.length ?? 0,
      documents: data?.map((d) => ({ id: d.id, title: d.title, category: d.category })),
    });
  } catch (error) {
    console.error("KB seed error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// GET /api/kb/seed — check how many documents are in the KB
export async function GET() {
  const { count } = await supabaseAdmin
    .from("kb_documents")
    .select("*", { count: "exact", head: true });

  return NextResponse.json({ document_count: count ?? 0 });
}
