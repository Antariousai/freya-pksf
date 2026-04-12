"use client";

import { Search, Bell, Settings, Sun, Moon, Menu, LogOut } from "lucide-react";
import IconButton from "@/components/shared/IconButton";
import AntariousLogo from "@/components/shared/AntariousLogo";
import { useTheme } from "@/lib/theme-context";
import { useIsMobile } from "@/lib/use-mobile";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";

interface TopBarProps {
  onMenuToggle?: () => void;
}

export default function TopBar({ onMenuToggle }: TopBarProps) {
  const { theme, toggle } = useTheme();
  const [searchFocused, setSearchFocused] = useState(false);
  const isMobile = useIsMobile();
  const isLight = theme === "light";
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <header
      style={{
        height: "54px",
        background: "var(--bg-1)",
        borderBottom: "1px solid var(--topbar-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "0 12px" : "0 16px",
        flexShrink: 0,
        position: "relative",
        zIndex: 10,
      }}
    >
      {/* Gradient accent line */}
      <div className="gradient-line absolute bottom-0 left-0 right-0" style={{ opacity: 0.6 }} />

      {/* Left: [hamburger on mobile] + Logo + PKSF tag */}
      <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "8px" : "12px" }}>
        {/* Hamburger — mobile only */}
        {isMobile && (
          <IconButton
            icon={<Menu size={18} strokeWidth={2} />}
            label="Open menu"
            onClick={onMenuToggle}
          />
        )}

        <AntariousLogo height={isMobile ? 24 : 30} />

        {/* Desktop-only elements */}
        {!isMobile && (
          <>
            <div style={{ width: "1px", height: "20px", background: "var(--glass-border)" }} />

            {/* PKSF tag */}
            <div
              style={{
                background: isLight
                  ? "linear-gradient(135deg, rgba(124,58,237,0.14), rgba(6,182,212,0.14))"
                  : "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.15))",
                border: `1px solid ${isLight ? "rgba(6,182,212,0.45)" : "rgba(6,182,212,0.25)"}`,
                borderRadius: "100px",
                padding: "2px 9px",
              }}
            >
              <span
                style={{
                  color: isLight ? "#0891b2" : "#22d3ee",
                  fontSize: "9px",
                  fontFamily: "var(--font-jetbrains-mono), 'JetBrains Mono', monospace",
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                PKSF INTELLIGENCE
              </span>
            </div>
          </>
        )}
      </div>

      {/* Right: Search + Actions + Avatar */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {/* Search — desktop only */}
        {!isMobile && (
          <div
            style={{
              width: "220px",
              height: "32px",
              borderRadius: "100px",
              background: "var(--glass-bg)",
              border: `1px solid ${searchFocused ? "rgba(124,58,237,0.5)" : "var(--glass-border)"}`,
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "0 10px",
              transition: "border-color 0.15s, box-shadow 0.15s",
              boxShadow: searchFocused ? "0 0 12px rgba(124,58,237,0.12)" : "none",
            }}
          >
            <Search size={13} color="var(--text-muted)" strokeWidth={2} />
            <input
              placeholder="Search sessions, reports…"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "var(--text-secondary)",
                fontSize: "12px",
                flex: 1,
                fontFamily: "inherit",
              }}
            />
          </div>
        )}

        {/* Theme toggle */}
        <IconButton
          icon={isLight ? <Moon size={15} strokeWidth={2} /> : <Sun size={15} strokeWidth={2} />}
          label={isLight ? "Switch to dark mode" : "Switch to light mode"}
          onClick={toggle}
        />

        {/* Bell + Settings — desktop only */}
        {!isMobile && (
          <>
            <IconButton icon={<Bell size={15} strokeWidth={2} />} label="Notifications" indicator />
            <IconButton icon={<Settings size={15} strokeWidth={2} />} label="Settings" />
          </>
        )}

        {/* Logout */}
        <IconButton icon={<LogOut size={15} strokeWidth={2} />} label="Sign out" onClick={handleLogout} />

        {/* Avatar */}
        <div
          style={{
            width: isMobile ? "30px" : "34px",
            height: isMobile ? "30px" : "34px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #06b6d4, #0891b2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
            boxShadow: "0 0 10px rgba(6,182,212,0.25)",
          }}
        >
          <span
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: isMobile ? "11px" : "12px",
              fontFamily: "var(--font-jetbrains-mono), monospace",
            }}
          >
            FK
          </span>
        </div>
      </div>
    </header>
  );
}
