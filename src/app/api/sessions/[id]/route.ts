import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// GET /api/sessions/[id] — get a session with its messages
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const [sessionRes, messagesRes] = await Promise.all([
      supabaseAdmin
        .from("chat_sessions")
        .select("id, title, color, created_at, updated_at")
        .eq("id", id)
        .single(),
      supabaseAdmin
        .from("chat_messages")
        .select(
          "id, session_id, role, content, brief_title, brief_html, discrepancies_title, discrepancies_html, recommendations_title, recommendations_html, created_at"
        )
        .eq("session_id", id)
        .order("created_at", { ascending: true }),
    ]);

    if (sessionRes.error) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json({
      session: sessionRes.data,
      messages: messagesRes.data ?? [],
    });
  } catch (error) {
    console.error("Session GET error:", error);
    return NextResponse.json({ error: "Failed to fetch session" }, { status: 500 });
  }
}

// PATCH /api/sessions/[id] — rename a session
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { title } = await req.json();

    if (!title?.trim()) {
      return NextResponse.json({ error: "Title required" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("chat_sessions")
      .update({ title: title.trim() })
      .eq("id", id)
      .select("id, title, color, created_at, updated_at")
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Session PATCH error:", error);
    return NextResponse.json({ error: "Failed to rename session" }, { status: 500 });
  }
}

// DELETE /api/sessions/[id] — delete a session and all its messages (cascade)
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { error } = await supabaseAdmin
      .from("chat_sessions")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Session DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete session" }, { status: 500 });
  }
}
