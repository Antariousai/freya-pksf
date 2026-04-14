/**
 * Auth-aware fetch wrapper for client components.
 * Automatically attaches the Supabase session JWT as a Bearer token
 * so API routes can verify the caller is authenticated.
 */
import { supabase } from "./supabase";

async function getAuthHeaders(): Promise<HeadersInit> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const authHeaders = await getAuthHeaders();
  const method = (options.method ?? "GET").toUpperCase();

  return fetch(url, {
    ...options,
    cache: options.cache ?? (method === "GET" ? "no-store" : undefined),
    headers: {
      ...authHeaders,
      ...(options.headers ?? {}),
    },
  });
}
