"use client";

import { useTheme } from "@/lib/theme-context";
import Image from "next/image";

interface AntariousLogoProps {
  height?: number;
}

/**
 * Antarious AI logo — transparent-bg SVG with dark text + cyan accents.
 * Light mode: rendered as-is (dark text on light TopBar).
 * Dark mode: CSS filter inverts dark↔white while preserving cyan hue.
 */
export default function AntariousLogo({ height = 30 }: AntariousLogoProps) {
  const { theme } = useTheme();

  // Native SVG: 4096 × 953
  const width = Math.round(height * (4096 / 953));

  return (
    <Image
      src="/antarious-main.svg"
      alt="Antarious AI"
      width={width}
      height={height}
      style={{
        height: `${height}px`,
        width: "auto",
        objectFit: "contain",
        filter: theme === "dark" ? "invert(1) hue-rotate(180deg)" : "none",
        transition: "filter 0.2s ease",
      }}
      priority
      unoptimized
    />
  );
}
