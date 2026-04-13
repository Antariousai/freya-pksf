"use client";

import { useState } from "react";
import { BarChart3, RotateCcw, ChevronDown, ChevronUp, Clock } from "lucide-react";
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
  const [historyOpen, setHistoryOpen] = useState(true);

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
      {/* ── Panel header ── */}
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
        <div style={{ width: "24px", height: "24px", borderRadius: "7px", background: `${currentPersona.color}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <BarChart3 size={13} color={currentPersona.color} strokeWidth={2} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 700, lineHeight: 1.2 }}>Analysis Output</div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "1px" }}>
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: currentPersona.color, flexShrink: 0 }} />
            <span style={{ color: currentPersona.color, fontSize: "9px", fontFamily: "var(--font-jetbrains-mono), monospace", fontWeight: 600, letterSpacing: "0.2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {currentPersona.label}
            </span>
          </div>
        </div>
        {hasContent && (
          <span style={{ flexShrink: 0, background: `${currentPersona.color}18`, color: currentPersona.color, fontSize: "9px", fontFamily: "var(--font-jetbrains-mono), monospace", fontWeight: 700, padding: "2px 7px", borderRadius: "10px" }}>
            {panels.length} {panels.length === 1 ? "ITEM" : "ITEMS"}
          </span>
        )}
      </div>

      {/* Thin animated loading bar */}
      {panelsLoading && hasContent && (
        <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, #a78bfa, #06b6d4, transparent)", backgroundSize: "200% 100%", animation: "loadingBar 1.5s ease-in-out infinite", flexShrink: 0 }} />
      )}

      {/* ── Active tabs ── */}
      {hasContent && (
        <OutputTabs
          activeTab={effectiveTab}
          onTabChange={onTabChange}
          onCloseTab={onCloseTab}
          panels={panels}
        />
      )}

      {/* ── Main content area ── */}
      <div style={{ flex: 1, overflow: "hidden", padding: panelsLoading && !hasContent ? "0" : "14px", display: "flex", flexDirection: "column", minHeight: 0 }}>
        <AnimatePresence mode="wait">
          {panelsLoading && !hasContent ? (
            /* Loading skeleton */
            <motion.div key="loading-panels" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
              <div style={{ display: "flex", borderBottom: "1px solid var(--glass-border)", background: "var(--bg-1)", padding: "6px 8px 0", gap: "4px" }}>
                {["Brief", "Discrepancies", "Actions"].map((label) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: "5px", padding: "7px 12px", borderRadius: "8px 8px 0 0", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: "rgba(255,255,255,0.08)", animation: "shimmer 1.5s ease-in-out infinite" }} />
                    <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-dim)" }}>{label}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding: "14px" }}>
                <div style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "12px", overflow: "hidden" }}>
                  <div style={{ padding: "10px 12px", borderBottom: "1px solid var(--glass-border)", display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(255,255,255,0.06)" }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ width: "60%", height: "10px", background: "rgba(255,255,255,0.08)", borderRadius: "4px", marginBottom: "6px" }} />
                      <div style={{ width: "30%", height: "8px", background: "rgba(255,255,255,0.05)", borderRadius: "4px" }} />
                    </div>
                  </div>
                  <div style={{ padding: "16px 14px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    {[80, 60, 90, 50, 70].map((w, i) => (
                      <div key={i} style={{ height: "10px", width: `${w}%`, background: "rgba(255,255,255,0.06)", borderRadius: "4px", animation: `shimmer 1.5s ease-in-out ${i * 0.1}s infinite` }} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : !hasContent ? (
            /* Empty state */
            <motion.div key="empty" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25, ease: "easeOut" }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, paddingTop: "32px", gap: "6px" }}
            >
              <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: "linear-gradient(135deg, rgba(124,58,237,0.1), rgba(6,182,212,0.08))", border: "1px solid rgba(124,58,237,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "8px" }}>
                <BarChart3 size={24} color="#6a6a90" strokeWidth={1.5} />
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "13px", fontWeight: 600, margin: 0 }}>No Analysis Yet</p>
              <p style={{ color: "var(--text-dim)", fontSize: "11px", lineHeight: 1.6, maxWidth: "200px", textAlign: "center", margin: 0 }}>
                Ask Freya a question to see structured output here.
              </p>
            </motion.div>
          ) : (
            /* Active panel card */
            <motion.div key={effectiveTab} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.22, ease: "easeOut" }}
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

      {/* ── SESSION HISTORY — always visible, collapsible ── */}
      <div
        style={{
          flexShrink: 0,
          borderTop: "1px solid var(--glass-border)",
          background: "var(--bg-1)",
          maxHeight: historyOpen ? "220px" : "36px",
          transition: "max-height 0.25s ease",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* History header — always visible, click to collapse/expand */}
        <button
          onClick={() => setHistoryOpen(o => !o)}
          style={{
            display: "flex", alignItems: "center", gap: "7px",
            padding: "0 12px", height: "36px", flexShrink: 0,
            background: "transparent", border: "none", cursor: "pointer",
            width: "100%", textAlign: "left",
            borderBottom: historyOpen ? "1px solid var(--glass-border)" : "none",
          }}
        >
          <Clock size={11} color={archivedPanels.length > 0 ? "#a78bfa" : "var(--text-dim)"} strokeWidth={2} />
          <span style={{
            flex: 1,
            color: archivedPanels.length > 0 ? "var(--text-secondary)" : "var(--text-dim)",
            fontSize: "10px",
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontWeight: 700,
            letterSpacing: "0.5px",
          }}>
            SESSION HISTORY
          </span>
          {archivedPanels.length > 0 && (
            <span style={{
              background: "rgba(167,139,250,0.15)",
              color: "#a78bfa",
              fontSize: "9px",
              fontWeight: 700,
              fontFamily: "var(--font-jetbrains-mono), monospace",
              padding: "1px 6px",
              borderRadius: "8px",
            }}>
              {archivedPanels.length}
            </span>
          )}
          {historyOpen
            ? <ChevronDown size={12} color="var(--text-dim)" />
            : <ChevronUp size={12} color="var(--text-dim)" />
          }
        </button>

        {/* History body — scrollable list of archived panels */}
        <div style={{ flex: 1, overflowY: "auto", padding: "6px 8px", display: "flex", flexDirection: "column", gap: "4px" }}>
          {archivedPanels.length === 0 ? (
            <p style={{ color: "var(--text-dim)", fontSize: "10px", textAlign: "center", padding: "12px 0", margin: 0, fontFamily: "var(--font-jetbrains-mono), monospace" }}>
              Past results will appear here
            </p>
          ) : (
            archivedPanels.map(panel => {
              const archivedId = panel.id ?? `${panel.type}_${panel.title}`;
              const style = getTabStyle(panel.type);
              const label = getTabLabel(panel.type, panel.label);
              return (
                <button
                  key={archivedId}
                  onClick={() => onRestoreTab?.(archivedId)}
                  title={`Restore: ${panel.title || label}`}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    padding: "7px 10px",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid rgba(255,255,255,0.06)`,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s",
                    width: "100%",
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = `${style.color}12`;
                    (e.currentTarget as HTMLButtonElement).style.borderColor = `${style.color}35`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.03)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.06)";
                  }}
                >
                  {/* Type colour dot */}
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: style.color, flexShrink: 0 }} />

                  {/* Label + title */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: style.color, fontSize: "9px", fontWeight: 700, fontFamily: "var(--font-jetbrains-mono), monospace", letterSpacing: "0.3px", textTransform: "uppercase", marginBottom: "1px" }}>
                      {label}
                    </div>
                    <div style={{ color: "var(--text-secondary)", fontSize: "11px", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {panel.title || label}
                    </div>
                    {panel.timestamp && (
                      <div style={{ color: "var(--text-dim)", fontSize: "9px", fontFamily: "var(--font-jetbrains-mono), monospace", marginTop: "1px" }}>
                        {panel.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    )}
                  </div>

                  {/* Restore icon */}
                  <RotateCcw size={11} color="var(--text-dim)" strokeWidth={2} style={{ flexShrink: 0 }} />
                </button>
              );
            })
          )}
        </div>
      </div>
    </aside>
  );
}
