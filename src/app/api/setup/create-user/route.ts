import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

/**
 * One-time protected endpoint to create the default Freya admin user in Supabase Auth.
 *
 * Usage (run once after deployment):
 *   POST /api/setup/create-user
 *   Body: { "secret": "<SETUP_SECRET>" }
 *
 * Set SETUP_SECRET in your environment variables (never commit it to source).
 * The user email and password are stored only in your Supabase project — never in code.
 */
export async function POST(req: Request) {
  const setupSecret = process.env.SETUP_SECRET;
  if (!setupSecret) {
    return NextResponse.json({ error: "SETUP_SECRET not configured" }, { status: 500 });
  }

  const body = await req.json().catch(() => ({}));
  if (body.secret !== setupSecret) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    return NextResponse.json(
      { error: "ADMIN_EMAIL and ADMIN_PASSWORD must be set in environment variables" },
      { status: 500 }
    );
  }

  // Check if user already exists
  const { data: existing } = await supabaseAdmin.auth.admin.listUsers();
  const alreadyExists = existing?.users?.some((u) => u.email === email);
  if (alreadyExists) {
    return NextResponse.json({ message: "User already exists", email });
  }

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // skip the email confirmation step
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: "User created successfully", id: data.user.id, email: data.user.email });
}
