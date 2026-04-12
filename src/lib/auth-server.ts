/**
 * Server-side auth helper.
 * Validates the Supabase JWT sent in the Authorization header.
 * Returns the user object on success, or a 401 NextResponse on failure.
 */
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "./supabase";

export type AuthResult =
  | { ok: true; userId: string }
  | { ok: false; response: NextResponse };

export async function requireAuth(req: NextRequest): Promise<AuthResult> {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  const token = authHeader.slice(7);
  const { data, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !data.user) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { ok: true, userId: data.user.id };
}
