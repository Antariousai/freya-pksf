import { NextRequest, NextResponse } from "next/server";
import { runFreyaAgent } from "@/lib/freya-agent";
import type { FileAttachment } from "@/lib/freya-agent";
import { supabaseAdmin } from "@/lib/supabase";
import { requireAuth } from "@/lib/auth-server";

// Allow up to 5 minutes — needed for multi-step agentic tool-use loops
export const maxDuration = 300;

export async function POST(req: NextRequest) {
  const auth = await requireAuth(req);
  if (!auth.ok) return auth.response;

  try {
    const { messages, sessionId, attachments, fileNames } = await req.json() as {
      messages: { role: "user" | "assistant"; content: string }[];
      sessionId?: string;
      attachments?: FileAttachment[];
      fileNames?: string[];
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    // Single query: fetch both persona and title to avoid two round trips
    let personaId = "assistant";
    let sessionTitle: string | null = null;

    if (sessionId) {
      const { data: sessionRow } = await supabaseAdmin
        .from("chat_sessions")
        .select("persona, title")
        .eq("id", sessionId)
        .single();

      if (sessionRow) {
        personaId = sessionRow.persona ?? "assistant";
        sessionTitle = sessionRow.title;
      }
    }

    const freya = await runFreyaAgent(messages, attachments, fileNames, personaId);

    // Persist to Supabase if sessionId provided
    if (sessionId) {
      const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");

      if (lastUserMsg) {
        await supabaseAdmin.from("chat_messages").insert({
          session_id: sessionId,
          role: "user",
          content: lastUserMsg.content,
        });
      }

      // Save assistant message — panels stored as JSONB
      const panelsToSave = (freya.panels ?? []).map(({ type, label, title, html }) => ({
        type, label, title, html,
      }));

      await supabaseAdmin.from("chat_messages").insert({
        session_id: sessionId,
        role: "assistant",
        content: freya.answer,
        output_panels: panelsToSave.length > 0 ? panelsToSave : null,
      });

      // Auto-title session from first user message (uses already-fetched title)
      if (sessionTitle === "New Session" && lastUserMsg) {
        const titleText = lastUserMsg.content.slice(0, 55).replace(/\n/g, " ");
        await supabaseAdmin
          .from("chat_sessions")
          .update({ title: titleText + (lastUserMsg.content.length > 55 ? "…" : "") })
          .eq("id", sessionId);
      }
    }

    return NextResponse.json(freya);
  } catch (error) {
    console.error("Freya API error:", error);
    return NextResponse.json(
      { answer: "I encountered an error. Please check the API configuration and try again.", panels: [] },
      { status: 500 }
    );
  }
}
