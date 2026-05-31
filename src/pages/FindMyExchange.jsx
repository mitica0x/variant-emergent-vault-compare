import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { Eyebrow, Badge, MiniBar, ScoreCircle, ExchangeLogo } from "../components/UI";
import {
  EXCHANGES, COUNTRIES, MICAR_COUNTRIES,
  scoreForUser, getReasoning,
} from "../data/mock";
import { FADE_SWAP, EASE_SOFT } from "../lib/motion";

// ---- Static config ----

const QUESTIONS = [
  { id: "country", title: "Where do you live?", type: "country" },
  { id: "trades", title: "What do you trade?", type: "multi",
    options: ["Spot", "Futures", "Options", "Staking", "Just starting", "Earn"] },
  { id: "card", title: "Do you want a crypto card?", type: "single",
    options: ["yes", "maybe", "no"], labels: ["Yes", "Maybe", "No"] },
  { id: "frequency", title: "How often do you trade?", type: "single",
    options: ["Daily", "Weekly", "Monthly", "Mostly hold"] },
  { id: "invest", title: "Investment size?", type: "single",
    options: ["<\u20AC500", "\u20AC500\u20135K", "\u20AC5K\u201350K", ">\u20AC50K"] },
  { id: "risk", title: "Risk tolerance?", type: "single",
    options: ["Conservative", "Moderate", "Aggressive"] },
  { id: "features", title: "Which features matter most?", type: "multi",
    options: ["Copy trading", "Auto-invest", "Launchpad", "API", "Mobile-first"] },
  { id: "regulation", title: "Regulation preference?", type: "single",
    options: ["strict", "any", "none"], labels: ["Strict EU/MiCAR", "Any license", "Doesn't matter"] },
];

const TOTAL = QUESTIONS.length;

const SWAP_TRANSITION = { duration: 0.35, ease: EASE_SOFT };
const PROGRESS_TRANSITION = { duration: 0.5, ease: EASE_SOFT };

// Featured match card config — mirrors the FeaturedCard treatment on /compare.
const BAR_GRADIENT = "linear-gradient(90deg, #18b4d4 0%, #0dbe82 100%)";

const MATCH_PILLARS = [
  { label: "Custody", key: "security" },
  { label: "Liquidity", key: "liquidity" },
  { label: "Compliance", key: "compliance" },
  { label: "Transparent", key: "por", override: 88 },
  { label: "Product Depth", key: "productDepth" },
  { label: "Track Record", key: "trackRecord" },
  { label: "Execution", key: "execution", override: 90 },
];

// ---- Main page ----

export default function FindMyExchange() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);

  const ranked = useMemo(
    () =>
      [...EXCHANGES]
        .map((e) => ({ ...e, _score: scoreForUser(e, answers) }))
        .sort((a, b) => b._score - a._score)
        .slice(0, 8),
    [answers]
  );

  const progress = done ? 100 : Math.round((step / TOTAL) * 100);

  const handlers = useMemo(() => ({
    setVal: (id, v) => setAnswers((s) => ({ ...s, [id]: v })),
    toggleMulti: (id, v) =>
      setAnswers((s) => {
        const arr = s[id] || [];
        const next = arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
        return { ...s, [id]: next };
      }),
    next: () => {
      if (step < TOTAL - 1) setStep(step + 1);
      else setDone(true);
    },
    back: () => {
      if (done) { setDone(false); setStep(TOTAL - 1); return; }
      if (step > 0) setStep(step - 1);
    },
    restart: () => { setAnswers({}); setStep(0); setDone(false); },
  }), [step, done]);

  return (
    <div className="container-x pt-12 md:pt-[153px] pb-24">
      <QuizHero />
      <ProgressBar step={step} done={done} progress={progress} />
      <div className="mt-20 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10">
        <QuestionPanel
          step={step}
          done={done}
          answers={answers}
          ranked={ranked}
          handlers={handlers}
        />
        <LiveRankingPanel ranked={ranked} answers={answers} done={done} />
      </div>
    </div>
  );
}

// ---- Sections ----

function QuizHero() {
  return (
    <section className="max-w-3xl">
      <Eyebrow color="text-emerald">Find My Exchange</Eyebrow>
      <h1 className="mt-4 text-[44px] sm:text-[56px] font-bold tracking-tight leading-[1.02]">
        8 questions. Your match.
      </h1>
      <p className="mt-20 text-[18px] text-muted leading-relaxed max-w-2xl">
        Answer 8 quick questions — we rerank our 22 venues live as you go. No email required.
      </p>
    </section>
  );
}

function ProgressBar({ step, done, progress }) {
  const label = done ? "Complete" : `Question ${step + 1} of ${TOTAL}`;
  return (
    <div className="mt-20">
      <div className="flex items-center justify-between font-mono text-[12px] uppercase tracking-widest text-muted">
        <span>{label}</span>
        <span className="text-cyan">{progress}%</span>
      </div>
      <div className="mt-2 h-[3px] bg-white/[0.05]" style={{ borderRadius: 2 }}>
        <motion.div
          animate={{ width: `${progress}%` }}
          transition={PROGRESS_TRANSITION}
          className="h-full"
          style={{ borderRadius: 2, background: "linear-gradient(90deg, #18b4d4 0%, #0dbe82 50%, #70a848 100%)" }}
        />
      </div>
    </div>
  );
}

function QuestionPanel({ step, done, answers, ranked, handlers }) {
  return (
    <div
      className="hairline p-7 lg:p-10"
      style={{ borderRadius: 3, background: "#0f1422", minHeight: 460 }}
    >
      {done ? (
        <ResultsDisplay ranked={ranked} answers={answers} onRestart={handlers.restart} />
      ) : (
        <ActiveQuestion step={step} answers={answers} handlers={handlers} />
      )}
      {!done && <QuizNav step={step} handlers={handlers} />}
    </div>
  );
}

function ActiveQuestion({ step, answers, handlers }) {
  const q = QUESTIONS[step];
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={q.id}
        initial={FADE_SWAP.initial}
        animate={FADE_SWAP.animate}
        exit={FADE_SWAP.exit}
        transition={SWAP_TRANSITION}
      >
        <Eyebrow color="text-cyan">Step {step + 1}</Eyebrow>
        <h2 className="mt-3 text-[28px] sm:text-[32px] font-bold tracking-tight">{q.title}</h2>
        <div className="mt-8">
          <QuestionInput q={q} answers={answers} handlers={handlers} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function QuestionInput({ q, answers, handlers }) {
  if (q.type === "country") {
    return <CountrySelect value={answers.country} onChange={(v) => handlers.setVal("country", v)} />;
  }
  if (q.type === "multi") {
    return <MultiSelect q={q} answers={answers} handlers={handlers} />;
  }
  return <SingleSelect q={q} answers={answers} handlers={handlers} />;
}

function MultiSelect({ q, answers, handlers }) {
  const selected = answers[q.id] || [];
  return (
    <div className="flex flex-wrap gap-2">
      {q.options.map((option) => {
        const isSel = selected.includes(option);
        return (
          <button
            key={option}
            onClick={() => handlers.toggleMulti(q.id, option)}
            className={`px-4 py-2 text-[13px] transition-colors ${
              isSel ? "bg-emerald text-bg" : "text-txt hover:bg-white/[0.03]"
            }`}
            style={{ border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 3 }}
          >
            {isSel && <Check size={12} className="inline mr-1" />}
            {option}
          </button>
        );
      })}
    </div>
  );
}

function SingleSelect({ q, answers, handlers }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">
      {q.options.map((option, i) => {
        const isSel = answers[q.id] === option;
        const label = q.labels ? q.labels[i] : option;
        return (
          <button
            key={option}
            onClick={() => handlers.setVal(q.id, option)}
            className={`p-4 text-left text-[14px] transition-colors ${
              isSel ? "border-emerald bg-emerald/15 text-emerald" : "text-txt hover:bg-white/[0.02]"
            }`}
            style={{
              border: isSel ? "0.5px solid #0dbe82" : "0.5px solid rgba(255,255,255,0.1)",
              borderRadius: 3,
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

function CountrySelect({ value, onChange }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => COUNTRIES.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())),
    [query]
  );
  return (
    <div className="max-w-md">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search your country..."
        className="input-base w-full"
      />
      <div className="mt-3 max-h-[280px] overflow-y-auto hairline" style={{ borderRadius: 3 }}>
        {filtered.map((c) => {
          const isSel = value === c.code;
          return (
            <button
              key={c.code}
              onClick={() => onChange(c.code)}
              className={`w-full px-4 py-2 flex items-center gap-3 text-left text-[13px] ${
                isSel ? "bg-emerald/15 text-emerald" : "hover:bg-white/[0.02] text-txt"
              }`}
            >
              <span className="text-[20px]">{c.flag}</span>
              <span className="flex-1">{c.name}</span>
              {MICAR_COUNTRIES.has(c.code) && <Badge tone="emerald">MiCAR</Badge>}
              {isSel && <Check size={14} className="text-emerald" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function QuizNav({ step, handlers }) {
  const lastStep = step === TOTAL - 1;
  return (
    <div className="mt-10 flex gap-3">
      <button
        onClick={handlers.back}
        disabled={step === 0}
        className="btn-outline disabled:opacity-40"
      >
        <ArrowLeft size={14} /> Back
      </button>
      <button onClick={handlers.next} className="btn-primary">
        {lastStep ? "See my match" : "Next"} <ArrowRight size={14} />
      </button>
    </div>
  );
}

function ResultsDisplay({ ranked, answers, onRestart }) {
  const [first, ...runnersUp] = ranked.slice(0, 3);
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Eyebrow color="text-emerald">Your match</Eyebrow>
      <h2 className="mt-3 text-[32px] font-bold tracking-tight">{first.name} is your match.</h2>
      <p className="mt-3 text-[15px] text-muted leading-relaxed max-w-xl">
        Based on your answers we re-ranked {EXCHANGES.length} venues. This is the strongest fit for
        your profile across compliance, product, and execution.
      </p>

      <div className="mt-7">
        <MatchFeaturedCard exchange={first} answers={answers} />
      </div>

      {runnersUp.length > 0 && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {runnersUp.map((e, i) => (
            <MatchCompactCard key={e.id} exchange={e} rank={i + 2} answers={answers} />
          ))}
        </div>
      )}

      <button
        onClick={onRestart}
        className="mt-6 inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-widest text-muted hover:text-cyan transition-colors"
      >
        Retake quiz <ArrowRight size={12} />
      </button>
    </motion.div>
  );
}

// #1 match — full featured treatment mirroring FeaturedCard on /compare:
// identity + reasons left, 7 pillar bars center, radar right.
function MatchFeaturedCard({ exchange: e, answers }) {
  const reasons = getReasoning(e, answers);
  return (
    <div
      className="p-7 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr_1.3fr] gap-8"
      style={{
        background: "#0f1422",
        border: "0.5px solid rgba(255,255,255,0.08)",
        borderLeft: "3px solid #0dbe82",
        borderRadius: 3,
      }}
    >
      <MatchIdentity exchange={e} reasons={reasons} />
      <MatchBars exchange={e} />
      <MatchMetrics exchange={e} />
    </div>
  );
}

function MatchIdentity({ exchange: e, reasons }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[15px]" style={{ color: "rgba(255,255,255,0.6)" }}>#1</span>
        <ExchangeLogo domain={e.domain} name={e.name} size={48} />
        <div>
          <div className="text-[22px] font-semibold leading-none">{e.name}</div>
          <div className="text-[13px] mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>{e.bestFor}</div>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <Badge tone="emerald">★ Your match</Badge>
        {e.micarLicensed && <Badge tone="emerald">✓ MiCAR</Badge>}
        {e.hasCryptoCard && <Badge tone="cyan">Card</Badge>}
      </div>
      <p className="mt-5 text-[14px] leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
        {e.proSummary}
      </p>
      {reasons.length > 0 && (
        <ul className="mt-4 text-[13px] space-y-1.5" style={{ color: "rgba(255,255,255,0.75)" }}>
          {reasons.map((r) => (
            <li key={r} className="flex gap-2">
              <span className="text-emerald">+</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="flex-1 flex items-center justify-center" style={{ marginTop: 24 }}>
        <ScoreCircle value={e._score} size={72} shown={true} />
      </div>
    </div>
  );
}

function MatchBars({ exchange: e }) {
  const bd = e.scoreBreakdown || {};
  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col" style={{ gap: "20px" }}>
        {MATCH_PILLARS.map((p, idx) => {
          const value = p.override ?? bd[p.key] ?? 80;
          return (
            <div key={p.label} className="flex items-center gap-3" style={{ minHeight: "36px" }}>
              <span className="font-mono text-[11px] uppercase tracking-widest w-28" style={{ color: "rgba(255,255,255,0.6)" }}>
                {p.label}
              </span>
              <div className="flex-1">
                <MiniBar value={value} color={BAR_GRADIENT} delay={idx * 0.06} shown={true} />
              </div>
              <span className="font-mono text-[12px] w-6 text-right" style={{ color: "rgba(255,255,255,0.6)" }}>{value}</span>
            </div>
          );
        })}
      </div>
      <div className="flex-1 flex flex-col items-center justify-center" style={{ marginTop: 32 }}>
        <a href={e.affiliateUrl} target="_blank" rel="noopener noreferrer" className="btn-cyan">
          Visit {e.name} <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  );
}

function MatchMetrics({ exchange: e }) {
  return (
    <div className="flex-1 flex flex-col" style={{ minHeight: 300 }}>
      <MatchRadar exchange={e} />
    </div>
  );
}

function MatchRadar({ exchange: e }) {
  const bd = e.scoreBreakdown || {};
  const data = [
    { axis: "Custody", value: bd.security ?? 80 },
    { axis: "Liquidity", value: bd.liquidity ?? 80 },
    { axis: "Compliance", value: bd.compliance ?? 80 },
    { axis: "Transparency", value: 88 },
    { axis: "Product", value: bd.productDepth ?? 80 },
    { axis: "Track Rec.", value: bd.trackRecord ?? 80 },
    { axis: "Execution", value: bd.execution ?? 90 },
  ];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 300 }}>
      <div style={{ position: "absolute", top: 0, right: 0, display: "flex", alignItems: "center", gap: 6, fontFamily: "monospace", fontSize: 10, letterSpacing: "0.14em", color: "#0dbe82", textTransform: "uppercase", zIndex: 2 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#0dbe82", display: "inline-block" }} />
        SCORE BREAKDOWN
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <PolarGrid stroke="rgba(255,255,255,0.07)" />
          <PolarAngleAxis
            dataKey="axis"
            tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11, fontFamily: "monospace" }}
          />
          <Radar name="score" dataKey="value" stroke="#0dbe82" fill="#0dbe82" fillOpacity={0.15} strokeWidth={1.5} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

// #2 / #3 — compact cards: name, tagline, badges, score, 3 reasons, visit. No bars/radar.
function MatchCompactCard({ exchange: e, rank, answers }) {
  const reasons = getReasoning(e, answers, 3);
  return (
    <div
      className="p-5 flex flex-col"
      style={{
        background: "#0f1422",
        border: "0.5px solid rgba(255,255,255,0.08)",
        borderLeft: "3px solid #18b4d4",
        borderRadius: 3,
      }}
    >
      <div className="flex items-center gap-3">
        <span className="font-mono text-[14px]" style={{ color: "rgba(255,255,255,0.5)" }}>#{rank}</span>
        <ExchangeLogo domain={e.domain} name={e.name} size={32} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-[16px]">{e.name}</span>
            {e.micarLicensed && <Badge tone="emerald">MiCAR</Badge>}
            {e.hasCryptoCard && <Badge tone="cyan">Card</Badge>}
          </div>
          <div className="text-[12px] text-muted mt-[2px] truncate">{e.bestFor}</div>
        </div>
        <span className="font-mono text-[20px] text-cyan">{e._score}</span>
      </div>
      {reasons.length > 0 && (
        <ul className="mt-3 text-[13px] text-muted space-y-1">
          {reasons.map((r) => (
            <li key={r} className="flex gap-2">
              <span className="text-cyan">+</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      )}
      <a
        href={e.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-outline mt-4 !text-[13px] !py-2 self-start"
      >
        Visit {e.name} <ArrowUpRight size={12} />
      </a>
    </div>
  );
}

function LiveRankingPanel({ ranked, answers, done }) {
  const isMicarCountry = answers.country && MICAR_COUNTRIES.has(answers.country);
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="w-[6px] h-[6px] rounded-full bg-cyan animate-pulse-dot" />
        <Eyebrow color="text-cyan">{done ? "Final Ranking" : "Live Ranking"}</Eyebrow>
      </div>
      <div className="mt-3 text-[14px] text-muted">Updates as you answer.</div>
      <div className="mt-6 hairline" style={{ borderRadius: 3 }}>
        <AnimatePresence>
          {ranked.map((e, i) => (
            <LiveRankRow
              key={e.id}
              exchange={e}
              position={i}
              isLast={i === ranked.length - 1}
              isMicarCountry={isMicarCountry}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

const LIVE_ROW_INIT = { opacity: 0 };
const LIVE_ROW_ANIM = { opacity: 1 };
const LIVE_ROW_TRANS = { duration: 0.3 };

function LiveRankRow({ exchange: e, position, isLast, isMicarCountry }) {
  const isTopThree = position < 3;
  return (
    <motion.div
      layout
      initial={LIVE_ROW_INIT}
      animate={LIVE_ROW_ANIM}
      transition={LIVE_ROW_TRANS}
      className={`px-4 py-3 flex items-center gap-3 ${isLast ? "" : "hairline-b"} ${
        isTopThree ? "bg-emerald/5" : ""
      }`}
    >
      <span className="font-mono text-[12px] text-muted w-5">#{position + 1}</span>
      <ExchangeLogo domain={e.domain} name={e.name} size={22} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-semibold truncate">{e.name}</span>
          {e.micarLicensed && isMicarCountry && <Badge tone="emerald">MiCAR</Badge>}
        </div>
        <div className="mt-1">
          <MiniBar value={e._score} color="linear-gradient(90deg, #18b4d4 0%, #0dbe82 100%)" />
        </div>
      </div>
      <span className="font-mono text-[14px] text-txt w-7 text-right">{e._score}</span>
    </motion.div>
  );
}
