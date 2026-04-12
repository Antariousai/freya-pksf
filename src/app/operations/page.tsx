"use client";

import { useState } from "react";
import { useRequireAuth } from "@/lib/use-auth";
import TopBar from "@/components/layout/TopBar";
import LeftPanel from "@/components/layout/LeftPanel";
import GlassCard from "@/components/shared/GlassCard";
import StatusBadge from "@/components/shared/StatusBadge";
import { PO_PROFILES, BANK_UTILIZATION, RIVER_STATIONS, FUND_SOURCES } from "@/lib/pksf-data";
import { TrendingDown, TrendingUp, Minus, AlertTriangle } from "lucide-react";

function TierBadge({ tier }: { tier: "A" | "B" | "C" | "D" }) {
  const config = {
    A: { bg: "rgba(16,185,129,0.12)", color: "#10b981" },
    B: { bg: "rgba(59,130,246,0.12)", color: "#3b82f6" },
    C: { bg: "rgba(245,158,11,0.12)", color: "#f59e0b" },
    D: { bg: "rgba(239,68,68,0.12)", color: "#ef4444" },
  };
  const c = config[tier];
  return (
    <span
      style={{
        background: c.bg,
        color: c.color,
        padding: "2px 7px",
        borderRadius: "4px",
        fontSize: "9px",
        fontFamily: "var(--font-jetbrains-mono), monospace",
        fontWeight: 700,
        border: `1px solid ${c.color}22`,
      }}
    >
      TIER {tier}
    </span>
  );
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

export default function OperationsPage() {
  const { checked, authed } = useRequireAuth();
  const [mobileLeftOpen, setMobileLeftOpen] = useState(false);
  if (!checked || !authed) return null;
  const riverStatusColor: Record<string, string> = {
    normal: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    critical: "#dc2626",
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
      <TopBar onMenuToggle={() => setMobileLeftOpen((o) => !o)} />
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <LeftPanel mobileOpen={mobileLeftOpen} onMobileClose={() => setMobileLeftOpen(false)} />
        <main style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
          {/* Header */}
          <div style={{ marginBottom: "20px" }}>
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
              Field Intelligence
            </span>
            <h1 style={{ color: "var(--text-primary)", fontSize: "20px", fontWeight: 700, marginTop: "2px" }}>
              Operations Center
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
              Real-time PO performance, banking utilization, and environmental monitoring
            </p>
          </div>

          {/* PO Performance table */}
          <GlassCard className="mb-4">
            <div style={{ padding: "16px" }}>
              <h3 style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 600, marginBottom: "14px" }}>
                Partner Organization Performance
              </h3>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                  <thead>
                    <tr>
                      {["Organization", "Tier", "Recovery Rate", "PAR30", "Compliance", "Members", "Outstanding (BDT B)", "Trend", "Status"].map((h) => (
                        <th
                          key={h}
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
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PO_PROFILES.map((po) => (
                      <tr key={po.id} style={{ transition: "background 0.12s" }}>
                        <td style={{ padding: "8px 10px", color: "var(--text-primary)", fontWeight: 600, fontSize: "14px", borderBottom: "1px solid rgba(255,255,255,0.03)", whiteSpace: "nowrap" }}>
                          <div>{po.name.split("(")[0].trim()}</div>
                          {po.alert && (
                            <div style={{ display: "flex", alignItems: "center", gap: "3px", marginTop: "2px" }}>
                              <AlertTriangle size={9} color="#f59e0b" strokeWidth={2} />
                              <span style={{ color: "#f59e0b", fontSize: "9px" }}>Alert</span>
                            </div>
                          )}
                        </td>
                        <td style={{ padding: "8px 10px", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                          <TierBadge tier={po.tier} />
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            color: po.recoveryRate >= 99 ? "#10b981" : po.recoveryRate >= 98 ? "#a0a0c0" : "#f59e0b",
                            fontFamily: "var(--font-jetbrains-mono), monospace",
                            fontWeight: 600,
                            borderBottom: "1px solid rgba(255,255,255,0.03)",
                          }}
                        >
                          {po.recoveryRate}%
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            color: po.par30 > 2 ? "#ef4444" : po.par30 > 1 ? "#f59e0b" : "#10b981",
                            fontFamily: "var(--font-jetbrains-mono), monospace",
                            fontWeight: 600,
                            borderBottom: "1px solid rgba(255,255,255,0.03)",
                          }}
                        >
                          {po.par30}%
                        </td>
                        <td style={{ padding: "8px 10px", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <ProgressBar
                              value={po.compliance}
                              color={po.compliance >= 85 ? "#10b981" : po.compliance >= 70 ? "#f59e0b" : "#ef4444"}
                              height={3}
                            />
                            <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "12px", flexShrink: 0 }}>
                              {po.compliance}
                            </span>
                          </div>
                        </td>
                        <td style={{ padding: "8px 10px", color: "var(--text-secondary)", fontFamily: "var(--font-jetbrains-mono), monospace", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                          {(po.members / 1000000).toFixed(1)}M
                        </td>
                        <td style={{ padding: "8px 10px", color: "var(--text-secondary)", fontFamily: "var(--font-jetbrains-mono), monospace", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                          {po.outstanding}
                        </td>
                        <td style={{ padding: "8px 10px", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                          {po.trend === "up" ? (
                            <TrendingUp size={13} color="#10b981" strokeWidth={2} />
                          ) : po.trend === "down" ? (
                            <TrendingDown size={13} color="#ef4444" strokeWidth={2} />
                          ) : (
                            <Minus size={13} color="#6a6a90" strokeWidth={2} />
                          )}
                        </td>
                        <td style={{ padding: "8px 10px", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                          <StatusBadge status={po.alert ? "alert" : "stable"} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </GlassCard>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "12px", marginBottom: "12px" }}>
            {/* CES Bank Utilization */}
            <GlassCard>
              <div style={{ padding: "16px" }}>
                <h3 style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 600, marginBottom: "14px" }}>
                  CES Bank Utilization
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "12px", marginBottom: "12px" }}>
                  Total Portfolio: BDT 1,000 Crore
                </p>
                {BANK_UTILIZATION.map((bank) => (
                  <div key={bank.name} style={{ marginBottom: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                      <span style={{ color: "var(--text-secondary)", fontSize: "14px" }}>{bank.name}</span>
                      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <span style={{ color: "var(--text-muted)", fontSize: "12px", fontFamily: "var(--font-jetbrains-mono), monospace" }}>
                          {bank.utilized}/{bank.allocated} Cr
                        </span>
                        <span
                          style={{
                            color: bank.percentage >= 80 ? "#f59e0b" : bank.percentage >= 60 ? "#06b6d4" : "#10b981",
                            fontSize: "12px",
                            fontFamily: "var(--font-jetbrains-mono), monospace",
                            fontWeight: 600,
                          }}
                        >
                          {bank.percentage}%
                        </span>
                      </div>
                    </div>
                    <ProgressBar
                      value={bank.percentage}
                      color={bank.percentage >= 80 ? "#f59e0b" : bank.percentage >= 60 ? "#06b6d4" : "#10b981"}
                      height={5}
                    />
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* River monitoring */}
            <GlassCard>
              <div style={{ padding: "16px" }}>
                <h3 style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>
                  River Monitoring — Sylhet Division
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "12px", marginBottom: "14px" }}>
                  PKSF borrower flood risk zone monitoring
                </p>
                {RIVER_STATIONS.map((river) => {
                  const color = riverStatusColor[river.status];
                  const pct = Math.min((river.currentLevel / (river.dangerLevel * 1.1)) * 100, 100);
                  return (
                    <div key={river.name} style={{ marginBottom: "14px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                        <div>
                          <span style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: 600 }}>
                            {river.name}
                          </span>
                          <span style={{ color: "var(--text-dim)", fontSize: "12px", marginLeft: "6px" }}>
                            {river.location}
                          </span>
                        </div>
                        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                          <span
                            style={{
                              color,
                              fontSize: "12px",
                              fontFamily: "var(--font-jetbrains-mono), monospace",
                              fontWeight: 600,
                            }}
                          >
                            {river.currentLevel}m
                          </span>
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
                            }}
                          >
                            {river.status}
                          </span>
                        </div>
                      </div>
                      <ProgressBar value={pct} color={color} height={5} />
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3px" }}>
                        <span style={{ color: "var(--text-dim)", fontSize: "9px" }}>
                          Warning: {river.warningLevel}m
                        </span>
                        <span style={{ color: "var(--text-dim)", fontSize: "9px" }}>
                          Danger: {river.dangerLevel}m
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </div>

          {/* Fund Source Utilization */}
          <GlassCard>
            <div style={{ padding: "16px" }}>
              <h3 style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 600, marginBottom: "14px" }}>
                Fund Source Utilization
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
                {FUND_SOURCES.map((fund) => {
                  const pct = Math.round((fund.utilized / fund.amount) * 100);
                  const color = pct >= 90 ? "#10b981" : pct >= 65 ? "#06b6d4" : pct >= 40 ? "#f59e0b" : "#ef4444";
                  return (
                    <div
                      key={fund.name}
                      style={{
                        padding: "12px",
                        borderRadius: "10px",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <p style={{ color: "var(--text-muted)", fontSize: "12px", marginBottom: "6px", lineHeight: 1.3 }}>
                        {fund.name}
                      </p>
                      <p style={{ color, fontSize: "18px", fontWeight: 700, marginBottom: "2px" }}>
                        {pct}%
                      </p>
                      <p style={{ color: "var(--text-dim)", fontSize: "9px", fontFamily: "var(--font-jetbrains-mono), monospace", marginBottom: "8px" }}>
                        {fund.utilized}/{fund.amount} {fund.currency}
                      </p>
                      <ProgressBar value={pct} color={color} height={3} />
                    </div>
                  );
                })}
              </div>
            </div>
          </GlassCard>
        </main>
      </div>
    </div>
  );
}
