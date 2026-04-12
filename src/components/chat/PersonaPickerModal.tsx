"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { PERSONAS, DEFAULT_PERSONA_ID } from "@/lib/personas";
import type { Persona } from "@/lib/personas";

interface PersonaPickerModalProps {
  onConfirm: (personaId: string) => void;
  onClose: () => void;
}

export default function PersonaPickerModal({ onConfirm, onClose }: PersonaPickerModalProps) {
  const [selected, setSelected] = useState<string>(DEFAULT_PERSONA_ID);
  const [confirming, setConfirming] = useState(false);

  const handleConfirm = async () => {
    if (confirming) return;
    setConfirming(true);
    await onConfirm(selected);
    setConfirming(false);
  };

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 500,
          background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "16px",
        }}
      >
        {/* Modal */}
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 8 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "var(--bg-1)",
            border: "1px solid var(--glass-border-hover)",
            borderRadius: "18px",
            width: "100%",
            maxWidth: "560px",
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
          }}
        >
          {/* Header */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "18px 20px 14px",
            borderBottom: "1px solid var(--glass-border)",
          }}>
            <div>
              <div style={{ color: "var(--text-primary)", fontSize: "15px", fontWeight: 700 }}>
                Choose Freya&apos;s Role
              </div>
              <div style={{ color: "var(--text-dim)", fontSize: "11px", marginTop: "2px", fontFamily: "var(--font-jetbrains-mono), monospace" }}>
                Each session has a dedicated AI agent
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "rgba(255,255,255,0.06)", border: "1px solid var(--glass-border)",
                borderRadius: "8px", padding: "6px", cursor: "pointer",
                color: "var(--text-muted)", display: "flex",
              }}
            >
              <X size={14} />
            </button>
          </div>

          {/* Persona grid */}
          <div style={{
            flex: 1, overflowY: "auto",
            padding: "16px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "10px",
          }}>
            {PERSONAS.map((persona: Persona) => {
              const isSelected = selected === persona.id;
              return (
                <button
                  key={persona.id}
                  onClick={() => setSelected(persona.id)}
                  style={{
                    display: "flex", flexDirection: "column", gap: "8px",
                    padding: "14px",
                    borderRadius: "12px",
                    background: isSelected ? persona.bg : "var(--glass-bg)",
                    border: `1.5px solid ${isSelected ? persona.border : "var(--glass-border)"}`,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s",
                    position: "relative",
                    outline: "none",
                  }}
                >
                  {/* Selected check */}
                  {isSelected && (
                    <div style={{
                      position: "absolute", top: "10px", right: "10px",
                      width: "18px", height: "18px", borderRadius: "50%",
                      background: persona.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Check size={11} color="#fff" strokeWidth={3} />
                    </div>
                  )}

                  {/* Color accent + label */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                      width: "36px", height: "36px", borderRadius: "10px",
                      background: isSelected ? `${persona.color}22` : "rgba(255,255,255,0.04)",
                      border: `1px solid ${isSelected ? persona.border : "var(--glass-border)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: persona.color, opacity: isSelected ? 1 : 0.5 }} />
                    </div>
                    <div>
                      <div style={{
                        color: isSelected ? persona.color : "var(--text-primary)",
                        fontSize: "13px", fontWeight: 700,
                        lineHeight: 1.2,
                      }}>
                        {persona.label}
                      </div>
                      <div style={{
                        color: "var(--text-dim)", fontSize: "9px",
                        fontFamily: "var(--font-jetbrains-mono), monospace",
                        fontWeight: 600, letterSpacing: "0.5px",
                        textTransform: "uppercase", marginTop: "2px",
                      }}>
                        {persona.shortLabel}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div style={{
                    color: isSelected ? "var(--text-secondary)" : "var(--text-muted)",
                    fontSize: "11px", lineHeight: 1.5,
                  }}>
                    {persona.description}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div style={{
            padding: "14px 16px",
            borderTop: "1px solid var(--glass-border)",
            display: "flex", gap: "10px", alignItems: "center", justifyContent: "flex-end",
          }}>
            <button
              onClick={onClose}
              style={{
                padding: "8px 16px", borderRadius: "8px",
                background: "transparent",
                border: "1px solid var(--glass-border)",
                color: "var(--text-muted)", fontSize: "12px", fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={confirming}
              style={{
                padding: "8px 20px", borderRadius: "8px",
                background: confirming ? "rgba(255,255,255,0.06)" : "linear-gradient(135deg, #7c3aed, #06b6d4)",
                border: "none",
                color: confirming ? "var(--text-muted)" : "#fff",
                fontSize: "12px", fontWeight: 700,
                cursor: confirming ? "not-allowed" : "pointer",
                transition: "all 0.15s",
                opacity: confirming ? 0.7 : 1,
              }}
            >
              {confirming ? "Creating…" : "Start Session"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
