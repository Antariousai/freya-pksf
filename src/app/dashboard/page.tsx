"use client";

import { useCallback, useEffect, useState } from "react";
import { useRequireAuth } from "@/lib/use-auth";
import { apiFetch } from "@/lib/api-client";
import {
  Database,
  Files,
  Globe,
  FileText,
  AlertTriangle,
  Info,
  AlertCircle,
  RefreshCcw,
} from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import LeftPanel from "@/components/layout/LeftPanel";
import GlassCard from "@/components/shared/GlassCard";
import StatusBadge from "@/components/shared/StatusBadge";
import type { DashboardMetric, DashboardSnapshot } from "@/lib/types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

function KPICard({
  label,
  value,
  change,
  trend,
  icon: Icon,
  iconColor,
  iconBg,
}: DashboardMetric & {
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
}) {
  return (
    <GlassCard>
      <div style={{ padding: "16px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: iconBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={18} color={iconColor} strokeWidth={2} />
          </div>
          <span
            style={{
              color: trend === "up" ? "#10b981" : trend === "down" ? "#ef4444" : "#6a6a90",
              fontSize: "12px",
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontWeight: 600,
            }}
          >
            {change}
          </span>
        </div>
        <div
          style={{
            color: "var(--text-primary)",
            fontSize: "22px",
            fontWeight: 700,
            marginBottom: "2px",
          }}
        >
          {value}
        </div>
        <div style={{ color: "var(--text-muted)", fontSize: "13px" }}>{label}</div>
      </div>
    </GlassCard>
  );
}

const KPI_ICON_CONFIG: Record<
  string,
  { icon: React.ElementType; iconColor: string; iconBg: string }
> = {
  "knowledge-chunks": {
    icon: Database,
    iconColor: "#a78bfa",
    iconBg: "rgba(124,58,237,0.12)",
  },
  "unique-titles": {
    icon: Files,
    iconColor: "#10b981",
    iconBg: "rgba(16,185,129,0.12)",
  },
  "web-items": {
    icon: Globe,
    iconColor: "#06b6d4",
    iconBg: "rgba(6,182,212,0.12)",
  },
  "pdf-items": {
    icon: FileText,
    iconColor: "#f59e0b",
    iconBg: "rgba(245,158,11,0.12)",
  },
};

const PLACEHOLDER_KPIS: DashboardMetric[] = [
  { id: "knowledge-chunks", label: "Total Knowledge Chunks", value: "--", change: "Loading", trend: "stable" },
  { id: "unique-titles", label: "Unique Document/Page Titles", value: "--", change: "Loading", trend: "stable" },
  { id: "web-items", label: "Webpage Items", value: "--", change: "Loading", trend: "stable" },
  { id: "pdf-items", label: "PDF Items", value: "--", change: "Loading", trend: "stable" },
];

const CustomTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ value: number; payload: { count: number } }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "rgba(10,10,32,0.95)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "8px",
          padding: "8px 12px",
          fontSize: "13px",
        }}
      >
        <p style={{ color: "#a0a0c0", marginBottom: "4px" }}>{label}</p>
        <p style={{ color: "#a78bfa", fontWeight: 600, marginBottom: "2px" }}>{payload[0].value}%</p>
        <p style={{ color: "var(--text-dim)", fontSize: "11px" }}>{payload[0].payload.count} documents</p>
      </div>
    );
  }
  return null;
};

function DashboardLoader({ message }: { message: string }) {
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
        <div
          style={{
            width: "min(560px, calc(100vw - 48px))",
            padding: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "999px",
                background: "#06b6d4",
                boxShadow: "0 0 14px rgba(6,182,212,0.45)",
                animation: "pulse-green 1.2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                color: "var(--text-primary)",
                fontSize: "13px",
                fontWeight: 700,
              }}
            >
              Loading Dashboard
            </span>
          </div>

          <p style={{ color: "var(--text-muted)", fontSize: "13px", marginBottom: "16px" }}>{message}</p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "10px",
              marginBottom: "12px",
            }}
          >
            {[0, 1, 2, 3].map((item) => (
              <div
                key={item}
                style={{
                  height: "74px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              />
            ))}
          </div>

          <div
            style={{
              height: "120px",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          />
        </div>
      </GlassCard>
    </div>
  );
}

export default function DashboardPage() {
  const { checked, authed } = useRequireAuth();
  const [mobileLeftOpen, setMobileLeftOpen] = useState(false);
  const [dashboard, setDashboard] = useState<DashboardSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await apiFetch("/api/dashboard");
      if (!res.ok) throw new Error("Failed to fetch dashboard data");
      const data = await res.json() as DashboardSnapshot;
      setDashboard(data);
    } catch (err) {
      console.error("Dashboard load failed", err);
      setError("Dashboard data could not be loaded from pksf_knowledge.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!checked || !authed) return;
    void loadDashboard();
  }, [checked, authed, loadDashboard]);

  if (!checked) {
    return <DashboardLoader message="Checking your session before loading the live PKSF knowledge index." />;
  }

  if (!authed) return null;

  const alertIcons: Record<string, React.ElementType> = {
    critical: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const alertColors: Record<string, string> = {
    critical: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",
  };

  const kpis = dashboard?.kpis ?? PLACEHOLDER_KPIS;
  const distribution = dashboard?.distribution ?? [];
  const latestItems = dashboard?.latestItems ?? [];
  const featuredItems = dashboard?.featuredItems ?? [];

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
      <TopBar onMenuToggle={() => setMobileLeftOpen((o) => !o)} />
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <LeftPanel mobileOpen={mobileLeftOpen} onMobileClose={() => setMobileLeftOpen(false)} />
        <main style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
          {loading && !dashboard && !error && (
            <GlassCard className="mb-4">
              <div
                style={{
                  padding: "12px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "999px",
                    background: "#06b6d4",
                    boxShadow: "0 0 12px rgba(6,182,212,0.35)",
                    animation: "pulse-green 1.2s ease-in-out infinite",
                    flexShrink: 0,
                  }}
                />
                <p style={{ color: "var(--text-muted)", fontSize: "12px" }}>
                  Fetching live dashboard content from `pksf_knowledge`...
                </p>
              </div>
            </GlassCard>
          )}

          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
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
                Executive Overview
              </span>
            </div>
            <h1 style={{ color: "var(--text-primary)", fontSize: "20px", fontWeight: 700 }}>
              PKSF Intelligence Dashboard
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "2px" }}>
              {dashboard?.subtitle ?? "Loading real knowledge content from pksf_knowledge..."}
            </p>
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
                    Dashboard Load Error
                  </p>
                  <p style={{ color: "var(--text-muted)", fontSize: "12px" }}>{error}</p>
                </div>
                <button
                  onClick={() => void loadDashboard()}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)",
                    color: "var(--text-secondary)",
                    padding: "8px 10px",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  <RefreshCcw size={13} />
                  Retry
                </button>
              </div>
            </GlassCard>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            {kpis.map((metric) => {
              const iconConfig = KPI_ICON_CONFIG[metric.id] ?? KPI_ICON_CONFIG["knowledge-chunks"];
              return (
                <KPICard
                  key={metric.id}
                  {...metric}
                  icon={iconConfig.icon}
                  iconColor={iconConfig.iconColor}
                  iconBg={iconConfig.iconBg}
                />
              );
            })}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr minmax(300px, 360px)",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            <GlassCard>
              <div style={{ padding: "16px 16px 8px" }}>
                <div style={{ marginBottom: "14px" }}>
                  <h3 style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 600, marginBottom: "2px" }}>
                    Knowledge Base Distribution
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                    Unique document share by PKSF source group
                  </p>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={distribution} barCategoryGap="35%">
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "#6a6a90", fontSize: 10, fontFamily: "JetBrains Mono" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "#6a6a90", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {distribution.map((entry, index) => (
                        <Cell key={`${entry.name}-${index}`} fill={entry.color} fillOpacity={0.85} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                {!loading && distribution.length === 0 && (
                  <p style={{ color: "var(--text-dim)", fontSize: "12px", marginTop: "10px" }}>
                    No distribution data available.
                  </p>
                )}
              </div>
            </GlassCard>

            <GlassCard>
              <div style={{ padding: "14px" }}>
                <h3
                  style={{
                    color: "var(--text-primary)",
                    fontSize: "13px",
                    fontWeight: 600,
                    marginBottom: "12px",
                  }}
                >
                  Latest Ingested Items
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {loading && latestItems.length === 0 ? (
                    <div
                      style={{
                        padding: "10px",
                        borderRadius: "8px",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        color: "var(--text-dim)",
                        fontSize: "12px",
                      }}
                    >
                      Loading latest items from the knowledge table...
                    </div>
                  ) : latestItems.length === 0 ? (
                    <div
                      style={{
                        padding: "10px",
                        borderRadius: "8px",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        color: "var(--text-dim)",
                        fontSize: "12px",
                      }}
                    >
                      No items available yet.
                    </div>
                  ) : (
                    latestItems.map((item) => {
                      const IconComp = alertIcons[item.severity];
                      const color = alertColors[item.severity];

                      return (
                        <div
                          key={item.id}
                          style={{
                            display: "flex",
                            gap: "8px",
                            padding: "8px",
                            borderRadius: "8px",
                            background: `${color}08`,
                            border: `1px solid ${color}18`,
                          }}
                        >
                          <IconComp size={13} color={color} strokeWidth={2} style={{ marginTop: "1px", flexShrink: 0 }} />
                          <div style={{ minWidth: 0 }}>
                            <p
                              style={{
                                color: "var(--text-secondary)",
                                fontSize: "13px",
                                fontWeight: 600,
                                marginBottom: "2px",
                              }}
                            >
                              {item.title}
                            </p>
                            <p style={{ color: "var(--text-muted)", fontSize: "12px", lineHeight: 1.4 }}>
                              {item.detail}
                            </p>
                            <span
                              style={{
                                color: "var(--text-dim)",
                                fontSize: "9px",
                                fontFamily: "var(--font-jetbrains-mono), monospace",
                              }}
                            >
                              {item.time}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </GlassCard>
          </div>

          <GlassCard>
            <div style={{ padding: "16px" }}>
              <h3
                style={{
                  color: "var(--text-primary)",
                  fontSize: "13px",
                  fontWeight: 600,
                  marginBottom: "14px",
                }}
              >
                Featured Knowledge Items
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "10px",
                }}
              >
                {loading && featuredItems.length === 0 ? (
                  <div
                    style={{
                      gridColumn: "1 / -1",
                      padding: "12px",
                      borderRadius: "10px",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                      color: "var(--text-dim)",
                      fontSize: "12px",
                    }}
                  >
                    Loading featured items from `pksf_knowledge`...
                  </div>
                ) : featuredItems.length === 0 ? (
                  <div
                    style={{
                      gridColumn: "1 / -1",
                      padding: "12px",
                      borderRadius: "10px",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                      color: "var(--text-dim)",
                      fontSize: "12px",
                    }}
                  >
                    No featured documents found in the current knowledge index.
                  </div>
                ) : (
                  featuredItems.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        padding: "12px",
                        borderRadius: "10px",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px", gap: "8px" }}>
                        <div style={{ minWidth: 0 }}>
                          <p style={{ color: "var(--text-primary)", fontSize: "14px", fontWeight: 700, lineHeight: 1.35 }}>
                            {item.title}
                          </p>
                          <p style={{ color: "var(--text-dim)", fontSize: "9px", fontFamily: "var(--font-jetbrains-mono), monospace" }}>
                            {item.source}
                          </p>
                        </div>
                        <StatusBadge status={item.status} label={item.badgeLabel} />
                      </div>

                      <p style={{ color: "#a78bfa", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>
                        {item.progressLabel}
                      </p>

                      <div style={{ marginBottom: "4px" }}>
                        <div
                          style={{
                            height: "4px",
                            borderRadius: "2px",
                            background: "rgba(255,255,255,0.06)",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              width: `${item.progressPct}%`,
                              borderRadius: "2px",
                              background: item.progressPct >= 100 ? "#10b981" : item.progressPct >= 70 ? "#06b6d4" : "#f59e0b",
                            }}
                          />
                        </div>
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                        <span style={{ color: "var(--text-dim)", fontSize: "9px" }}>Index coverage</span>
                        <span
                          style={{
                            color: "var(--text-muted)",
                            fontSize: "9px",
                            fontFamily: "var(--font-jetbrains-mono), monospace",
                          }}
                        >
                          {item.progressPct}%
                        </span>
                      </div>

                      <p style={{ color: "var(--text-muted)", fontSize: "12px", lineHeight: 1.5 }}>
                        {item.snippet}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </GlassCard>
        </main>
      </div>
    </div>
  );
}
