"use client";

import { motion } from "framer-motion";
import { FileText, FileSpreadsheet, File } from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { Message as MessageType } from "@/lib/types";

function AttachmentIcon({ type, size = 12 }: { type: string; size?: number }) {
  if (type === "application/pdf") return <FileText size={size} color="rgba(239,68,68,0.8)" style={{ flexShrink: 0 }} />;
  if (type.includes("sheet") || type.includes("excel") || type.includes("csv")) return <FileSpreadsheet size={size} color="rgba(16,185,129,0.8)" style={{ flexShrink: 0 }} />;
  return <File size={size} color="rgba(255,255,255,0.7)" style={{ flexShrink: 0 }} />;
}

interface MessageProps {
  message: MessageType;
}

export default function Message({ message }: MessageProps) {
  const isUser = message.role === "user";
  const attachments = message.attachments ?? [];
  const imageAttachments = attachments.filter((a) => a.type.startsWith("image/"));
  const fileAttachments = attachments.filter((a) => !a.type.startsWith("image/"));

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{
        display: "flex",
        flexDirection: isUser ? "row-reverse" : "row",
        alignItems: "flex-end",
        gap: "8px",
        padding: "3px 0",
      }}
    >
      {/* Bot avatar */}
      {!isUser && (
        <div
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #06b6d4, #0891b2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 0 8px rgba(6,182,212,0.25)",
          }}
        >
          <span style={{ color: "#fff", fontWeight: 700, fontSize: "10px" }}>F</span>
        </div>
      )}

      {/* Message bubble */}
      <div
        style={{
          maxWidth: "88%",
          padding: "9px 13px",
          borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
          background: isUser
            ? "linear-gradient(135deg, #7c3aed, #5b21b6)"
            : "var(--glass-bg)",
          border: isUser ? "none" : "1px solid var(--glass-border-hover)",
          boxShadow: isUser ? "0 2px 12px rgba(124,58,237,0.25)" : "none",
        }}
      >
        {/* Attachment images */}
        {imageAttachments.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
              marginBottom: message.content ? "8px" : "0",
            }}
          >
            {imageAttachments.map((att, i) =>
              att.previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={att.previewUrl}
                  alt={att.name}
                  style={{
                    maxWidth: "200px",
                    maxHeight: "160px",
                    borderRadius: "8px",
                    objectFit: "cover",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                />
              ) : null
            )}
          </div>
        )}

        {/* Non-image file chips */}
        {fileAttachments.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "5px",
              marginBottom: message.content ? "8px" : "0",
            }}
          >
            {fileAttachments.map((att, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  background: att.type === "application/pdf"
                    ? "rgba(239,68,68,0.1)"
                    : "rgba(255,255,255,0.1)",
                  border: att.type === "application/pdf"
                    ? "1px solid rgba(239,68,68,0.25)"
                    : "1px solid rgba(255,255,255,0.15)",
                  maxWidth: "200px",
                }}
              >
                <AttachmentIcon type={att.type} size={12} />
                <span
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "11px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {att.name}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Message text */}
        {message.content && (
          isUser ? (
            <p
              style={{
                color: "#fff",
                fontSize: "15px",
                lineHeight: 1.6,
                margin: 0,
                fontFamily: "var(--font-dm-sans), 'DM Sans', 'Noto Sans Bengali', sans-serif",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {message.content}
            </p>
          ) : (
            <div
              style={{
                color: "var(--text-secondary)",
                fontSize: "15px",
                lineHeight: 1.6,
                fontFamily: "var(--font-dm-sans), 'DM Sans', 'Noto Sans Bengali', sans-serif",
                wordBreak: "break-word",
              }}
              className="freya-markdown"
            >
              {/* Guard: if content is a raw JSON blob (parse error fallback), show a friendly message */}
              {message.content.trimStart().startsWith("{") && message.content.includes('"answer"')
                ? "Analysis complete — see the output panels on the right."
                : <ReactMarkdown>{message.content}</ReactMarkdown>
              }
            </div>
          )
        )}

        <div
          suppressHydrationWarning
          style={{
            color: isUser ? "rgba(255,255,255,0.5)" : "var(--text-dim)",
            fontSize: "9px",
            fontFamily: "var(--font-jetbrains-mono), monospace",
            marginTop: "4px",
            textAlign: isUser ? "right" : "left",
          }}
        >
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </motion.div>
  );
}
