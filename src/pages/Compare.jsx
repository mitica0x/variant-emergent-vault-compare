import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, ArrowUpRight, Check, X as XIcon, Shield, Activity, FileCheck2, Scale, History,
} from "lucide-react";
import { Eyebrow, Badge, MiniBar, ScoreCircle, ProsCons, ExchangeLogo } from "../components/UI";
import { EXCHANGES, SCORE_PILLARS, getTierColor, getTierBg, scoreColor } from "../data/mock";
import { useScrollSpy } from "../hooks/use-in-view";

// ---- Static config (module-scope, stable across renders) ----

const TABS = [
  { id: "all", label: "All Exchanges" },
  { id: "spot", label: "Spot" },
  { id: "derivatives", label: "Derivatives" },
  { id: "dex", label: "DEX" },
];

const SIDEBAR = [
  { id: "overview", label: "Overview" },
  { id: "top-exchanges", label: "Top Exchanges" },
  { id: "comparison", label: "Comparison Table" },
  { id: "reviews", label: "Exchange Reviews" },
  { id: "methodology", label: "Methodology" },
];
const SIDEBAR_IDS = SIDEBAR.map((s) => s.id);

const TRUST_ITEMS = [
  { icon: Activity, title: "Hands-on testing", desc: "We open accounts, we trade, we withdraw." },
  { icon: History, title: "30-day rescoring", desc: "Every venue rescored on a rolling cycle." },
  { icon: Scale, title: "7 weighted pillars", desc: "Custody \u00b7 Liquidity \u00b7 Compliance \u00b7 Transparency \u00b7 Product depth \u00b7 Track record \u00b7 Execution." },
  { icon: FileCheck2, title: "Editorial independence", desc: "Scoring boundary disclosed. Always." },
];

const BREAKDOWN_LABELS = {
  security: "Security",
  compliance: "Compliance",
  liquidity: "Liquidity",
  por: "PoR",
  trackRecord: "Track Record",
  productDepth: "Product",
};

// ---- Main page ----

export default function Compare() {
  const [tab, setTab] = useState("all");
  const active = useScrollSpy(SIDEBAR_IDS);

  const list = useMemo(
    () =>
      EXCHANGES.filter((e) => e.type.includes(tab)).sort((a, b) => b.score - a.score),
    [tab]
  );

  const featured = useMemo(() => list.find((e) => e.featured) || null, [list]);
  const rest = useMemo(() => list.filter((e) => !e.featured), [list]);

  return (
    <div className="container-x pt-12 pb-24">
      <ComparisonHero />
      <TrustBand />
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12">
        <Sidebar active={active} />
        <div>
          <TopExchangesSection
            tab={tab}
            setTab={setTab}
            featured={featured}
            rest={rest}
          />
          <ComparisonTableSection list={list} />
          <ReviewsSection list={list} />
          <MethodologySection />
        </div>
      </div>
    </div>
  );
}

// ---- Sections ----

function ComparisonHero() {
  return (
    <section id="overview" className="max-w-3xl scroll-mt-20">
      <Eyebrow color="text-emerald">Compare</Eyebrow>
      <h1 className="mt-4 text-[44px] sm:text-[56px] font-bold tracking-tight leading-[1.02]">
        The leaderboard nobody paid to be on.
      </h1>
      <p className="mt-5 text-[16px] text-muted leading-relaxed max-w-2xl">
        Scored by algorithm. Not by who pays us. {EXCHANGES.length} venues across spot, derivatives and on-chain — rescored every 30 days.
      </p>
    </section>
  );
}

function TrustBand() {
  return (
    <section
      className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-px"
      style={{ background: "rgba(255,255,255,0.07)", borderRadius: 3 }}
    >
      {TRUST_ITEMS.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="bg-bg p-5">
          <Icon size={16} className="text-cyan" />
          <div className="mt-3 font-mono text-[11px] uppercase tracking-widest text-txt">{title}</div>
          <div className="mt-1 text-[12px] text-muted">{desc}</div>
        </div>
      ))}
    </section>
  );
}

function Sidebar({ active }) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24">
        <Eyebrow color="text-muted">On this page</Eyebrow>
        <nav className="mt-4 flex flex-col">
          {SIDEBAR.map((s) => {
            const isActive = active === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`relative h-8 flex items-center font-mono text-[11px] uppercase tracking-widest pl-3 transition-colors ${
                  isActive ? "text-txt bg-white/[0.04]" : "text-muted hover:text-txt"
                }`}
                style={{
                  borderLeft: isActive ? "2px solid #0dbe82" : "2px solid transparent",
                }}
              >
                {s.label}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

function TabBar({ tab, setTab }) {
  return (
    <div
      className="mt-6 flex flex-wrap gap-px"
      style={{ background: "rgba(255,255,255,0.07)", padding: "0.5px", borderRadius: 3 }}
    >
      {TABS.map((t) => {
        const isActive = tab === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors ${
              isActive ? "text-bg bg-emerald" : "text-muted hover:text-txt bg-bg"
            }`}
            style={{ borderRadius: 2 }}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

function TopExchangesSection({ tab, setTab, featured, rest }) {
  const showFeatured = featured && tab !== "dex";
  return (
    <div id="top-exchanges" className="scroll-mt-20">
      <Eyebrow color="text-emerald">Top Exchanges</Eyebrow>
      <h2 className="mt-3 text-[28px] font-bold tracking-tight">The current top of the board.</h2>
      <TabBar tab={tab} setTab={setTab} />
      {showFeatured && <FeaturedCard exchange={featured} />}
      <RankedList items={rest} />
    </div>
  );
}

function FeaturedCard({ exchange }) {
  return (
    <div
      className="mt-10 p-7 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_1fr] gap-8"
      style={{
        background: "#0f1422",
        borderLeft: "3px solid #e8703a",
        border: "0.5px solid rgba(232,112,58,0.2)",
        borderLeftWidth: 3,
        borderRadius: 3,
      }}
    >
      <FeaturedIdentity exchange={exchange} />
      <FeaturedBreakdown exchange={exchange} />
      <FeaturedMetrics exchange={exchange} />
    </div>
  );
}

function FeaturedIdentity({ exchange }) {
  return (
    <div>
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[14px] text-muted">#{exchange.rank}</span>
        <ExchangeLogo domain={exchange.domain} name={exchange.name} size={48} />
        <div>
          <div className="text-[20px] font-semibold leading-none">{exchange.name}</div>
          <div className="text-[12px] text-muted mt-1">{exchange.bestFor}</div>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <Badge tone="rust">★ Featured</Badge>
        {exchange.micarLicensed && <Badge tone="emerald">✓ MiCAR</Badge>}
        {exchange.hasCryptoCard && <Badge tone="cyan">Card</Badge>}
      </div>
      <p className="mt-5 text-[13px] text-muted leading-relaxed line-clamp-3">
        {exchange.proSummary}
      </p>
    </div>
  );
}

function FeaturedBreakdown({ exchange }) {
  const entries = Object.entries(exchange.scoreBreakdown);
  return (
    <div className="flex items-center gap-6">
      <ScoreCircle value={exchange.score} size={72} />
      <div className="flex-1 space-y-2">
        {entries.map(([key, value], idx) => (
          <div key={key} className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted w-24">
              {BREAKDOWN_LABELS[key] ?? key}
            </span>
            <div className="flex-1">
              <MiniBar value={value} delay={idx * 60} />
            </div>
            <span className="font-mono text-[11px] text-muted w-6 text-right">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeaturedMetrics({ exchange }) {
  return (
    <div className="flex flex-col gap-3">
      <Metric label="24h Volume" value={exchange.vol24h} delta={exchange.vol24hDelta} />
      <Metric label="BTC Spread" value={`${exchange.spreadBTC.toFixed(3)}%`} />
      <Metric label="Uptime (90d)" value={`${exchange.uptime90d}%`} />
      <a
        href={exchange.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-cyan mt-2"
      >
        Visit {exchange.name} <ArrowUpRight size={14} />
      </a>
      <p className="text-[10px] text-muted font-mono">
        Sponsored by {exchange.name} · CTR 24h: 3.4%
      </p>
    </div>
  );
}

function Metric({ label, value, delta }) {
  const hasDelta = typeof delta === "number";
  const positive = hasDelta && delta > 0;
  return (
    <div className="hairline-b pb-2">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">{label}</span>
        {hasDelta && (
          <span className={`font-mono text-[11px] ${positive ? "text-emerald" : "text-rust"}`}>
            {positive ? "+" : ""}{delta.toFixed(1)}%
          </span>
        )}
      </div>
      <div className="font-mono text-[18px] mt-1">{value}</div>
    </div>
  );
}

function RankedList({ items }) {
  return (
    <div className="mt-8 hairline" style={{ borderRadius: 3 }}>
      {items.map((e, i) => (
        <RankedRow
          key={e.id}
          exchange={e}
          delay={i * 30}
          isLast={i === items.length - 1}
        />
      ))}
    </div>
  );
}

function RankedRow({ exchange, delay, isLast }) {
  const tierColor = getTierColor(exchange.score);
  return (
    <div
      className={`px-5 py-4 flex items-center gap-4 ${
        isLast ? "" : "hairline-b"
      } hover:bg-white/[0.02] transition-colors`}
    >
      <span className="font-mono text-[12px] text-muted w-7">#{exchange.rank}</span>
      <ExchangeLogo domain={exchange.domain} name={exchange.name} size={24} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-semibold">{exchange.name}</span>
          {exchange.micarLicensed && <Badge tone="emerald">MiCAR</Badge>}
          {exchange.type.includes("dex") && <Badge tone="cyan">DEX</Badge>}
        </div>
        <div className="text-[11px] text-muted mt-[2px]">{exchange.bestFor}</div>
      </div>
      <div className="hidden md:flex items-center gap-3 w-[200px]">
        <div className="flex-1">
          <MiniBar value={exchange.score} color={tierColor} delay={delay} />
        </div>
        <span className="font-mono text-[13px] text-txt w-7 text-right">{exchange.score}</span>
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

function ComparisonTableSection({ list }) {
  return (
    <section id="comparison" className="mt-20 scroll-mt-20">
      <Eyebrow color="text-cyan">Comparison Table</Eyebrow>
      <h2 className="mt-3 text-[28px] font-bold tracking-tight">Side-by-side on what matters.</h2>
      <div className="mt-6 overflow-x-auto hairline" style={{ borderRadius: 3 }}>
        <table className="w-full min-w-[920px] text-[13px]">
          <thead className="font-mono text-[10px] uppercase tracking-widest text-muted">
            <tr className="hairline-b">
              <th className="text-left p-3 font-normal">Exchange</th>
              <th className="text-left p-3 font-normal">Score</th>
              <th className="text-left p-3 font-normal">MiCAR</th>
              <th className="text-left p-3 font-normal">Card</th>
              <th className="text-left p-3 font-normal">Futures</th>
              <th className="text-left p-3 font-normal">PoR</th>
              <th className="text-left p-3 font-normal">Fees</th>
              <th className="text-right p-3 font-normal">Visit</th>
            </tr>
          </thead>
          <tbody>
            {list.map((e, i) => (
              <ComparisonRow key={e.id} exchange={e} isLast={i === list.length - 1} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ComparisonRow({ exchange, isLast }) {
  return (
    <tr className={`${isLast ? "" : "hairline-b"} hover:bg-white/[0.02] transition-colors`}>
      <td className="p-3">
        <div className="flex items-center gap-3">
          <ExchangeLogo domain={exchange.domain} name={exchange.name} size={22} />
          <span className="font-semibold">{exchange.name}</span>
        </div>
      </td>
      <td className="p-3">
        <ScorePill score={exchange.score} />
      </td>
      <td className="p-3"><BoolCheck on={exchange.micarLicensed} /></td>
      <td className="p-3"><BoolCheck on={exchange.hasCryptoCard} /></td>
      <td className="p-3"><BoolCheck on={exchange.hasFutures} /></td>
      <td className="p-3 font-mono text-[12px] text-muted">{exchange.porCadence}</td>
      <td className="p-3 font-mono text-[12px] text-muted">
        {exchange.tradingFeeLow.toFixed(2)}–{exchange.tradingFeeHigh.toFixed(2)}%
      </td>
      <td className="p-3 text-right">
        <a
          href={exchange.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] uppercase tracking-widest text-cyan hover:text-emerald transition-colors"
        >
          Visit <ArrowUpRight size={10} className="inline" />
        </a>
      </td>
    </tr>
  );
}

function ScorePill({ score }) {
  return (
    <span
      className={`px-2 py-[2px] font-mono text-[12px] ${scoreColor(score)}`}
      style={{ background: getTierBg(score), borderRadius: 3 }}
    >
      {score}
    </span>
  );
}

function BoolCheck({ on }) {
  if (on) return <Check size={14} className="text-emerald" />;
  return <XIcon size={14} className="text-dim" />;
}

function ReviewsSection({ list }) {
  const top = list.slice(0, 6);
  return (
    <section id="reviews" className="mt-20 scroll-mt-20">
      <Eyebrow color="text-emerald">Exchange Reviews</Eyebrow>
      <h2 className="mt-3 text-[28px] font-bold tracking-tight">
        The top {top.length} — in detail.
      </h2>
      <div className="mt-8 space-y-px" style={{ background: "rgba(255,255,255,0.07)" }}>
        {top.map((e) => (
          <ReviewBlock key={e.id} exchange={e} />
        ))}
      </div>
    </section>
  );
}

function ReviewBlock({ exchange: e }) {
  return (
    <div className="bg-bg p-7 grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8">
      <div>
        <div className="flex items-center gap-4">
          <ExchangeLogo domain={e.domain} name={e.name} size={56} />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[22px] font-semibold">{e.name}</h3>
              <span className="font-mono text-[11px] text-muted">#{e.rank}</span>
              {e.micarLicensed && <Badge tone="emerald">MiCAR</Badge>}
            </div>
            <div className="text-[12px] text-muted mt-1">{e.bestFor}</div>
          </div>
          <div className="ml-auto">
            <ScoreCircle value={e.score} size={56} />
          </div>
        </div>
        <p className="mt-5 text-[14px] text-txt/90 leading-relaxed">{e.proSummary}</p>
        <div className="mt-6">
          <ProsCons pros={e.pros} cons={e.cons} />
        </div>
        <div className="mt-7 flex gap-3">
          <a href={e.affiliateUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Visit {e.name} <ArrowUpRight size={14} />
          </a>
          <a href={`#${e.id}`} className="btn-outline">
            Full review <ArrowRight size={14} />
          </a>
        </div>
        {e.featured && (
          <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted">
            Featured placement disclosed · score independent
          </p>
        )}
      </div>
      <PhoneMockup exchange={e} />
    </div>
  );
}

function PhoneMockup({ exchange }) {
  return (
    <div className="flex items-center justify-center">
      <div
        className="relative"
        style={{
          width: 180,
          height: 340,
          border: "0.5px solid rgba(255,255,255,0.12)",
          borderRadius: 18,
          background: "linear-gradient(180deg, #0f1422 0%, #0a0e1c 100%)",
        }}
      >
        <div
          className="absolute top-2 left-1/2 -translate-x-1/2"
          style={{ width: 50, height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2 }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <ExchangeLogo domain={exchange.domain} name={exchange.name} size={48} />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
            {exchange.name} App
          </span>
          <div className="mt-4 flex gap-2">
            <span className="font-mono text-[10px] text-emerald">● live</span>
            <span className="font-mono text-[10px] text-muted">{exchange.uptime90d}% uptime</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MethodologySection() {
  return (
    <section id="methodology" className="mt-20 scroll-mt-20">
      <Eyebrow color="text-cyan">Methodology</Eyebrow>
      <h2 className="mt-3 text-[28px] font-bold tracking-tight">
        Seven pillars. One transparent formula.
      </h2>
      <p className="mt-4 text-[14px] text-muted leading-relaxed max-w-3xl">
        Every exchange is scored on seven pillars. Each pillar is normalized to 0–100, weighted,
        and combined. The weights are public, the inputs are documented, and placement on /compare
        or /cards has no effect on the resulting score.
      </p>
      <PillarsTable />
      <IndependenceNote />
    </section>
  );
}

function PillarsTable() {
  return (
    <div className="mt-8 hairline cs-scanline" style={{ borderRadius: 3 }}>
      <table className="w-full text-[14px]">
        <thead className="font-mono text-[10px] uppercase tracking-widest text-muted hairline-b">
          <tr>
            <th className="text-left p-4 font-normal">Pillar</th>
            <th className="text-left p-4 font-normal">Weight</th>
            <th className="text-left p-4 font-normal">What it covers</th>
          </tr>
        </thead>
        <tbody>
          {SCORE_PILLARS.map((p, i) => (
            <tr key={p.name} className={i === SCORE_PILLARS.length - 1 ? "" : "hairline-b"}>
              <td className="p-4 font-semibold">{p.name}</td>
              <td className="p-4 font-mono text-cyan">{p.weight}%</td>
              <td className="p-4 text-muted">{p.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function IndependenceNote() {
  return (
    <div className="mt-10 p-7 hairline" style={{ borderRadius: 3, background: "#0f1422" }}>
      <Shield size={20} className="text-emerald" />
      <h3 className="mt-4 text-[18px] font-semibold">Editorial independence is the product.</h3>
      <p className="mt-3 text-[14px] text-muted leading-relaxed">
        Bybit currently ranks #1 (94/100) on our EU/MiCAR leaderboard. Bybit also runs a featured
        placement on this page, which is disclosed as commercial. The score and the placement are
        produced by separate processes. We will publish a methodology change before adjusting either.
      </p>
      <Link to="/about" className="btn-cyan mt-6 !text-[12px]">
        Read full methodology <ArrowRight size={12} />
      </Link>
    </div>
  );
}
