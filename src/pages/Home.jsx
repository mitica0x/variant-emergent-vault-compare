import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, Shield, CheckCircle2, FileText, Users,
} from "lucide-react";
import { Eyebrow, Badge, ParticleField, ExchangeLogo } from "../components/UI";
import { EXCHANGES } from "../data/mock";
import { FADE_IN, FADE_IN_UP_BIG, softTransition } from "../lib/motion";
import ThreeHero from "../components/ThreeHero";

const HERO_METRICS = [
  { label: "Venues scored", value: "37+" },
  { label: "MiCAR licensed", value: "7" },
  { label: "Update cadence", value: "30d" },
  { label: "Scoring pillars", value: "7" },
];

const PLATFORM_SURFACES = [
  { name: "Compare", desc: "The leaderboard nobody paid to be on. 37 venues scored across 7 pillars.", stat: "37 EXCHANGES", to: "/compare", accent: "#18b4d4" },
  { name: "Exchange Match", desc: "Find your exchange in 60 seconds based on your trading profile.", stat: "12 FILTERS", to: "/find-my-exchange", accent: "#18b4d4" },
  { name: "Cards", desc: "The only scored comparison of crypto card products in the EU.", stat: "8 CARDS SCORED", to: "/cards", accent: "#18b4d4" },
  { name: "News", desc: "Intelligence-filtered news. Only what moves scores.", stat: "LIVE FEED", to: "/news", accent: "#18b4d4" },
  { name: "Advertise", desc: "Editorial placements on a scored, transparent platform.", stat: "DISCLOSED ALWAYS", to: "/advertise", accent: "#0dbe82" },
  { name: "C0insiglieri App", desc: "The full intelligence dashboard. Score deltas, alerts, N0VA signals.", stat: "$699 / MO", href: "https://app.coinsiglieri.com", accent: "#a3e635", lime: true },
];

const OPERATOR_ITEMS = [
  { value: "2016", label: "In crypto since cycle one" },
  { value: "15+", label: "Years in derivatives markets" },
  { value: "2× Editions", label: "Web3 startup competition · €440,775" },
  { value: "On Stage", label: "Crypto Expo Europe · Next Block · ETH Bucharest" },
  { value: "Crypto Payments", label: "Lunu POS · Beach Please Festival" },
];

const SERVICES = [
  { icon: Shield, title: "MiCAR Readiness", desc: "Map your venue against the 27-state passport. Surface the disclosure gaps before they cost you a license." },
  { icon: FileText, title: "Strategy & Positioning", desc: "Score-driven competitive briefs for CMOs and BD leads. Where you win, where you lose, what to ship." },
  { icon: Users, title: "Operator Network", desc: "Direct intros to EU operators, market makers and compliance leads with skin in the game." },
];

const C0_BULLETS = [
  "Live score deltas across 60+ venues",
  "MiCAR & PoR change alerts",
  "N0VA pre-incident signal layer",
];

const AX0N_BULLETS = [
  "MCP-native order execution rails",
  "Multi-venue routing with risk controls",
  "Audit trail on every agent decision",
];

const CTA_GRADIENT = "linear-gradient(90deg, #0dbe82 0%, #18b4d4 60%, #0dbe82 100%)";

function BtnSolid({ href, to, children, className = "" }) {
  const [hover, setHover] = useState(false);
  const sx = {
    backgroundImage: CTA_GRADIENT,
    color: "#0a0a0a",
    fontWeight: 600,
    padding: "10px 18px",
    borderRadius: 3,
    fontSize: 14,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    border: "0.5px solid transparent",
    filter: hover ? "brightness(1.08)" : "none",
    transition: "filter 150ms ease",
  };
  const h = { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false), style: sx, className };
  if (to) return <Link to={to} {...h}>{children}</Link>;
  return <a href={href} target="_blank" rel="noopener noreferrer" {...h}>{children}</a>;
}

function BtnGhost({ href, to, children, color = "#18b4d4", hoverColor = "#a3e635", className = "", gradient = false }) {
  const [hover, setHover] = useState(false);
  if (gradient) {
    const gx = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      padding: "10px 18px",
      borderRadius: 3,
      fontWeight: 500,
      fontSize: 14,
      border: "0.5px solid transparent",
      background: `linear-gradient(#080b16, #080b16) padding-box, ${CTA_GRADIENT} border-box`,
      filter: hover ? "brightness(1.15)" : "none",
      transition: "filter 150ms ease",
    };
    const gtext = {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      backgroundImage: CTA_GRADIENT,
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      color: "#18b4d4",
    };
    const gh = { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false), style: gx, className };
    const inner = <span style={gtext}>{children}</span>;
    if (to) return <Link to={to} {...gh}>{inner}</Link>;
    if (href) return <a href={href} target="_blank" rel="noopener noreferrer" {...gh}>{inner}</a>;
    return <button {...gh}>{inner}</button>;
  }
  const sx = {
    background: "transparent",
    color: hover ? hoverColor : color,
    fontWeight: 500,
    padding: "10px 18px",
    borderRadius: 3,
    fontSize: 14,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    border: `0.5px solid ${hover ? hoverColor : color}`,
    transition: "color 150ms ease, border-color 150ms ease",
  };
  const h = { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false), style: sx, className };
  if (to) return <Link to={to} {...h}>{children}</Link>;
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" {...h}>{children}</a>;
  return <button {...h}>{children}</button>;
}

export default function Home() {
  const top5 = EXCHANGES.slice(0, 5);
  return (
    <>
      <Hero />
      <SixSurfacesSection />
      <TrackRecordSection />
      <LeaderboardPreviewSection top5={top5} />
      <C0insiglieriTeaser />
      <ProductsSection />
      <ServicesSection />
    </>
  );
}

function Hero() {
  const [isGlobeHovered, setIsGlobeHovered] = useState(false);
  return (
    <section className="relative bg-radial-glow min-h-screen overflow-hidden pb-32">
      <ParticleField count={50} />

      {/* Ambient corner glow behind the globe (desktop) — activates on globe hover */}
      <motion.div
        className="hidden md:block"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
          filter: "blur(60px)",
          background: `
            radial-gradient(35% 40% at 5% 10%, rgba(24,180,212,0.20), rgba(0,0,0,0) 70%),
            radial-gradient(30% 35% at 95% 8%, rgba(24,180,212,0.15), rgba(0,0,0,0) 70%),
            radial-gradient(25% 30% at 8% 92%, rgba(112,168,72,0.12), rgba(0,0,0,0) 70%),
            radial-gradient(28% 32% at 92% 90%, rgba(13,190,130,0.10), rgba(0,0,0,0) 70%)
          `,
          zIndex: 0,
        }}
        initial={{ opacity: 0.35 }}
        animate={isGlobeHovered ? { opacity: 1, scale: 1.06 } : { opacity: 0.35, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {/* Globe — large sphere anchored right, left edge bleeding into center */}
      <ThreeHero className="hidden md:block absolute top-0 left-0 w-full h-[60%] z-[1] md:top-1/2 md:left-[72%] md:w-[70%] md:h-[130%] md:[transform:translate(-50%,-50%)]" />

      {/* Globe hover nav menu (desktop) — also drives the corner-glow hover state */}
      <GlobeMenu onHoverChange={setIsGlobeHovered} />

      {/* Text block — absolute left overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-left md:top-[18%] md:right-auto md:left-0 md:p-0 md:pl-20 md:max-w-[600px] md:flex md:flex-col md:gap-8">
        {/* TOP group — anchored near the globe's top edge */}
        <div>
          <motion.div
            initial={FADE_IN_UP_BIG.initial}
            animate={FADE_IN_UP_BIG.animate}
            transition={softTransition(0, 0.7)}
          >
            <Eyebrow color="text-cyan">AI Infrastructure · Market Intelligence</Eyebrow>
          </motion.div>

          <motion.h1
            initial={FADE_IN_UP_BIG.initial}
            animate={FADE_IN_UP_BIG.animate}
            transition={softTransition(0.08, 0.8)}
            className="mt-6 text-[48px] sm:text-[60px] lg:text-[88px] font-bold tracking-tight leading-[1.0]"
          >
            Picks and shovels for the AI rush.
          </motion.h1>

          <motion.p
            initial={FADE_IN_UP_BIG.initial}
            animate={FADE_IN_UP_BIG.animate}
            transition={softTransition(0.16, 0.8)}
            className="mt-6 max-w-xl text-[16px] sm:text-[18px] leading-relaxed"
            style={{ color: "rgba(255,255,255,0.72)" }}
          >
            Everything in financial markets was built for humans.
          </motion.p>

          <motion.div
            initial={FADE_IN_UP_BIG.initial}
            animate={FADE_IN_UP_BIG.animate}
            transition={softTransition(0.2, 0.8)}
            className="mt-6 font-mono text-[10px] uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Crypto · Web3 · AI · In the market since 2017
          </motion.div>
        </div>

        {/* BOTTOM group — anchored near the globe's bottom edge */}
        <div>
          <motion.div
            initial={FADE_IN_UP_BIG.initial}
            animate={FADE_IN_UP_BIG.animate}
            transition={softTransition(0.24, 0.8)}
            className="mt-10 flex flex-col sm:flex-row items-start gap-3"
          >
            <BtnSolid href="https://app.coinsiglieri.com" className="w-full md:w-auto">
              Open the dashboard <ArrowRight size={16} />
            </BtnSolid>
            <BtnGhost to="/compare" className="w-full md:w-auto" gradient>
              See the scores <ArrowUpRight size={14} />
            </BtnGhost>
          </motion.div>
        </div>

        {/* Stats band — third child inside the text block (below the CTAs) */}
        <div className="hidden md:block w-full">
          <HeroMetrics />
        </div>
      </div>
    </section>
  );
}

function HeroMetrics() {
  return (
    <motion.div
      initial={FADE_IN.initial}
      animate={FADE_IN.animate}
      transition={softTransition(0.6, 0.7)}
      className="grid grid-cols-2 md:grid-cols-4 gap-px w-full max-w-3xl"
      style={{ background: "rgba(255,255,255,0.07)", borderRadius: 3 }}
    >
      {HERO_METRICS.map((m) => (
        <div key={m.label} className="bg-bg p-4">
          <div className="font-mono text-[22px] text-txt">{m.value}</div>
          <div className="eyebrow text-muted mt-1">{m.label}</div>
        </div>
      ))}
    </motion.div>
  );
}

const GLOBE_LINKS = [
  { label: "Compare", to: "/compare", accent: "#18b4d4", pos: { top: "8%", left: "45%" }, zx: 0.45, zy: 0.08 },
  { label: "Match Exchange", to: "/find-my-exchange", accent: "#0dbe82", pos: { top: "38%", right: "2%" }, zx: 0.9, zy: 0.38 },
  { label: "Cards", to: "/cards", accent: "#70a848", pos: { top: "68%", right: "6%" }, zx: 0.88, zy: 0.68 },
  { label: "News", to: "/news", accent: "#18b4d4", pos: { top: "72%", left: "8%" }, zx: 0.1, zy: 0.72 },
  { label: "Advertise", to: "/advertise", accent: "#e8703a", pos: { top: "35%", left: "4%" }, zx: 0.06, zy: 0.35 },
];

function GlobePill({ to, label, accent }) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      to={to}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "rgba(8,11,22,0.80)",
        borderLeft: `2px solid ${accent}`,
        borderRadius: 3,
        padding: "6px 12px",
        fontFamily: "monospace",
        fontSize: 11,
        color: hover ? accent : "#e4e4e7",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        whiteSpace: "nowrap",
        display: "inline-block",
        transition: "color 150ms ease",
      }}
    >
      {label}
    </Link>
  );
}

function GlobeMenu({ onHoverChange }) {
  const ref = useRef(null);
  const [active, setActive] = useState(null);
  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    let best = 0;
    let bestD = Infinity;
    GLOBE_LINKS.forEach((it, i) => {
      const dx = x - it.zx;
      const dy = y - it.zy;
      const d = dx * dx + dy * dy;
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    setActive(best);
  };
  return (
    <div
      ref={ref}
      className="hidden md:block absolute top-0 right-0 z-[15]"
      style={{ width: "55%", height: "100%" }}
      onMouseEnter={() => onHoverChange && onHoverChange(true)}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        setActive(null);
        if (onHoverChange) onHoverChange(false);
      }}
    >
      {GLOBE_LINKS.map((it, i) => (
        <div key={it.label} className="absolute" style={it.pos}>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={active === i ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ pointerEvents: active === i ? "auto" : "none" }}
          >
            <GlobePill to={it.to} label={it.label} accent={it.accent} />
          </motion.div>
        </div>
      ))}
    </div>
  );
}

function SixSurfacesSection() {
  return (
    <section className="container-x py-24">
      <div className="flex flex-col gap-3 mb-12">
        <Eyebrow color="text-emerald">What we cover</Eyebrow>
        <h2 className="text-[32px] sm:text-[40px] font-bold tracking-tight max-w-2xl">
          Six surfaces. One source of truth.
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PLATFORM_SURFACES.map((s) => (
          <SurfaceCard key={s.name} surface={s} />
        ))}
      </div>
    </section>
  );
}

function SurfaceCard({ surface }) {
  const { name, desc, stat, to, href, accent, lime } = surface;
  const [hover, setHover] = useState(false);
  const inner = (
    <>
      <span
        className="absolute top-4 right-4 font-mono text-[9px] uppercase tracking-widest px-2 py-[3px]"
        style={
          lime
            ? { color: "#a3e635", background: "rgba(163,230,53,0.12)", borderRadius: 3 }
            : { color: "#0dbe82", background: "rgba(13,190,130,0.12)", borderRadius: 3 }
        }
      >
        {lime ? "$699/MO" : "LIVE"}
      </span>
      <h3 className="font-mono text-[13px] uppercase tracking-widest text-txt pr-16">{name}</h3>
      <p className="mt-3 text-[14px] leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{desc}</p>
      {!lime && (
        <div className="mt-6 font-mono text-[11px] uppercase tracking-widest" style={{ color: accent }}>{stat}</div>
      )}
    </>
  );
  const cardStyle = {
    background: "#0f1422",
    border: `0.5px solid ${hover ? accent : "rgba(255,255,255,0.08)"}`,
    borderRadius: 3,
    padding: 24,
    position: "relative",
    display: "block",
    height: "100%",
    transition: "border-color 150ms ease",
  };
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: cardStyle,
  };
  const card = href
    ? <a href={href} target="_blank" rel="noopener noreferrer" {...handlers}>{inner}</a>
    : <Link to={to} {...handlers}>{inner}</Link>;
  return (
    <motion.div
      className="h-full"
      whileHover={{ scale: 1.008, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {card}
    </motion.div>
  );
}

function TrackRecordSection() {
  return (
    <section className="hairline-t hairline-b">
      <div className="container-x py-24">
        <div className="flex flex-col gap-3 mb-10">
          <Eyebrow color="text-cyan">Track Record</Eyebrow>
          <h2 className="text-[32px] sm:text-[40px] font-bold tracking-tight max-w-3xl">
            Operator Identity.
          </h2>
          <p className="text-[15px] max-w-2xl leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
            Not journalists. Not analysts. Operators with skin in the game since 2016.
          </p>
        </div>
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px"
          style={{ background: "rgba(255,255,255,0.07)" }}
        >
          {OPERATOR_ITEMS.map((s) => (
            <div key={s.value} className="bg-bg p-6">
              <div className="font-mono text-[24px] text-txt leading-tight">{s.value}</div>
              <div className="mt-3 font-mono text-[11px] uppercase tracking-widest leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LeaderboardPreviewSection({ top5 }) {
  return (
    <section className="container-x py-24">
      <div className="flex items-end justify-between mb-10">
        <div>
          <Eyebrow color="text-emerald">Leaderboard preview</Eyebrow>
          <h2 className="text-[32px] sm:text-[40px] font-bold tracking-tight mt-3">
            Top 5 exchanges right now.
          </h2>
        </div>
        <Link to="/compare" className="btn-cyan !py-2 !px-3 !text-[12px] hidden sm:inline-flex">
          See all 37+ <ArrowRight size={14} />
        </Link>
      </div>
      <div className="hairline" style={{ borderRadius: 3 }}>
        {top5.map((e, i) => (
          <PreviewRow key={e.id} exchange={e} isLast={i === top5.length - 1} index={i} />
        ))}
      </div>
    </section>
  );
}

function PreviewRow({ exchange, isLast, index = 0 }) {
  const barRef = useRef(null);
  const barInView = useInView(barRef, { once: false, amount: 0.5 });
  return (
    <div
      className={`flex items-center gap-4 px-5 py-4 ${
        isLast ? "" : "hairline-b"
      } hover:bg-white/[0.02] transition-colors`}
    >
      <span className="font-mono text-[12px] text-muted w-8">#{exchange.rank}</span>
      <ExchangeLogo domain={exchange.domain} name={exchange.name} size={28} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[14px]">{exchange.name}</span>
          {exchange.micarLicensed && <Badge tone="emerald">MiCAR</Badge>}
          {exchange.featured && <Badge tone="rust">Featured</Badge>}
        </div>
        <div className="text-[12px] text-muted mt-[2px]">{exchange.bestFor}</div>
      </div>
      <div className="hidden md:flex items-center gap-3 min-w-[180px]">
        <div ref={barRef} className="flex-1 h-[3px] bg-white/[0.05] rounded">
          <motion.div
            className="h-full rounded"
            style={{ width: `${exchange.score}%`, background: "linear-gradient(90deg, #18b4d4 0%, #0dbe82 50%, #a3e635 100%)", transformOrigin: "left center" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: barInView ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 18, delay: index * 0.08 }}
          />
        </div>
        <span className="font-mono text-[14px] text-txt w-7 text-right">{exchange.score}</span>
      </div>
      <a
        href={exchange.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-cyan !py-1 !px-2 !text-[11px]"
      >
        Visit <ArrowUpRight size={12} />
      </a>
    </div>
  );
}

const TEASER_SIGNALS = [
  { text: "● BYBIT · SCORE DELTA +2 · Proof of Reserves updated · 04:31 UTC", color: "#0dbe82" },
  { text: "● BINANCE · COMPLIANCE FLAG · MiCAR filing delay detected · 03:15 UTC", color: "#ff4d6d" },
  { text: "● KRAKEN · TRACK RECORD · 15yr uptime milestone confirmed · 02:44 UTC", color: "#18b4d4" },
];

function C0insiglieriTeaser() {
  return (
    <section className="container-x py-24">
      <div className="mb-8">
        <Eyebrow color="text-cyan">C0insiglieri Intelligence</Eyebrow>
        <h2 className="text-[32px] sm:text-[40px] font-bold tracking-tight mt-3">
          The terminal operators actually use.
        </h2>
        <p className="mt-4 text-[15px] max-w-2xl leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
          Score deltas. PoR alerts. Regulatory shifts. Before they hit the news.
        </p>
      </div>
      <div
        style={{
          position: "relative",
          background: "#0f1422",
          border: "0.5px solid rgba(255,255,255,0.08)",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <div className="p-6 space-y-3">
          {TEASER_SIGNALS.map((s) => (
            <div key={s.text} className="font-mono text-[12px] sm:text-[13px]" style={{ color: s.color }}>
              {s.text}
            </div>
          ))}
          <div className="font-mono text-[12px] sm:text-[13px]" style={{ color: "rgba(255,255,255,0.22)" }}>
            ● ████████ · ████████ · ██████████████ · ██:██ UTC
          </div>
          <div className="font-mono text-[12px] sm:text-[13px]" style={{ color: "rgba(255,255,255,0.12)" }}>
            ● ██████ · ████████ · ████████████ · ██:██ UTC
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 130,
            background: "linear-gradient(to bottom, rgba(15,20,34,0) 0%, rgba(15,20,34,0.96) 85%)",
            backdropFilter: "blur(1px)",
            WebkitBackdropFilter: "blur(1px)",
            pointerEvents: "none",
          }}
        />
      </div>
      <div className="mt-7 flex flex-col sm:flex-row items-start gap-3">
        <BtnSolid href="https://app.coinsiglieri.com">
          Open Intelligence <ArrowRight size={16} />
        </BtnSolid>
        <BtnGhost to="/advertise" gradient>See pricing</BtnGhost>
      </div>
    </section>
  );
}

function ProductsSection() {
  return (
    <section className="container-x py-24">
      <div className="mb-10">
        <Eyebrow color="text-cyan">Products</Eyebrow>
        <h2 className="text-[32px] sm:text-[40px] font-bold tracking-tight mt-3">
          Two products. One infrastructure.
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProductCard
          glow="0 0 40px rgba(24,180,212,0.15)"
          glowHover="0 0 40px 20px rgba(24,180,212,0.45)"
          border="0.5px solid rgba(24,180,212,0.3)"
          wordmark={<>C<span style={{ color: "#18b4d4" }}>0</span>insiglieri</>}
          badge="LIVE · $699/MO"
          badgeColor="#18b4d4"
          heading="Intelligence for EU exchange operators."
          body="Score deltas across 60+ venues. PoR monitoring. MiCAR compliance tracking. N0VA signal layer. One dashboard, every signal that matters."
          features={C0_BULLETS}
          featureColor="#0dbe82"
          cta={<BtnSolid href="https://app.coinsiglieri.com">Open dashboard <ArrowRight size={16} /></BtnSolid>}
        />
        <ProductCard
          glow="0 0 40px rgba(245,158,11,0.15)"
          glowHover="0 0 40px 20px rgba(245,158,11,0.45)"
          border="0.5px solid rgba(245,158,11,0.3)"
          wordmark={<>Ax<span style={{ color: "#f59e0b" }}>0</span>n</>}
          badge="IN DEV · Q4 2026"
          badgeColor="#f59e0b"
          heading="Financial infrastructure for the AI agent economy."
          body="The protocol layer connecting AI agents to financial markets. One interface, every execution rail. Built for the species that trades at machine speed."
          features={AX0N_BULLETS}
          featureColor="#f59e0b"
          cta={<BtnGhost color="#f59e0b" hoverColor="#fbbf24">Join the waitlist <ArrowRight size={16} /></BtnGhost>}
        />
      </div>
    </section>
  );
}

function ProductCard({ glow, glowHover, border, wordmark, badge, badgeColor, heading, body, features, featureColor, cta }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      whileHover={{ scale: 1.010, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
    >
      <div style={{ background: "#0f1422", border, borderRadius: 3, padding: 32, boxShadow: hover ? glowHover : glow, transition: "box-shadow 200ms ease" }}>
      <span
        className="font-mono text-[10px] uppercase tracking-widest px-2 py-[3px]"
        style={{ color: badgeColor, background: `${badgeColor}1f`, borderRadius: 3 }}
      >
        {badge}
      </span>
      <h3 className="mt-5 text-[28px] font-semibold tracking-tight">{wordmark}</h3>
      <p className="mt-2 text-[18px] font-semibold tracking-tight text-txt">{heading}</p>
      <p className="mt-3 text-[14px] leading-relaxed max-w-md" style={{ color: "rgba(255,255,255,0.6)" }}>{body}</p>
      <ul className="mt-6 space-y-2">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-[13px] text-txt/90">
            <CheckCircle2 size={14} style={{ color: featureColor }} className="shrink-0 mt-[2px]" /> {f}
          </li>
        ))}
      </ul>
      <div className="mt-7">{cta}</div>
      </div>
    </motion.div>
  );
}

function ServicesSection() {
  return (
    <section className="container-x py-24">
      <div className="mb-10">
        <Eyebrow color="text-emerald">Services</Eyebrow>
        <h2 className="text-[32px] sm:text-[40px] font-bold tracking-tight mt-3 max-w-3xl">
          Strategy on top of the data.
        </h2>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-px"
        style={{ background: "rgba(255,255,255,0.07)" }}
      >
        {SERVICES.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="bg-bg p-8 card-lift"
            style={{ border: "0.5px solid transparent" }}
          >
            <Icon size={20} className="text-emerald" />
            <h3 className="mt-4 font-mono text-[12px] uppercase tracking-widest text-txt">{title}</h3>
            <p className="mt-2 text-[14px] leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{desc}</p>
            <Link
              to="/advertise#contact"
              className="mt-5 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-cyan hover:text-emerald transition-colors"
            >
              Get in touch <ArrowRight size={12} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
