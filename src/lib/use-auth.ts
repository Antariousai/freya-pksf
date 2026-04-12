"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "./supabase";

export function useRequireAuth() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    // Get the initial session
    supabase.auth.getSession().then(({ data }) => {
      const ok = !!data.session;
      setAuthed(ok);
      setChecked(true);
      if (!ok) router.replace("/login");
    });

    // Listen for auth state changes (login / logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const ok = !!session;
      setAuthed(ok);
      setChecked(true);
      if (!ok) router.replace("/login");
    });

    return () => listener.subscription.unsubscribe();
  }, [router]);

  return { checked, authed };
}
