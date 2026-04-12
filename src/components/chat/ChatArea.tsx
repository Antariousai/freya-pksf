"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowRight, Paperclip, X, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";
import SuggestionPills from "./SuggestionPills";
import type { Message as MessageType, Attachment, FreyaResponse, ChatSession } from "@/lib/types";

interface ChatAreaProps {
  session: ChatSession | null;
  onFreyaResponse: (response: FreyaResponse) => void;
}

interface PendingFile {
  file: File;
  previewUrl: string | null;
  base64: string | null;
}

const WELCOME_MESSAGE: MessageType = {
  id: "welcome",
  role: "assistant",
  content:
    "Good morning, Dr. Uddin. I am Freya, your AI Financial Intelligence Analyst for PKSF.\n\nI have full situational awareness of the portfolio — disbursements, PO performance, project utilization, compliance status, and disaster risk indicators. I can also search the PKSF knowledge base for policies, governance details, and institutional context.\n\nI can help you with:\n- Portfolio analysis and financial summaries\n- PO risk assessments (JCF, ESDO, Padakhep)\n- RAISE IFR preparation and project compliance\n- Sylhet flood impact modeling and borrower risk\n- CES bank utilization and fund source analysis\n- Morning executive briefings\n\nWhat would you like to analyze today, Sir?",
  timestamp: new Date(),
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

function isImage(type: string) { return type.startsWith("image/"); }
function isPDF(type: string) { return type === "application/pdf"; }
function needsBase64(type: string) { return isImage(type) || isPDF(type); }

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/** Convert a DB message row to our UI Message type */
function dbMsgToUiMsg(m: {
  id: string;
  role: "user" | "assistant";
  content: string;
  output_panels?: { type: string; label: string; title: string; html: string }[] | null;
  created_at: string;
}): MessageType {
  return {
    id: m.id,
    role: m.role,
    content: m.content,
    timestamp: new Date(m.created_at),
    panels: m.output_panels
      ? m.output_panels.map((p) => ({ ...p, timestamp: new Date(m.created_at) }))
      : undefined,
  };
}

export default function ChatArea({ session, onFreyaResponse }: ChatAreaProps) {
  const [messages, setMessages] = useState<MessageType[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const prevSessionId = useRef<string | null>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      pendingFiles.forEach((pf) => { if (pf.previewUrl) URL.revokeObjectURL(pf.previewUrl); });
    };
  }, [pendingFiles]);

  // Load session history when session changes
  useEffect(() => {
    if (!session) {
      setMessages([WELCOME_MESSAGE]);
      prevSessionId.current = null;
      return;
    }
    if (session.id === prevSessionId.current) return;
    prevSessionId.current = session.id;

    setLoadingHistory(true);
    setMessages([WELCOME_MESSAGE]);

    fetch(`/api/sessions/${session.id}`)
      .then((r) => r.json())
      .then((data) => {
        const dbMessages: MessageType[] = (data.messages ?? []).map(dbMsgToUiMsg);
        if (dbMessages.length > 0) {
          setMessages([WELCOME_MESSAGE, ...dbMessages]);
          // Re-emit structured responses to repopulate right panel
          dbMessages
            .filter((m) => m.role === "assistant" && m.panels && m.panels.length > 0)
            .slice(-3)
            .forEach((m) => {
              onFreyaResponse({ answer: m.content, panels: m.panels! });
            });
        }
      })
      .catch(console.error)
      .finally(() => setLoadingHistory(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.id]);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    const processed = await Promise.all(
      files.map(async (file): Promise<PendingFile | null> => {
        if (file.size > MAX_FILE_SIZE) {
          alert(`${file.name} exceeds 5 MB limit and was skipped.`);
          return null;
        }
        const preview = isImage(file.type) ? URL.createObjectURL(file) : null;
        // Convert images AND PDFs to base64 for Claude's native document reading
        const base64 = needsBase64(file.type) ? await fileToBase64(file) : null;
        return { file, previewUrl: preview, base64 };
      })
    );

    const valid = processed.filter((p): p is PendingFile => p !== null);
    setPendingFiles((prev) => [...prev, ...valid]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const removeFile = (idx: number) => {
    setPendingFiles((prev) => {
      const next = [...prev];
      if (next[idx].previewUrl) URL.revokeObjectURL(next[idx].previewUrl!);
      next.splice(idx, 1);
      return next;
    });
  };

  const sendMessage = async (text: string) => {
    if ((!text.trim() && pendingFiles.length === 0) || isLoading) return;

    const attachments: Attachment[] = pendingFiles.map((pf) => ({
      name: pf.file.name, type: pf.file.type, previewUrl: pf.previewUrl ?? undefined,
    }));

    const userMessage: MessageType = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
      attachments: attachments.length > 0 ? attachments : undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // All base64-encoded files (images + PDFs) go to Claude as content blocks
    const base64Attachments = pendingFiles
      .filter((pf) => pf.base64 !== null)
      .map((pf) => ({ name: pf.file.name, mediaType: pf.file.type, base64: pf.base64! }));

    // Non-encodable files (xlsx, docx, etc.) — just mention by name
    const nonImageNames = pendingFiles
      .filter((pf) => pf.base64 === null)
      .map((pf) => pf.file.name);

    setPendingFiles([]);
    setIsLoading(true);

    try {
      // Build conversation history (exclude welcome message)
      const history = messages
        .filter((m) => m.id !== "welcome")
        .concat(userMessage)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history,
          sessionId: session?.id,
          attachments: base64Attachments.length > 0 ? base64Attachments : undefined,
          fileNames: nonImageNames.length > 0 ? nonImageNames : undefined,
        }),
      });

      if (!res.ok) throw new Error("API error");

      const freya: FreyaResponse = await res.json();

      const now = new Date();
      const botMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: freya.answer,
        timestamp: now,
        panels: freya.panels?.map((p) => ({ ...p, timestamp: now })),
      };

      setMessages((prev) => [...prev, botMessage]);
      onFreyaResponse(freya);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I encountered an issue processing your request. Please check the API configuration and try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const canSend = (input.trim().length > 0 || pendingFiles.length > 0) && !isLoading;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "var(--bg-0)" }}>
      {/* Chat header */}
      <div style={{ height: "46px", display: "flex", alignItems: "center", padding: "0 16px", background: "rgba(255,255,255,0.015)", borderBottom: "1px solid var(--glass-border)", backdropFilter: "blur(8px)", flexShrink: 0, gap: "10px" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, #06b6d4, #0891b2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 0 12px rgba(6,182,212,0.35)" }}>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: "14px" }}>F</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 700 }}>Freya</span>
            <span style={{ color: "#22d3ee", fontSize: "10px", fontFamily: "var(--font-jetbrains-mono), monospace" }}>AI Analyst</span>
          </div>
          <div style={{ color: "var(--text-muted)", fontSize: "10px", marginTop: "1px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {session ? session.title : "PKSF Financial Intelligence"}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 8px", display: "flex", flexDirection: "column", gap: "4px" }}>
        {loadingHistory && (
          <div style={{ textAlign: "center", color: "var(--text-dim)", fontSize: "11px", padding: "20px 0" }}>
            Loading conversation…
          </div>
        )}
        <AnimatePresence initial={false}>
          {messages.map((msg) => <Message key={msg.id} message={msg} />)}
        </AnimatePresence>
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion pills */}
      <SuggestionPills onSelect={sendMessage} />

      {/* Input area */}
      <div style={{ padding: "0 12px 4px" }}>
        {/* File chips */}
        {pendingFiles.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "8px", padding: "6px 4px 2px" }}>
            {pendingFiles.map((pf, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: "6px", background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "8px", padding: "4px 8px 4px 6px", maxWidth: "200px" }}>
                {pf.previewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={pf.previewUrl} alt={pf.file.name} style={{ width: "24px", height: "24px", borderRadius: "4px", objectFit: "cover", flexShrink: 0 }} />
                ) : (
                  <FileText size={14} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                )}
                <div style={{ minWidth: 0 }}>
                  <div style={{ color: "var(--text-secondary)", fontSize: "11px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{pf.file.name}</div>
                  <div style={{ color: "var(--text-dim)", fontSize: "9px", fontFamily: "var(--font-jetbrains-mono), monospace" }}>{formatBytes(pf.file.size)}</div>
                </div>
                <button onClick={() => removeFile(idx)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex", padding: "2px", flexShrink: 0 }}>
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Input row */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 6px 6px 10px", borderRadius: "100px", background: "var(--bg-1)", border: `1px solid ${inputFocused ? "rgba(6,182,212,0.4)" : "rgba(255,255,255,0.07)"}`, boxShadow: inputFocused ? "0 0 16px rgba(6,182,212,0.1)" : "none", transition: "border-color 0.15s, box-shadow 0.15s" }}>
          <input ref={fileInputRef} type="file" multiple accept="image/*,.pdf,.xlsx,.xls,.docx,.doc,.txt,.csv" onChange={handleFileSelect} style={{ display: "none" }} />

          <button
            onClick={() => fileInputRef.current?.click()}
            title="Attach file"
            style={{ background: "none", border: "none", cursor: "pointer", color: pendingFiles.length > 0 ? "#06b6d4" : "var(--text-muted)", display: "flex", alignItems: "center", padding: "4px", flexShrink: 0, transition: "color 0.15s" }}
          >
            <Paperclip size={16} strokeWidth={2} />
          </button>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            placeholder="Ask Freya about PKSF operations…"
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", fontSize: "15px", fontFamily: "var(--font-dm-sans), 'DM Sans', 'Noto Sans Bengali', sans-serif" }}
          />

          <button
            onClick={() => sendMessage(input)}
            disabled={!canSend}
            style={{ width: "36px", height: "36px", borderRadius: "50%", background: canSend ? "linear-gradient(135deg, #06b6d4, #0891b2)" : "rgba(255,255,255,0.05)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: canSend ? "pointer" : "not-allowed", transition: "all 0.15s", flexShrink: 0, boxShadow: canSend ? "0 0 12px rgba(6,182,212,0.35)" : "none" }}
          >
            <ArrowRight size={16} color={canSend ? "#fff" : "#4a4a68"} strokeWidth={2.5} />
          </button>
        </div>

        <p style={{ textAlign: "center", color: "var(--text-dim)", fontSize: "9px", fontFamily: "var(--font-jetbrains-mono), monospace", marginTop: "6px", marginBottom: "8px", lineHeight: 1.5 }}>
          Freya may produce inaccurate analysis. Verify critical financial data independently.
          Powered by Claude Sonnet · Antarious AI · PKSF Shohayok
        </p>
      </div>
    </div>
  );
}
