"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiFetch } from "@/lib/api-client";
import { useRequireAuth } from "@/lib/use-auth";
import TopBar from "@/components/layout/TopBar";
import LeftPanel from "@/components/layout/LeftPanel";
import GlassCard from "@/components/shared/GlassCard";
import StatusBadge from "@/components/shared/StatusBadge";
import type { OperationsSnapshot } from "@/lib/types";
import { Activity, AlertCircle, Minus, RefreshCcw, TrendingDown, TrendingUp } from "lucide-react";

type OperationsView = "overview" | "po" | "departments" | "alerts";

const VIEW_LABELS: Record<OperationsView, string> = {
  overview: "Overview",
  po: "PO Network",
  departments: "Departments",
  alerts: "Alerts",
};

function parseOperationsView(value: string | null): OperationsView {
  if (value === "po" || value === "departments" || value === "alerts") {
    return value;
  }
  return "overview";
}

function ProgressBar({
  value,
  max = 100,
  color,
  height = 4,
}: {
  value: number;
  max?: number;
  color: string;
  height?: number;
}) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div
      style={{
        height: `${height}px`,
        borderRadius: `${height / 2}px`,
        background: "rgba(255,255,255,0.05)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${pct}%`,
          borderRadius: `${height / 2}px`,
          background: color,
          transition: "width 0.3s ease",
        }}
      />
    </div>
  );
}

function ControlButton({
  active,
  onClick,
  label,
}: {
  active?: boolean;
  onClick: () => void;
  label: string;
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

function OperationsLoader({ message }: { message: string }) {
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
                background: "#06b6d4",
                boxShadow: "0 0 14px rgba(6,182,212,0.45)",
                animation: "pulse-green 1.2s ease-in-out infinite",
              }}
            />
            <span style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 700 }}>
              Loading Operations
            </span>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "13px", marginBottom: "16px" }}>{message}</p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "10px",
            }}
          >
            {[0, 1, 2, 3].map((item) => (
              <div
                key={item}
                style={{
                  height: "76px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              />
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

function OperationsPageContent() {
  const { checked, authed } = useRequireAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileLeftOpen, setMobileLeftOpen] = useState(false);
  const [operations, setOperations] = useState<OperationsSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [poFilter, setPoFilter] = useState<"all" | "live" | "watch" | "stable">("all");

  const loadOperations = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await apiFetch("/api/operations");
      if (!res.ok) throw new Error("Failed to fetch operations data");
      const data = (await res.json()) as OperationsSnapshot;
      setOperations(data);
    } catch (err) {
      console.error("Operations load failed", err);
      setError("Operations data could not be loaded from pksf_knowledge.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!checked || !authed) return;
    void loadOperations();
  }, [checked, authed, loadOperations]);

  const handleRefreshOperations = useCallback(async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    try {
      await loadOperations();
    } finally {
      setIsRefreshing(false);
    }
  }, [isRefreshing, loadOperations]);

  const handleViewChange = useCallback(
    (nextView: OperationsView) => {
      const nextParams = new URLSearchParams(searchParams.toString());
      if (nextView === "overview") {
        nextParams.delete("view");
      } else {
        nextParams.set("view", nextView);
      }

      const query = nextParams.toString();
      router.replace(query ? `/operations?${query}` : "/operations", { scroll: false });
    },
    [router, searchParams],
  );

  if (!checked) {
    return <OperationsLoader message="Checking your session before loading the live operations view." />;
  }

  if (!authed) return null;

  const riverStatusColor: Record<string, string> = {
    normal: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    critical: "#dc2626",
  };
  const filteredPORows =
    poFilter === "all"
      ? operations?.poRows ?? []
      : (operations?.poRows ?? []).filter((row) => row.status === poFilter);
  const view = parseOperationsView(searchParams.get("view"));
  const showOverview = view === "overview";
  const showPO = view === "po";
  const showDepartments = view === "departments";
  const showAlerts = view === "alerts";

  const alertColors = {
    critical: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",
  };

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
          {loading && !operations && !error && (
            <GlassCard className="mb-4">
              <div style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: "10px" }}>
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
                  Fetching live operational signals from pksf_knowledge...
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
                Enterprise Operations
              </span>
              <h1 style={{ color: "var(--text-primary)", fontSize: "20px", fontWeight: 700, marginTop: "2px" }}>
                Operations Center
              </h1>
              <p style={{ color: "var(--text-muted)", fontSize: "14px", maxWidth: "900px" }}>
                {operations?.subtitle ?? "Live PO, banking, and climate signals from pksf_knowledge"}
              </p>
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {([
                ["overview", "Overview"],
                ["po", "PO Network"],
                ["departments", "Departments"],
                ["alerts", "Alerts"],
              ] as const).map(([key, label]) => (
                <ControlButton key={key} active={view === key} onClick={() => handleViewChange(key)} label={label} />
              ))}
              <button
                onClick={() => void handleRefreshOperations()}
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
                    Operations Load Error
                  </p>
                  <p style={{ color: "var(--text-muted)", fontSize: "12px" }}>{error}</p>
                </div>
                <button
                  onClick={() => void handleRefreshOperations()}
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

          {operations && (
            <>
              {showOverview && (
                <>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    {operations.summaryCards.map((card) => (
                      <GlassCard key={card.id}>
                        <div style={{ padding: "16px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", marginBottom: "8px" }}>
                            <div>
                              <p style={{ color: "var(--text-muted)", fontSize: "12px", marginBottom: "4px" }}>{card.title}</p>
                              <h3 style={{ color: "var(--text-primary)", fontSize: "22px", fontWeight: 700 }}>{card.value}</h3>
                            </div>
                            <StatusBadge status={card.status} />
                          </div>
                          <p style={{ color: "var(--text-dim)", fontSize: "12px", lineHeight: 1.45 }}>{card.detail}</p>
                        </div>
                      </GlassCard>
                    ))}
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.15fr 0.85fr",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <GlassCard>
                      <div style={{ padding: "16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                          <Activity size={14} color="#06b6d4" />
                          <h3 style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 600 }}>
                            Data Readiness For Enterprise Operations
                          </h3>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px" }}>
                          {operations.readiness.map((item) => (
                            <div
                              key={item.id}
                              style={{
                                padding: "12px",
                                borderRadius: "10px",
                                background: "rgba(255,255,255,0.02)",
                                border: "1px solid rgba(255,255,255,0.05)",
                              }}
                            >
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", marginBottom: "6px" }}>
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
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                          <AlertCircle size={14} color="#f59e0b" />
                          <h3 style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 600 }}>
                            MD Exception Queue
                          </h3>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          {operations.alertItems.map((item) => (
                            <div
                              key={item.id}
                              style={{
                                padding: "10px",
                                borderRadius: "10px",
                                background: `${alertColors[item.severity]}10`,
                                border: `1px solid ${alertColors[item.severity]}22`,
                              }}
                            >
                              <p style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                                {item.title}
                              </p>
                              <p style={{ color: "var(--text-dim)", fontSize: "11px", lineHeight: 1.45 }}>{item.detail}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                </>
              )}

              {(showOverview || showPO) && (
                <GlassCard className="mb-4">
                  <div style={{ padding: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", marginBottom: "14px", flexWrap: "wrap" }}>
                      <h3 style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 600 }}>
                        Partner Organization Signals
                      </h3>
                      {showPO && (
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                          {([
                            ["all", "All"],
                            ["live", "Live"],
                            ["watch", "Watch"],
                            ["stable", "Stable"],
                          ] as const).map(([key, label]) => (
                            <ControlButton key={key} active={poFilter === key} onClick={() => setPoFilter(key)} label={label} />
                          ))}
                        </div>
                      )}
                    </div>
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                        <thead>
                          <tr>
                            {["Organization", "Location", "Evidence", "Coverage", "Signal", "Status"].map((heading) => (
                              <th
                                key={heading}
                                style={{
                                  padding: "6px 10px",
                                  textAlign: "left",
                                  color: "#6a6a90",
                                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                                  fontFamily: "var(--font-jetbrains-mono), monospace",
                                  fontSize: "9px",
                                  fontWeight: 600,
                                  letterSpacing: "0.5px",
                                  textTransform: "uppercase",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {heading}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {filteredPORows.map((row) => (
                            <tr key={row.id}>
                              <td
                                style={{
                                  padding: "8px 10px",
                                  color: "var(--text-primary)",
                                  fontWeight: 600,
                                  fontSize: "14px",
                                  borderBottom: "1px solid rgba(255,255,255,0.03)",
                                  verticalAlign: "top",
                                }}
                              >
                                <div>{row.name}</div>
                                <div style={{ color: "var(--text-dim)", fontSize: "10px", marginTop: "2px" }}>{row.source}</div>
                              </td>
                              <td style={{ padding: "8px 10px", color: "var(--text-secondary)", borderBottom: "1px solid rgba(255,255,255,0.03)", verticalAlign: "top" }}>
                                {row.location}
                              </td>
                              <td style={{ padding: "8px 10px", color: "var(--text-muted)", borderBottom: "1px solid rgba(255,255,255,0.03)", lineHeight: 1.45, minWidth: "280px", verticalAlign: "top" }}>
                                {row.evidence}
                                <div style={{ color: "var(--text-dim)", fontSize: "10px", marginTop: "4px" }}>{row.note}</div>
                              </td>
                              <td style={{ padding: "8px 10px", color: "#a78bfa", fontFamily: "var(--font-jetbrains-mono), monospace", borderBottom: "1px solid rgba(255,255,255,0.03)", verticalAlign: "top" }}>
                                {row.coverage}
                              </td>
                              <td style={{ padding: "8px 10px", borderBottom: "1px solid rgba(255,255,255,0.03)", verticalAlign: "top" }}>
                                {row.signal === "up" ? (
                                  <TrendingUp size={13} color="#10b981" strokeWidth={2} />
                                ) : row.signal === "down" ? (
                                  <TrendingDown size={13} color="#ef4444" strokeWidth={2} />
                                ) : (
                                  <Minus size={13} color="#6a6a90" strokeWidth={2} />
                                )}
                              </td>
                              <td style={{ padding: "8px 10px", borderBottom: "1px solid rgba(255,255,255,0.03)", verticalAlign: "top" }}>
                                <StatusBadge status={row.status} label={row.statusLabel} />
                              </td>
                            </tr>
                          ))}
                          {!loading && filteredPORows.length === 0 && (
                            <tr>
                              <td colSpan={6} style={{ padding: "12px 10px", color: "var(--text-dim)" }}>
                                No partner-organization evidence matched the current filter.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </GlassCard>
              )}

              {showOverview && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "12px", marginBottom: "12px" }}>
                  <GlassCard>
                    <div style={{ padding: "16px" }}>
                      <h3 style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 600, marginBottom: "14px" }}>
                        Banking Signals
                      </h3>
                      <p style={{ color: "var(--text-muted)", fontSize: "12px", marginBottom: "12px" }}>
                        Bank references, credit-guarantee mentions, and partnership signals found in PKSF knowledge content
                      </p>
                      {operations.bankingItems.map((bank) => {
                        const color =
                          bank.progressPct >= 75 ? "#10b981" : bank.progressPct >= 40 ? "#06b6d4" : "#f59e0b";
                        return (
                          <div key={bank.id} style={{ marginBottom: "12px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", marginBottom: "5px" }}>
                              <span style={{ color: "var(--text-secondary)", fontSize: "14px" }}>{bank.name}</span>
                              <div style={{ display: "flex", gap: "8px", alignItems: "center", flexShrink: 0 }}>
                                <span style={{ color: "var(--text-muted)", fontSize: "12px", fontFamily: "var(--font-jetbrains-mono), monospace" }}>
                                  {bank.evidenceCount} hits
                                </span>
                                <StatusBadge status={bank.status} />
                              </div>
                            </div>
                            <p style={{ color: "var(--text-dim)", fontSize: "12px", marginBottom: "8px", lineHeight: 1.45 }}>
                              {bank.detail}
                            </p>
                            <ProgressBar value={bank.progressPct} color={color} height={5} />
                          </div>
                        );
                      })}
                      {!loading && operations.bankingItems.length === 0 && (
                        <p style={{ color: "var(--text-dim)", fontSize: "12px" }}>
                          No banking evidence found in the current knowledge index.
                        </p>
                      )}
                    </div>
                  </GlassCard>

                  <GlassCard>
                    <div style={{ padding: "16px" }}>
                      <h3 style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>
                        Climate And Risk Monitoring
                      </h3>
                      <p style={{ color: "var(--text-muted)", fontSize: "12px", marginBottom: "14px" }}>
                        Real content-backed resilience signals replacing the previous river placeholders
                      </p>
                      {operations.riskItems.map((risk) => {
                        const color = riverStatusColor[risk.status];
                        return (
                          <div key={risk.id} style={{ marginBottom: "14px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", marginBottom: "5px" }}>
                              <div>
                                <span style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: 600 }}>
                                  {risk.title}
                                </span>
                                <span style={{ color: "var(--text-dim)", fontSize: "12px", marginLeft: "6px" }}>
                                  {risk.location}
                                </span>
                              </div>
                              <span
                                style={{
                                  background: `${color}15`,
                                  color,
                                  padding: "1px 5px",
                                  borderRadius: "4px",
                                  fontSize: "9px",
                                  fontFamily: "var(--font-jetbrains-mono), monospace",
                                  fontWeight: 600,
                                  textTransform: "uppercase",
                                  height: "fit-content",
                                }}
                              >
                                {risk.signalLabel}
                              </span>
                            </div>
                            <p style={{ color: "var(--text-muted)", fontSize: "12px", lineHeight: 1.45, marginBottom: "8px" }}>
                              {risk.detail}
                            </p>
                            <ProgressBar value={risk.progressPct} color={color} height={5} />
                          </div>
                        );
                      })}
                      {!loading && operations.riskItems.length === 0 && (
                        <p style={{ color: "var(--text-dim)", fontSize: "12px" }}>
                          No climate or risk monitoring items are available yet.
                        </p>
                      )}
                    </div>
                  </GlassCard>
                </div>
              )}

              {(showOverview || showDepartments) && (
                <GlassCard className="mb-4">
                  <div style={{ padding: "16px" }}>
                    <h3 style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 600, marginBottom: "14px" }}>
                      Coverage And Utilization Signals
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
                      {operations.coverageCards.map((card) => {
                        const color =
                          card.percentage >= 90 ? "#10b981" : card.percentage >= 60 ? "#06b6d4" : card.percentage >= 35 ? "#f59e0b" : "#ef4444";
                        return (
                          <div
                            key={card.id}
                            style={{
                              padding: "12px",
                              borderRadius: "10px",
                              background: "rgba(255,255,255,0.02)",
                              border: "1px solid rgba(255,255,255,0.05)",
                            }}
                          >
                            <p style={{ color: "var(--text-muted)", fontSize: "12px", marginBottom: "6px", lineHeight: 1.3 }}>
                              {card.name}
                            </p>
                            <p style={{ color, fontSize: "18px", fontWeight: 700, marginBottom: "2px" }}>
                              {card.percentage}%
                            </p>
                            <p style={{ color: "var(--text-dim)", fontSize: "10px", marginBottom: "8px", lineHeight: 1.4 }}>
                              {card.detail}
                            </p>
                            <ProgressBar value={card.percentage} color={color} height={3} />
                            <p style={{ color: "var(--text-dim)", fontSize: "9px", marginTop: "8px" }}>{card.caption}</p>
                          </div>
                        );
                      })}
                      {!loading && operations.coverageCards.length === 0 && (
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
                          No coverage signals could be derived from the current knowledge snapshot.
                        </div>
                      )}
                    </div>
                  </div>
                </GlassCard>
              )}

              {showDepartments && (
                <GlassCard className="mb-4">
                  <div style={{ padding: "16px" }}>
                    <h3 style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 600, marginBottom: "14px" }}>
                      Department Operations
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "10px" }}>
                      {operations.departmentItems.map((item) => (
                        <div
                          key={item.id}
                          style={{
                            padding: "12px",
                            borderRadius: "10px",
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.05)",
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", marginBottom: "6px" }}>
                            <p style={{ color: "var(--text-secondary)", fontSize: "13px", fontWeight: 700 }}>{item.name}</p>
                            <StatusBadge status={item.status} />
                          </div>
                          <p style={{ color: "#a78bfa", fontSize: "11px", marginBottom: "5px" }}>{item.focus}</p>
                          <p style={{ color: "var(--text-dim)", fontSize: "11px", lineHeight: 1.45 }}>{item.detail}</p>
                        </div>
                      ))}
                      {!loading && operations.departmentItems.length === 0 && (
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
                          No department operations signals are available yet.
                        </div>
                      )}
                    </div>
                  </div>
                </GlassCard>
              )}

              {showAlerts && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "12px" }}>
                  <GlassCard>
                    <div style={{ padding: "16px" }}>
                      <h3 style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 600, marginBottom: "14px" }}>
                        Active Alerts
                      </h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {operations.alertItems.map((item) => (
                          <div
                            key={item.id}
                            style={{
                              padding: "10px",
                              borderRadius: "10px",
                              background: `${alertColors[item.severity]}10`,
                              border: `1px solid ${alertColors[item.severity]}22`,
                            }}
                          >
                            <p style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                              {item.title}
                            </p>
                            <p style={{ color: "var(--text-dim)", fontSize: "11px", lineHeight: 1.45 }}>{item.detail}</p>
                          </div>
                        ))}
                        {!loading && operations.alertItems.length === 0 && (
                          <p style={{ color: "var(--text-dim)", fontSize: "12px" }}>
                            No alerts are currently active.
                          </p>
                        )}
                      </div>
                    </div>
                  </GlassCard>

                  <GlassCard>
                    <div style={{ padding: "16px" }}>
                      <h3 style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>
                        Climate And Risk Monitoring
                      </h3>
                      <p style={{ color: "var(--text-muted)", fontSize: "12px", marginBottom: "14px" }}>
                        Operational risk signals derived from live PKSF knowledge evidence.
                      </p>
                      {operations.riskItems.map((risk) => {
                        const color = riverStatusColor[risk.status];
                        return (
                          <div key={risk.id} style={{ marginBottom: "14px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", marginBottom: "5px" }}>
                              <div>
                                <span style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: 600 }}>
                                  {risk.title}
                                </span>
                                <span style={{ color: "var(--text-dim)", fontSize: "12px", marginLeft: "6px" }}>
                                  {risk.location}
                                </span>
                              </div>
                              <span
                                style={{
                                  background: `${color}15`,
                                  color,
                                  padding: "1px 5px",
                                  borderRadius: "4px",
                                  fontSize: "9px",
                                  fontFamily: "var(--font-jetbrains-mono), monospace",
                                  fontWeight: 600,
                                  textTransform: "uppercase",
                                  height: "fit-content",
                                }}
                              >
                                {risk.signalLabel}
                              </span>
                            </div>
                            <p style={{ color: "var(--text-muted)", fontSize: "12px", lineHeight: 1.45, marginBottom: "8px" }}>
                              {risk.detail}
                            </p>
                            <ProgressBar value={risk.progressPct} color={color} height={5} />
                          </div>
                        );
                      })}
                      {!loading && operations.riskItems.length === 0 && (
                        <p style={{ color: "var(--text-dim)", fontSize: "12px" }}>
                          No climate or risk monitoring items are available yet.
                        </p>
                      )}
                    </div>
                  </GlassCard>
                </div>
              )}

            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default function OperationsPage() {
  return (
    <Suspense fallback={<OperationsLoader message="Preparing route state for operations view." />}>
      <OperationsPageContent />
    </Suspense>
  );
}
