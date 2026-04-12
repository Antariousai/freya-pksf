"use client";

import { FileText, Search, Lightbulb } from "lucide-react";

export type TabId = "brief" | "discrepancies" | "recommendations";

interface OutputTabsProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  briefCount: number;
  discrepancyCount: number;
  recommendationCount: number;
}

const TAB_CONFIG = [
  {
    id: "brief" as TabId,
    icon: FileText,
    label: "Brief",
    activeColor: "#06b6d4",
    activeBg: "rgba(6,182,212,0.06)",
    activeBorder: "rgba(6,182,212,0.3)",
    countBg: "rgba(6,182,212,0.15)",
  },
  {
    id: "discrepancies" as TabId,
    icon: Search,
    label: "Discrepancies",
    activeColor: "#ef4444",
    activeBg: "rgba(239,68,68,0.06)",
    activeBorder: "rgba(239,68,68,0.3)",
    countBg: "rgba(239,68,68,0.15)",
  },
  {
    id: "recommendations" as TabId,
    icon: Lightbulb,
    label: "Actions",
    activeColor: "#10b981",
    activeBg: "rgba(16,185,129,0.06)",
    activeBorder: "rgba(16,185,129,0.3)",
    countBg: "rgba(16,185,129,0.15)",
  },
];

export default function OutputTabs({
  activeTab,
  onTabChange,
  briefCount,
  discrepancyCount,
  recommendationCount,
}: OutputTabsProps) {
  const counts: Record<TabId, number> = {
    brief: briefCount,
    discrepancies: discrepancyCount,
    recommendations: recommendationCount,
  };

  // Only render tabs that have content
  const visibleTabs = TAB_CONFIG.filter((t) => counts[t.id] > 0);

  if (visibleTabs.length === 0) return null;

  return (
    <div
      style={{
        display: "flex",
        borderBottom: "1px solid var(--glass-border)",
        background: "var(--bg-1)",
        flexShrink: 0,
        padding: "6px 8px 0",
        gap: "4px",
      }}
    >
      {visibleTabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        const count = counts[tab.id];

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "7px 12px",
              cursor: "pointer",
              borderRadius: "8px 8px 0 0",
              background: isActive ? tab.activeBg : "transparent",
              border: isActive ? `1px solid ${tab.activeBorder}` : "1px solid transparent",
              borderBottom: isActive ? `1px solid ${tab.activeBg}` : "1px solid transparent",
              marginBottom: isActive ? "-1px" : "0",
              transition: "all 0.15s",
              position: "relative",
            }}
          >
            <Icon size={12} color={isActive ? tab.activeColor : "#6a6a90"} strokeWidth={2} />
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: isActive ? tab.activeColor : "#6a6a90",
                whiteSpace: "nowrap",
              }}
            >
              {tab.label}
            </span>
            <span
              style={{
                background: isActive ? tab.countBg : "rgba(255,255,255,0.06)",
                color: isActive ? tab.activeColor : "#6a6a90",
                fontSize: "9px",
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontWeight: 700,
                padding: "1px 5px",
                borderRadius: "10px",
                minWidth: "16px",
                textAlign: "center",
              }}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
