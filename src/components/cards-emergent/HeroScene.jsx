// HeroScene — pure-CSS animated dark environment behind the hero card.
// Replaces react-three-fiber due to dev-tool plugin conflict with r3f reconciler.
// Visually: dark plane floor, soft volumetric glows, ambient reflections.
import React from "react";

const HeroScene = () => {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        borderRadius: 3,
      }}
    >
      {/* Floor plane via perspective */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 0,
          width: "180%",
          height: "55%",
          transform: "translateX(-50%) perspective(1100px) rotateX(58deg)",
          transformOrigin: "center bottom",
          background:
            "linear-gradient(to top, rgba(13,190,130,0.05) 0%, rgba(24,180,212,0.025) 30%, transparent 70%)",
          maskImage:
            "linear-gradient(to top, #000 0%, #000 50%, transparent 90%)",
          WebkitMaskImage:
            "linear-gradient(to top, #000 0%, #000 50%, transparent 90%)",
        }}
      />

      {/* Grid lines on floor */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 0,
          width: "200%",
          height: "55%",
          transform: "translateX(-50%) perspective(1100px) rotateX(58deg)",
          transformOrigin: "center bottom",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 80%)",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 80%)",
        }}
      />

      {/* Glow rings */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "62%",
          width: 700,
          height: 700,
          marginLeft: -350,
          marginTop: -350,
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(13,190,130,0.18), rgba(13,190,130,0.05) 40%, transparent 70%)",
          filter: "blur(8px)",
          animation: "hero-pulse 6s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "62%",
          width: 380,
          height: 380,
          marginLeft: -190,
          marginTop: -190,
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(24,180,212,0.22), rgba(24,180,212,0.04) 50%, transparent 75%)",
          filter: "blur(4px)",
          animation: "hero-pulse 4.5s ease-in-out infinite reverse",
        }}
      />

      {/* Top vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 0%, transparent 30%, rgba(8,11,22,0.6) 100%)",
        }}
      />

      <style>{`
        @keyframes hero-pulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
};

export default HeroScene;
