// Beat 3 — Featured Bybit — full width, large 3D card right, sponsored footnote
import React from "react";
import HeroScene from "./HeroScene";
import FlipCard from "./FlipCard";
import DimensionBars from "./DimensionBars";
import { CARDS } from "../data/cards";

const Beat3 = () => {
  const bybit = CARDS.find((c) => c.id === "bybit");

  return (
    <section
      style={{
        position: "relative",
        padding: "120px 28px",
        background: "var(--bg)",
        overflow: "hidden",
        borderTop: "0.5px solid rgba(255,255,255,0.08)",
        borderBottom: "0.5px solid rgba(255,255,255,0.08)",
      }}
      data-testid="beat-3-featured"
    >
      {/* subtle emerald wash */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(900px 400px at 80% 40%, rgba(13,190,130,0.07), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1440, margin: "0 auto", position: "relative" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1fr)",
            gap: 64,
            alignItems: "center",
          }}
        >
          {/* Left: copy + breakdown */}
          <div>
            <div
              className="font-mono"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontSize: 11,
                color: "#6b7280",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: 28,
              }}
            >
              <span style={{ color: "#0dbe82" }}>●</span>
              <span style={{ color: "#0dbe82" }}>Top scoring</span>
              <span>·</span>
              <span style={{ color: "#e8eaf0" }}>92/100</span>
              <span>·</span>
              <span>03</span>
              <span>·</span>
              <span style={{ color: "#e8703a" }}>Featured card</span>
            </div>

            <h2
              style={{
                fontFamily: "Geist, sans-serif",
                fontSize: "clamp(34px, 4.4vw, 64px)",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                lineHeight: 0.98,
                margin: 0,
                color: "#e8eaf0",
              }}
            >
              The Bybit Card wins EU on the math.
            </h2>

            <p
              style={{
                marginTop: 26,
                fontFamily: "Geist, sans-serif",
                fontSize: 17,
                color: "#cbd5e1",
                lineHeight: 1.6,
                maxWidth: 600,
              }}
            >
              Two million European cardholders. Zero staking requirements. The only EEA card that combines
              free issuance, BTC cashback up to <span style={{ color: "#0dbe82" }}>10%</span>, and full
              Mastercard network access without locking a single token. Mastercard named it{" "}
              <span style={{ color: "#e8eaf0" }}>Best Performing Crypto Card at EDGE 2025</span>. The data
              agrees.
            </p>

            <div style={{ marginTop: 36 }}>
              <div className="kicker" style={{ marginBottom: 14 }}>Score breakdown</div>
              <DimensionBars card={bybit} layout="horizontal" />
            </div>

            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              data-testid="featured-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginTop: 38,
                background: "#0dbe82",
                color: "#08110a",
                padding: "16px 26px",
                fontFamily: "Geist Mono, monospace",
                fontSize: 12,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                borderRadius: 3,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Request Bybit Card →
            </a>

            <div
              className="font-mono"
              style={{
                marginTop: 28,
                fontSize: 9,
                color: "#6b7280",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              Sponsored placement · Score independent
            </div>
          </div>

          {/* Right: 3D card */}
          <div
            style={{
              position: "relative",
              height: 540,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HeroScene />
            <div style={{ position: "relative", zIndex: 2 }}>
              <FlipCard card={bybit} size="xl" idle />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Beat3;
