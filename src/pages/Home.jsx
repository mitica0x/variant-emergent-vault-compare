import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, Shield, BarChart3, Coins, Scale, Lock, Activity,
  CheckCircle2, Compass, FileText, Users,
} from "lucide-react";
import { Eyebrow, Badge, ParticleField, ExchangeLogo } from "../components/UI";
import { EXCHANGES, CITED_BY, getTierColor } from "../data/mock";
import { FADE_IN, FADE_IN_UP_BIG, softTransition } from "../lib/motion";
import ThreeHero from "../components/ThreeHero";

const HERO_METRICS = [
  { label: "Exchanges tracked", value: "60+" },
  { label: "MiCAR licensed", value: "7" },
  { label: "Update cadence", value: "30d" },
  { label: "Scoring pillars", value: "7" },
];

const SURFACES = [
  { icon: BarChart3, title: "Exchanges", desc: "60+ venues scored across 7 pillars on a 30-day cycle." },
  { icon: Coins, title: "Crypto Cards", desc: "Cashback, currencies, regions and the all-in cost of every card." },
  { icon: Activity, title: "Staking", desc: "Real yields net of slashing, lockups and validator concentration risk." },
  { icon: Scale, title: "Regulation", desc: "MiCAR, FCA, MAS \u2014 the practical access map for traders." },
  { icon: Lock, title: "Custody", desc: "Hot/cold splits, insurance, attestation cadence, incident history." },
  { icon: Compass, title: "Execution", desc: "Spreads, slippage and uptime under stress \u2014 not marketing copy." },
];

const TRACK_STATS = [
  { value: "2016", label: "In crypto since cycle one" },
  { value: "15+", label: "Years in derivatives markets" },
  { value: "EU-native", label: "Built for MiCAR from day one" },
];

const SERVICES = [
  { icon: Shield, title: "MiCAR Readiness", desc: "Map your venue against the 27-state passport. Surface the disclosure gaps before they cost you a license." },
  { icon: FileText, title: "Strategy & Positioning", desc: "Score-driven competitive briefs for CMOs and BD leads. Where you win, where you lose, what to ship." },
  { icon: Users, title: "Operator Network", desc: "Direct intros to EU operators, market makers and compliance leads with skin in the game." },
];

const C0_BULLETS = [
  "Live score deltas across 60+ venues",
  "License & PoR change alerts",
  "Custom watchlists & exports",
];

const AX0N_BULLETS = [
  "Push alerts on score deltas",
  "PoR & license change feeds",
  "Webhook + Telegram integration",
];

export default function Home() {
  const top5 = EXCHANGES.slice(0, 5);
  return (
    <>
      <Hero />
      <SixSurfacesSection />
      <TrackRecordSection />
      <LeaderboardPreviewSection top5={top5} />
      <ProductsSection />
      <CitedBySection />
      <ServicesSection />
    </>
  );
}

function Hero() {
  return (
    <section className="relative bg-radial-glow" style={{ minHeight: "calc(100vh - 64px)" }}>
      <ParticleField count={50} />
      <ThreeHero
        className="absolute"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "560px",
          height: "560px",
          zIndex: 0,
          opacity: 0.85,
        }}
      />
      <div
        className="container-x relative z-10 flex flex-col items-center justify-center text-center pt-20 pb-24"
        style={{ minHeight: "calc(100vh - 64px)" }}
      >
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
          className="mt-8 text-[56px] sm:text-[72px] lg:text-[88px] font-bold tracking-tight leading-[0.95] text-balance"
        >
          Building for what comes next.
        </motion.h1>

        <motion.p
          initial={FADE_IN_UP_BIG.initial}
          animate={FADE_IN_UP_BIG.animate}
          transition={softTransition(0.16, 0.8)}
          className="mt-6 max-w-2xl text-[16px] sm:text-[18px] text-muted leading-relaxed text-balance"
        >
          Everything in financial markets was built for humans.
        </motion.p>

        <motion.div
          initial={FADE_IN_UP_BIG.initial}
          animate={FADE_IN_UP_BIG.animate}
          transition={softTransition(0.2, 0.8)}
          className="mt-6 font-mono text-[10px] uppercase tracking-widest text-muted"
        >
          Crypto · Web3 · AI · In the market since 2017
        </motion.div>

        <motion.div
          initial={FADE_IN_UP_BIG.initial}
          animate={FADE_IN_UP_BIG.animate}
          transition={softTransition(0.24, 0.8)}
          className="mt-10 flex flex-col sm:flex-row gap-3"
        >
          <a
            href="https://app.coinsiglieri.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Open the dashboard <ArrowRight size={16} />
          </a>
          <Link to="/compare" className="btn-outline">
            See the scores <ArrowUpRight size={14} />
          </Link>
        </motion.div>

        <HeroMetrics />
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
      className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px w-full max-w-3xl"
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

function SixSurfacesSection() {
  return (
    <section className="container-x py-24">
      <div className="flex flex-col gap-3 mb-12">
        <Eyebrow color="text-emerald">What we cover</Eyebrow>
        <h2 className="text-[32px] sm:text-[40px] font-bold tracking-tight max-w-2xl">
          Six surfaces. One source of truth.
        </h2>
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
        style={{ background: "rgba(255,255,255,0.07)" }}
      >
        {SURFACES.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="bg-bg p-7 card-lift"
            style={{ border: "0.5px solid transparent" }}
          >
            <Icon size={20} className="text-cyan" />
            <h3 className="mt-4 font-mono text-[12px] uppercase tracking-widest text-txt">{title}</h3>
            <p className="mt-2 text-[13px] text-muted leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TrackRecordSection() {
  return (
    <section className="hairline-t hairline-b">
      <div className="container-x py-24">
        <div className="flex flex-col gap-3 mb-10">
          <Eyebrow color="text-cyan">Track Record</Eyebrow>
          <h2 className="text-[32px] sm:text-[40px] font-bold tracking-tight max-w-3xl">
            Built by operators. Not by reporters.
          </h2>
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-px"
          style={{ background: "rgba(255,255,255,0.07)" }}
        >
          {TRACK_STATS.map((s) => (
            <div key={s.label} className="bg-bg p-8">
              <div className="font-mono text-[40px] text-txt leading-none">{s.value}</div>
              <div className="mt-3 text-[14px] text-muted">{s.label}</div>
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
            The top 5 right now.
          </h2>
        </div>
        <Link to="/compare" className="btn-cyan !py-2 !px-3 !text-[12px] hidden sm:inline-flex">
          See all 22 <ArrowRight size={14} />
        </Link>
      </div>
      <div className="hairline" style={{ borderRadius: 3 }}>
        {top5.map((e, i) => (
          <PreviewRow key={e.id} exchange={e} isLast={i === top5.length - 1} />
        ))}
      </div>
    </section>
  );
}

function PreviewRow({ exchange, isLast }) {
  const tierColor = getTierColor(exchange.score);
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
        <div className="flex-1 h-[3px] bg-white/[0.05] rounded">
          <div
            className="h-full rounded"
            style={{ width: `${exchange.score}%`, background: tierColor }}
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

function ProductsSection() {
  return (
    <section className="container-x py-24">
      <div className="mb-10">
        <Eyebrow color="text-cyan">Products</Eyebrow>
        <h2 className="text-[32px] sm:text-[40px] font-bold tracking-tight mt-3">
          Two products. Both live.
        </h2>
      </div>
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-px"
        style={{ background: "rgba(255,255,255,0.07)" }}
      >
        <C0insiglieriCard />
        <Ax0nCard />
      </div>
    </section>
  );
}

function C0insiglieriCard() {
  return (
    <div className="bg-bg p-8">
      <div className="flex items-center gap-2">
        <Badge tone="cyan">Live</Badge>
        <Badge tone="muted">$699 / mo</Badge>
      </div>
      <h3 className="mt-5 text-[28px] font-semibold tracking-tight">
        C<span className="text-cyan">0</span>insiglieri
      </h3>
      <p className="mt-3 text-[14px] text-muted leading-relaxed max-w-md">
        The live intelligence dashboard for EU exchange operators — score deltas, competitor
        moves, PoR updates, and license shifts.
      </p>
      <ul className="mt-6 space-y-2">
        {C0_BULLETS.map((b) => (
          <li key={b} className="flex items-start gap-2 text-[13px] text-txt/90">
            <CheckCircle2 size={14} className="text-cyan shrink-0 mt-[2px]" /> {b}
          </li>
        ))}
      </ul>
      <a
        href="https://app.coinsiglieri.com"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-cyan mt-7"
      >
        Open dashboard <ArrowUpRight size={14} />
      </a>
    </div>
  );
}

function Ax0nCard() {
  return (
    <div className="bg-bg p-8">
      <div className="flex items-center gap-2">
        <Badge tone="amber">In Dev</Badge>
        <Badge tone="muted">Node free / Link $99 / Flux $499</Badge>
      </div>
      <h3 className="mt-5 text-[28px] font-semibold tracking-tight">
        Ax<span className="text-amber">0</span>n
      </h3>
      <p className="mt-3 text-[14px] text-muted leading-relaxed max-w-md">
        The signal engine for EU crypto operators — alerting on the deltas that actually move a
        leaderboard position.
      </p>
      <ul className="mt-6 space-y-2">
        {AX0N_BULLETS.map((b) => (
          <li key={b} className="flex items-start gap-2 text-[13px] text-txt/90">
            <CheckCircle2 size={14} className="text-amber shrink-0 mt-[2px]" /> {b}
          </li>
        ))}
      </ul>
      <button className="btn-outline mt-7">
        Join the waitlist <ArrowRight size={14} />
      </button>
    </div>
  );
}

function CitedBySection() {
  return (
    <section className="hairline-t hairline-b">
      <div className="container-x py-14">
        <Eyebrow color="text-muted">As cited by</Eyebrow>
        <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4 items-center">
          {CITED_BY.map((c) => (
            <span key={c} className="font-mono text-[15px] text-muted hover:text-txt transition-colors">
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
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
            <p className="mt-2 text-[13px] text-muted leading-relaxed">{desc}</p>
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
