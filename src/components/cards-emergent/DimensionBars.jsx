// 5 dimension bars — horizontal — used in Beat 3 + Beat 4
import React from "react";
import { DIMENSIONS } from "../data/cards";

const DimensionBars = ({ card, layout = "vertical", barHeight = 6 }) => {
  if (!card) return null;
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
