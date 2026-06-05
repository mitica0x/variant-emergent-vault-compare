// 5 dimension bars — horizontal — used in Beat 3 + Beat 4
import React from "react";
import { DIMENSIONS } from "../../data/cards";

const BAR_GRADIENT = "linear-gradient(90deg, #18b4d4 0%, #0dbe82 100%)";

const DimensionBars = ({ card, layout = "vertical", barHeight = 6, compact = false }) => {
  if (!card) return null;

  // Compact single-line layout for the Beat2 accordion score panel:
  // [label w-28] [bar flex-1 h-1.5 gradient] [value w-6]. No weight subtitle.
  if (compact) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }} data-testid={`dim-bars-${card.id}`}>
        {DIMENSIONS.map((d) => {
          const val = card.dimensions[d.id] || 0;
          return (
            <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                className="font-mono"
                style={{
                  width: 112,
                  flexShrink: 0,
                  fontSize: 10,
                  color: "#6b7280",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {d.label}
              </div>
              <div style={{ flex: 1, height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 1, overflow: "hidden" }}>
                <div
                  style={{
                    width: `${val}%`,
                    height: "100%",
                    background: BAR_GRADIENT,
                    transition: "width 0.8s cubic-bezier(0.2,0.8,0.2,1)",
                  }}
                />
              </div>
              <div className="font-mono tabnum" style={{ width: 24, flexShrink: 0, fontSize: 12, color: "#e8eaf0", textAlign: "right" }}>
                {val}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: layout === "horizontal" ? "repeat(5, 1fr)" : "1fr",
        gap: 12,
      }}
      data-testid={`dim-bars-${card.id}`}
    >
      {DIMENSIONS.map((d) => {
        const val = card.dimensions[d.id] || 0;
        return (
          <div key={d.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 }}>
              <div
                className="font-mono"
                style={{
                  fontSize: 10,
                  color: "#6b7280",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                {d.label}
              </div>
              <div
                className="font-mono tabnum"
                style={{ fontSize: 12, color: "#e8eaf0", fontWeight: 500 }}
              >
                {val}
              </div>
            </div>
            <div
              style={{
                height: barHeight,
                background: "rgba(255,255,255,0.06)",
                borderRadius: 1,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${val}%`,
                  height: "100%",
                  background:
                    val >= 80 ? "#0dbe82" : val >= 60 ? "#18b4d4" : "#70a848",
                  transition: "width 0.8s cubic-bezier(0.2,0.8,0.2,1)",
                }}
              />
            </div>
            <div
              className="font-mono"
              style={{
                fontSize: 9,
                color: "#6b7280",
                letterSpacing: "0.1em",
                marginTop: 4,
              }}
            >
              WEIGHT {d.weight}%
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DimensionBars;
