import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-server";
import { getProfilingSnapshot } from "@/lib/dashboard-data";

export async function GET(req: NextRequest) {
  const auth = await requireAuth(req);
  if (!auth.ok) return auth.response;

  try {
    const snapshot = await getProfilingSnapshot();
    return NextResponse.json(snapshot);
  } catch (error) {
    console.error("Profiling GET error:", error);
    return NextResponse.json({ error: "Failed to load profiling data" }, { status: 500 });
  }
}
