"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, ArrowRight, Lock, Mail } from "lucide-react";
import { login } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { useTheme } from "@/lib/theme-context";

export default function LoginPage() {
  const router = useRouter();
  const { theme, toggle } = useTheme();
  const isLight = theme === "light";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/chat");
    });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: authError } = await login(email, password);
    if (authError) {
      setError("Invalid credentials. Please try again.");
      setLoading(false);
    } else {
      router.replace("/chat");
    }
  };

  const inputStyle = (focused?: boolean) => ({
    width: "100%",
    padding: "11px 12px 11px 40px",
    borderRadius: "10px",
    background: isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.05)",
    border: `1px solid ${focused ? "rgba(6,182,212,0.5)" : isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)"}`,
    color: "var(--text-primary)",
    fontSize: "14px",
    fontFamily: "var(--font-dm-sans), sans-serif",
    outline: "none",
    transition: "border-color 0.15s",
    boxSizing: "border-box" as const,
    boxShadow: focused ? "0 0 0 3px rgba(6,182,212,0.1)" : "none",
  });

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-0)",
        padding: "24px 16px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -60%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)",
          bottom: "0",
          right: "10%",
          pointerEvents: "none",
        }}
      />

      {/* Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: isLight ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.03)",
          border: `1px solid ${isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"}`,
          borderRadius: "20px",
          padding: "36px 32px 28px",
          backdropFilter: "blur(20px)",
          boxShadow: isLight
            ? "0 8px 40px rgba(0,0,0,0.08)"
            : "0 8px 40px rgba(0,0,0,0.4)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
          <Image
            src="/antarious-main.svg"
            alt="Antarious AI"
            width={160}
            height={38}
            style={{
              height: "38px",
              width: "auto",
              filter: isLight ? "none" : "invert(1) hue-rotate(180deg)",
            }}
            priority
            unoptimized
          />
        </div>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: isLight
                ? "linear-gradient(135deg, rgba(124,58,237,0.1), rgba(6,182,212,0.1))"
                : "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.15))",
              border: `1px solid ${isLight ? "rgba(6,182,212,0.35)" : "rgba(6,182,212,0.2)"}`,
              borderRadius: "100px",
              padding: "3px 12px",
              marginBottom: "12px",
            }}
          >
            <span
              style={{
                color: isLight ? "#0891b2" : "#22d3ee",
                fontSize: "9px",
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontWeight: 700,
                letterSpacing: "0.8px",
                textTransform: "uppercase",
              }}
            >
              PKSF Intelligence Platform
            </span>
          </div>
          <h1
            style={{
              color: "var(--text-primary)",
              fontSize: "22px",
              fontWeight: 700,
              margin: "0 0 6px",
              letterSpacing: "-0.3px",
            }}
          >
            Welcome to Freya
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "13px", margin: 0 }}>
            Sign in to access financial intelligence
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* Email */}
          <div style={{ position: "relative" }}>
            <Mail
              size={15}
              color="var(--text-muted)"
              style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              placeholder="Email address"
              required
              autoComplete="email"
              style={inputStyle()}
            />
          </div>

          {/* Password */}
          <div style={{ position: "relative" }}>
            <Lock
              size={15}
              color="var(--text-muted)"
              style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
            />
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              placeholder="Password"
              required
              autoComplete="current-password"
              style={{ ...inputStyle(), paddingRight: "40px" }}
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-muted)",
                display: "flex",
                padding: 0,
              }}
            >
              {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.2)",
                borderRadius: "8px",
                padding: "8px 12px",
                color: "#ef4444",
                fontSize: "12px",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              background: loading
                ? "rgba(6,182,212,0.4)"
                : "linear-gradient(135deg, #06b6d4, #0891b2)",
              border: "none",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "opacity 0.15s",
              marginTop: "2px",
              boxShadow: loading ? "none" : "0 4px 16px rgba(6,182,212,0.3)",
            }}
          >
            {loading ? "Signing in…" : (
              <>
                Sign in to Freya
                <ArrowRight size={15} strokeWidth={2.5} />
              </>
            )}
          </button>
        </form>

        {/* Theme toggle */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
          <button
            type="button"
            onClick={toggle}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-dim)",
              fontSize: "11px",
              fontFamily: "var(--font-jetbrains-mono), monospace",
            }}
          >
            Switch to {isLight ? "dark" : "light"} mode
          </button>
        </div>
      </div>
    </div>
  );
}
