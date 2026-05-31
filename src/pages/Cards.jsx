import React from "react";
import { ArrowUpRight, Check, X as XIcon } from "lucide-react";
import { Eyebrow, Badge, ProsCons, ExchangeLogo } from "../components/UI";
import { CARDS } from "../data/mock";

const TRUST_ITEMS = [
  { t: "3M+ EU cards issued", d: "On the leading EU crypto-funded card." },
  { t: "Up to 8% cashback", d: "On select pairs, with staking." },
  { t: "50+ currencies", d: "Real-time auto-conversion at checkout." },
  { t: "27 EU countries", d: "Where the tier-1 card actually ships." },
];

export default function Cards() {
  const featured = CARDS.find((c) => c.featured);
  return (
    <div className="container-x pt-12 md:pt-[153px] pb-24">
      <CardsHero />
      <TrustBand />
      {featured && <FeaturedCard card={featured} />}
      <ComparisonTableSection />
      <CardReviewsSection />
    </div>
  );
}

function CardsHero() {
  return (
    <section className="max-w-3xl">
      <Eyebrow color="text-emerald">Crypto Cards</Eyebrow>
      <h1 className="mt-4 text-[44px] sm:text-[56px] font-bold tracking-tight leading-[1.02]">
        The card stack that actually ships.
      </h1>
      <p className="mt-20 text-[20px] text-muted leading-relaxed max-w-2xl">
        Seven crypto-funded cards — ranked on real cashback, all-in fees, country support and
        the parts of the fine print most cardholders never read.
      </p>
    </section>
  );
}

function TrustBand() {
  return (
    <section
      className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-px"
      style={{ background: "rgba(255,255,255,0.07)", borderRadius: 3 }}
    >
      {TRUST_ITEMS.map((m) => (
        <div key={m.t} className="bg-bg p-5">
          <div className="font-semibold text-[18px]">{m.t}</div>
          <div className="mt-1 text-[15px] text-muted">{m.d}</div>
        </div>
      ))}
    </section>
  );
}

function FeaturedCard({ card: featured }) {
  return (
    <section className="mt-20">
      <div
        className="p-7 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8"
        style={{
          background: "#0f1422",
          borderLeft: "3px solid #a3e635",
          border: "0.5px solid rgba(163,230,53,0.2)",
          borderLeftWidth: 3,
          borderRadius: 3,
        }}
      >
        <FeaturedDetails card={featured} />
        <FeaturedVisual card={featured} />
      </div>
    </section>
  );
}

function FeaturedDetails({ card: c }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Badge tone="rust">★ Featured</Badge>
        <Badge tone="emerald">EEA + UK</Badge>
      </div>
      <div className="flex items-center gap-4">
        <ExchangeLogo domain={c.domain} name={c.name} size={48} />
        <div>
          <h2 className="text-[26px] font-semibold leading-none">{c.name}</h2>
          <div className="text-[15px] text-muted mt-2">Issuer: {c.issuer}</div>
        </div>
      </div>
      <p className="mt-5 text-[18px] text-muted leading-relaxed">{c.proSummary}</p>
      <div className="mt-6 flex gap-3">
        <a href={c.affiliateUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Apply for {c.name} <ArrowUpRight size={14} />
        </a>
      </div>
      <p className="mt-3 font-mono text-[13px] uppercase tracking-widest text-muted">
        Sponsored placement · score independent
      </p>
    </div>
  );
}

function FeaturedVisual({ card: c }) {
  return (
    <div className="grid grid-cols-2 gap-4 self-center">
      <CardVisual card={c} cardNumber="4242" />
      <div className="flex flex-col gap-3 justify-center">
        <CardStat label="Cashback" value={c.cashback} />
        <CardStat label="Currencies" value={c.currencies} />
        <CardStat label="Issuance" value={c.issuanceFee} />
        <CardStat label="Monthly" value={c.monthlyFee} />
      </div>
    </div>
  );
}

function CardVisual({ cardNumber }) {
  // Real current Bybit Card — white/off-white matte (2025 rebrand).
  return (
    <div
      className="relative aspect-[1.586/1]"
      style={{
        background:
          "radial-gradient(ellipse at 80% 20%, rgba(0,0,0,0.03) 0%, transparent 60%), linear-gradient(135deg, #ffffff 0%, #f5f5f0 60%, #ebebeb 100%)",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.25), 0 0 0 0.5px rgba(0,0,0,0.08)",
      }}
    >
      {/* BYBIT wordmark */}
      <div
        className="absolute"
        style={{
          top: "12%",
          left: "8%",
          color: "#1a1a1a",
          fontWeight: 800,
          letterSpacing: "0.15em",
          fontSize: "clamp(14px,2.5vw,18px)",
        }}
      >
        BYBIT
      </div>

      {/* EMV chip */}
      <div
        className="absolute"
        style={{
          top: "38%",
          left: "8%",
          width: "14%",
          aspectRatio: "1.4 / 1",
          borderRadius: 3,
          background:
            "linear-gradient(135deg, #d4a843 0%, #f0c040 30%, #b8860b 60%, #d4a843 100%)",
        }}
      />

      {/* Card number */}
      <div
        className="absolute"
        style={{
          bottom: "28%",
          left: "8%",
          color: "rgba(0,0,0,0.6)",
          fontFamily: "monospace",
          fontSize: "clamp(10px,1.8vw,13px)",
          letterSpacing: "0.12em",
        }}
      >
        •••• •••• •••• {cardNumber}
      </div>

      {/* Cardholder label */}
      <div
        className="absolute font-mono text-[11px] uppercase tracking-widest"
        style={{ bottom: "14%", left: "8%", color: "rgba(0,0,0,0.35)" }}
      >
        Cardholder
      </div>

      {/* Mastercard mark */}
      <div
        className="absolute"
        style={{ bottom: "12%", right: "8%", display: "flex", alignItems: "center" }}
      >
        <span style={{ width: 24, height: 24, borderRadius: "50%", background: "#eb001b" }} />
        <span
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "#f79e1b",
            marginLeft: -10,
            mixBlendMode: "multiply",
          }}
        />
      </div>
    </div>
  );
}

function CardStat({ label, value }) {
  return (
    <div className="hairline-b pb-2">
      <div className="font-mono text-[13px] uppercase tracking-widest text-muted">{label}</div>
      <div className="font-mono text-[20px] mt-1">{value}</div>
    </div>
  );
}

function ComparisonTableSection() {
  return (
    <section className="mt-20">
      <Eyebrow color="text-cyan">Comparison</Eyebrow>
      <h2 className="mt-3 text-[28px] font-bold tracking-tight">Side-by-side card stack.</h2>
      <div className="mt-6 overflow-x-auto hairline" style={{ borderRadius: 3 }}>
        <table className="w-full min-w-[1000px] text-[16px]">
          <thead className="font-mono text-[13px] uppercase tracking-widest text-muted">
            <tr className="hairline-b">
              {["Card", "Issuer", "Region", "Cashback", "Curr.", "Issuance", "Monthly", "ATM", "Apple Pay"].map((h) => (
                <th key={h} className="text-left p-3 font-normal">{h}</th>
              ))}
              <th className="text-right p-3 font-normal">Visit</th>
            </tr>
          </thead>
          <tbody>
            {CARDS.map((c, i) => (
              <CardTableRow key={c.id} card={c} isLast={i === CARDS.length - 1} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function CardTableRow({ card: c, isLast }) {
  return (
    <tr className={`${isLast ? "" : "hairline-b"} hover:bg-white/[0.02] transition-colors`}>
      <td className="p-3">
        <div className="flex items-center gap-3">
          <ExchangeLogo domain={c.domain} name={c.name} size={22} />
          <span className="font-semibold">{c.name}</span>
          {c.featured && <Badge tone="rust">★</Badge>}
        </div>
      </td>
      <td className="p-3 text-muted">{c.issuer}</td>
      <td className="p-3 text-muted">{c.region}</td>
      <td className="p-3 text-emerald font-mono">{c.cashback}</td>
      <td className="p-3 font-mono">{c.currencies}</td>
      <td className="p-3 text-muted">{c.issuanceFee}</td>
      <td className="p-3 text-muted">{c.monthlyFee}</td>
      <td className="p-3 text-muted">{c.atmFee}</td>
      <td className="p-3">
        {c.applePay ? <Check size={14} className="text-emerald" /> : <XIcon size={14} className="text-dim" />}
      </td>
      <td className="p-3 text-right">
        <a
          href={c.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[14px] uppercase tracking-widest text-cyan hover:text-emerald transition-colors"
        >
          Visit <ArrowUpRight size={10} className="inline" />
        </a>
      </td>
    </tr>
  );
}

function CardReviewsSection() {
  return (
    <section className="mt-20">
      <Eyebrow color="text-emerald">Card Reviews</Eyebrow>
      <h2 className="mt-3 text-[28px] font-bold tracking-tight">The top 5 — in detail.</h2>
      <div className="mt-8 space-y-px" style={{ background: "rgba(255,255,255,0.07)" }}>
        {CARDS.slice(0, 5).map((c) => (
          <CardReview key={c.id} card={c} />
        ))}
      </div>
    </section>
  );
}

function CardReview({ card: c }) {
  return (
    <div className="bg-bg p-7 grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8">
      <CardReviewDetails card={c} />
      <ReviewCardVisual card={c} />
    </div>
  );
}

function CardReviewDetails({ card: c }) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <ExchangeLogo domain={c.domain} name={c.name} size={48} />
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-[22px] font-semibold">{c.name}</h3>
            {c.featured && <Badge tone="rust">Featured</Badge>}
          </div>
          <div className="text-[15px] text-muted mt-1">
            {c.issuer} · {c.region}
          </div>
        </div>
      </div>
      <p className="mt-5 text-[18px] text-txt/90 leading-relaxed">{c.proSummary}</p>
      <div
        className="mt-6 grid grid-cols-2 gap-px"
        style={{ background: "rgba(255,255,255,0.07)", borderRadius: 3 }}
      >
        <CardStat label="Cashback" value={c.cashback} />
        <CardStat label="Currencies" value={c.currencies} />
        <CardStat label="Issuance" value={c.issuanceFee} />
        <CardStat label="Monthly" value={c.monthlyFee} />
      </div>
      <div className="mt-6">
        <ProsCons pros={c.pros} cons={c.cons} />
      </div>
      <a
        href={c.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary mt-7"
      >
        Apply for {c.name} <ArrowUpRight size={14} />
      </a>
    </div>
  );
}

// Deterministic per-card last 4 digits (no inline Math.random which is unstable across renders).
function cardLast4(id) {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) % 9000;
  }
  return String(1000 + hash);
}

function ReviewCardVisual({ card: c }) {
  return (
    <div className="flex items-center justify-center">
      <div
        className="relative aspect-[1.586/1] w-full max-w-[280px]"
        style={{
          background: "linear-gradient(135deg, #0f1422 0%, #18223c 100%)",
          border: "0.5px solid rgba(255,255,255,0.08)",
          borderRadius: 10,
        }}
      >
        <div className="absolute top-4 left-4">
          <ExchangeLogo domain={c.domain} name={c.name} size={26} />
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="font-mono text-[18px] tracking-widest">
            •••• •••• •••• {cardLast4(c.id)}
          </div>
          <div className="mt-1 font-mono text-[13px] uppercase text-muted">{c.name}</div>
        </div>
      </div>
    </div>
  );
}
