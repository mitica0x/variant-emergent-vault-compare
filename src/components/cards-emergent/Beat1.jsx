// Beat 1 — The Premise. Live boot stats + hero 3D card on right.
import React, { useEffect, useRef, useState } from "react";
import HeroScene from "./HeroScene";
import FlipCard from "./FlipCard";
import { CARDS } from "../../data/cards";

const Stat = ({ value, suffix = "", label, delay = 0, color = "#e8eaf0" }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    const start = performance.now() + delay;
    let raf;
    const tick = (now) => {
      if (now < start) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const p = Math.min(1, (now - start) / 1000);
      setN(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, delay]);
  return (
    <div className="hair" style={{ padding: 16, borderRadius: 3, background: "rgba(255,255,255,0.015)" }}>
      <div
        className="stat-num"
        style={{ fontSize: 32, color, letterSpacing: "-0.03em", lineHeight: 1, fontWeight: 500 }}
      >
        {value % 1 === 0 ? Math.round(n) : n.toFixed(1)}
        <span style={{ color: "#6b7280", fontSize: 18, marginLeft: 2 }}>{suffix}</span>
      </div>
      <div className="kicker" style={{ marginTop: 8 }}>
        {label}
      </div>
    </div>
  );
};

const Beat1 = ({ onExploreClick, onMatchClick }) => {
  const bybit = CARDS.find((c) => c.id === "bybit");

  return (
    <section
      style={{
        position: "relative",
        padding: "96px 28px 80px",
        minHeight: "calc(100vh - 60px)",
        overflow: "hidden",
      }}
      data-testid="beat-1-premise"
    >
      {/* terminal grid background */}
      <div className="terminal-grid" style={{ position: "absolute", inset: 0, opacity: 0.5 }} aria-hidden />

      <div style={{ maxWidth: 1440, margin: "0 auto", position: "relative" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1fr)",
            gap: 48,
            alignItems: "center",
          }}
        >
          {/* Left: copy + stats */}
          <div>
            <div className="kicker" style={{ color: "#18b4d4", display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
              <span className="live-dot" />
              Card Intelligence · Live · 2026
            </div>

            <h1
              style={{
                fontFamily: "Geist, sans-serif",
                fontSize: "clamp(40px, 5.4vw, 76px)",
                fontWeight: 300,
                lineHeight: 0.98,
                letterSpacing: "-0.035em",
                margin: 0,
                color: "#e8eaf0",
                maxWidth: 720,
              }}
            >
              Most people pick the <span style={{ color: "#e8703a", fontWeight: 400 }}>wrong</span> crypto card.
            </h1>

            <p
              style={{
                fontFamily: "Geist, sans-serif",
                fontSize: 17,
                color: "#9ca3af",
                lineHeight: 1.55,
                maxWidth: 540,
                margin: "26px 0 0",
              }}
            >
              We scored <span style={{ color: "#e8eaf0" }}>17 cards</span> on cashback, fees, custody and
              availability. No marketing. Just data.
            </p>

            {/* Stat grid */}
            <div
              style={{
                marginTop: 44,
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: 10,
                maxWidth: 640,
              }}
              data-testid="hero-stats"
            >
              <Stat value={17} label="Cards scored" delay={100} color="#0dbe82" />
              <Stat value={47} label="Data points / card" delay={250} color="#18b4d4" />
              <Stat value={10} suffix="%" label="Max real cashback" delay={400} color="#0dbe82" />
              <Stat value={0} label="Verified Dec 2026" delay={550} />
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
              <button
                onClick={onExploreClick}
                data-testid="explore-all-cta"
                style={{
                  background: "#0dbe82",
                  color: "#08110a",
                  padding: "13px 22px",
                  fontFamily: "Geist Mono, monospace",
                  fontSize: 12,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  borderRadius: 3,
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                Explore all cards <span aria-hidden>↓</span>
              </button>
              <button
                onClick={onMatchClick}
                data-testid="find-my-card-cta"
                style={{
                  background: "transparent",
                  color: "#e8eaf0",
                  padding: "13px 22px",
                  fontFamily: "Geist Mono, monospace",
                  fontSize: 12,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  borderRadius: 3,
                  fontWeight: 500,
                  border: "0.5px solid rgba(255,255,255,0.18)",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                Find my card <span aria-hidden>→</span>
              </button>
            </div>

            {/* Boot log strip */}
            <div
              className="hair-t"
              style={{
                marginTop: 56,
                paddingTop: 18,
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                gap: 18,
                fontFamily: "Geist Mono, monospace",
                fontSize: 10,
                color: "#6b7280",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              <div>
                <span style={{ color: "#0dbe82" }}>● </span>Engine online
              </div>
              <div>
                <span style={{ color: "#18b4d4" }}>● </span>Data lake synced
              </div>
              <div>
                <span style={{ color: "#0dbe82" }}>● </span>17 / 17 cards verified
              </div>
              <div>
                <span style={{ color: "#70a848" }}>● </span>Romania default
              </div>
            </div>
          </div>

          {/* Right: 3D hero card */}
          <div
            style={{
              position: "relative",
              height: 520,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HeroScene />
            <div
              style={{
                position: "relative",
                zIndex: 2,
                transform: "scale(1.05)",
                filter: 'drop-shadow(0 44px 64px rgba(0,0,0,0.5)) drop-shadow(0 10px 24px rgba(0,0,0,0.3))',
              }}
            >
              <FlipCard card={bybit} size="xl" idle />
            </div>
            <div
              className="font-mono"
              style={{
                position: "absolute",
                bottom: 8,
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: 9,
                color: "#6b7280",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                zIndex: 3,
              }}
            >
              Drag to rotate · release to snap back
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Beat1;
