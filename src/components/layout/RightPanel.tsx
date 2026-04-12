"use client";

import { BarChart3 } from "lucide-react";
import OutputTabs, { getTabStyle } from "@/components/output/OutputTabs";
import OutputCard from "@/components/output/OutputCard";
import type { OutputPanel } from "@/lib/types";
import type { TabId } from "@/components/output/OutputTabs";

interface RightPanelProps {
  panels: OutputPanel[];
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function RightPanel({ panels, activeTab, onTabChange }: RightPanelProps) {
  const hasContent = panels.length > 0;

  // All unique types in order of first appearance
  const tabTypes = panels.reduce<string[]>((acc, p) => {
    if (!acc.includes(p.type)) acc.push(p.type);
    return acc;
  }, []);

  // Auto-switch: if activeTab has no panels, pick the first available type
  const effectiveTab =
    panels.some((p) => p.type === activeTab)
      ? activeTab
      : tabTypes[0] ?? activeTab;

  // Items for the active tab
  const activeItems = panels.filter((p) => p.type === effectiveTab);
  const activeStyle = getTabStyle(effectiveTab);

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
          borderBottom: hasContent ? "none" : "1px solid var(--glass-border)",
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
        {hasContent && (
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
            {panels.length} {panels.length === 1 ? "ITEM" : "ITEMS"}
          </span>
        )}
      </div>

      {/* Dynamic tabs */}
      {hasContent && (
        <OutputTabs
          activeTab={effectiveTab}
          onTabChange={onTabChange}
          panels={panels}
        />
      )}

      {/* Content area */}
      <div style={{ flex: 1, overflowY: "auto", padding: "14px" }}>
        {!hasContent ? (
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
                maxWidth: "200px", textAlign: "center", margin: 0,
              }}
            >
              Ask Freya a question or upload an annual report to see structured output here.
            </p>
          </div>
        ) : (
          /* ── Content cards ── */
          activeItems.map((item, idx) => (
            <OutputCard
              key={`${effectiveTab}-${idx}`}
              item={item}
              iconColor={activeStyle.color}
              iconBg={`${activeStyle.color}1a`}
              tabIcon={activeStyle.icon}
            />
          ))
        )}
      </div>
    </aside>
  );
}
