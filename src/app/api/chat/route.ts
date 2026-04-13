import { NextRequest, NextResponse } from "next/server";
import { runFreyaAgentAnswer } from "@/lib/freya-agent";
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

    // Single query: fetch persona, title, and the most recent DB message to detect duplicates
    let personaId = "assistant";
    let sessionTitle: string | null = null;
    let lastDbContent: string | null = null;

    if (sessionId) {
      const [sessionRes, lastMsgRes] = await Promise.all([
        supabaseAdmin
          .from("chat_sessions")
          .select("persona, title")
          .eq("id", sessionId)
          .single(),
        supabaseAdmin
          .from("chat_messages")
          .select("content, role")
          .eq("session_id", sessionId)
          .order("created_at", { ascending: false })
          .limit(1)
          .single(),
      ]);

      if (sessionRes.data) {
        personaId = sessionRes.data.persona ?? "assistant";
        sessionTitle = sessionRes.data.title;
      }
      if (lastMsgRes.data?.role === "user") {
        lastDbContent = lastMsgRes.data.content;
      }
    }

    // The new user message is always the last item in the array
    const newUserMsg = messages[messages.length - 1];
    const isNewUserMsg = newUserMsg?.role === "user";

    // Detect duplicate: if the exact same user message is already the latest DB row,
    // the client sent history that included an already-saved message — skip saving it
    const isDuplicate = isNewUserMsg && lastDbContent === newUserMsg.content;

    const result = await runFreyaAgentAnswer(messages, attachments, fileNames, personaId);
    const answer = result.answer;

    // Persist to Supabase — only if NOT a duplicate
    let assistantMessageId: string | null = null;

    if (sessionId && !isDuplicate) {
      if (isNewUserMsg) {
        await supabaseAdmin.from("chat_messages").insert({
          session_id: sessionId,
          role: "user",
          content: newUserMsg.content,
        });
      }

      // Save assistant message and capture the generated ID so panels can be attached later
      const { data: assistantRow } = await supabaseAdmin
        .from("chat_messages")
        .insert({
          session_id: sessionId,
          role: "assistant",
          content: answer,
          output_panels: null,
        })
        .select("id")
        .single();

      assistantMessageId = assistantRow?.id ?? null;

      // Auto-title session from first user message
      if (sessionTitle === "New Session" && isNewUserMsg) {
        const titleText = newUserMsg.content.slice(0, 55).replace(/\n/g, " ");
        await supabaseAdmin
          .from("chat_sessions")
          .update({ title: titleText + (newUserMsg.content.length > 55 ? "…" : "") })
          .eq("id", sessionId);
      }
    }

    return NextResponse.json({ answer, messageId: assistantMessageId });
  } catch (error) {
    console.error("Freya API error:", error);
    return NextResponse.json(
      { answer: "I encountered an error. Please check the API configuration and try again." },
      { status: 500 }
    );
  }
}
