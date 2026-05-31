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
      : { w: 420, h: 264, pad: 22, chipW: 44, font: 13 };

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
    </div>
  );
};

export default PhysicalCardFace;
