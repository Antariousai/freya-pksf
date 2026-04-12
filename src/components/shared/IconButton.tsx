"use client";

import { ReactNode } from "react";

interface IconButtonProps {
  icon: ReactNode;
  onClick?: () => void;
  label?: string;
  active?: boolean;
  className?: string;
  indicator?: boolean;
}

export default function IconButton({
  icon,
  onClick,
  label,
  active,
  className = "",
  indicator,
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`relative flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-150 ${className}`}
      style={{
        background: active ? "rgba(124,58,237,0.1)" : "transparent",
        border: "1px solid",
        borderColor: active ? "rgba(124,58,237,0.2)" : "transparent",
        color: active ? "#a78bfa" : "var(--text-muted)",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.background = "var(--surface-hover)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--glass-border)";
          (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "transparent";
          (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)";
        }
      }}
    >
      {icon}
      {indicator && (
        <span
          className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
          style={{ background: "#ef4444" }}
        />
      )}
    </button>
  );
}
