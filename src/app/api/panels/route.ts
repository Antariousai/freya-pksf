import { NextRequest, NextResponse } from "next/server";
import { generatePanels } from "@/lib/freya-agent";
import { supabaseAdmin } from "@/lib/supabase";
import { requireAuth } from "@/lib/auth-server";

export const maxDuration = 120;

export async function POST(req: NextRequest) {
  const auth = await requireAuth(req);
  if (!auth.ok) return auth.response;

  try {
    const { userQuery, answer, messageId } = await req.json() as {
      userQuery: string;
      answer: string;
      messageId?: string | null;
    };

    if (!userQuery || !answer) {
      return NextResponse.json({ panels: [] });
    }

    const panels = await generatePanels(userQuery, answer, "");

    // Persist panels back to the assistant message row so they survive page refreshes
    if (messageId && panels.length > 0) {
      await supabaseAdmin
        .from("chat_messages")
        .update({ output_panels: panels })
        .eq("id", messageId);
    }

    return NextResponse.json({ panels });
  } catch (error) {
    console.error("Panels API error:", error);
    return NextResponse.json({ panels: [] });
  }
}
