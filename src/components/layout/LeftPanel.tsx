"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Plus,
  MessageSquare,
  LayoutDashboard,
  Settings2,
  Brain,
  X,
  Trash2,
} from "lucide-react";
import { useIsMobile } from "@/lib/use-mobile";
import type { ChatSession } from "@/lib/types";

interface LeftPanelProps {
  activeSessionId?: string;
  onSessionSelect?: (session: ChatSession) => void;
  onNewSession?: (session: ChatSession) => void;
  onSessionDeleted?: (id: string) => void;
  width?: string | number;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const NAV_ITEMS = [
  { icon: MessageSquare, label: "Freya Chat", route: "/chat" },
  { icon: LayoutDashboard, label: "Dashboard", route: "/dashboard" },
  { icon: Settings2, label: "Operations", route: "/operations" },
  { icon: Brain, label: "Psychometric Profiling", route: "/profiling" },
];

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d`;
  return `${Math.floor(days / 7)}w`;
}

function sessionGroup(iso: string): "today" | "yesterday" | "week" | "older" {
  const d = new Date(iso);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 86400000);
  const weekAgo = new Date(today.getTime() - 6 * 86400000);
  if (d >= today) return "today";
  if (d >= yesterday) return "yesterday";
  if (d >= weekAgo) return "week";
  return "older";
}

const GROUP_LABELS = { today: "Today", yesterday: "Yesterday", week: "This Week", older: "Older" };
const GROUP_ORDER: Array<"today" | "yesterday" | "week" | "older"> = ["today", "yesterday", "week", "older"];

function SessionItem({
  session,
  isActive,
  onClick,
  onDelete,
}: {
  session: ChatSession;
  isActive: boolean;
  onClick: () => void;
  onDelete: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "7px 8px",
        borderRadius: "8px",
        width: "100%",
        cursor: "pointer",
        transition: "all 0.12s",
        background: isActive ? "rgba(124,58,237,0.08)" : hovered ? "var(--surface-hover)" : "transparent",
        border: `1px solid ${isActive ? "rgba(124,58,237,0.15)" : hovered ? "var(--glass-border)" : "transparent"}`,
        position: "relative",
      }}
    >
      <div
        style={{
          width: "6px", height: "6px", borderRadius: "50%",
          background: session.color, flexShrink: 0,
        }}
      />
      <span
        style={{
          flex: 1,
          color: isActive ? "#a78bfa" : "var(--text-secondary)",
          fontSize: "13px",
          textAlign: "left",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {session.title}
      </span>
      {hovered ? (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          title="Delete session"
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#ef4444", display: "flex", padding: "2px", flexShrink: 0,
            opacity: 0.7, transition: "opacity 0.1s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.7"; }}
        >
          <Trash2 size={11} />
        </button>
      ) : (
        <span
          style={{
            color: "var(--text-dim)", fontSize: "9px",
            fontFamily: "var(--font-jetbrains-mono), monospace", flexShrink: 0,
          }}
        >
          {relativeTime(session.updated_at)}
        </span>
      )}
    </button>
  );
}

export default function LeftPanel({
  activeSessionId,
  onSessionSelect,
  onNewSession,
  onSessionDeleted,
  width = "240px",
  mobileOpen = false,
  onMobileClose,
}: LeftPanelProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [hoveredNew, setHoveredNew] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [creatingSession, setCreatingSession] = useState(false);

  const isChat = pathname === "/chat";

  // Load sessions from API
  const loadSessions = useCallback(async () => {
    if (!isChat) return;
    setLoadingSessions(true);
    try {
      const res = await fetch("/api/sessions");
      if (res.ok) {
        const data = await res.json();
        setSessions(data);
      }
    } catch (e) {
      console.error("Failed to load sessions", e);
    } finally {
      setLoadingSessions(false);
    }
  }, [isChat]);

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  // Refresh sessions list when active session changes (title update)
  useEffect(() => {
    if (activeSessionId) {
      const timer = setTimeout(loadSessions, 1500);
      return () => clearTimeout(timer);
    }
  }, [activeSessionId, loadSessions]);

  const handleNewSession = async () => {
    if (creatingSession) return;
    setCreatingSession(true);
    try {
      const res = await fetch("/api/sessions", { method: "POST" });
      if (res.ok) {
        const session: ChatSession = await res.json();
        setSessions((prev) => [session, ...prev]);
        onNewSession?.(session);
        onMobileClose?.();
      }
    } catch (e) {
      console.error("Failed to create session", e);
    } finally {
      setCreatingSession(false);
    }
  };

  const handleDeleteSession = async (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    onSessionDeleted?.(id);
    try {
      await fetch(`/api/sessions/${id}`, { method: "DELETE" });
    } catch (e) {
      console.error("Failed to delete session", e);
      loadSessions(); // reload on error
    }
  };

  const handleNavClick = (route: string) => {
    router.push(route);
    onMobileClose?.();
  };

  // Group sessions
  const grouped = GROUP_ORDER.reduce((acc, g) => {
    acc[g] = sessions.filter((s) => sessionGroup(s.updated_at) === g);
    return acc;
  }, {} as Record<string, ChatSession[]>);

  const mobileStyle = isMobile
    ? {
        position: "fixed" as const,
        top: "54px",
        left: 0,
        width: "280px",
        height: "calc(100dvh - 54px)",
        zIndex: 200,
        transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.25s ease",
        boxShadow: mobileOpen ? "4px 0 24px rgba(0,0,0,0.25)" : "none",
      }
    : {};

  return (
    <>
      {/* Mobile backdrop */}
      {isMobile && mobileOpen && (
        <div
          onClick={onMobileClose}
          style={{
            position: "fixed", inset: 0, top: "54px",
            background: "rgba(0,0,0,0.45)", zIndex: 199, backdropFilter: "blur(2px)",
          }}
        />
      )}

      <aside
        style={{
          width: isMobile ? "280px" : width, flexShrink: 0,
          background: "var(--bg-1)", borderRight: "1px solid var(--glass-border)",
          display: "flex", flexDirection: "column", overflow: "hidden",
          ...mobileStyle,
        }}
      >
        {/* Mobile drawer header */}
        {isMobile && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 12px 8px", borderBottom: "1px solid var(--glass-border)" }}>
            <span style={{ color: "var(--text-dim)", fontSize: "9px", fontFamily: "var(--font-jetbrains-mono), monospace", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase" }}>
              Navigation
            </span>
            <button onClick={onMobileClose} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex", alignItems: "center", padding: "4px" }}>
              <X size={16} />
            </button>
          </div>
        )}

        {/* New Session button — chat page only */}
        {isChat && (
          <div style={{ padding: "12px 12px 8px" }}>
            <button
              onClick={handleNewSession}
              disabled={creatingSession}
              onMouseEnter={() => setHoveredNew(true)}
              onMouseLeave={() => setHoveredNew(false)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: "8px",
                padding: "8px 10px", borderRadius: "12px",
                background: hoveredNew
                  ? "linear-gradient(135deg, rgba(124,58,237,0.18), rgba(6,182,212,0.12))"
                  : "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(6,182,212,0.08))",
                border: `1px solid ${hoveredNew ? "rgba(124,58,237,0.35)" : "rgba(124,58,237,0.2)"}`,
                cursor: creatingSession ? "not-allowed" : "pointer",
                transition: "all 0.15s",
                transform: hoveredNew && !creatingSession ? "translateY(-1px)" : "none",
                opacity: creatingSession ? 0.6 : 1,
              }}
            >
              <div style={{ width: "22px", height: "22px", borderRadius: "6px", background: "rgba(124,58,237,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Plus size={13} color="#a78bfa" strokeWidth={2.5} />
              </div>
              <span style={{ color: "#a78bfa", fontSize: "13px", fontWeight: 600 }}>
                {creatingSession ? "Creating…" : "New Session"}
              </span>
            </button>
          </div>
        )}

        {/* Session list — chat page only */}
        {isChat && (
          <div style={{ flex: 1, overflowY: "auto", padding: "0 8px" }}>
            {loadingSessions && sessions.length === 0 ? (
              <div style={{ padding: "20px 8px", color: "var(--text-dim)", fontSize: "11px", textAlign: "center" }}>
                Loading sessions…
              </div>
            ) : sessions.length === 0 ? (
              <div style={{ padding: "20px 8px", color: "var(--text-dim)", fontSize: "11px", textAlign: "center" }}>
                No sessions yet. Start a new one.
              </div>
            ) : (
              GROUP_ORDER.map((g) => {
                const group = grouped[g];
                if (!group?.length) return null;
                return (
                  <div key={g}>
                    <div style={{ padding: "12px 8px 6px", color: "var(--text-dim)", fontSize: "9px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-jetbrains-mono), monospace" }}>
                      {GROUP_LABELS[g]}
                    </div>
                    {group.map((session) => (
                      <SessionItem
                        key={session.id}
                        session={session}
                        isActive={session.id === activeSessionId}
                        onClick={() => { onSessionSelect?.(session); onMobileClose?.(); }}
                        onDelete={() => handleDeleteSession(session.id)}
                      />
                    ))}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Bottom navigation */}
        <div style={{ borderTop: "1px solid var(--glass-border)", padding: "8px 8px 4px", marginTop: isChat ? 0 : "auto" }}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.route;
            const Icon = item.icon;
            return (
              <button
                key={item.route}
                onClick={() => handleNavClick(item.route)}
                style={{
                  display: "flex", alignItems: "center", gap: "9px",
                  padding: isMobile ? "10px 10px" : "7px 10px",
                  borderRadius: "8px", width: "100%", cursor: "pointer",
                  transition: "all 0.12s",
                  background: isActive ? "rgba(124,58,237,0.08)" : "transparent",
                  border: `1px solid ${isActive ? "rgba(124,58,237,0.12)" : "transparent"}`,
                  marginBottom: "2px",
                }}
              >
                <Icon size={14} color={isActive ? "#a78bfa" : "#6a6a90"} strokeWidth={2} />
                <span style={{ color: isActive ? "#a78bfa" : "#6a6a90", fontSize: "13px", fontWeight: isActive ? 600 : 400 }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ padding: "8px 12px 10px", display: "flex", alignItems: "center", gap: "6px", borderTop: "1px solid var(--glass-border)" }}>
          <span className="pulse-green" style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#10b981", flexShrink: 0 }} />
          <span style={{ color: "var(--text-dim)", fontSize: "9px", fontFamily: "var(--font-jetbrains-mono), monospace", letterSpacing: "0.2px" }}>
            Online | PKSF Shohayok | Antarious AI
          </span>
        </div>
      </aside>
    </>
  );
}
