"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Step {
  text: string;
  color: string;
  bg: string;
  border: string;
}

const VIOLET  = { color: "#a78bfa", bg: "rgba(124,58,237,0.10)", border: "rgba(124,58,237,0.22)" };
const CYAN    = { color: "#06b6d4", bg: "rgba(6,182,212,0.08)",  border: "rgba(6,182,212,0.20)"  };
const GREEN   = { color: "#10b981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.20)" };
const AMBER   = { color: "#f59e0b", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.20)" };
const BLUE    = { color: "#3b82f6", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.20)" };

function inferSteps(message: string): Step[] {
  const m = message.toLowerCase();
  const steps: Step[] = [{ text: "Analyzing your request", ...VIOLET }];

  if (m.includes("pdf") || m.includes("report") || m.includes("annual") || m.includes("audit") || m.includes("upload") || m.includes("document"))
    steps.push({ text: "Reading uploaded document", ...VIOLET });

  if (m.includes("portfolio") || m.includes("kpi") || m.includes("disbursement") || m.includes("brief") || m.includes("morning"))
    steps.push({ text: "Accessing portfolio KPIs", ...CYAN });

  if (m.includes("jcf") || m.includes("brac") || m.includes("asa") || m.includes("tmss") || m.includes("esdo") || m.includes("padakhep") || m.includes("po") || m.includes("partner") || m.includes("performance"))
    steps.push({ text: "Pulling PO performance data", ...CYAN });

  if (m.includes("psychometric") || m.includes("profile") || m.includes("dimension") || m.includes("governance"))
    steps.push({ text: "Loading psychometric profiles", ...VIOLET });

  if (m.includes("flood") || m.includes("sylhet") || m.includes("river") || m.includes("disaster") || m.includes("surma") || m.includes("kushiyara"))
    steps.push({ text: "Accessing flood risk data", ...AMBER });

  if (m.includes("raise") || m.includes("smart") || m.includes("rmtp") || m.includes("reopa") || m.includes("project") || m.includes("ifr") || m.includes("burn") || m.includes("world bank") || m.includes("adb"))
    steps.push({ text: "Checking project burn rates", ...BLUE });

  if (m.includes("ces") || m.includes("bank") || m.includes("ncc") || m.includes("sonali") || m.includes("agrani"))
    steps.push({ text: "Analyzing CES bank utilization", ...CYAN });

  steps.push({ text: "Searching PKSF knowledge base", ...CYAN });
  steps.push({ text: "Composing intelligence report", ...GREEN });

  return steps;
}

interface FreyaThinkingProps {
  lastMessage?: string;
}

export default function FreyaThinking({ lastMessage = "" }: FreyaThinkingProps) {
  const steps = useMemo(() => inferSteps(lastMessage), [lastMessage]);
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    setStepIdx(0);
    const id = setInterval(() => {
      setStepIdx((i) => (i < steps.length - 1 ? i + 1 : i));
    }, 1600);
    return () => clearInterval(id);
  }, [steps.length]);

  const current = steps[stepIdx];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      style={{ display: "flex", alignItems: "flex-end", gap: "8px", padding: "3px 0" }}
    >
      {/* Avatar with pulse ring */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", inset: "-5px", borderRadius: "50%",
            border: "1.5px solid #06b6d4",
          }}
        />
        <div style={{
          width: "24px", height: "24px", borderRadius: "50%",
          background: "linear-gradient(135deg, #06b6d4, #0891b2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 10px rgba(6,182,212,0.3)",
        }}>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: "10px" }}>F</span>
        </div>
      </div>

      {/* Bubble */}
      <div style={{
        background: "var(--glass-bg)",
        border: "1px solid var(--glass-border-hover)",
        borderRadius: "16px 16px 16px 4px",
        padding: "10px 14px",
        display: "flex", flexDirection: "column", gap: "10px",
        minWidth: "220px", maxWidth: "320px",
      }}>
        {/* Activity badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={stepIdx}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.25 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "3px 9px", borderRadius: "100px",
              background: current.bg, border: `1px solid ${current.border}`,
              alignSelf: "flex-start",
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.35, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
              style={{
                width: "5px", height: "5px", borderRadius: "50%",
                background: current.color, flexShrink: 0,
              }}
            />
            <span style={{
              color: current.color, fontSize: "10px",
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontWeight: 700, letterSpacing: "0.2px", whiteSpace: "nowrap",
            }}>
              {current.text}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Step progress dots */}
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          {steps.map((s, i) => (
            <motion.div
              key={i}
              animate={i <= stepIdx
                ? { opacity: 1, scale: 1 }
                : { opacity: 0.25, scale: 0.8 }
              }
              transition={{ duration: 0.3 }}
              style={{
                width: i === stepIdx ? "14px" : "5px",
                height: "5px",
                borderRadius: "100px",
                background: i <= stepIdx ? s.color : "var(--text-dim)",
                transition: "width 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
