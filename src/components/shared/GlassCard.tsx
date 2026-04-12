"use client";

import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function GlassCard({ children, className = "", onClick }: GlassCardProps) {
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        background: "var(--glass-bg)",
        backdropFilter: "blur(12px)",
        border: "1px solid var(--glass-border)",
        borderRadius: "14px",
        boxShadow: "var(--shadow-card)",
      }}
    >
      {children}
    </div>
  );
}
