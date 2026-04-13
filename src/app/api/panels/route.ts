import { NextRequest, NextResponse } from "next/server";
import { generatePanels } from "@/lib/freya-agent";
import { requireAuth } from "@/lib/auth-server";

export const maxDuration = 120;

export async function POST(req: NextRequest) {
  const auth = await requireAuth(req);
  if (!auth.ok) return auth.response;

  try {
    const { userQuery, answer } = await req.json() as { userQuery: string; answer: string };

    if (!userQuery || !answer) {
      return NextResponse.json({ panels: [] });
    }

    const panels = await generatePanels(userQuery, answer, "");
    return NextResponse.json({ panels });
  } catch (error) {
    console.error("Panels API error:", error);
    return NextResponse.json({ panels: [] });
  }
}
