"use client";

type StatusType = "done" | "live" | "pending" | "alert" | "critical" | "watch" | "stable" | "on-track" | "at-risk" | "closing";

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
}

const STATUS_CONFIG: Record<StatusType, { label: string; bg: string; color: string }> = {
  done: { label: "DONE", bg: "rgba(16,185,129,0.12)", color: "#10b981" },
  live: { label: "LIVE", bg: "rgba(16,185,129,0.12)", color: "#10b981" },
  pending: { label: "PENDING", bg: "rgba(245,158,11,0.12)", color: "#f59e0b" },
  alert: { label: "ALERT", bg: "rgba(239,68,68,0.12)", color: "#ef4444" },
  critical: { label: "CRITICAL", bg: "rgba(239,68,68,0.15)", color: "#ef4444" },
  watch: { label: "WATCH", bg: "rgba(245,158,11,0.12)", color: "#f59e0b" },
  stable: { label: "STABLE", bg: "rgba(16,185,129,0.12)", color: "#10b981" },
  "on-track": { label: "ON TRACK", bg: "rgba(16,185,129,0.12)", color: "#10b981" },
  "at-risk": { label: "AT RISK", bg: "rgba(245,158,11,0.12)", color: "#f59e0b" },
  closing: { label: "CLOSING", bg: "rgba(59,130,246,0.12)", color: "#3b82f6" },
};

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      style={{
        background: config.bg,
        color: config.color,
        padding: "2px 7px",
        borderRadius: "4px",
        fontSize: "9px",
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 600,
        letterSpacing: "0.5px",
        textTransform: "uppercase" as const,
        border: `1px solid ${config.color}22`,
      }}
    >
      {label || config.label}
    </span>
  );
}
