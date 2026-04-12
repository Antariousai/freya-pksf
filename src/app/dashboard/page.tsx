"use client";

import { useState } from "react";
import { useRequireAuth } from "@/lib/use-auth";
import { TrendingUp, TrendingDown, Users, Building2, DollarSign, Activity, AlertTriangle, Info, AlertCircle } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import LeftPanel from "@/components/layout/LeftPanel";
import GlassCard from "@/components/shared/GlassCard";
import StatusBadge from "@/components/shared/StatusBadge";
import { KPI_DATA, PROGRAM_DATA, PROJECTS, ACTIVE_ALERTS } from "@/lib/pksf-data";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

function KPICard({
  label,
  value,
  change,
  trend,
  icon: Icon,
  iconColor,
  iconBg,
}: {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "stable";
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
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {trend === "up" ? (
              <TrendingUp size={12} color="#10b981" strokeWidth={2} />
            ) : trend === "down" ? (
              <TrendingDown size={12} color="#ef4444" strokeWidth={2} />
            ) : null}
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

const CustomTooltip = ({ active, payload, label }: any) => {
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
        <p style={{ color: "#a78bfa", fontWeight: 600 }}>{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const { checked, authed } = useRequireAuth();
  const [mobileLeftOpen, setMobileLeftOpen] = useState(false);
  if (!checked || !authed) return null;
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
              FY 2024-25 — Real-time portfolio intelligence | Updated June 2025
            </p>
          </div>

          {/* KPI row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            <KPICard
              {...KPI_DATA.disbursement}
              icon={DollarSign}
              iconColor="#a78bfa"
              iconBg="rgba(124,58,237,0.12)"
            />
            <KPICard
              {...KPI_DATA.recovery}
              icon={Activity}
              iconColor="#10b981"
              iconBg="rgba(16,185,129,0.12)"
            />
            <KPICard
              {...KPI_DATA.pos}
              icon={Building2}
              iconColor="#06b6d4"
              iconBg="rgba(6,182,212,0.12)"
            />
            <KPICard
              {...KPI_DATA.members}
              icon={Users}
              iconColor="#f59e0b"
              iconBg="rgba(245,158,11,0.12)"
            />
          </div>

          {/* Two column layout */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr minmax(300px, 360px)",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            {/* Bar chart */}
            <GlassCard>
              <div style={{ padding: "16px 16px 8px" }}>
                <div style={{ marginBottom: "14px" }}>
                  <h3 style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 600, marginBottom: "2px" }}>
                    Portfolio by Program
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                    Disbursement share by program area
                  </p>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={PROGRAM_DATA} barCategoryGap="35%">
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
                      tickFormatter={(v) => `${v}%`}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {PROGRAM_DATA.map((entry, i) => (
                        <Cell key={i} fill={entry.color} fillOpacity={0.85} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>

            {/* Alerts */}
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
                  Active Alerts
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {ACTIVE_ALERTS.map((alert) => {
                    const IconComp = alertIcons[alert.severity];
                    const color = alertColors[alert.severity];
                    return (
                      <div
                        key={alert.id}
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
                            {alert.title}
                          </p>
                          <p style={{ color: "var(--text-muted)", fontSize: "12px", lineHeight: 1.4 }}>
                            {alert.detail}
                          </p>
                          <span
                            style={{
                              color: "var(--text-dim)",
                              fontSize: "9px",
                              fontFamily: "var(--font-jetbrains-mono), monospace",
                            }}
                          >
                            {alert.time}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Project health */}
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
                Development Project Health
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "10px",
                }}
              >
                {PROJECTS.map((proj) => (
                  <div
                    key={proj.id}
                    style={{
                      padding: "12px",
                      borderRadius: "10px",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                      <div>
                        <p style={{ color: "var(--text-primary)", fontSize: "14px", fontWeight: 700 }}>
                          {proj.name}
                        </p>
                        <p style={{ color: "var(--text-dim)", fontSize: "9px", fontFamily: "var(--font-jetbrains-mono), monospace" }}>
                          {proj.funder}
                        </p>
                      </div>
                      <StatusBadge status={proj.status} />
                    </div>
                    <p style={{ color: "#a78bfa", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>
                      {proj.amount}
                    </p>
                    {/* Burn rate bar */}
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
                            width: `${proj.burnRate}%`,
                            borderRadius: "2px",
                            background:
                              proj.burnRate > 85
                                ? "#10b981"
                                : proj.burnRate > 60
                                ? "#06b6d4"
                                : proj.burnRate > 40
                                ? "#f59e0b"
                                : "#ef4444",
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "var(--text-dim)", fontSize: "9px" }}>Burn rate</span>
                      <span
                        style={{
                          color: "var(--text-muted)",
                          fontSize: "9px",
                          fontFamily: "var(--font-jetbrains-mono), monospace",
                        }}
                      >
                        {proj.burnRate}%
                      </span>
                    </div>
                    {proj.dueIn && (
                      <p
                        style={{
                          color: "#f59e0b",
                          fontSize: "9px",
                          fontFamily: "var(--font-jetbrains-mono), monospace",
                          marginTop: "4px",
                        }}
                      >
                        {proj.dueIn}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </main>
      </div>
    </div>
  );
}
