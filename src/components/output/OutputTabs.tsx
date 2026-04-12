"use client";

import {
  FileText, Search, Lightbulb, AlertTriangle,
  Users, Activity, Shield, BarChart2,
} from "lucide-react";
import type { OutputPanel } from "@/lib/types";

export type TabId = string;

// Style lookup for known panel types
const TAB_STYLE_MAP: Record<string, {
  color: string; bg: string; border: string; countBg: string;
  icon: React.ElementType;
}> = {
  brief:           { color: "#06b6d4", bg: "rgba(6,182,212,0.06)",  border: "rgba(6,182,212,0.3)",  countBg: "rgba(6,182,212,0.15)",  icon: FileText },
  summary:         { color: "#06b6d4", bg: "rgba(6,182,212,0.06)",  border: "rgba(6,182,212,0.3)",  countBg: "rgba(6,182,212,0.15)",  icon: FileText },
  discrepancies:   { color: "#ef4444", bg: "rgba(239,68,68,0.06)",  border: "rgba(239,68,68,0.3)",  countBg: "rgba(239,68,68,0.15)",  icon: Search },
  compliance:      { color: "#f59e0b", bg: "rgba(245,158,11,0.06)", border: "rgba(245,158,11,0.3)", countBg: "rgba(245,158,11,0.15)", icon: Shield },
  recommendations: { color: "#10b981", bg: "rgba(16,185,129,0.06)", border: "rgba(16,185,129,0.3)", countBg: "rgba(16,185,129,0.15)", icon: Lightbulb },
  risk_analysis:   { color: "#f59e0b", bg: "rgba(245,158,11,0.06)", border: "rgba(245,158,11,0.3)", countBg: "rgba(245,158,11,0.15)", icon: AlertTriangle },
  po_analysis:     { color: "#a78bfa", bg: "rgba(124,58,237,0.06)", border: "rgba(124,58,237,0.3)", countBg: "rgba(124,58,237,0.15)", icon: Users },
  project_status:  { color: "#3b82f6", bg: "rgba(59,130,246,0.06)", border: "rgba(59,130,246,0.3)", countBg: "rgba(59,130,246,0.15)", icon: Activity },
  flood_impact:    { color: "#f59e0b", bg: "rgba(245,158,11,0.06)", border: "rgba(245,158,11,0.3)", countBg: "rgba(245,158,11,0.15)", icon: BarChart2 },
};

const DEFAULT_STYLE = {
  color: "#a78bfa", bg: "rgba(124,58,237,0.06)", border: "rgba(124,58,237,0.3)",
  countBg: "rgba(124,58,237,0.15)", icon: FileText,
};

export function getTabStyle(type: string) {
  return TAB_STYLE_MAP[type] ?? DEFAULT_STYLE;
}

interface OutputTabsProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  panels: OutputPanel[];
}

export default function OutputTabs({ activeTab, onTabChange, panels }: OutputTabsProps) {
  // Derive unique tabs from panels, preserving order of first appearance
  const tabs = panels.reduce<{ type: string; label: string; count: number }[]>((acc, p) => {
    const existing = acc.find((t) => t.type === p.type);
    if (existing) {
      existing.count++;
    } else {
      acc.push({ type: p.type, label: p.label, count: 1 });
    }
    return acc;
  }, []);

  if (tabs.length === 0) return null;

  return (
    <div
      style={{
        display: "flex",
        borderBottom: "1px solid var(--glass-border)",
        background: "var(--bg-1)",
        flexShrink: 0,
        padding: "6px 8px 0",
        gap: "4px",
        overflowX: "auto",
        scrollbarWidth: "none",
      }}
    >
      {tabs.map((tab) => {
        const style = getTabStyle(tab.type);
        const Icon = style.icon;
        const isActive = activeTab === tab.type;

        return (
          <button
            key={tab.type}
            onClick={() => onTabChange(tab.type)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "7px 12px",
              cursor: "pointer",
              borderRadius: "8px 8px 0 0",
              background: isActive ? style.bg : "transparent",
              border: isActive ? `1px solid ${style.border}` : "1px solid transparent",
              borderBottom: isActive ? `1px solid ${style.bg}` : "1px solid transparent",
              marginBottom: isActive ? "-1px" : "0",
              transition: "all 0.15s",
              position: "relative",
              flexShrink: 0,
            }}
          >
            <Icon size={12} color={isActive ? style.color : "#6a6a90"} strokeWidth={2} />
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: isActive ? style.color : "#6a6a90",
                whiteSpace: "nowrap",
              }}
            >
              {tab.label}
            </span>
            <span
              style={{
                background: isActive ? style.countBg : "rgba(255,255,255,0.06)",
                color: isActive ? style.color : "#6a6a90",
                fontSize: "9px",
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontWeight: 700,
                padding: "1px 5px",
                borderRadius: "10px",
                minWidth: "16px",
                textAlign: "center",
              }}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
