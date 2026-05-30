import React, { useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, Check, X as XIcon, Shield, Activity, FileCheck2, Scale, History,
} from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { Eyebrow, Badge, MiniBar, ScoreCircle, ProsCons, ExchangeLogo } from "../components/UI";
import { EXCHANGES, SCORE_PILLARS, getTierBg, scoreColor } from "../data/mock";
import { useScrollSpy } from "../hooks/use-in-view";

// ---- Static config (module-scope, stable across renders) ----

const TABS = [
  { id: "all", label: "All Exchanges" },
  { id: "cefi", label: "CEX" },
  { id: "spot", label: "Spot" },
  { id: "derivatives", label: "Derivatives" },
  { id: "dex", label: "DEX" },
];

const SIDEBAR = [
  { id: "overview", label: "Overview" },
  { id: "top-exchanges", label: "Top" },
  { id: "comparison", label: "Comparison" },
  { id: "reviews", label: "Reviews" },
  { id: "methodology", label: "Method" },
];

const BAR_GRADIENT = "linear-gradient(90deg, #18b4d4 0%, #0dbe82 100%)";

const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";

const WEB3_NAMES = ["Binance", "Bybit", "OKX", "Coinbase"];
const SIDEBAR_IDS = SIDEBAR.map((s) => s.id);

const TRUST_ITEMS = [
  { icon: Activity, title: "Hands-on testing", desc: "We open accounts, we trade, we withdraw." },
  { icon: History, title: "30-day rescoring", desc: "Every venue rescored on a rolling cycle." },
  { icon: Scale, title: "7 weighted pillars", desc: "Custody \u00b7 Liquidity \u00b7 Compliance \u00b7 Transparency \u00b7 Product depth \u00b7 Track record \u00b7 Execution." },
  { icon: FileCheck2, title: "Editorial independence", desc: "Scoring boundary disclosed. Always." },
];

// ---- Main page ----

export default function Compare() {
  const [tab, setTab] = useState("all");
  const active = useScrollSpy(SIDEBAR_IDS);

  const list = useMemo(
    () =>
      EXCHANGES.filter((e) =>
        tab === "all" ? true : tab === "cefi" ? !e.type.includes("dex") : e.type.includes(tab)
      ).sort((a, b) => b.score - a.score),
    [tab]
  );

  const featured = useMemo(() => list.find((e) => e.featured) || null, [list]);
  const rest = useMemo(() => list.filter((e) => !e.featured), [list]);

  return (
    <div className="container-x pt-12 md:pt-[153px] pb-24">
      <ComparisonHero />
      <TrustBand />
      <div className="mt-[120px] grid grid-cols-1 xl:grid-cols-[120px_1fr] gap-12">
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
    <motion.section
      className="mt-32 grid grid-cols-2 lg:grid-cols-4 gap-px"
      style={{ background: "rgba(255,255,255,0.07)", borderRadius: 3 }}
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      initial="hidden"
      animate="visible"
    >
      {TRUST_ITEMS.map(({ icon: Icon, title, desc }) => (
        <motion.div
          key={title}
          className="bg-bg p-5"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
        >
          <Icon size={16} className="text-cyan" />
          <div className="mt-3 font-mono text-[11px] uppercase tracking-widest text-txt">{title}</div>
          <div className="mt-1 text-[12px] text-muted">{desc}</div>
        </motion.div>
      ))}
    </motion.section>
  );
}

function Sidebar({ active }) {
  return (
    <aside className="hidden xl:block">
      <div className="sticky top-24" style={{ maxWidth: 120 }}>
        <Eyebrow color="text-muted">On this page</Eyebrow>
        <nav className="mt-4 flex flex-col">
          {SIDEBAR.map((s) => {
            const isActive = active === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="relative h-8 flex items-center pl-3 font-mono uppercase transition-colors"
                style={{
                  fontSize: "10px",
                  letterSpacing: "2px",
                  color: isActive ? "#0dbe82" : "rgba(255,255,255,0.4)",
                  borderLeft: isActive ? "0.5px solid #0dbe82" : "0.5px solid transparent",
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
      <motion.h2
        className="mt-3 text-[28px] font-bold tracking-tight"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        The current top of the board.
      </motion.h2>
      <TabBar tab={tab} setTab={setTab} />
      {showFeatured && <FeaturedCard exchange={featured} />}
      <RankedList items={rest} tab={tab} featuredShown={!!showFeatured} />
    </div>
  );
}

function FeaturedCard({ exchange }) {
  const ref = useRef(null);
  const shown = useInView(ref, { once: false, amount: 0.15 });
  return (
    <div
      ref={ref}
      className="mt-8 p-7 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr_1.3fr] gap-8"
      style={{
        background: "#0f1422",
        borderLeft: "3px solid #a3e635",
        border: "0.5px solid rgba(163,230,53,0.2)",
        borderLeftWidth: 3,
        borderRadius: 3,
      }}
    >
      <FeaturedIdentity exchange={exchange} shown={shown} />
      <FeaturedBars exchange={exchange} shown={shown} />
      <FeaturedMetrics exchange={exchange} shown={shown} />
    </div>
  );
}

function FeaturedIdentity({ exchange, shown }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[14px]" style={{ color: "rgba(255,255,255,0.6)" }}>#{exchange.rank}</span>
        <ExchangeLogo domain={exchange.domain} name={exchange.name} size={48} />
        <div>
          <div className="text-[20px] font-semibold leading-none">{exchange.name}</div>
          <div className="text-[12px] mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>{exchange.bestFor}</div>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <Badge tone="rust">★ Featured</Badge>
        {exchange.micarLicensed && <Badge tone="emerald">✓ MiCAR</Badge>}
        {exchange.hasCryptoCard && <Badge tone="cyan">Card</Badge>}
      </div>
      <p className="mt-5 text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
        {exchange.proSummary}
      </p>
      <div className="flex-1 flex items-center justify-center">
        <ScoreCircle value={exchange.score} size={72} shown={shown} />
      </div>
    </div>
  );
}

const FEATURED_PILLARS = [
  { label: "Custody", key: "security" },
  { label: "Liquidity", key: "liquidity" },
  { label: "Compliance", key: "compliance" },
  { label: "Transparent", key: "por", override: 88 },
  { label: "Product Depth", key: "productDepth" },
  { label: "Track Record", key: "trackRecord" },
  { label: "Execution", key: "execution", override: 90 },
];

function FeaturedBars({ exchange, shown }) {
  const bd = exchange.scoreBreakdown || {};
  return (
    <div className="h-full flex flex-col -ml-3">
      <div className="space-y-2">
        {FEATURED_PILLARS.map((p, idx) => {
        const value = p.override ?? bd[p.key] ?? 80;
        return (
          <div key={p.label} className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest w-28" style={{ color: "rgba(255,255,255,0.6)" }}>
              {p.label}
            </span>
            <div className="flex-1">
              <MiniBar value={value} color={BAR_GRADIENT} delay={idx * 0.06} shown={shown} />
            </div>
            <span className="font-mono text-[11px] w-6 text-right" style={{ color: "rgba(255,255,255,0.6)" }}>{value}</span>
          </div>
        );
        })}
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        <a
          href={exchange.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cyan"
        >
          Visit {exchange.name} <ArrowUpRight size={14} />
        </a>
        <p className="text-[10px] font-mono text-center" style={{ color: "rgba(255,255,255,0.6)" }}>
          Sponsored by {exchange.name} · CTR 24h: 3.4%
        </p>
      </div>
    </div>
  );
}

function FeaturedMetrics({ exchange, shown }) {
  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="grid grid-cols-3 gap-3">
        <CompactVital label="24h Vol" value={exchange.vol24h} delta={exchange.vol24hDelta} />
        <CompactVital label="BTC Spread" value={`${exchange.spreadBTC.toFixed(3)}%`} />
        <CompactVital label="Uptime" value={`${exchange.uptime90d}%`} />
      </div>
      <div className="flex-1" style={{ minHeight: 300 }}>
        <RadarBreakdown exchange={exchange} shown={shown} />
      </div>
    </div>
  );
}

function CompactVital({ label, value, delta }) {
  const hasDelta = typeof delta === "number";
  const positive = hasDelta && delta > 0;
  return (
    <div className="hairline-b pb-2">
      <div className="font-mono text-[9px] uppercase tracking-widest text-muted">{label}</div>
      <div className="font-mono text-[13px] mt-1">{value}</div>
      {hasDelta && (
        <div className={`font-mono text-[10px] ${positive ? "text-emerald" : "text-rust"}`}>
          {positive ? "+" : ""}{delta.toFixed(1)}%
        </div>
      )}
    </div>
  );
}

function RadarBreakdown({ exchange, shown }) {
  const bd = exchange.scoreBreakdown || {};
  const data = [
    { axis: "Custody", value: bd.security ?? 80 },
    { axis: "Liquidity", value: bd.liquidity ?? 80 },
    { axis: "Compliance", value: bd.compliance ?? 80 },
    { axis: "Transparency", value: 88 },
    { axis: "Product", value: bd.productDepth ?? 80 },
    { axis: "Track Rec.", value: bd.trackRecord ?? 80 },
    { axis: "Execution", value: bd.execution ?? 90 },
  ];

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(ry, { stiffness: 150, damping: 20 });
  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 16); // ±8deg
    rx.set(-py * 16); // ±8deg
  };
  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div
      style={{ position: "relative", width: "100%", height: "100%", minHeight: 300 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div style={{ position: "absolute", top: 0, right: 0, display: "flex", alignItems: "center", gap: 6, fontFamily: "monospace", fontSize: 9, letterSpacing: "0.14em", color: "#0dbe82", textTransform: "uppercase", zIndex: 2 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#0dbe82", display: "inline-block" }} />
        SCORE BREAKDOWN
      </div>
      <motion.div
        style={{ width: "100%", height: "100%", rotateX, rotateY, transformPerspective: 800 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={shown ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <PolarGrid stroke="rgba(255,255,255,0.07)" />
            <PolarAngleAxis
              dataKey="axis"
              tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 10, fontFamily: "monospace" }}
            />
            <Radar
              name="score"
              dataKey="value"
              stroke="#0dbe82"
              fill="#0dbe82"
              fillOpacity={0.15}
              strokeWidth={1.5}
            />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}

function DexDivider() {
  return (
    <div
      className="font-mono"
      style={{
        borderTop: "0.5px solid rgba(255,255,255,0.08)",
        padding: "12px 14px",
        fontSize: 10,
        letterSpacing: "2px",
        color: "rgba(255,255,255,0.3)",
      }}
    >
      DECENTRALIZED · ON-CHAIN
    </div>
  );
}

const COLLAPSED_ROWS = 10;
const ACCORDION_TRANSITION = { duration: 0.35, ease: "easeInOut" };

// Full-width ghost toggle shared by all three expand/collapse sections.
function ShowMoreButton({ expanded, onToggle, collapsedLabel }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onToggle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="w-full mt-3 py-3 font-mono uppercase tracking-widest text-xs"
      style={{
        background: "transparent",
        border: `1px solid ${hover ? "#ffffff30" : "#ffffff18"}`,
        color: hover ? "#e4e4e7" : "#a1a1aa",
        borderRadius: 3,
        transition: "border-color 200ms ease, color 200ms ease",
      }}
    >
      {expanded ? "Show less ↑" : `${collapsedLabel} ↓`}
    </button>
  );
}

function RankedList({ items, tab, featuredShown }) {
  const [expanded, setExpanded] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Ordered entries (rows + optional cex/dex divider), matching the prior layout.
  const entries = useMemo(() => {
    if (tab !== "all") {
      return items.map((e) => ({ kind: "row", exchange: e }));
    }
    const cex = items.filter((e) => !e.type.includes("dex"));
    const dex = items.filter((e) => e.type.includes("dex"));
    const out = cex.map((e) => ({ kind: "row", exchange: e }));
    if (cex.length > 0 && dex.length > 0) out.push({ kind: "divider" });
    dex.forEach((e) => out.push({ kind: "row", exchange: e }));
    return out;
  }, [items, tab]);

  // Split after the first COLLAPSED_ROWS rows (a divider before them rides along).
  const { head, tail, totalRows } = useMemo(() => {
    let rowCount = 0;
    let splitAt = entries.length;
    for (let i = 0; i < entries.length; i++) {
      if (entries[i].kind === "row") {
        rowCount += 1;
        if (rowCount === COLLAPSED_ROWS) { splitAt = i + 1; break; }
      }
    }
    const total = entries.reduce((n, e) => (e.kind === "row" ? n + 1 : n), 0);
    return { head: entries.slice(0, splitAt), tail: entries.slice(splitAt), totalRows: total };
  }, [entries]);

  const hasTail = tail.some((e) => e.kind === "row");
  const headLastRow = head.reduce((acc, e, i) => (e.kind === "row" ? i : acc), -1);
  const tailLastRow = tail.reduce((acc, e, i) => (e.kind === "row" ? i : acc), -1);
  const totalLabel = totalRows + (featuredShown ? 1 : 0);

  const renderEntry = (entry, idx, isLast) =>
    entry.kind === "divider" ? (
      <DexDivider key={`divider-${idx}`} />
    ) : (
      <RankedRow
        key={entry.exchange.id}
        exchange={entry.exchange}
        isLast={isLast}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    );

  return (
    <>
      <div className="mt-8 hairline" style={{ borderRadius: 3 }}>
        {head.map((e, i) => renderEntry(e, i, !expanded && i === headLastRow))}
        <AnimatePresence initial={false}>
          {expanded && hasTail && (
            <motion.div
              key="ranked-tail"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={ACCORDION_TRANSITION}
              style={{ overflow: "hidden" }}
            >
              {tail.map((e, i) => renderEntry(e, i, i === tailLastRow))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {hasTail && (
        <ShowMoreButton
          expanded={expanded}
          onToggle={() => setExpanded((v) => !v)}
          collapsedLabel={`Show all ${totalLabel} exchanges`}
        />
      )}
    </>
  );
}

function RankedRow({ exchange, isLast, selectedId, setSelectedId }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });
  const rowDelay = (exchange.rank % 8) * 0.04;
  const isExpanded = selectedId === exchange.id;
  return (
    <>
    <div
      ref={ref}
      onClick={() => setSelectedId(isExpanded ? null : exchange.id)}
      className={`px-5 py-4 flex items-center gap-4 cursor-pointer ${
        isLast ? "" : "hairline-b"
      } hover:bg-white/[0.02]`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 500ms ${SPRING} ${rowDelay}s, transform 500ms ${SPRING} ${rowDelay}s, background-color 150ms ease`,
        borderLeft: isExpanded ? "3px solid #0dbe82" : "3px solid transparent",
        background: isExpanded ? "rgba(13,190,130,0.04)" : undefined,
      }}
    >
      <span className="font-mono text-[12px] text-muted w-7">#{exchange.rank}</span>
      <ExchangeLogo domain={exchange.domain} name={exchange.name} size={24} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-semibold">{exchange.name}</span>
          {WEB3_NAMES.includes(exchange.name) && (
            <span
              style={{
                background: "rgba(163,230,53,0.10)",
                color: "#a3e635",
                border: "0.5px solid rgba(163,230,53,0.4)",
                borderRadius: 3,
                fontSize: 9,
                fontFamily: "monospace",
                fontWeight: 700,
                padding: "2px 6px",
              }}
            >
              WEB3
            </span>
          )}
          {exchange.micarLicensed && <Badge tone="emerald">MiCAR</Badge>}
          {exchange.type.includes("dex") && <Badge tone="cyan">DEX</Badge>}
        </div>
        <div className="text-[11px] text-muted mt-[2px]">{exchange.bestFor}</div>
      </div>
      <div className="hidden md:flex items-center gap-3 w-[200px]">
        <div className="flex-1">
          <MiniBar value={exchange.score} color={BAR_GRADIENT} />
        </div>
        <span className="font-mono text-[13px] text-txt w-7 text-right">{exchange.score}</span>
      </div>
      <a
        href={exchange.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="btn-cyan !py-1 !px-2 !text-[11px]"
      >
        Visit <ArrowUpRight size={12} />
      </a>
    </div>
    <AnimatePresence initial={false}>
      {isExpanded && (
        <motion.div
          key={exchange.id + "-detail"}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          style={{ overflow: "hidden" }}
        >
          <ExchangeDetailCard exchange={exchange} shown={true} />
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}

// Inline accordion detail — mirrors FeaturedCard's 3-column layout, but reads
// from the passed exchange (not the hardcoded featured one).
function ExchangeDetailCard({ exchange, shown }) {
  return (
    <div
      className="p-7 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr_1.3fr] gap-8"
      style={{
        background: "#0f1422",
        border: "0.5px solid rgba(163,230,53,0.2)",
        borderLeft: "3px solid #0dbe82",
        borderRadius: 3,
      }}
    >
      <DetailIdentity exchange={exchange} shown={shown} />
      <DetailBars exchange={exchange} shown={shown} />
      <DetailMetrics exchange={exchange} shown={shown} />
    </div>
  );
}

function DetailIdentity({ exchange, shown }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[14px]" style={{ color: "rgba(255,255,255,0.6)" }}>#{exchange.rank}</span>
        <ExchangeLogo domain={exchange.domain} name={exchange.name} size={48} />
        <div>
          <div className="text-[20px] font-semibold leading-none">{exchange.name}</div>
          <div className="text-[12px] mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>{exchange.bestFor}</div>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {exchange.micarLicensed && <Badge tone="emerald">✓ MiCAR</Badge>}
        {exchange.type.includes("dex") && <Badge tone="cyan">DEX</Badge>}
        {WEB3_NAMES.includes(exchange.name) && <Badge tone="rust">WEB3</Badge>}
      </div>
      <p className="mt-5 text-[13px] leading-relaxed text-muted">
        {exchange.proSummary}
      </p>
      <div className="flex-1 flex items-center justify-center">
        <ScoreCircle value={exchange.score} size={72} shown={shown} />
      </div>
    </div>
  );
}

function DetailBars({ exchange, shown }) {
  const bd = exchange.scoreBreakdown || {};
  return (
    <div className="h-full flex flex-col -ml-3">
      <div className="space-y-2">
        {FEATURED_PILLARS.map((p, idx) => {
          const value = p.override ?? bd[p.key] ?? 80;
          return (
            <div key={p.label} className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-widest w-28" style={{ color: "rgba(255,255,255,0.6)" }}>
                {p.label}
              </span>
              <div className="flex-1">
                <MiniBar value={value} color={BAR_GRADIENT} delay={idx * 0.06} shown={shown} />
              </div>
              <span className="font-mono text-[11px] w-6 text-right" style={{ color: "rgba(255,255,255,0.6)" }}>{value}</span>
            </div>
          );
        })}
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        <a
          href={exchange.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="btn-cyan"
        >
          Visit {exchange.name} <ArrowUpRight size={14} />
        </a>
        <p className="font-mono text-[10px] text-center text-muted">· Score independent</p>
      </div>
    </div>
  );
}

function DetailMetrics({ exchange, shown }) {
  const hasVol = exchange.vol24h !== undefined && exchange.vol24h !== null;
  const hasSpread = typeof exchange.spreadBTC === "number";
  const hasUptime = typeof exchange.uptime90d === "number";
  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="grid grid-cols-3 gap-3">
        <CompactVital label="24h Vol" value={hasVol ? exchange.vol24h : "—"} delta={exchange.vol24hDelta} />
        <CompactVital label="BTC Spread" value={hasSpread ? `${exchange.spreadBTC.toFixed(3)}%` : "—"} />
        <CompactVital label="Uptime" value={hasUptime ? `${exchange.uptime90d}%` : "—"} />
      </div>
      <div className="flex-1" style={{ minHeight: 300 }}>
        <RadarBreakdown exchange={exchange} shown={shown} />
      </div>
    </div>
  );
}

const COLLAPSED_TABLE_ROWS = 5;

// Shared fixed column widths so the always-visible head table and the
// animated tail table line up exactly (a true height accordion needs the
// tail in its own block-level container, hence two stacked tables).
const TABLE_COL_WIDTHS = ["24%", "10%", "9%", "9%", "10%", "13%", "13%", "12%"];
function TableCols() {
  return (
    <colgroup>
      {TABLE_COL_WIDTHS.map((w, i) => (
        <col key={i} style={{ width: w }} />
      ))}
    </colgroup>
  );
}

function ComparisonTableHead() {
  return (
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
  );
}

function ComparisonTableSection({ list }) {
  const [expanded, setExpanded] = useState(false);
  const head = list.slice(0, COLLAPSED_TABLE_ROWS);
  const tail = list.slice(COLLAPSED_TABLE_ROWS);
  const hasTail = tail.length > 0;

  return (
    <section id="comparison" className="mt-20 scroll-mt-20">
      <Eyebrow color="text-cyan">Comparison Table</Eyebrow>
      <motion.h2
        className="mt-3 text-[28px] font-bold tracking-tight"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Side-by-side on what matters.
      </motion.h2>

      <div className="mt-6 overflow-x-auto hairline" style={{ borderRadius: 3 }}>
        <table className="w-full min-w-[920px] text-[13px] table-fixed">
          <TableCols />
          <ComparisonTableHead />
          <tbody>
            {head.map((e, i) => (
              <ComparisonRow
                key={e.id}
                exchange={e}
                isLast={(!expanded || !hasTail) && i === head.length - 1}
              />
            ))}
          </tbody>
        </table>

        <AnimatePresence initial={false}>
          {expanded && hasTail && (
            <motion.div
              key="comparison-tail"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={ACCORDION_TRANSITION}
              style={{ overflow: "hidden" }}
            >
              <table className="w-full min-w-[920px] text-[13px] table-fixed">
                <TableCols />
                <tbody>
                  {tail.map((e, i) => (
                    <ComparisonRow key={e.id} exchange={e} isLast={i === tail.length - 1} />
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {hasTail && (
        <ShowMoreButton
          expanded={expanded}
          onToggle={() => setExpanded((v) => !v)}
          collapsedLabel={`Show all ${list.length} exchanges`}
        />
      )}
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

const COLLAPSED_REVIEWS = 3;

function ReviewsSection({ list }) {
  const top = list.slice(0, 7);
  const [expanded, setExpanded] = useState(false);
  const head = top.slice(0, COLLAPSED_REVIEWS);
  const tail = top.slice(COLLAPSED_REVIEWS);
  return (
    <section id="reviews" className="mt-20 scroll-mt-20">
      <Eyebrow color="text-emerald">Exchange Reviews</Eyebrow>
      <motion.h2
        className="mt-3 text-[28px] font-bold tracking-tight"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        The top {top.length} — in detail.
      </motion.h2>
      <motion.div
        className="mt-8 space-y-px"
        style={{ background: "rgba(255,255,255,0.07)" }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {head.map((e) => (
          <ReviewBlock key={e.id} exchange={e} />
        ))}
        <AnimatePresence initial={false}>
          {expanded && tail.length > 0 && (
            <motion.div
              key="reviews-tail"
              className="space-y-px"
              style={{ overflow: "hidden", background: "rgba(255,255,255,0.07)" }}
              variants={{
                hidden: { height: 0, opacity: 0, transition: ACCORDION_TRANSITION },
                visible: { height: "auto", opacity: 1, transition: { ...ACCORDION_TRANSITION, staggerChildren: 0.1 } },
              }}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {tail.map((e) => (
                <ReviewBlock key={e.id} exchange={e} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      {tail.length > 0 && (
        <ShowMoreButton
          expanded={expanded}
          onToggle={() => setExpanded((v) => !v)}
          collapsedLabel={`Show all ${top.length} reviews`}
        />
      )}
    </section>
  );
}

function ReviewBlock({ exchange: e }) {
  return (
    <motion.div
      className="bg-bg p-7 grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8"
      variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
    >
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
    </motion.div>
  );
}

function PhoneMockup({ exchange }) {
  const initials = exchange.name.slice(0, 2).toUpperCase();
  const frame = {
    width: 180,
    height: 320,
    borderRadius: 28,
    border: "6px solid #1e2d45",
    background: "#0a0e1a",
    overflow: "hidden",
  };
  return (
    <div className="flex items-center justify-center">
      <div className="relative" style={{ minWidth: 240, height: 340 }}>
        {/* Back phone — peeking behind-right */}
        <div
          className="absolute top-0 left-0"
          style={{ ...frame, transform: "translateX(28px) translateY(12px)", zIndex: 1 }}
        >
          {/* Placeholder — swap for <img src={appStoreScreenshot} alt="" className="w-full h-full object-cover" /> */}
          <div className="w-full h-full flex items-center justify-center">
            <span style={{ color: "#18b4d4", fontSize: 32, fontWeight: 700 }}>{initials}</span>
          </div>
        </div>
        {/* Front phone */}
        <div className="absolute top-0 left-0" style={{ ...frame, zIndex: 2 }}>
          {/* Placeholder — swap for <img src={appStoreScreenshot} alt="" className="w-full h-full object-cover" /> */}
          <div className="w-full h-full flex items-center justify-center">
            <span style={{ color: "#18b4d4", fontSize: 32, fontWeight: 700 }}>{initials}</span>
          </div>
        </div>
        {/* Score · rank badge — floats over the front phone's top-left corner (sibling, so not clipped) */}
        <div
          className="absolute"
          style={{
            top: -10,
            left: -10,
            zIndex: 3,
            background: "#0dbe82",
            color: "#000",
            fontSize: 11,
            fontWeight: 700,
            borderRadius: 3,
            padding: "4px 8px",
          }}
        >
          {exchange.score} · #{exchange.rank} EU
        </div>
      </div>
    </div>
  );
}

function MethodologySection() {
  return (
    <section id="methodology" className="mt-20 scroll-mt-20">
      <Eyebrow color="text-cyan">Methodology</Eyebrow>
      <motion.h2
        className="mt-3 text-[28px] font-bold tracking-tight"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Seven pillars. One transparent formula.
      </motion.h2>
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
