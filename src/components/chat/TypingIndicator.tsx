"use client";

export default function TypingIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", padding: "4px 0" }}>
      {/* Freya avatar */}
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
          boxShadow: "0 0 8px rgba(6,182,212,0.3)",
        }}
      >
        <span style={{ color: "#fff", fontWeight: 700, fontSize: "10px" }}>F</span>
      </div>

      {/* Dots */}
      <div
        style={{
          background: "var(--glass-bg)",
          border: "1px solid var(--glass-border)",
          borderRadius: "12px 12px 12px 4px",
          padding: "10px 14px",
          display: "flex",
          gap: "4px",
          alignItems: "center",
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "#06b6d4",
              display: "block",
              animation: `typing-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
