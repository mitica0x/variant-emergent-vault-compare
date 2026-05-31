import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Base design is authored at 260x520; named sizes scale the whole frame
// to the requested size (X/Y independently so the frame can be made wider/shorter).
const SIZES = {
  lg: { w: 282, h: 480 },
};

export const PhoneMockup = ({ screenshots, abbreviation, screenshot, fallback, size }) => {
  const slides = Array.isArray(screenshots) ? screenshots : typeof screenshot !== "undefined" ? [screenshot] : [];
  const effectiveLength = Math.max(slides.length, 1);
  const abbrevSource = typeof abbreviation !== "undefined" ? abbreviation : fallback;
  const initialsFor = (i) => {
    let raw = "";
    if (Array.isArray(abbrevSource)) raw = abbrevSource[i] ?? "";
    else if (typeof abbrevSource === "string") raw = abbrevSource;
    return String(raw).slice(0, 2).toUpperCase();
  };
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const safeIndex = Math.min(index, effectiveLength - 1);
  const hasMultiple = effectiveLength > 1;
  const go = (delta) => setIndex((cur) => (cur + delta + effectiveLength) % effectiveLength);

  const dims = (size && SIZES[size]) || { w: 260, h: 520 };
  const scaleX = dims.w / 260;
  const scaleY = dims.h / 520;

  const buttonBaseStyle = { position: "absolute", width: "4px", borderRadius: "2px", background: "linear-gradient(90deg, #1A1A1C 0%, #2C2C2E 50%, #3A3A3C 100%)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.55), 0 0 0 0.5px rgba(0,0,0,0.45)" };
  const rightButtonStyle = { ...buttonBaseStyle, background: "linear-gradient(270deg, #1A1A1C 0%, #2C2C2E 50%, #3A3A3C 100%)" };

  return (
    <div
      className="relative select-none"
      style={{ width: `${dims.w}px`, height: `${dims.h}px` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* SCALED BASE — authored at 260x520, scaled to fill the requested size */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "260px", height: "520px", transform: `scale(${scaleX}, ${scaleY})`, transformOrigin: "top left" }}>
        {/* LEFT SIDE BUTTONS */}
        <div aria-hidden="true" style={{ ...buttonBaseStyle, left: "-2px", top: "92px", height: "26px" }} />
        <div aria-hidden="true" style={{ ...buttonBaseStyle, left: "-2px", top: "138px", height: "46px" }} />
        <div aria-hidden="true" style={{ ...buttonBaseStyle, left: "-2px", top: "196px", height: "46px" }} />
        {/* RIGHT SIDE BUTTON */}
        <div aria-hidden="true" style={{ ...rightButtonStyle, right: "-2px", top: "160px", height: "72px" }} />

        {/* FRAME */}
        <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: "50px", background: "linear-gradient(135deg, #2A2A2C 0%, #1F1F21 38%, #1C1C1E 62%, #131315 100%)", boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.55)" }}>
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ borderRadius: "50px", background: "repeating-linear-gradient(180deg, rgba(255,255,255,0.045) 0px, rgba(255,255,255,0.045) 1px, rgba(0,0,0,0.05) 1px, rgba(0,0,0,0.05) 2px)", mixBlendMode: "overlay", opacity: 0.7 }} />
          <div className="absolute" style={{ top: "3px", left: "3px", right: "3px", bottom: "3px", borderRadius: "47px", background: "rgba(0,0,0,0.18)", boxShadow: "none" }}>
            <div className="absolute" style={{ top: "6px", left: "6px", right: "6px", bottom: "6px", borderRadius: "42px", background: "#000", overflow: "hidden" }}>
              <div className="relative w-full h-full overflow-hidden" style={{ background: "#000" }}>
                {/* SLIDING TRACK */}
                <div className="absolute inset-0 flex" style={{ width: `${effectiveLength * 100}%`, transform: `translateX(-${(safeIndex * 100) / effectiveLength}%)`, transition: "transform 300ms ease-in-out", willChange: "transform" }}>
                  {Array.from({ length: effectiveLength }).map((_, i) => {
                    const src = slides[i];
                    return (
                      <div key={i} className="relative h-full flex-shrink-0" style={{ width: `${100 / effectiveLength}%`, background: "#000" }}>
                        {src ? (
                          <img src={src} alt="" className="w-full h-full object-cover block" draggable={false} />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span style={{ color: "#ffffff", fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif", fontSize: "132px", fontWeight: 600, letterSpacing: "-0.08em", lineHeight: 1, userSelect: "none" }}>{initialsFor(i)}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* DYNAMIC ISLAND */}
                <div aria-hidden="true" style={{ position: "absolute", top: "12px", left: "50%", transform: "translateX(-50%)", width: "120px", height: "34px", borderRadius: "20px", background: "#000", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)", zIndex: 5 }} />

                {/* HOME INDICATOR */}
                <div aria-hidden="true" style={{ position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)", width: "120px", height: "5px", borderRadius: "3px", background: "rgba(255,255,255,0.25)", zIndex: 5 }} />

                {/* GLASS SHINE */}
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(118deg, rgba(255,255,255,0) 28%, rgba(255,255,255,0.055) 44%, rgba(255,255,255,0.015) 56%, rgba(255,255,255,0) 72%)", mixBlendMode: "screen", zIndex: 6 }} />
              </div>
            </div>
          </div>
        </div>

        {/* CAROUSEL ARROWS — on the frame, transparent by default, visible on hover */}
        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous"
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                width: "32px",
                height: "32px",
                borderRadius: "9999px",
                background: "rgba(0, 0, 0, 0.0)",
                border: "1px solid rgba(255,255,255,0.0)",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                opacity: hovered ? 1 : 0,
                transition: "opacity 200ms ease, background 200ms ease, border-color 200ms ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,0,0,0.45)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,0,0,0.0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.0)"; }}
            >
              <ChevronLeft size={16} color="rgba(255,255,255,0.85)" strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next"
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                width: "32px",
                height: "32px",
                borderRadius: "9999px",
                background: "rgba(0,0,0,0.0)",
                border: "1px solid rgba(255,255,255,0.0)",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                opacity: hovered ? 1 : 0,
                transition: "opacity 200ms ease, background 200ms ease, border-color 200ms ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,0,0,0.45)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,0,0,0.0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.0)"; }}
            >
              <ChevronRight size={16} color="rgba(255,255,255,0.85)" strokeWidth={2.5} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PhoneMockup;
