// Physical card face (front) — built entirely with CSS + real brand SVG logo
import React from "react";
import { EmvChip, ContactlessIcon } from "./CardChip";
import { NetworkLogo } from "./NetworkLogos";

// Brand logo with graceful fallback to wordmark
const BrandMark = ({ card }) => {
  const dark = isLightBg(card.face.bg);
  const wordColor = dark ? "#0f1422" : "#ffffff";
  return (
    <div className="flex items-center gap-2" style={{ minHeight: 28 }}>
      <img
        src={card.logo}
        alt={card.brand}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
        style={{
          width: 28,
          height: 28,
          objectFit: "contain",
          filter: dark ? "none" : "brightness(1.1)",
        }}
      />
      <div
        style={{
          fontFamily: "Geist, sans-serif",
          fontWeight: 600,
          fontSize: 14,
          letterSpacing: "-0.01em",
          color: wordColor,
        }}
      >
        {card.brand}
      </div>
    </div>
  );
};

function isLightBg(bg) {
  if (!bg || bg.startsWith("linear")) return false;
  const hex = bg.replace("#", "");
  if (hex.length < 6) return false;
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  // perceived lightness
  return r * 0.299 + g * 0.587 + b * 0.114 > 160;
}

const PhysicalCardFace = ({ card, size = "lg" }) => {
  const { face } = card;
  const dark = isLightBg(face.bg);
  const txt = dark ? "#0f1422" : face.textColor || "#e8eaf0";

  const dims =
    size === "sm"
      ? { w: 140, h: 88, pad: 8, chipW: 22, font: 9 }
      : size === "md"
      ? { w: 240, h: 152, pad: 12, chipW: 30, font: 11 }
      : size === "lg"
      ? { w: 420, h: 264, pad: 22, chipW: 44, font: 13 }
      : { w: 520, h: 328, pad: 28, chipW: 54, font: 15 };

  return (
    <div
      className="holo"
      style={{
        width: dims.w,
        height: dims.h,
        background: face.bg,
        color: txt,
        borderRadius: 14,
        position: "relative",
        padding: dims.pad,
        boxShadow:
          "0 30px 60px -25px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 0.5px rgba(255,255,255,0.06)",
        overflow: "hidden",
        fontFamily: "Geist, sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      data-testid={`card-face-${card.id}`}
    >
      {/* Wave pattern — flowing curved lines like the real physical card */}
      <svg
        aria-hidden
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        viewBox="0 0 400 252"
        preserveAspectRatio="none"
      >
        <g
          stroke={isLightBg(face.bg) ? '#B8B8B8' : 'rgba(255,255,255,0.06)'}
          strokeWidth={size === 'sm' ? 0.4 : size === 'md' ? 0.6 : 0.85}
          fill="none"
          opacity={isLightBg(face.bg) ? 0.65 : 1}
        >
          <path d="M-15 172 Q115 108 210 152 Q305 196 420 132" />
          <path d="M-15 186 Q115 122 210 166 Q305 210 420 146" />
          <path d="M-15 200 Q115 136 210 180 Q305 224 420 160" />
          <path d="M-15 158 Q115 94 210 138 Q305 182 420 118" />
          <path d="M-15 144 Q115 80 210 124 Q305 168 420 104" />
          <path d="M-15 214 Q115 150 210 194 Q305 238 420 174" />
          <path d="M-15 228 Q115 164 210 208 Q305 252 420 188" />
          <path d="M-15 242 Q115 178 210 222 Q305 266 420 202" />
          <path d="M-15 128 Q115 64 210 108 Q305 152 420 88" />
        </g>
        {/* Secondary diagonal waves — lighter */}
        <g
          stroke={isLightBg(face.bg) ? '#D0D0D0' : 'rgba(255,255,255,0.03)'}
          strokeWidth={size === 'sm' ? 0.3 : 0.5}
          fill="none"
          opacity={isLightBg(face.bg) ? 0.4 : 1}
        >
          <path d="M55 -10 Q130 76 170 152 Q210 228 245 275" />
          <path d="M95 -10 Q170 76 210 152 Q250 228 285 275" />
          <path d="M135 -10 Q210 76 250 152 Q290 228 325 275" />
          <path d="M175 -10 Q250 76 290 152 Q330 228 365 275" />
        </g>
      </svg>

      {/* Holographic horizontal stripe for crypto.com style */}
      {face.stripe === "holographic" && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "32%",
            left: 0,
            right: 0,
            height: dims.h * 0.08,
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.05), rgba(13,190,130,0.45), rgba(24,180,212,0.45), rgba(255,255,255,0.05))",
            mixBlendMode: "screen",
            filter: "blur(0.3px)",
          }}
        />
      )}

      {face.stripe === "usdc" && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "30%",
            left: dims.pad,
            right: dims.pad,
            height: dims.h * 0.04,
            background: "linear-gradient(90deg, transparent, #2775CA, transparent)",
            opacity: 0.7,
          }}
        />
      )}

      {/* Top row: brand + tag */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <BrandMark card={card} />
        {size !== "sm" && face.tag && (
          <div
            style={{
              fontFamily: "Geist Mono, monospace",
              fontSize: 9,
              letterSpacing: "0.15em",
              padding: "3px 6px",
              border: `0.5px solid ${dark ? "rgba(15,20,34,0.2)" : "rgba(255,255,255,0.18)"}`,
              borderRadius: 3,
              color: face.accent || txt,
              background: dark ? "rgba(15,20,34,0.04)" : "rgba(255,255,255,0.04)",
              whiteSpace: "nowrap",
            }}
          >
            {face.tag}
          </div>
        )}
      </div>

      {/* Middle: chip + contactless */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: size === "sm" ? 2 : 6 }}>
        <EmvChip color={face.chipColor || "silver"} width={dims.chipW} />
        {size !== "sm" && (
          <ContactlessIcon
            size={dims.chipW * 0.5}
            color={dark ? "rgba(15,20,34,0.6)" : "rgba(255,255,255,0.7)"}
          />
        )}
      </div>

      {/* Bottom row: number + network */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div
            className="font-mono"
            style={{
              fontSize: dims.font,
              letterSpacing: "0.16em",
              opacity: 0.85,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {size === "sm" ? "•••• 0421" : "4242  ••••  ••••  0421"}
          </div>
          {size !== "sm" && (
            <div
              className="font-mono"
              style={{
                fontSize: dims.font - 2,
                opacity: 0.7,
                letterSpacing: "0.08em",
                marginTop: 4,
                textTransform: "uppercase",
              }}
            >
              {card.brand} · {card.region}
            </div>
          )}
        </div>
        <div style={{ marginLeft: 8, transform: size === "sm" ? "scale(0.55)" : "scale(0.85)", transformOrigin: "right bottom" }}>
          <NetworkLogo network={face.network} color={dark ? "#0f1422" : "#ffffff"} />
        </div>
      </div>

      {/* Subtle top-left light reflection */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          background: 'radial-gradient(circle at 28% 22%, rgba(255,255,255,0.18) 0%, transparent 55%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default PhysicalCardFace;
