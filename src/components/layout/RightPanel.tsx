"use client";

import { BarChart3, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import OutputTabs, { getTabStyle, getTabLabel } from "@/components/output/OutputTabs";
import OutputCard from "@/components/output/OutputCard";
import { getPersona } from "@/lib/personas";
import type { OutputPanel } from "@/lib/types";
import type { TabId } from "@/components/output/OutputTabs";

interface RightPanelProps {
  panels: OutputPanel[];
  archivedPanels?: OutputPanel[];
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  onCloseTab?: (type: string) => void;
  onRestoreTab?: (type: string) => void;
  persona?: string;
  panelsLoading?: boolean;
}

export default function RightPanel({
  panels,
  archivedPanels = [],
  activeTab,
  onTabChange,
  onCloseTab,
  onRestoreTab,
  persona = "assistant",
  panelsLoading = false,
}: RightPanelProps) {
  const currentPersona = getPersona(persona);
  const hasContent = panels.length > 0;

  // Auto-switch: if activeTab (an id) has no matching panel, pick the first panel
  const effectiveTab =
    panels.some((p) => (p.id ?? "") === activeTab && activeTab !== "")
      ? activeTab
      : (panels[0]?.id ?? "");

  // Single active panel (tabs are now per-panel, not per-type)
  const activePanel = panels.find((p) => (p.id ?? "") === effectiveTab) ?? panels[0] ?? null;
  const activeStyle = getTabStyle(activePanel?.type ?? "");

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
          borderBottom: (hasContent || panelsLoading) ? "none" : "1px solid var(--glass-border)",
          background: "rgba(255,255,255,0.015)",
          flexShrink: 0,
          gap: "8px",
        }}
      >
        <div
          style={{
            width: "24px", height: "24px", borderRadius: "7px",
            background: `${currentPersona.color}20`,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <BarChart3 size={13} color={currentPersona.color} strokeWidth={2} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 700, lineHeight: 1.2 }}>
            Analysis Output
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "1px" }}>
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: currentPersona.color, flexShrink: 0 }} />
            <span style={{
              color: currentPersona.color,
              fontSize: "9px",
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontWeight: 600,
              letterSpacing: "0.2px",
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>
              {currentPersona.label}
            </span>
          </div>
        </div>
        {hasContent && (
          <span
            style={{
              flexShrink: 0,
              background: `${currentPersona.color}18`,
              color: currentPersona.color,
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

      {/* Thin animated loading bar — shown when panels loading with existing content */}
      {panelsLoading && hasContent && (
        <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, #a78bfa, #06b6d4, transparent)", backgroundSize: "200% 100%", animation: "loadingBar 1.5s ease-in-out infinite", flexShrink: 0 }} />
      )}

      {/* Dynamic tabs */}
      {hasContent && (
        <OutputTabs
          activeTab={effectiveTab}
          onTabChange={onTabChange}
          onCloseTab={onCloseTab}
          panels={panels}
        />
      )}

      {/* Archive strip — closed tabs that can be restored (one pill per archived panel) */}
      {archivedPanels.length > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: "4px 10px",
            background: "rgba(255,255,255,0.02)",
            borderBottom: "1px solid var(--glass-border)",
            flexShrink: 0,
            flexWrap: "wrap",
          }}
        >
          <span style={{ color: "var(--text-dim)", fontSize: "9px", fontFamily: "var(--font-jetbrains-mono), monospace", fontWeight: 600, letterSpacing: "0.5px", marginRight: "2px", flexShrink: 0 }}>
            CLOSED
          </span>
          {archivedPanels.map(panel => {
            const archivedId = panel.id ?? `${panel.type}_${panel.title}`;
            const style = getTabStyle(panel.type);
            return (
              <button
                key={archivedId}
                onClick={() => onRestoreTab?.(archivedId)}
                title={`Restore "${getTabLabel(panel.type, panel.label)}" tab`}
                style={{
                  display: "flex", alignItems: "center", gap: "4px",
                  padding: "3px 8px",
                  borderRadius: "6px",
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid rgba(255,255,255,0.08)`,
                  cursor: "pointer",
                  color: "var(--text-dim)",
                  fontSize: "10px",
                  fontWeight: 600,
                  transition: "all 0.15s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = `${style.color}18`;
                  (e.currentTarget as HTMLButtonElement).style.borderColor = `${style.color}40`;
                  (e.currentTarget as HTMLButtonElement).style.color = style.color;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--text-dim)";
                }}
              >
                <RotateCcw size={9} strokeWidth={2.5} />
                {getTabLabel(panel.type, panel.label)}
              </button>
            );
          })}
        </div>
      )}

      {/* Content area — flex column so cards can fill the height */}
      <div style={{ flex: 1, overflow: "hidden", padding: panelsLoading && !hasContent ? "0" : "14px", display: "flex", flexDirection: "column", minHeight: 0 }}>
        <AnimatePresence mode="wait">
          {panelsLoading && !hasContent ? (
            /* ── Loading skeleton — panels generating ── */
            <motion.div key="loading-panels" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
              {/* Skeleton tab bar */}
              <div style={{ display: "flex", borderBottom: "1px solid var(--glass-border)", background: "var(--bg-1)", padding: "6px 8px 0", gap: "4px" }}>
                {["Brief", "Discrepancies", "Actions"].map((label) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: "5px", padding: "7px 12px", borderRadius: "8px 8px 0 0", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: "rgba(255,255,255,0.08)", animation: "shimmer 1.5s ease-in-out infinite" }} />
                    <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-dim)" }}>{label}</span>
                    <div style={{ width: "16px", height: "14px", borderRadius: "8px", background: "rgba(255,255,255,0.08)" }} />
                  </div>
                ))}
              </div>
              {/* Skeleton card */}
              <div style={{ padding: "14px" }}>
                <div style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "12px", overflow: "hidden" }}>
                  {/* Skeleton header */}
                  <div style={{ padding: "10px 12px", borderBottom: "1px solid var(--glass-border)", display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(255,255,255,0.06)" }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ width: "60%", height: "10px", background: "rgba(255,255,255,0.08)", borderRadius: "4px", marginBottom: "6px" }} />
                      <div style={{ width: "30%", height: "8px", background: "rgba(255,255,255,0.05)", borderRadius: "4px" }} />
                    </div>
                  </div>
                  {/* Skeleton body */}
                  <div style={{ padding: "16px 14px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    {[80, 60, 90, 50, 70].map((w, i) => (
                      <div key={i} style={{ height: "10px", width: `${w}%`, background: "rgba(255,255,255,0.06)", borderRadius: "4px", animation: `shimmer 1.5s ease-in-out ${i * 0.1}s infinite` }} />
                    ))}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px", marginTop: "8px" }}>
                      {[1, 2, 3].map(i => (
                        <div key={i} style={{ height: "60px", background: "rgba(255,255,255,0.05)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.06)" }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : !hasContent ? (
            /* ── Empty state ── */
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: 1,
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
            </motion.div>
          ) : (
            /* ── Active panel card — fill height, scroll if content overflows ── */
            <motion.div
              key={effectiveTab}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}
            >
              {activePanel && (
                <OutputCard
                  item={activePanel}
                  iconColor={activeStyle.color}
                  iconBg={`${activeStyle.color}1a`}
                  tabIcon={activeStyle.icon}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
