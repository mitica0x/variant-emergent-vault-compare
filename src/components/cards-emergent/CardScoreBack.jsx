// CardScoreBack — scoring back: score ring + 5 dim bars + emerald cashback + Apply CTA.
// Used in the accordion expanded view / result screen (NOT the hero physical flip).
import React from "react";
import { DIMENSIONS } from "../../data/cards";

const ScoreRingMini = ({ score, size = 64 }) => {
  const r = size / 2 - 3;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#0dbe82"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="50%"
        dy="0.35em"
        textAnchor="middle"
        fill="#e8eaf0"
        fontFamily="Geist Mono, monospace"
        fontSize={size * 0.34}
        fontWeight="500"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {score}
      </text>
    </svg>
  );
};

const CardScoreBack = ({ card, size = "lg" }) => {
  const dims =
    size === "sm"
      ? { w: 140, h: 88, pad: 8, ring: 32, gap: 3 }
      : size === "md"
      ? { w: 240, h: 152, pad: 12, ring: 48, gap: 4 }
      : { w: 420, h: 264, pad: 22, ring: 88, gap: 6 };

  return (
    <div
      style={{
        width: dims.w,
        height: dims.h,
        background: "#0f1422",
        color: "#e8eaf0",
        borderRadius: 14,
        position: "relative",
        padding: dims.pad,
        overflow: "hidden",
        boxShadow:
          "0 30px 60px -25px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 0.5px rgba(255,255,255,0.08)",
        fontFamily: "Geist, sans-serif",
      }}
      data-testid={`card-back-${card.id}`}
    >
      {/* Magnetic stripe */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: dims.pad + 4,
          left: 0,
          right: 0,
          height: size === "sm" ? 10 : 22,
          background: "linear-gradient(180deg, #0a0e18 0%, #1a1f33 100%)",
          borderTop: "0.5px solid rgba(255,255,255,0.05)",
          borderBottom: "0.5px solid rgba(255,255,255,0.05)",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: size === "sm" ? "1fr" : `${dims.ring + 18}px 1fr`,
          gap: dims.gap * 3,
          marginTop: size === "sm" ? 16 : 36,
          alignItems: "center",
        }}
      >
        {size !== "sm" && <ScoreRingMini score={card.score} size={dims.ring} />}

        <div style={{ display: "flex", flexDirection: "column", gap: dims.gap }}>
          {DIMENSIONS.map((d) => {
            const val = card.dimensions[d.id] || 0;
            return (
              <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {size !== "sm" && (
                  <div
                    className="font-mono"
                    style={{
                      fontSize: 9,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#6b7280",
                      width: 92,
                      flexShrink: 0,
                    }}
                  >
                    {d.label}
                  </div>
                )}
                <div
                  style={{
                    flex: 1,
                    height: size === "sm" ? 3 : 4,
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 1,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: `${val}%`,
                      height: "100%",
                      background: val >= 80 ? "#0dbe82" : val >= 60 ? "#18b4d4" : "#70a848",
                      transition: "width 0.6s ease",
                    }}
                  />
                </div>
                {size !== "sm" && (
                  <div
                    className="font-mono tabnum"
                    style={{ fontSize: 10, color: "#e8eaf0", width: 26, textAlign: "right" }}
                  >
                    {val}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer: cashback + Apply */}
      {size !== "sm" && (
        <div
          style={{
            position: "absolute",
            left: dims.pad,
            right: dims.pad,
            bottom: dims.pad,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div>
            <div
              className="font-mono"
              style={{ fontSize: 9, color: "#6b7280", letterSpacing: "0.18em", textTransform: "uppercase" }}
            >
              Cashback
            </div>
            <div
              style={{
                color: "#0dbe82",
                fontFamily: "Geist Mono, monospace",
                fontSize: size === "md" ? 22 : 30,
                fontWeight: 500,
                letterSpacing: "-0.02em",
                lineHeight: 1,
                marginTop: 2,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {card.cashbackHeadline}
            </div>
          </div>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            data-testid={`request-card-${card.id}`}
            style={{
              background: "#0dbe82",
              color: "#0a1409",
              padding: size === "md" ? "5px 10px" : "9px 16px",
              fontFamily: "Geist Mono, monospace",
              fontSize: size === "md" ? 10 : 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              borderRadius: 3,
              fontWeight: 600,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Request Card →
          </a>
        </div>
      )}
    </div>
  );
};

export default CardScoreBack;
