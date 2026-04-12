import { NextRequest, NextResponse } from "next/server";
import { runFreyaAgent } from "@/lib/freya-agent";
import type { FileAttachment } from "@/lib/freya-agent";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
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

    const freya = await runFreyaAgent(messages, attachments, fileNames);

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

      // Save assistant message — panels stored as JSONB (type, label, title, html only — no timestamp)
      const panelsToSave = (freya.panels ?? []).map(({ type, label, title, html }) => ({
        type, label, title, html,
      }));

      await supabaseAdmin.from("chat_messages").insert({
        session_id: sessionId,
        role: "assistant",
        content: freya.answer,
        output_panels: panelsToSave.length > 0 ? panelsToSave : null,
      });

      // Auto-title session from first user message
      const { data: session } = await supabaseAdmin
        .from("chat_sessions")
        .select("title")
        .eq("id", sessionId)
        .single();

      if (session?.title === "New Session" && lastUserMsg) {
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
