"use client";

import {
  FileText, Search, Lightbulb, AlertTriangle,
  Users, Activity, Shield, BarChart2, Info, X,
} from "lucide-react";
import type { OutputPanel } from "@/lib/types";

export type TabId = string;

// Canonical label for each known panel type — shown in the tab regardless of what the API returns
const TYPE_LABEL_MAP: Record<string, string> = {
  brief:           "Brief",
  summary:         "Summary",
  discrepancies:   "Discrepancies",
  compliance:      "Compliance",
  recommendations: "Actions",
  risk_analysis:   "Risk Analysis",
  po_analysis:     "PO Analysis",
  project_status:  "Project Status",
  flood_impact:    "Flood Impact",
  data_needed:     "Data Needed",
};

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
  data_needed:     { color: "#f59e0b", bg: "rgba(245,158,11,0.06)", border: "rgba(245,158,11,0.35)", countBg: "rgba(245,158,11,0.18)", icon: Info },
};

const DEFAULT_STYLE = {
  color: "#a78bfa", bg: "rgba(124,58,237,0.06)", border: "rgba(124,58,237,0.3)",
  countBg: "rgba(124,58,237,0.15)", icon: FileText,
};

export function getTabStyle(type: string) {
  return TAB_STYLE_MAP[type] ?? DEFAULT_STYLE;
}

/** Returns the canonical display label for a panel type, with API label as fallback */
export function getTabLabel(type: string, apiLabel?: string): string {
  return TYPE_LABEL_MAP[type] ?? apiLabel ?? type;
}

interface OutputTabsProps {
  activeTab: TabId;          // now an `id`, not a type
  onTabChange: (id: TabId) => void;
  onCloseTab?: (id: string) => void;
  panels: OutputPanel[];
}

export default function OutputTabs({ activeTab, onTabChange, onCloseTab, panels }: OutputTabsProps) {
  if (panels.length === 0) return null;

  // Count how many of each type appear so we can suffix duplicate labels
  const typeSeenCount: Record<string, number> = {};
  const typeRunningCount: Record<string, number> = {};

  // First pass: total count per type
  for (const p of panels) {
    typeSeenCount[p.type] = (typeSeenCount[p.type] ?? 0) + 1;
  }

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
      {panels.map((panel) => {
        // id is guaranteed to be set for all panels in state (assigned by handleFreyaResponse)
        const tabId = panel.id ?? `${panel.type}_${panel.title}`;
        const style = getTabStyle(panel.type);
        const Icon = style.icon;
        const isActive = activeTab === tabId;

        // Build display label using canonical name, with numeric suffix for duplicates
        typeRunningCount[panel.type] = (typeRunningCount[panel.type] ?? 0) + 1;
        const idx = typeRunningCount[panel.type];
        const baseLabel = getTabLabel(panel.type, panel.label);
        const displayLabel = typeSeenCount[panel.type] > 1
          ? `${baseLabel} ${idx}`
          : baseLabel;

        return (
          <div
            key={tabId}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0",
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
            {/* Tab click area */}
            <button
              onClick={() => onTabChange(tabId)}
              style={{
                display: "flex", alignItems: "center", gap: "5px",
                padding: "7px 8px 7px 12px",
                cursor: "pointer",
                background: "transparent", border: "none",
              }}
            >
              <Icon size={12} color={isActive ? style.color : "#6a6a90"} strokeWidth={2} />
              <span style={{ fontSize: "11px", fontWeight: 600, color: isActive ? style.color : "#6a6a90", whiteSpace: "nowrap" }}>
                {displayLabel}
              </span>
            </button>
            {/* Close button */}
            {onCloseTab && (
              <button
                onClick={(e) => { e.stopPropagation(); onCloseTab(tabId); }}
                title="Close tab"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: "18px", height: "18px", borderRadius: "4px",
                  marginRight: "6px",
                  background: "transparent", border: "none",
                  cursor: "pointer",
                  color: isActive ? style.color : "#6a6a90",
                  opacity: 0.6,
                  flexShrink: 0,
                  transition: "opacity 0.15s, background 0.15s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.6"; (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
              >
                <X size={10} strokeWidth={2.5} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
