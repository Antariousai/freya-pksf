"use client";

import { FileText, Search, Lightbulb, Upload, BarChart3 } from "lucide-react";
import OutputTabs from "@/components/output/OutputTabs";
import OutputCard from "@/components/output/OutputCard";
import type { OutputTab } from "@/lib/types";
import type { TabId } from "@/components/output/OutputTabs";

interface RightPanelProps {
  briefs: OutputTab[];
  discrepancies: OutputTab[];
  recommendations: OutputTab[];
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  onPromptSelect?: (text: string) => void;
}

const EMPTY_PROMPTS = [
  {
    icon: FileText,
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.08)",
    border: "rgba(6,182,212,0.15)",
    text: "Give me a portfolio brief",
  },
  {
    icon: Search,
    color: "#ef4444",
    bg: "rgba(239,68,68,0.06)",
    border: "rgba(239,68,68,0.12)",
    text: "Audit the JCF PO",
  },
  {
    icon: Upload,
    color: "#a78bfa",
    bg: "rgba(124,58,237,0.06)",
    border: "rgba(124,58,237,0.12)",
    text: "Upload annual report",
  },
  {
    icon: Lightbulb,
    color: "#10b981",
    bg: "rgba(16,185,129,0.06)",
    border: "rgba(16,185,129,0.12)",
    text: "Morning executive brief",
  },
];

const TAB_ICON: Record<TabId, React.ElementType> = {
  brief: FileText,
  discrepancies: Search,
  recommendations: Lightbulb,
};

const TAB_COLOR: Record<TabId, string> = {
  brief: "#06b6d4",
  discrepancies: "#ef4444",
  recommendations: "#10b981",
};

const TAB_BG: Record<TabId, string> = {
  brief: "rgba(6,182,212,0.12)",
  discrepancies: "rgba(239,68,68,0.12)",
  recommendations: "rgba(16,185,129,0.12)",
};

export default function RightPanel({
  briefs,
  discrepancies,
  recommendations,
  activeTab,
  onTabChange,
  onPromptSelect,
}: RightPanelProps) {
  const hasAnyContent =
    briefs.length > 0 || discrepancies.length > 0 || recommendations.length > 0;

  const currentItems =
    activeTab === "brief"
      ? briefs
      : activeTab === "discrepancies"
      ? discrepancies
      : recommendations;

  // Auto-switch to a tab that has content if current is empty
  const effectiveTab = currentItems.length > 0
    ? activeTab
    : briefs.length > 0
    ? "brief"
    : discrepancies.length > 0
    ? "discrepancies"
    : "recommendations";

  const effectiveItems =
    effectiveTab === "brief"
      ? briefs
      : effectiveTab === "discrepancies"
      ? discrepancies
      : recommendations;

  return (
    <aside
      style={{
        width: "100%",
        background: "var(--bg-0)",
        borderLeft: "1px solid var(--glass-border)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Panel header */}
      <div
        style={{
          height: "46px",
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          borderBottom: hasAnyContent ? "none" : "1px solid var(--glass-border)",
          background: "rgba(255,255,255,0.015)",
          flexShrink: 0,
          gap: "8px",
        }}
      >
        <div
          style={{
            width: "24px", height: "24px", borderRadius: "7px",
            background: "rgba(124,58,237,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <BarChart3 size={13} color="#a78bfa" strokeWidth={2} />
        </div>
        <span style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 700 }}>
          Analysis Output
        </span>
        {hasAnyContent && (
          <span
            style={{
              marginLeft: "auto",
              background: "rgba(124,58,237,0.12)",
              color: "#a78bfa",
              fontSize: "9px",
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontWeight: 700,
              padding: "2px 7px",
              borderRadius: "10px",
            }}
          >
            {briefs.length + discrepancies.length + recommendations.length} ITEMS
          </span>
        )}
      </div>

      {/* Dynamic tabs — only rendered when content exists */}
      {hasAnyContent && (
        <OutputTabs
          activeTab={effectiveTab}
          onTabChange={onTabChange}
          briefCount={briefs.length}
          discrepancyCount={discrepancies.length}
          recommendationCount={recommendations.length}
        />
      )}

      {/* Content area */}
      <div style={{ flex: 1, overflowY: "auto", padding: "14px" }}>
        {!hasAnyContent ? (
          /* ── Empty state ── */
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
              paddingTop: "32px",
              gap: "6px",
            }}
          >
            {/* Animated icon */}
            <div
              style={{
                width: "52px", height: "52px", borderRadius: "14px",
                background: "linear-gradient(135deg, rgba(124,58,237,0.1), rgba(6,182,212,0.08))",
                border: "1px solid rgba(124,58,237,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "8px",
              }}
            >
              <BarChart3 size={24} color="#6a6a90" strokeWidth={1.5} />
            </div>

            <p style={{ color: "var(--text-secondary)", fontSize: "13px", fontWeight: 600, margin: 0 }}>
              No Analysis Yet
            </p>
            <p
              style={{
                color: "var(--text-dim)", fontSize: "11px", lineHeight: 1.6,
                maxWidth: "200px", textAlign: "center", margin: "0 0 20px",
              }}
            >
              Ask Freya a question or upload an annual report to see structured output here.
            </p>

            {/* Prompt chips */}
            <div style={{ display: "flex", flexDirection: "column", gap: "7px", width: "100%" }}>
              {EMPTY_PROMPTS.map((p) => {
                const Icon = p.icon;
                return (
                  <button
                    key={p.text}
                    onClick={() => onPromptSelect?.(p.text)}
                    style={{
                      display: "flex", alignItems: "center", gap: "9px",
                      padding: "8px 10px", borderRadius: "8px",
                      background: p.bg, border: `1px solid ${p.border}`,
                      cursor: onPromptSelect ? "pointer" : "default",
                      textAlign: "left", width: "100%",
                      transition: "opacity 0.15s",
                    }}
                    onMouseEnter={(e) => { if (onPromptSelect) e.currentTarget.style.opacity = "0.75"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                  >
                    <Icon size={13} color={p.color} strokeWidth={2} style={{ flexShrink: 0 }} />
                    <span style={{ color: "var(--text-muted)", fontSize: "11px" }}>{p.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* ── Content cards ── */
          effectiveItems.map((item, idx) => (
            <OutputCard
              key={idx}
              item={item}
              iconColor={TAB_COLOR[effectiveTab]}
              iconBg={TAB_BG[effectiveTab]}
              tabIcon={TAB_ICON[effectiveTab]}
            />
          ))
        )}
      </div>
    </aside>
  );
}
