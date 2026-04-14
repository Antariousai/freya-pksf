"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api-client";
import { useRequireAuth } from "@/lib/use-auth";
import TopBar from "@/components/layout/TopBar";
import LeftPanel from "@/components/layout/LeftPanel";
import GlassCard from "@/components/shared/GlassCard";
import StatusBadge from "@/components/shared/StatusBadge";
import type { InferredProfileCard, ProfilingSnapshot } from "@/lib/types";
import { Activity, BarChart3, Filter, ListChecks, RefreshCcw, Search, Users } from "lucide-react";

function InferredBadge() {
  return (
    <span
      style={{
        background: "rgba(6,182,212,0.12)",
        color: "#06b6d4",
        padding: "2px 8px",
        borderRadius: "4px",
        fontSize: "9px",
        fontFamily: "var(--font-jetbrains-mono), monospace",
        fontWeight: 700,
        border: "1px solid rgba(6,182,212,0.22)",
      }}
    >
      INFERRED
    </span>
  );
}

function ConfidenceBadge({ confidence }: { confidence: "high" | "medium" | "low" }) {
  const config = {
    high: { bg: "rgba(16,185,129,0.12)", color: "#10b981", label: "HIGH" },
    medium: { bg: "rgba(245,158,11,0.12)", color: "#f59e0b", label: "MED" },
    low: { bg: "rgba(239,68,68,0.12)", color: "#ef4444", label: "LOW" },
  }[confidence];

  return (
    <span
      style={{
        background: config.bg,
        color: config.color,
        padding: "2px 8px",
        borderRadius: "4px",
        fontSize: "9px",
        fontFamily: "var(--font-jetbrains-mono), monospace",
        fontWeight: 700,
        border: `1px solid ${config.color}22`,
      }}
    >
      {config.label}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: "high" | "medium" | "low" }) {
  const config = {
    high: { bg: "rgba(239,68,68,0.12)", color: "#ef4444" },
    medium: { bg: "rgba(245,158,11,0.12)", color: "#f59e0b" },
    low: { bg: "rgba(16,185,129,0.12)", color: "#10b981" },
  }[priority];

  return (
    <span
      style={{
        background: config.bg,
        color: config.color,
        padding: "2px 7px",
        borderRadius: "6px",
        fontSize: "9px",
        fontFamily: "var(--font-jetbrains-mono), monospace",
        fontWeight: 700,
        textTransform: "uppercase",
      }}
    >
      {priority}
    </span>
  );
}

function RadarChart({
  dimensions,
  color,
}: {
  dimensions: { name: string; score: number; max: number }[];
  color: string;
}) {
  const size = 150;
  const cx = size / 2;
  const cy = size / 2;
  const r = 58;
  const n = dimensions.length;
  const angleStep = (2 * Math.PI) / n;
  const startAngle = -Math.PI / 2;

  const polarToCart = (angle: number, radius: number) => ({
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  });

  const rings = [0.25, 0.5, 0.75, 1].map((fraction) => {
    const pts = dimensions.map((_, i) => {
      const angle = startAngle + i * angleStep;
      const pt = polarToCart(angle, r * fraction);
      return `${pt.x},${pt.y}`;
    });
    return pts.join(" ");
  });

  const points = dimensions.map((dimension, i) => {
    const angle = startAngle + i * angleStep;
    const radius = r * (dimension.score / dimension.max);
    return polarToCart(angle, radius);
  });
  const path = points.map((pt) => `${pt.x},${pt.y}`).join(" ");

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {rings.map((ring, i) => (
        <polygon key={i} points={ring} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={0.8} />
      ))}
      <polygon points={path} fill={`${color}1f`} stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
      {points.map((pt, i) => (
        <circle key={i} cx={pt.x} cy={pt.y} r={2.5} fill={color} />
      ))}
    </svg>
  );
}

function ControlButton({
  active,
  label,
  onClick,
}: {
  active?: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        borderRadius: "999px",
        border: `1px solid ${active ? "rgba(6,182,212,0.22)" : "rgba(255,255,255,0.08)"}`,
        background: active ? "rgba(6,182,212,0.12)" : "rgba(255,255,255,0.03)",
        color: active ? "#06b6d4" : "var(--text-secondary)",
        padding: "7px 10px",
        cursor: "pointer",
        fontSize: "11px",
        fontWeight: 600,
      }}
    >
      {label}
    </button>
  );
}

function ProfilingLoader({ message }: { message: string }) {
  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-0)",
        padding: "24px",
      }}
    >
      <GlassCard>
        <div style={{ width: "min(560px, calc(100vw - 48px))", padding: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "999px",
                background: "#a78bfa",
                boxShadow: "0 0 14px rgba(167,139,250,0.45)",
                animation: "pulse-green 1.2s ease-in-out infinite",
              }}
            />
            <span style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 700 }}>
              Loading Psychometric Intelligence
            </span>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "13px", marginBottom: "16px" }}>{message}</p>
          <div
            style={{
              height: "180px",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          />
        </div>
      </GlassCard>
    </div>
  );
}

const PROFILE_COLORS = ["#ef4444", "#10b981", "#f59e0b", "#06b6d4", "#a78bfa", "#14b8a6"];

function confidenceRank(value: "high" | "medium" | "low") {
  if (value === "high") return 3;
  if (value === "medium") return 2;
  return 1;
}

function formatAsOf(value?: string) {
  if (!value) return "--";
  return `${value.replace("T", " ").slice(0, 16)} UTC`;
}

export default function ProfilingPage() {
  const { checked, authed } = useRequireAuth();
  const [mobileLeftOpen, setMobileLeftOpen] = useState(false);
  const [profiling, setProfiling] = useState<ProfilingSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [view, setView] = useState<"overview" | "profiles" | "queue" | "network">("overview");
  const [confidenceFilter, setConfidenceFilter] = useState<"all" | "high" | "medium" | "low">("all");
  const [sortBy, setSortBy] = useState<"score" | "evidence" | "confidence">("score");
  const [search, setSearch] = useState("");
  const [networkConfidenceFilter, setNetworkConfidenceFilter] = useState<"all" | "high" | "medium" | "low">("all");
  const [networkSortBy, setNetworkSortBy] = useState<"progress" | "confidence" | "name">("progress");
  const [networkSearch, setNetworkSearch] = useState("");
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);

  const loadProfiling = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await apiFetch("/api/profiling");
      if (!res.ok) throw new Error("Failed to fetch profiling data");
      const data = (await res.json()) as ProfilingSnapshot;
      setProfiling(data);
    } catch (err) {
      console.error("Profiling load failed", err);
      setError("Profiling data could not be loaded from pksf_knowledge.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!checked || !authed) return;
    void loadProfiling();
  }, [checked, authed, loadProfiling]);

  const handleRefreshProfiling = useCallback(async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    try {
      await loadProfiling();
    } finally {
      setIsRefreshing(false);
    }
  }, [isRefreshing, loadProfiling]);

  const profiles = profiling?.profiles ?? [];

  const filteredProfiles = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const filtered = profiles.filter((profile) => {
      if (confidenceFilter !== "all" && profile.confidence !== confidenceFilter) return false;
      if (!normalizedSearch) return true;
      return (
        profile.title.toLowerCase().includes(normalizedSearch) ||
        profile.subtitle.toLowerCase().includes(normalizedSearch) ||
        profile.primarySource.toLowerCase().includes(normalizedSearch)
      );
    });

    const sorted = [...filtered];
    sorted.sort((a, b) => {
      if (sortBy === "evidence") return b.evidenceCount - a.evidenceCount;
      if (sortBy === "confidence") return confidenceRank(b.confidence) - confidenceRank(a.confidence);
      return b.overallScore - a.overallScore;
    });

    return sorted;
  }, [profiles, confidenceFilter, search, sortBy]);

  useEffect(() => {
    if (!filteredProfiles.length) {
      setSelectedProfileId(null);
      return;
    }
    const exists = filteredProfiles.some((profile) => profile.id === selectedProfileId);
    if (!exists) {
      setSelectedProfileId(filteredProfiles[0].id);
    }
  }, [filteredProfiles, selectedProfileId]);

  const selectedProfile: InferredProfileCard | null =
    filteredProfiles.find((profile) => profile.id === selectedProfileId) ?? filteredProfiles[0] ?? null;

  const filteredNetworkItems = useMemo(() => {
    const source = profiling?.poItems ?? [];
    const normalizedSearch = networkSearch.trim().toLowerCase();

    const filtered = source.filter((item) => {
      if (networkConfidenceFilter !== "all" && item.confidence !== networkConfidenceFilter) return false;
      if (!normalizedSearch) return true;
      return item.name.toLowerCase().includes(normalizedSearch) || item.detail.toLowerCase().includes(normalizedSearch);
    });

    const sorted = [...filtered];
    sorted.sort((a, b) => {
      if (networkSortBy === "name") return a.name.localeCompare(b.name);
      if (networkSortBy === "confidence") return confidenceRank(b.confidence) - confidenceRank(a.confidence);
      return b.progress - a.progress;
    });

    return sorted;
  }, [profiling?.poItems, networkSearch, networkConfidenceFilter, networkSortBy]);

  if (!checked) {
    return <ProfilingLoader message="Checking your session before loading inferred PKSF profiles." />;
  }

  if (!authed) return null;

  return (
    <div
      style={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "var(--bg-0)",
      }}
    >
      <TopBar onMenuToggle={() => setMobileLeftOpen((open) => !open)} />
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <LeftPanel mobileOpen={mobileLeftOpen} onMobileClose={() => setMobileLeftOpen(false)} />
        <main style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
          {loading && !profiling && !error && (
            <GlassCard className="mb-4">
              <div style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "999px",
                    background: "#a78bfa",
                    boxShadow: "0 0 12px rgba(167,139,250,0.35)",
                    animation: "pulse-green 1.2s ease-in-out infinite",
                    flexShrink: 0,
                  }}
                />
                <p style={{ color: "var(--text-muted)", fontSize: "12px" }}>
                  Building inferred profiles from pksf_knowledge...
                </p>
              </div>
            </GlassCard>
          )}

          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <span
                style={{
                  color: "var(--text-dim)",
                  fontSize: "9px",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontWeight: 600,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                }}
              >
                Behavioral Intelligence
              </span>
              <h1 style={{ color: "var(--text-primary)", fontSize: "20px", fontWeight: 700, marginTop: "2px" }}>
                PO Psychometric Profiling
              </h1>
              <p style={{ color: "var(--text-muted)", fontSize: "14px", maxWidth: "900px" }}>
                {profiling?.subtitle ??
                  "Evidence-based inferred scores from PKSF knowledge content, not official psychometric measurements"}
              </p>
              <p style={{ color: "var(--text-dim)", fontSize: "10px", marginTop: "4px" }}>
                Last intelligence timestamp: {formatAsOf(profiling?.asOf)}
              </p>
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <ControlButton active={view === "overview"} onClick={() => setView("overview")} label="Overview" />
              <ControlButton active={view === "profiles"} onClick={() => setView("profiles")} label="Profiles" />
              <ControlButton active={view === "queue"} onClick={() => setView("queue")} label="Action Queue" />
              <ControlButton active={view === "network"} onClick={() => setView("network")} label="PO Network" />
              <button
                onClick={() => void handleRefreshProfiling()}
                disabled={isRefreshing}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                  color: "var(--text-secondary)",
                  padding: "8px 10px",
                  cursor: isRefreshing ? "default" : "pointer",
                  opacity: isRefreshing ? 0.7 : 1,
                }}
              >
                <RefreshCcw size={13} />
                {isRefreshing ? "Refreshing..." : "Refresh"}
              </button>
            </div>
          </div>

          {error && (
            <GlassCard className="mb-4">
              <div
                style={{
                  padding: "12px 14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                }}
              >
                <div>
                  <p style={{ color: "#ef4444", fontSize: "13px", fontWeight: 700, marginBottom: "2px" }}>
                    Profiling Load Error
                  </p>
                  <p style={{ color: "var(--text-muted)", fontSize: "12px" }}>{error}</p>
                </div>
                <button
                  onClick={() => void handleRefreshProfiling()}
                  disabled={isRefreshing}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)",
                    color: "var(--text-secondary)",
                    padding: "8px 10px",
                    cursor: isRefreshing ? "default" : "pointer",
                    opacity: isRefreshing ? 0.7 : 1,
                    flexShrink: 0,
                  }}
                >
                  <RefreshCcw size={13} />
                  {isRefreshing ? "Retrying..." : "Retry"}
                </button>
              </div>
            </GlassCard>
          )}

          {profiling && (
            <>
              {(view === "overview" || view === "profiles") && (
                <GlassCard className="mb-4">
                  <div style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
                      <InferredBadge />
                      <span style={{ color: "var(--text-dim)", fontSize: "11px", lineHeight: 1.5 }}>
                        Inferred from currently indexed PKSF knowledge content. Use for directional intelligence and MD-level exception-based oversight.
                      </span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "10px" }}>
                      {profiling.summaryCards.map((card) => (
                        <div
                          key={card.id}
                          style={{
                            padding: "12px",
                            borderRadius: "10px",
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.05)",
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px", gap: "8px" }}>
                            <div>
                              <p style={{ color: "var(--text-muted)", fontSize: "11px", marginBottom: "2px" }}>{card.title}</p>
                              <h3 style={{ color: "var(--text-primary)", fontSize: "22px", fontWeight: 700 }}>{card.value}</h3>
                            </div>
                            <StatusBadge status={card.status} />
                          </div>
                          <p style={{ color: "var(--text-dim)", fontSize: "11px", lineHeight: 1.45 }}>{card.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              )}

              {view === "overview" && (
                <>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                      gap: "12px",
                      marginBottom: "12px",
                    }}
                  >
                    <GlassCard>
                      <div style={{ padding: "16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                          <BarChart3 size={14} color="#06b6d4" />
                          <h3 style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 600 }}>
                            Score Distribution
                          </h3>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          {profiling.scoreBands.map((band) => {
                            const total = Math.max(1, profiling.profiles.length);
                            const pct = Math.round((band.value / total) * 100);
                            return (
                              <div key={band.id}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", gap: "8px" }}>
                                  <span style={{ color: "var(--text-secondary)", fontSize: "12px" }}>{band.label}</span>
                                  <span style={{ color: band.color, fontSize: "12px", fontWeight: 700 }}>
                                    {band.value} ({pct}%)
                                  </span>
                                </div>
                                <div style={{ height: "5px", borderRadius: "4px", background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                                  <div style={{ height: "100%", width: `${pct}%`, background: band.color }} />
                                </div>
                                <p style={{ color: "var(--text-dim)", fontSize: "10px", marginTop: "4px" }}>{band.detail}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </GlassCard>

                    <GlassCard>
                      <div style={{ padding: "16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                          <ListChecks size={14} color="#a78bfa" />
                          <h3 style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 600 }}>
                            MD Action Queue
                          </h3>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          {profiling.queueItems.map((item) => (
                            <div
                              key={item.id}
                              style={{
                                padding: "10px",
                                borderRadius: "10px",
                                background: "rgba(255,255,255,0.02)",
                                border: "1px solid rgba(255,255,255,0.05)",
                              }}
                            >
                              <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", marginBottom: "5px" }}>
                                <p style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: 700 }}>{item.title}</p>
                                <PriorityBadge priority={item.priority} />
                              </div>
                              <p style={{ color: "var(--text-dim)", fontSize: "11px", lineHeight: 1.45 }}>{item.detail}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </GlassCard>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "12px", marginBottom: "12px" }}>
                    <GlassCard>
                      <div style={{ padding: "16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                          <Activity size={14} color="#06b6d4" />
                          <h3 style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 600 }}>
                            Methodology + Readiness
                          </h3>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px", marginBottom: "10px" }}>
                          {profiling.methodology.map((item) => (
                            <div key={item.label} style={{ padding: "10px", borderRadius: "8px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                              <p style={{ color: "#a78bfa", fontSize: "12px", fontWeight: 600, marginBottom: "3px" }}>{item.label}</p>
                              <p style={{ color: "var(--text-dim)", fontSize: "11px", lineHeight: 1.45 }}>{item.desc}</p>
                            </div>
                          ))}
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
                          {profiling.readiness.map((item) => (
                            <div key={item.id} style={{ padding: "10px", borderRadius: "8px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", gap: "8px" }}>
                                <p style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: 700 }}>{item.title}</p>
                                <StatusBadge status={item.status} />
                              </div>
                              <p style={{ color: "var(--text-dim)", fontSize: "11px", lineHeight: 1.45 }}>{item.detail}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </GlassCard>

                    <GlassCard>
                      <div style={{ padding: "16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                          <Users size={14} color="#10b981" />
                          <h3 style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 600 }}>
                            PO Confidence Pulse
                          </h3>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          {profiling.poItems.map((item) => (
                            <div key={item.id} style={{ padding: "10px", borderRadius: "8px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px", gap: "8px" }}>
                                <p style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: 700 }}>{item.name}</p>
                                <ConfidenceBadge confidence={item.confidence} />
                              </div>
                              <div style={{ height: "5px", borderRadius: "4px", background: "rgba(255,255,255,0.06)", overflow: "hidden", marginBottom: "5px" }}>
                                <div
                                  style={{
                                    height: "100%",
                                    width: `${item.progress}%`,
                                    background: item.confidence === "high" ? "#10b981" : item.confidence === "medium" ? "#f59e0b" : "#ef4444",
                                  }}
                                />
                              </div>
                              <p style={{ color: "var(--text-dim)", fontSize: "10px", lineHeight: 1.45 }}>{item.detail}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                </>
              )}

              {view === "profiles" && (
                <GlassCard className="mb-4">
                  <div style={{ padding: "12px 16px", display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "7px 10px",
                        borderRadius: "999px",
                        border: "1px solid rgba(255,255,255,0.08)",
                        background: "rgba(255,255,255,0.03)",
                        minWidth: "220px",
                      }}
                    >
                      <Search size={13} color="var(--text-muted)" />
                      <input
                        placeholder="Search profiles, source..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                          background: "transparent",
                          border: "none",
                          outline: "none",
                          color: "var(--text-secondary)",
                          fontSize: "12px",
                          width: "100%",
                        }}
                      />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-dim)", fontSize: "11px" }}>
                      <Filter size={12} /> Confidence
                    </div>
                    {(["all", "high", "medium", "low"] as const).map((item) => (
                      <ControlButton
                        key={item}
                        active={confidenceFilter === item}
                        onClick={() => setConfidenceFilter(item)}
                        label={item === "all" ? "All" : item[0].toUpperCase() + item.slice(1)}
                      />
                    ))}
                    <div style={{ marginLeft: "auto", display: "flex", gap: "8px", alignItems: "center" }}>
                      <span style={{ color: "var(--text-dim)", fontSize: "11px" }}>Sort</span>
                      <ControlButton active={sortBy === "score"} onClick={() => setSortBy("score")} label="Score" />
                      <ControlButton active={sortBy === "evidence"} onClick={() => setSortBy("evidence")} label="Evidence" />
                      <ControlButton active={sortBy === "confidence"} onClick={() => setSortBy("confidence")} label="Confidence" />
                    </div>
                  </div>
                </GlassCard>
              )}

              {view === "network" && (
                <GlassCard className="mb-4">
                  <div style={{ padding: "12px 16px", display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "7px 10px",
                        borderRadius: "999px",
                        border: "1px solid rgba(255,255,255,0.08)",
                        background: "rgba(255,255,255,0.03)",
                        minWidth: "220px",
                      }}
                    >
                      <Search size={13} color="var(--text-muted)" />
                      <input
                        placeholder="Search PO name or signal..."
                        value={networkSearch}
                        onChange={(e) => setNetworkSearch(e.target.value)}
                        style={{
                          background: "transparent",
                          border: "none",
                          outline: "none",
                          color: "var(--text-secondary)",
                          fontSize: "12px",
                          width: "100%",
                        }}
                      />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-dim)", fontSize: "11px" }}>
                      <Filter size={12} /> Confidence
                    </div>
                    {(["all", "high", "medium", "low"] as const).map((item) => (
                      <ControlButton
                        key={item}
                        active={networkConfidenceFilter === item}
                        onClick={() => setNetworkConfidenceFilter(item)}
                        label={item === "all" ? "All" : item[0].toUpperCase() + item.slice(1)}
                      />
                    ))}
                    <div style={{ marginLeft: "auto", display: "flex", gap: "8px", alignItems: "center" }}>
                      <span style={{ color: "var(--text-dim)", fontSize: "11px" }}>Sort</span>
                      <ControlButton active={networkSortBy === "progress"} onClick={() => setNetworkSortBy("progress")} label="Progress" />
                      <ControlButton active={networkSortBy === "confidence"} onClick={() => setNetworkSortBy("confidence")} label="Confidence" />
                      <ControlButton active={networkSortBy === "name"} onClick={() => setNetworkSortBy("name")} label="Name" />
                    </div>
                  </div>
                </GlassCard>
              )}

              {view === "profiles" && (
                <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: "12px" }}>
                  <GlassCard>
                    <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "8px", maxHeight: "70dvh", overflowY: "auto" }}>
                      {filteredProfiles.map((profile, idx) => {
                        const active = selectedProfile?.id === profile.id;
                        return (
                          <button
                            key={profile.id}
                            onClick={() => setSelectedProfileId(profile.id)}
                            style={{
                              textAlign: "left",
                              padding: "10px",
                              borderRadius: "10px",
                              border: active ? "1px solid rgba(6,182,212,0.28)" : "1px solid rgba(255,255,255,0.05)",
                              background: active ? "rgba(6,182,212,0.08)" : "rgba(255,255,255,0.02)",
                              cursor: "pointer",
                            }}
                          >
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px", gap: "8px" }}>
                              <p style={{ color: "var(--text-primary)", fontSize: "12px", fontWeight: 700 }}>{profile.title}</p>
                              <ConfidenceBadge confidence={profile.confidence} />
                            </div>
                            <p style={{ color: "var(--text-dim)", fontSize: "10px", marginBottom: "6px" }}>{profile.subtitle}</p>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px" }}>
                              <span style={{ color: "#a78bfa" }}>Score {profile.overallScore}</span>
                              <span style={{ color: "var(--text-muted)" }}>{profile.evidenceCount} evidence</span>
                            </div>
                            <div style={{ marginTop: "6px", height: "4px", borderRadius: "4px", background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                              <div style={{ width: `${profile.overallScore}%`, height: "100%", background: PROFILE_COLORS[idx % PROFILE_COLORS.length] }} />
                            </div>
                          </button>
                        );
                      })}
                      {!loading && filteredProfiles.length === 0 && (
                        <div style={{ padding: "10px", color: "var(--text-dim)", fontSize: "12px" }}>
                          No profiles match current filters.
                        </div>
                      )}
                    </div>
                  </GlassCard>

                  <GlassCard>
                    <div style={{ padding: "16px" }}>
                      {selectedProfile ? (
                        <>
                          <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", marginBottom: "12px", alignItems: "flex-start" }}>
                            <div>
                              <h3 style={{ color: "var(--text-primary)", fontSize: "15px", fontWeight: 700, marginBottom: "3px" }}>
                                {selectedProfile.title}
                              </h3>
                              <p style={{ color: "var(--text-dim)", fontSize: "12px", lineHeight: 1.45 }}>{selectedProfile.subtitle}</p>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <div style={{ color: "#a78bfa", fontSize: "28px", fontWeight: 700, fontFamily: "var(--font-jetbrains-mono), monospace", lineHeight: 1 }}>
                                {selectedProfile.overallScore}
                              </div>
                              <div style={{ color: "var(--text-dim)", fontSize: "10px" }}>Overall</div>
                            </div>
                          </div>

                          <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
                            <InferredBadge />
                            <ConfidenceBadge confidence={selectedProfile.confidence} />
                            <span style={{ color: "var(--text-dim)", fontSize: "10px" }}>{selectedProfile.evidenceCount} evidence chunks</span>
                          </div>

                          <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", marginBottom: "12px", flexWrap: "wrap" }}>
                            <RadarChart dimensions={selectedProfile.dimensions} color="#06b6d4" />
                            <div style={{ flex: 1, minWidth: "250px" }}>
                              {selectedProfile.dimensions.map((dimension) => {
                                const pct = Math.round((dimension.score / dimension.max) * 100);
                                return (
                                  <div key={dimension.name} style={{ marginBottom: "10px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", gap: "8px" }}>
                                      <span style={{ color: "var(--text-secondary)", fontSize: "12px" }}>{dimension.name}</span>
                                      <span style={{ color: "#06b6d4", fontSize: "12px", fontWeight: 700 }}>{dimension.score}</span>
                                    </div>
                                    <div style={{ height: "4px", borderRadius: "4px", background: "rgba(255,255,255,0.06)", overflow: "hidden", marginBottom: "3px" }}>
                                      <div style={{ height: "100%", width: `${pct}%`, background: "#06b6d4" }} />
                                    </div>
                                    <p style={{ color: "var(--text-dim)", fontSize: "10px", lineHeight: 1.35 }}>{dimension.evidence}</p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <div style={{ padding: "10px", borderRadius: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                            <p style={{ color: "var(--text-muted)", fontSize: "12px", lineHeight: 1.5, marginBottom: "6px" }}>
                              {selectedProfile.summary}
                            </p>
                            <p style={{ color: "var(--text-secondary)", fontSize: "12px", lineHeight: 1.5, marginBottom: "6px" }}>
                              {selectedProfile.recommendation}
                            </p>
                            <p style={{ color: "var(--text-dim)", fontSize: "10px" }}>
                              Primary source: {selectedProfile.primarySource}
                            </p>
                          </div>
                        </>
                      ) : (
                        <p style={{ color: "var(--text-dim)", fontSize: "12px" }}>No profile selected.</p>
                      )}
                    </div>
                  </GlassCard>
                </div>
              )}

              {view === "queue" && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "12px" }}>
                  <GlassCard>
                    <div style={{ padding: "16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                        <ListChecks size={14} color="#a78bfa" />
                        <h3 style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 600 }}>Action Queue</h3>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {profiling.queueItems.map((item) => (
                          <div key={item.id} style={{ padding: "10px", borderRadius: "8px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", marginBottom: "5px" }}>
                              <p style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: 700 }}>{item.title}</p>
                              <PriorityBadge priority={item.priority} />
                            </div>
                            <p style={{ color: "var(--text-dim)", fontSize: "11px", lineHeight: 1.45 }}>{item.detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </GlassCard>

                  <GlassCard>
                    <div style={{ padding: "16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                        <Activity size={14} color="#06b6d4" />
                        <h3 style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 600 }}>Data Readiness</h3>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {profiling.readiness.map((item) => (
                          <div key={item.id} style={{ padding: "10px", borderRadius: "8px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", marginBottom: "4px" }}>
                              <p style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: 700 }}>{item.title}</p>
                              <StatusBadge status={item.status} />
                            </div>
                            <p style={{ color: "var(--text-dim)", fontSize: "11px", lineHeight: 1.45 }}>{item.detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                </div>
              )}

              {view === "network" && (
                <GlassCard>
                  <div style={{ padding: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                      <Users size={14} color="#10b981" />
                      <h3 style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 600 }}>
                        PO Network Psychometric Progress
                      </h3>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {filteredNetworkItems.map((item) => (
                        <div key={item.id} style={{ padding: "10px", borderRadius: "8px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", marginBottom: "6px" }}>
                            <p style={{ color: "var(--text-secondary)", fontSize: "13px", fontWeight: 700 }}>{item.name}</p>
                            <ConfidenceBadge confidence={item.confidence} />
                          </div>
                          <div style={{ height: "6px", borderRadius: "4px", background: "rgba(255,255,255,0.06)", overflow: "hidden", marginBottom: "6px" }}>
                            <div
                              style={{
                                height: "100%",
                                width: `${item.progress}%`,
                                background: item.confidence === "high" ? "#10b981" : item.confidence === "medium" ? "#f59e0b" : "#ef4444",
                              }}
                            />
                          </div>
                          <p style={{ color: "var(--text-dim)", fontSize: "11px", lineHeight: 1.45 }}>{item.detail}</p>
                        </div>
                      ))}
                      {!loading && filteredNetworkItems.length === 0 && (
                        <div style={{ padding: "10px", color: "var(--text-dim)", fontSize: "12px" }}>
                          No PO network rows match current filters.
                        </div>
                      )}
                    </div>
                  </div>
                </GlassCard>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
