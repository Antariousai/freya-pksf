import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-server";
import { getOperationsSnapshot } from "@/lib/dashboard-data";

export async function GET(req: NextRequest) {
  const auth = await requireAuth(req);
  if (!auth.ok) return auth.response;

  try {
    const snapshot = await getOperationsSnapshot();
    return NextResponse.json(snapshot);
  } catch (error) {
    console.error("Operations GET error:", error);
    return NextResponse.json({ error: "Failed to load operations data" }, { status: 500 });
  }
}
