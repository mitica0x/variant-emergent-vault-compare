// Realistic EMV chip — uses <path> not <line> to avoid r3f reconciler conflict
import React from "react";

export const EmvChip = ({ color = "gold", width = 44 }) => {
  const palette =
    color === "gold"
      ? { a: "#E8C257", b: "#B68A2E", c: "#8C6420", lines: "rgba(0,0,0,0.35)" }
      : { a: "#D9DCE2", b: "#9298A5", c: "#5F6573", lines: "rgba(0,0,0,0.35)" };
  const h = width * 0.74;

  // Build the chip etching as a single path
  const etch = [
    "M14 2 L14 11",
    "M22 2 L22 9",
    "M30 2 L30 11",
    "M2 11 L42 11",
    "M14 21 L14 30",
    "M22 23 L22 30",
    "M30 21 L30 30",
    "M2 21 L42 21",
    "M2 16 L11 16",
    "M33 16 L42 16",
  ].join(" ");

  return (
    <svg
      width={width}
      height={h}
      viewBox="0 0 44 32"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id={`chip-${color}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={palette.a} />
          <stop offset="55%" stopColor={palette.b} />
          <stop offset="100%" stopColor={palette.c} />
        </linearGradient>
      </defs>
      <rect
        x="0.5"
        y="0.5"
        width="43"
        height="31"
        rx="4"
        fill={`url(#chip-${color})`}
        stroke="rgba(0,0,0,0.3)"
      />
      <path d={etch} stroke={palette.lines} strokeWidth="0.8" fill="none" />
      <rect x="14" y="13" width="16" height="6" fill="none" stroke={palette.lines} strokeWidth="0.6" />
    </svg>
  );
};

export const ContactlessIcon = ({ size = 18, color = "rgba(255,255,255,0.85)" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M5 8c2 2 2 6 0 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M9 5c4 4 4 10 0 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M13 2c6 6 6 14 0 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
