"use client";

import { useState } from "react";
import { useRequireAuth } from "@/lib/use-auth";
import TopBar from "@/components/layout/TopBar";
import LeftPanel from "@/components/layout/LeftPanel";
import GlassCard from "@/components/shared/GlassCard";
import { PSYCHOMETRIC_PROFILES } from "@/lib/pksf-data";

function TierBadge({ tier }: { tier: string }) {
  const config: Record<string, { bg: string; color: string }> = {
    A: { bg: "rgba(16,185,129,0.12)", color: "#10b981" },
    B: { bg: "rgba(59,130,246,0.12)", color: "#3b82f6" },
    C: { bg: "rgba(245,158,11,0.12)", color: "#f59e0b" },
    D: { bg: "rgba(239,68,68,0.12)", color: "#ef4444" },
  };
  const c = config[tier] || config["B"];
  return (
    <span
      style={{
        background: c.bg,
        color: c.color,
        padding: "2px 8px",
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

function RiskBadge({ flag }: { flag: string }) {
  const config: Record<string, { bg: string; color: string }> = {
    "HIGH RISK": { bg: "rgba(239,68,68,0.12)", color: "#ef4444" },
    STABLE: { bg: "rgba(16,185,129,0.12)", color: "#10b981" },
    WATCH: { bg: "rgba(245,158,11,0.12)", color: "#f59e0b" },
  };
  const c = config[flag] || config["WATCH"];
  return (
    <span
      style={{
        background: c.bg,
        color: c.color,
        padding: "2px 8px",
        borderRadius: "4px",
        fontSize: "9px",
        fontFamily: "var(--font-jetbrains-mono), monospace",
        fontWeight: 700,
        border: `1px solid ${c.color}22`,
      }}
    >
      {flag}
    </span>
  );
}

// Simple SVG radar chart
function RadarChart({
  dimensions,
  color,
}: {
  dimensions: { name: string; score: number; max: number }[];
  color: string;
}) {
  const size = 140;
  const cx = size / 2;
  const cy = size / 2;
  const r = 55;
  const n = dimensions.length;

  const angleStep = (2 * Math.PI) / n;
  const startAngle = -Math.PI / 2;

  const polarToCart = (angle: number, radius: number) => ({
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  });

  // Grid rings
  const gridRings = [0.25, 0.5, 0.75, 1.0].map((frac) => {
    const pts = dimensions.map((_, i) => {
      const angle = startAngle + i * angleStep;
      const pt = polarToCart(angle, r * frac);
      return `${pt.x},${pt.y}`;
    });
    return pts.join(" ");
  });

  // Axis lines
  const axisLines = dimensions.map((_, i) => {
    const angle = startAngle + i * angleStep;
    const end = polarToCart(angle, r);
    return { x2: end.x, y2: end.y };
  });

  // Data polygon
  const dataPoints = dimensions.map((d, i) => {
    const angle = startAngle + i * angleStep;
    const radius = r * (d.score / d.max);
    return polarToCart(angle, radius);
  });
  const dataPath = dataPoints.map((pt) => `${pt.x},${pt.y}`).join(" ");

  // Labels
  const labelPositions = dimensions.map((d, i) => {
    const angle = startAngle + i * angleStep;
    const labelR = r + 16;
    const pos = polarToCart(angle, labelR);
    return { ...pos, name: d.name, score: d.score };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Grid rings */}
      {gridRings.map((pts, i) => (
        <polygon
          key={i}
          points={pts}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={0.75}
        />
      ))}

      {/* Axis lines */}
      {axisLines.map((line, i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={line.x2}
          y2={line.y2}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={0.75}
        />
      ))}

      {/* Data polygon */}
      <polygon
        points={dataPath}
        fill={`${color}20`}
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />

      {/* Data points */}
      {dataPoints.map((pt, i) => (
        <circle key={i} cx={pt.x} cy={pt.y} r={2.5} fill={color} />
      ))}
    </svg>
  );
}

function DimensionBar({
  name,
  score,
  max,
  color,
}: {
  name: string;
  score: number;
  max: number;
  color: string;
}) {
  const pct = (score / max) * 100;
  return (
    <div style={{ marginBottom: "8px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
        <span style={{ color: "var(--text-secondary)", fontSize: "12px" }}>{name}</span>
        <span
          style={{
            color,
            fontSize: "12px",
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontWeight: 600,
          }}
        >
          {score}
        </span>
      </div>
      <div
        style={{
          height: "4px",
          borderRadius: "2px",
          background: "rgba(255,255,255,0.05)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            borderRadius: "2px",
            background: color,
            transition: "width 0.4s ease",
          }}
        />
      </div>
    </div>
  );
}

const PROFILE_COLORS = ["#ef4444", "#10b981", "#f59e0b", "#06b6d4"];

export default function ProfilingPage() {
  const { checked, authed } = useRequireAuth();
  const [mobileLeftOpen, setMobileLeftOpen] = useState(false);
  if (!checked || !authed) return null;
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
              Behavioral Intelligence
            </span>
            <h1 style={{ color: "var(--text-primary)", fontSize: "20px", fontWeight: 700, marginTop: "2px" }}>
              PO Psychometric Profiling
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
              5-dimensional institutional health assessment for PKSF partner organizations
            </p>
          </div>

          {/* Methodology note */}
          <GlassCard className="mb-5">
            <div style={{ padding: "12px 16px" }}>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                {[
                  { label: "Financial Health", desc: "Recovery rates, PAR, NPL, capital adequacy" },
                  { label: "Governance Quality", desc: "Board structure, compliance, audit findings" },
                  { label: "Operational Resilience", desc: "Staff retention, branch efficiency, MIS quality" },
                  { label: "Social Impact", desc: "Member outcomes, women empowerment, poverty graduation" },
                  { label: "Adaptive Capacity", desc: "Digital adoption, crisis response, innovation index" },
                ].map((dim) => (
                  <div key={dim.label} style={{ flex: "1 1 180px" }}>
                    <p style={{ color: "#a78bfa", fontSize: "12px", fontWeight: 600, marginBottom: "2px" }}>
                      {dim.label}
                    </p>
                    <p style={{ color: "var(--text-dim)", fontSize: "12px" }}>{dim.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Profile cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "14px" }}>
            {PSYCHOMETRIC_PROFILES.map((profile, idx) => {
              const color = PROFILE_COLORS[idx % PROFILE_COLORS.length];
              return (
                <GlassCard key={profile.id}>
                  <div style={{ padding: "16px" }}>
                    {/* Header */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                      <div>
                        <h3 style={{ color: "var(--text-primary)", fontSize: "14px", fontWeight: 700, marginBottom: "2px" }}>
                          {profile.fullName}
                        </h3>
                        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                          <TierBadge tier={profile.tier} />
                          <RiskBadge flag={profile.riskFlag} />
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div
                          style={{
                            color,
                            fontSize: "28px",
                            fontWeight: 700,
                            fontFamily: "var(--font-jetbrains-mono), monospace",
                            lineHeight: 1,
                          }}
                        >
                          {profile.overallScore}
                        </div>
                        <div style={{ color: "var(--text-dim)", fontSize: "9px" }}>Overall Score</div>
                      </div>
                    </div>

                    {/* Radar + Bars */}
                    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                      <div style={{ flexShrink: 0 }}>
                        <RadarChart dimensions={profile.dimensions} color={color} />
                      </div>
                      <div style={{ flex: 1 }}>
                        {profile.dimensions.map((dim) => (
                          <DimensionBar
                            key={dim.name}
                            name={dim.name}
                            score={dim.score}
                            max={dim.max}
                            color={color}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Recommendation */}
                    <div
                      style={{
                        marginTop: "12px",
                        padding: "8px 10px",
                        borderRadius: "8px",
                        background: `${color}08`,
                        border: `1px solid ${color}18`,
                      }}
                    >
                      <p style={{ color: "var(--text-muted)", fontSize: "12px", lineHeight: 1.5 }}>
                        {profile.recommendation}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
