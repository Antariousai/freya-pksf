"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { BarChart2 } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import LeftPanel from "@/components/layout/LeftPanel";
import ChatArea from "@/components/chat/ChatArea";
import RightPanel from "@/components/layout/RightPanel";
import { useIsMobile } from "@/lib/use-mobile";
import { apiFetch } from "@/lib/api-client";
import { useRequireAuth } from "@/lib/use-auth";
import type { FreyaResponse, OutputPanel, ChatSession } from "@/lib/types";
import type { TabId } from "@/components/output/OutputTabs";

const LEFT_MIN = 160;
const LEFT_MAX = 380;
const RIGHT_MIN = 280;
const RIGHT_MAX = 620;

// ── Drag Handle ─────────────────────────────────────────────
function DragHandle({ onDrag }: { onDrag: (dx: number) => void }) {
  const dragging = useRef(false);
  const lastX = useRef(0);
  const [hovered, setHovered] = useState(false);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;
    lastX.current = e.clientX;

    const onMove = (ev: MouseEvent) => {
      if (!dragging.current) return;
      const dx = ev.clientX - lastX.current;
      lastX.current = ev.clientX;
      onDrag(dx);
    };
    const onUp = () => {
      dragging.current = false;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [onDrag]);

  return (
    <div
      onMouseDown={onMouseDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ width: "5px", flexShrink: 0, cursor: "col-resize", position: "relative", zIndex: 20, background: "transparent", transition: "background 0.15s" }}
    >
      <div style={{ position: "absolute", top: 0, bottom: 0, left: "2px", width: "1px", background: hovered ? "rgba(124,58,237,0.5)" : "var(--glass-border)", transition: "background 0.15s" }} />
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────
export default function ChatPage() {
  const { checked, authed } = useRequireAuth();
  const isMobile = useIsMobile();

  // Session state
  const [activeSession, setActiveSession] = useState<ChatSession | null>(null);

  // All output panels — dynamic, any type
  const [panels, setPanels] = useState<OutputPanel[]>([]);
  const [archivedPanels, setArchivedPanels] = useState<OutputPanel[]>([]);
  const [activeTab, setActiveTab] = useState<TabId>("");
  const [panelsLoading, setPanelsLoading] = useState(false);

  // Panel widths (desktop only)
  const [leftWidth, setLeftWidth] = useState(200);
  const [rightWidth, setRightWidth] = useState(340);

  // Mobile drawer state
  const [mobileLeftOpen, setMobileLeftOpen] = useState(false);
  const [mobileRightOpen, setMobileRightOpen] = useState(false);
  const [resultsFullscreen, setResultsFullscreen] = useState(false);

  // Open mobile right drawer when panel generation starts
  const handlePanelsLoading = useCallback((loading: boolean) => {
    setPanelsLoading(loading);
    if (loading && isMobile) setMobileRightOpen(true);
  }, [isMobile]);

  // Auto-create a session on first load if none exists
  const initialized = useRef(false);
  useEffect(() => {
    if (!checked || !authed || initialized.current) return;
    initialized.current = true;

    apiFetch("/api/sessions")
      .then((r) => r.json())
      .then((sessions: ChatSession[]) => {
        if (sessions.length > 0) {
          setActiveSession(sessions[0]);
        } else {
          apiFetch("/api/sessions", { method: "POST" })
            .then((r) => r.json())
            .then((s: ChatSession) => setActiveSession(s))
            .catch(console.error);
        }
      })
      .catch(console.error);
  }, [checked, authed]);

  // Clear output panels when switching sessions
  const handleSessionSelect = useCallback((session: ChatSession) => {
    setActiveSession(session);
    setPanels([]);
    setArchivedPanels([]);
    setActiveTab("");
  }, []);

  const handleNewSession = useCallback((session: ChatSession) => {
    setActiveSession(session);
    setPanels([]);
    setArchivedPanels([]);
    setActiveTab("");
  }, []);

  const handleSessionDeleted = useCallback((deletedId: string) => {
    if (activeSession?.id === deletedId) {
      setActiveSession(null);
      setPanels([]);
      setArchivedPanels([]);
      setActiveTab("");
    }
  }, [activeSession?.id]);

  // Called when user picks a new persona from the header dropdown:
  // creates a fresh session with that persona and switches to it
  const handlePersonaChange = useCallback(async (personaId: string) => {
    try {
      const res = await apiFetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ persona: personaId }),
      });
      if (res.ok) {
        const session: ChatSession = await res.json();
        setActiveSession(session);
        setPanels([]);
        setActiveTab("");
      }
    } catch (e) {
      console.error("Failed to create persona session", e);
    }
  }, []);

  const handleFreyaResponse = useCallback((response: FreyaResponse) => {
    if (!response.panels || response.panels.length === 0) return;

    const now = new Date();
    const ts = now.getTime();
    const newPanels = response.panels.map((p, i) => ({
      ...p,
      id: p.id ?? `${p.type}_${ts}_${i}`,
      timestamp: p.timestamp ?? now,
    }));

    if (response.isHistory) {
      // History panels go straight into the archive — accessible but not cluttering active tabs
      setArchivedPanels(prev => {
        const merged = [...prev];
        for (const np of newPanels) {
          // Don't duplicate if the same id is already archived
          if (!merged.some(a => a.id === np.id)) {
            merged.push(np);
          }
        }
        return merged;
      });
    } else {
      // Live panels: smart merge — same type replaces, new type appends
      setPanels(prev => {
        const merged = [...prev];
        for (const np of newPanels) {
          const idx = merged.findIndex(p => p.type === np.type);
          if (idx >= 0) {
            merged[idx] = np;
          } else {
            merged.push(np);
          }
        }
        return merged;
      });
      // Remove from archive any types that just came back live
      setArchivedPanels(prev => prev.filter(p => !newPanels.some(np => np.type === p.type)));
      setActiveTab(newPanels[0].id!);
      if (isMobile) setMobileRightOpen(true);
    }
  }, [isMobile]);

  // Close a tab → moves it to archive (still accessible)
  const handleCloseTab = useCallback((idToClose: string) => {
    setPanels(prev => {
      const toArchive = prev.filter(p => p.id === idToClose);
      if (toArchive.length > 0) {
        setArchivedPanels(arch => [...toArchive, ...arch.filter(a => a.id !== idToClose)]);
      }
      return prev.filter(p => p.id !== idToClose);
    });
    setActiveTab(prev => {
      if (prev !== idToClose) return prev;
      const remaining = panels.filter(p => p.id !== idToClose);
      return remaining[0]?.id ?? "";
    });
  }, [panels]);

  // Restore a tab from archive back to active tabs
  const handleRestoreTab = useCallback((idToRestore: string) => {
    setArchivedPanels(prev => {
      const panel = prev.find(p => p.id === idToRestore);
      if (panel) {
        setPanels(current => [...current, panel]);
        setActiveTab(idToRestore);
      }
      return prev.filter(p => p.id !== idToRestore);
    });
  }, []);

  const dragLeft = useCallback((dx: number) => {
    setLeftWidth((w) => Math.min(LEFT_MAX, Math.max(LEFT_MIN, w + dx)));
  }, []);

  const dragRight = useCallback((dx: number) => {
    setRightWidth((w) => Math.min(RIGHT_MAX, Math.max(RIGHT_MIN, w - dx)));
  }, []);

  // Block render until auth is confirmed
  if (!checked || !authed) return null;

  return (
    <div style={{ height: "100dvh", display: "flex", flexDirection: "column", overflow: "hidden", background: "var(--bg-0)" }}>
      <TopBar onMenuToggle={() => setMobileLeftOpen((o) => !o)} />

      <div style={{ flex: 1, display: "flex", overflow: "hidden", position: "relative" }}>

        {/* ── DESKTOP layout ── */}
        {!isMobile && (
          <>
            <div style={{ width: leftWidth, flexShrink: 0, display: "flex", overflow: "hidden" }}>
              <LeftPanel
                width="100%"
                activeSessionId={activeSession?.id}
                onSessionSelect={handleSessionSelect}
                onNewSession={handleNewSession}
                onSessionDeleted={handleSessionDeleted}
              />
            </div>

            <DragHandle onDrag={dragLeft} />

            <main style={{ flex: 1, display: "flex", overflow: "hidden", minWidth: 0 }}>
              <ChatArea
                session={activeSession}
                onFreyaResponse={handleFreyaResponse}
                onPersonaChange={handlePersonaChange}
                onPanelsLoading={setPanelsLoading}
              />
              <DragHandle onDrag={dragRight} />
              <div style={{ width: rightWidth, flexShrink: 0, display: "flex", overflow: "hidden" }}>
                <RightPanel
                  panels={panels}
                  archivedPanels={archivedPanels}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  onCloseTab={handleCloseTab}
                  onRestoreTab={handleRestoreTab}
                  persona={activeSession?.persona}
                  panelsLoading={panelsLoading}
                />
              </div>
            </main>
          </>
        )}

        {/* ── MOBILE layout ── */}
        {isMobile && (
          <>
            <LeftPanel
              width="100%"
              activeSessionId={activeSession?.id}
              onSessionSelect={handleSessionSelect}
              onNewSession={handleNewSession}
              onSessionDeleted={handleSessionDeleted}
              mobileOpen={mobileLeftOpen}
              onMobileClose={() => setMobileLeftOpen(false)}
            />

            <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
              <ChatArea
                session={activeSession}
                onFreyaResponse={handleFreyaResponse}
                onPersonaChange={handlePersonaChange}
                onPanelsLoading={handlePanelsLoading}
              />
            </main>

            {/* ── "Results" vertical pill — right edge, always visible when panels exist ── */}
            {(panels.length > 0 || panelsLoading) && !mobileRightOpen && (
              <button
                onClick={() => { setResultsFullscreen(true); setMobileRightOpen(true); }}
                aria-label="Open Results"
                style={{
                  position: "fixed",
                  right: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 150,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "14px 7px",
                  background: "linear-gradient(180deg, #7c3aed 0%, #06b6d4 100%)",
                  border: "none",
                  borderRadius: "10px 0 0 10px",
                  cursor: "pointer",
                  boxShadow: "-4px 0 20px rgba(124,58,237,0.4)",
                  animation: panelsLoading ? "pulse-red 1.2s ease-in-out infinite" : "none",
                }}
              >
                <BarChart2 size={14} color="#fff" strokeWidth={2.5} />
                {/* Vertical text */}
                <span style={{
                  color: "#fff",
                  fontSize: "10px",
                  fontWeight: 800,
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  letterSpacing: "1.5px",
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  transform: "rotate(180deg)",
                  userSelect: "none",
                }}>
                  {panelsLoading ? "LOADING" : "RESULTS"}
                </span>
                {/* Panel count badge */}
                {!panelsLoading && panels.length > 0 && (
                  <span style={{
                    background: "rgba(255,255,255,0.3)",
                    color: "#fff",
                    fontSize: "9px",
                    fontWeight: 800,
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    padding: "2px 5px",
                    borderRadius: "8px",
                    minWidth: "18px",
                    textAlign: "center",
                  }}>
                    {panels.length}
                  </span>
                )}
              </button>
            )}

            {/* ── Mobile output — full-screen when opened via Results pill, drawer when via FAB ── */}
            {mobileRightOpen && (
              <>
                {/* Backdrop — only shown in drawer mode */}
                {!resultsFullscreen && (
                  <div
                    onClick={() => { setMobileRightOpen(false); setResultsFullscreen(false); }}
                    style={{
                      position: "fixed", inset: 0, top: "54px",
                      background: "rgba(0,0,0,0.55)", zIndex: 199,
                      backdropFilter: "blur(3px)",
                    }}
                  />
                )}

                {/* Panel container — full-screen or drawer based on how it was opened */}
                <div
                  style={{
                    position: "fixed",
                    top: resultsFullscreen ? 0 : "54px",
                    right: 0,
                    width: resultsFullscreen ? "100vw" : "92vw",
                    maxWidth: resultsFullscreen ? "100vw" : "420px",
                    height: resultsFullscreen ? "100dvh" : "calc(100dvh - 54px)",
                    zIndex: 200,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    boxShadow: resultsFullscreen ? "none" : "-6px 0 32px rgba(0,0,0,0.35)",
                    borderLeft: resultsFullscreen ? "none" : "1px solid var(--glass-border)",
                    background: "var(--bg-0)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {/* Header bar */}
                  <div
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "0 14px",
                      height: resultsFullscreen ? "48px" : "36px",
                      flexShrink: 0,
                      background: resultsFullscreen
                        ? "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(6,182,212,0.08))"
                        : "var(--bg-1)",
                      borderBottom: "1px solid var(--glass-border)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <BarChart2 size={14} color="#a78bfa" strokeWidth={2} />
                      <span style={{
                        color: resultsFullscreen ? "#d0c8ff" : "var(--text-dim)",
                        fontSize: resultsFullscreen ? "13px" : "10px",
                        fontFamily: "var(--font-jetbrains-mono), monospace",
                        fontWeight: 700,
                        letterSpacing: "0.5px",
                      }}>
                        {resultsFullscreen ? "Analysis Results" : "ANALYSIS OUTPUT"}
                      </span>
                      {panels.length > 0 && (
                        <span style={{
                          background: "rgba(167,139,250,0.2)",
                          color: "#a78bfa",
                          fontSize: "9px",
                          fontWeight: 700,
                          fontFamily: "var(--font-jetbrains-mono), monospace",
                          padding: "2px 7px",
                          borderRadius: "10px",
                        }}>
                          {panels.length} {panels.length === 1 ? "PANEL" : "PANELS"}
                        </span>
                      )}
                    </div>
                    <div style={{ display: "flex", gap: "6px" }}>
                      {/* Toggle fullscreen / drawer */}
                      <button
                        onClick={() => setResultsFullscreen(f => !f)}
                        title={resultsFullscreen ? "Collapse" : "Full screen"}
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid var(--glass-border)",
                          borderRadius: "6px",
                          padding: "4px 8px",
                          cursor: "pointer",
                          color: "var(--text-muted)",
                          fontSize: "10px",
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        {resultsFullscreen ? "⊡" : "⊞"}
                      </button>
                      {/* Close */}
                      <button
                        onClick={() => { setMobileRightOpen(false); setResultsFullscreen(false); }}
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid var(--glass-border)",
                          borderRadius: "6px",
                          padding: "4px 8px",
                          cursor: "pointer",
                          color: "var(--text-muted)",
                          fontSize: "10px",
                          fontWeight: 600,
                        }}
                      >
                        Close ×
                      </button>
                    </div>
                  </div>

                  <RightPanel
                    panels={panels}
                    archivedPanels={archivedPanels}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    onCloseTab={handleCloseTab}
                    onRestoreTab={handleRestoreTab}
                    persona={activeSession?.persona}
                    panelsLoading={panelsLoading}
                  />
                </div>
              </>
            )}

            {/* FAB — shown when drawer closed AND Results pill isn't enough (during loading) */}
            {panelsLoading && !mobileRightOpen && (
              <button
                onClick={() => { setResultsFullscreen(false); setMobileRightOpen(true); }}
                aria-label="View generating panels"
                style={{
                  position: "fixed", bottom: "80px", right: "60px", zIndex: 150,
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "0 16px 0 12px", height: "40px",
                  borderRadius: "20px",
                  background: "rgba(124,58,237,0.15)",
                  border: "1px solid rgba(124,58,237,0.35)",
                  cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(124,58,237,0.25)",
                  animation: "pulse-red 1.2s ease-in-out infinite",
                }}
              >
                <BarChart2 size={14} color="#a78bfa" strokeWidth={2} />
                <span style={{ color: "#a78bfa", fontSize: "11px", fontWeight: 700, fontFamily: "var(--font-jetbrains-mono), monospace" }}>
                  Generating…
                </span>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
