import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { requireAuth } from "@/lib/auth-server";

const SESSION_COLORS = [
  "#06b6d4", "#7c3aed", "#10b981", "#f59e0b", "#3b82f6",
  "#ef4444", "#8b5cf6", "#14b8a6", "#f97316", "#6366f1",
];

// GET /api/sessions — list all sessions ordered by updated_at desc
export async function GET(req: NextRequest) {
  const auth = await requireAuth(req);
  if (!auth.ok) return auth.response;

  try {
    const { data, error } = await supabaseAdmin
      .from("chat_sessions")
      .select("id, title, color, persona, created_at, updated_at")
      .order("updated_at", { ascending: false })
      .limit(50);

    if (error) throw error;
    return NextResponse.json(data ?? []);
  } catch (error) {
    console.error("Sessions GET error:", error);
    return NextResponse.json([], { status: 500 });
  }
}

// POST /api/sessions — create a new session
export async function POST(req: NextRequest) {
  const auth = await requireAuth(req);
  if (!auth.ok) return auth.response;

  try {
    const body = await req.json().catch(() => ({}));
    const color = body.color ?? SESSION_COLORS[Math.floor(Math.random() * SESSION_COLORS.length)];
    const persona = body.persona ?? "assistant";

    const { data, error } = await supabaseAdmin
      .from("chat_sessions")
      .insert({ title: "New Session", color, persona })
      .select("id, title, color, persona, created_at, updated_at")
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Sessions POST error:", error);
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
  }
}
