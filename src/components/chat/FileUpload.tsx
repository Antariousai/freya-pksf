"use client";

import { Paperclip, X } from "lucide-react";
import { useRef, useState } from "react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  uploadedFile: File | null;
  onClear: () => void;
}

export default function FileUpload({ onFileSelect, uploadedFile, onClear }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hovered, setHovered] = useState(false);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "6px 16px",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div>
        {uploadedFile ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "3px 8px",
              borderRadius: "6px",
              background: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.2)",
            }}
          >
            <Paperclip size={11} color="#10b981" strokeWidth={2} />
            <span style={{ color: "#10b981", fontSize: "10px", fontWeight: 500 }}>
              {uploadedFile.name}
            </span>
            <span
              style={{
                color: "#6a6a90",
                fontSize: "9px",
                fontFamily: "var(--font-jetbrains-mono), monospace",
              }}
            >
              {formatSize(uploadedFile.size)}
            </span>
            <button
              onClick={onClear}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                padding: 0,
              }}
            >
              <X size={10} color="#10b981" strokeWidth={2.5} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "3px 8px",
              borderRadius: "6px",
              background: "transparent",
              border: `1px solid ${hovered ? "rgba(255,255,255,0.08)" : "transparent"}`,
              cursor: "pointer",
              transition: "all 0.12s",
            }}
          >
            <Paperclip size={11} color="#6a6a90" strokeWidth={2} />
            <span style={{ color: "var(--text-muted)", fontSize: "10px" }}>
              Attach Report (PDF, Excel)
            </span>
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.xlsx,.xls,.csv"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onFileSelect(file);
          }}
        />
      </div>

      <span
        style={{
          color: "var(--text-dim)",
          fontSize: "9px",
          fontFamily: "var(--font-jetbrains-mono), monospace",
        }}
      >
        Powered by Claude Sonnet | Antarious AI
      </span>
    </div>
  );
}
