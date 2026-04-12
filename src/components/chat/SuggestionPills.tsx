"use client";

import { useState } from "react";

const SUGGESTIONS = [
  "Summarize Report",
  "Find Discrepancies",
  "JCF Analysis",
  "RAISE IFR",
  "Risk Analysis",
  "Compare POs",
];

interface SuggestionPillsProps {
  onSelect: (text: string) => void;
}

export default function SuggestionPills({ onSelect }: SuggestionPillsProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div
      style={{
        display: "flex",
        gap: "6px",
        overflowX: "auto",
        padding: "0 16px 8px",
        scrollbarWidth: "none",
      }}
    >
      {SUGGESTIONS.map((text, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(text)}
          onMouseEnter={() => setHoveredIdx(idx)}
          onMouseLeave={() => setHoveredIdx(null)}
          style={{
            padding: "4px 11px",
            borderRadius: "100px",
            border: `1px solid ${hoveredIdx === idx ? "#06b6d4" : "var(--glass-border)"}`,
            background: hoveredIdx === idx ? "rgba(6,182,212,0.07)" : "transparent",
            color: hoveredIdx === idx ? "#22d3ee" : "var(--text-muted)",
            fontSize: "12px",
            fontWeight: 500,
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "all 0.12s",
            flexShrink: 0,
          }}
        >
          {text}
        </button>
      ))}
    </div>
  );
}
