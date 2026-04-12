"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { BarChart2 } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import LeftPanel from "@/components/layout/LeftPanel";
import ChatArea from "@/components/chat/ChatArea";
import RightPanel from "@/components/layout/RightPanel";
import { useIsMobile } from "@/lib/use-mobile";
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
  const [activeTab, setActiveTab] = useState<TabId>("");

  // Panel widths (desktop only)
  const [leftWidth, setLeftWidth] = useState(200);
  const [rightWidth, setRightWidth] = useState(340);

  // Mobile drawer state
  const [mobileLeftOpen, setMobileLeftOpen] = useState(false);
  const [mobileRightOpen, setMobileRightOpen] = useState(false);

  // Auto-create a session on first load if none exists
  const initialized = useRef(false);
  useEffect(() => {
    if (!checked || !authed || initialized.current) return;
    initialized.current = true;

    fetch("/api/sessions")
      .then((r) => r.json())
      .then((sessions: ChatSession[]) => {
        if (sessions.length > 0) {
          setActiveSession(sessions[0]);
        } else {
          fetch("/api/sessions", { method: "POST" })
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
    setActiveTab("");
  }, []);

  const handleNewSession = useCallback((session: ChatSession) => {
    setActiveSession(session);
    setPanels([]);
    setActiveTab("");
  }, []);

  const handleSessionDeleted = useCallback((deletedId: string) => {
    if (activeSession?.id === deletedId) {
      setActiveSession(null);
      setPanels([]);
      setActiveTab("");
    }
  }, [activeSession?.id]);

  // Called when user picks a new persona from the header dropdown:
  // creates a fresh session with that persona and switches to it
  const handlePersonaChange = useCallback(async (personaId: string) => {
    try {
      const res = await fetch("/api/sessions", {
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
    if (response.panels && response.panels.length > 0) {
      const now = new Date();
      const newPanels = response.panels.map((p) => ({ ...p, timestamp: now }));
      setPanels((prev) => [...newPanels, ...prev]);
      // Auto-switch to the first new panel type
      setActiveTab(newPanels[0].type);
      if (isMobile) setMobileRightOpen(true);
    }
  }, [isMobile]);

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
              />
              <DragHandle onDrag={dragRight} />
              <div style={{ width: rightWidth, flexShrink: 0, display: "flex", overflow: "hidden" }}>
                <RightPanel
                  panels={panels}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
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
              />
            </main>

            {mobileRightOpen && (
              <>
                <div
                  onClick={() => setMobileRightOpen(false)}
                  style={{ position: "fixed", inset: 0, top: "54px", background: "rgba(0,0,0,0.45)", zIndex: 199, backdropFilter: "blur(2px)" }}
                />
                <div
                  style={{ position: "fixed", top: "54px", right: 0, width: "92vw", maxWidth: "380px", height: "calc(100dvh - 54px)", zIndex: 200, display: "flex", overflow: "hidden", boxShadow: "-4px 0 24px rgba(0,0,0,0.25)" }}
                >
                  <RightPanel
                    panels={panels}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                  />
                </div>
              </>
            )}

            {/* Output FAB */}
            {panels.length > 0 && !mobileRightOpen && (
              <button
                onClick={() => setMobileRightOpen(true)}
                style={{ position: "fixed", bottom: "80px", right: "16px", zIndex: 150, width: "48px", height: "48px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(124,58,237,0.45)" }}
                aria-label="View output"
              >
                <BarChart2 size={20} color="#fff" strokeWidth={2} />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
