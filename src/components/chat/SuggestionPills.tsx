"use client";

import { useState } from "react";

const SUGGESTIONS = [
  "Portfolio Brief",
  "JCF Analysis",
  "RAISE IFR Status",
  "Flood Risk",
  "Summarize Report",
  "Morning Briefing",
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
        flexWrap: "wrap",
        gap: "6px",
        padding: "4px 16px 8px",
      }}
    >
      {SUGGESTIONS.map((text, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(text)}
          onMouseEnter={() => setHoveredIdx(idx)}
          onMouseLeave={() => setHoveredIdx(null)}
          style={{
            padding: "4px 10px",
            borderRadius: "100px",
            border: `1px solid ${hoveredIdx === idx ? "#06b6d4" : "var(--glass-border)"}`,
            background: hoveredIdx === idx ? "rgba(6,182,212,0.07)" : "transparent",
            color: hoveredIdx === idx ? "#22d3ee" : "var(--text-muted)",
            fontSize: "11px",
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
