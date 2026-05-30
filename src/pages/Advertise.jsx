import React, { useState } from "react";
import {
  ArrowRight, ArrowUpRight, Send, Mail, Building2, User, MessageSquare, Check, Quote,
} from "lucide-react";
import { Eyebrow, Badge } from "../components/UI";
import { CITED_BY, PARTNERS } from "../data/mock";

// ---- Static config ----

const SOLUTIONS = [
  { i: "01", t: "Featured Placement", sub: "/compare", d: "Rust-bordered featured slot on the highest-intent comparison page. Disclosed as commercial.", page: "Compare leaderboard" },
  { i: "02", t: "Sponsored Article", sub: "Editorial", d: "Long-form, disclosed sponsored story that lives natively in our /news feed with full SEO indexing.", page: "News + permanent index" },
  { i: "03", t: "Newsletter Spotlight", sub: "Friday send", d: "Premium placement in our Friday operator newsletter. Single-sponsor format \u2014 no rotation.", page: "Newsletter (4.2k+ ops)" },
  { i: "04", t: "Card Spotlight", sub: "/cards", d: "Featured slot on the crypto cards comparison page. Branded card visual + editorial summary.", page: "Crypto cards page" },
  { i: "05", t: "Find My Exchange", sub: "Recommended", d: "Recommended-slot placement in the matching quiz \u2014 the closest signal to a buying intent.", page: "Find My Exchange flow" },
  { i: "06", t: "Custom Campaign", sub: "Bespoke", d: "Operator-led custom campaign. Multi-page, multi-month, with measurable performance reporting.", page: "Across CoinSiglieri" },
];

const BUNDLES = [
  { name: "Signal", save: "15%", desc: "Build authority with a sponsored article + newsletter spotlight. Compounds after launch.", includes: ["Sponsored Article", "Newsletter Spotlight"] },
  { name: "Launch", save: "30%", desc: "Compress launch momentum into one coordinated push across the comparison page, newsletter, and editorial.", includes: ["Featured Placement (30d)", "Sponsored Article", "Newsletter Spotlight", "Find My Exchange slot"] },
  { name: "Orbit", save: "40%", desc: "Site-wide visibility plus rankings-page intent and durable reference assets across CoinSiglieri.", includes: ["Featured /compare (90d)", "Card Spotlight (90d)", "Newsletter (12 sends)", "Sponsored Article x 2", "+3 more"] },
];

const HERO_METRICS = [
  { v: "180k+", l: "Monthly Operators" },
  { v: "320k+", l: "Monthly Page Views" },
  { v: "4.2k+", l: "Newsletter Ops" },
  { v: "22", l: "Tracked Venues" },
  { v: "5", l: "Score Pillars" },
  { v: "30d", l: "Rescore Cadence" },
];

const TRUST_ITEMS = [
  { t: "EU-focused \u00b7 MiCAR-native", d: "Editorial built around EU compliance from day one." },
  { t: "Built by operators \u00b7 2016+", d: "Founder is an EU crypto operator since cycle one." },
  { t: "Scoring independent \u00b7 Placement disclosed", d: "Algorithmic score. Commercial slots always labeled." },
  { t: "B2B audience \u00b7 Decision-makers", d: "CMOs, BD leads, compliance heads, founders." },
];

const WHY_CARDS = [
  { t: "EU/MiCAR Specialist", d: "Editorial weight on the licensing track that matters for EU access \u2014 not generic crypto coverage." },
  { t: "Algorithmic Scoring", d: "Five-pillar weighted model. Public weights. Documented inputs. Rescored every 30 days." },
  { t: "High-Intent Audience", d: "CMOs, BD leads, founders, market makers \u2014 not retail. The audience that closes deals." },
];

// ---- Helpers ----

function saveLeadToLocalStorage(form) {
  try {
    const queue = JSON.parse(localStorage.getItem("cs_leads") || "[]");
    queue.push({ ...form, ts: Date.now() });
    localStorage.setItem("cs_leads", JSON.stringify(queue));
    return true;
  } catch (err) {
    console.error("Failed to persist lead to localStorage:", err);
    return false;
  }
}

// ---- Main page ----

export default function Advertise() {
  return (
    <>
      <AdvertiseHero />
      <TrustBand />
      <WhySection />
      <CampaignSolutions />
      <EditorialStandards />
      <PartnersSection />
      <ContactSection />
    </>
  );
}

// ---- Sections ----

function AdvertiseHero() {
  return (
    <section className="hairline-b">
      <div className="container-x pt-12 md:pt-[153px] pb-20 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 items-end">
        <div>
          <Eyebrow color="text-emerald">Media Kit · CoinSiglieri</Eyebrow>
          <h1 className="mt-5 text-[44px] sm:text-[64px] font-bold tracking-tight leading-[1.02] text-balance">
            The leaderboard nobody paid to be on. The real estate around it is.
          </h1>
          <p className="mt-20 text-[17px] text-muted leading-relaxed max-w-2xl">
            Independent intelligence. Editorial scoring. Commercial placement available — always disclosed.
          </p>
          <div className="mt-20 flex flex-wrap gap-3">
            <a href="#contact" className="btn-primary">Reserve placement <ArrowRight size={14} /></a>
            <a href="#solutions" className="btn-outline">Explore solutions <ArrowUpRight size={14} /></a>
          </div>
          <p className="mt-20 font-mono text-[11px] uppercase tracking-widest text-muted">
            Faster:{" "}
            <a href="https://t.me/coinsiglieri" target="_blank" rel="noopener noreferrer" className="text-cyan hover:text-emerald">
              DM @coinsiglieri on Telegram
            </a>
          </p>
        </div>
        <HeroMetrics />
      </div>
    </section>
  );
}

function HeroMetrics() {
  return (
    <div
      className="grid grid-cols-2 gap-px"
      style={{ background: "rgba(255,255,255,0.07)", borderRadius: 3 }}
    >
      {HERO_METRICS.map((s) => (
        <div key={s.l} className="bg-bg p-5">
          <div className="font-mono text-[24px] text-txt">{s.v}</div>
          <div className="eyebrow text-muted mt-1">{s.l}</div>
        </div>
      ))}
    </div>
  );
}

function TrustBand() {
  return (
    <section className="hairline-b">
      <div className="container-x py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {TRUST_ITEMS.map((s) => (
          <div key={s.t}>
            <Check size={14} className="text-emerald" />
            <div className="mt-3 font-semibold text-[14px]">{s.t}</div>
            <div className="mt-1 text-[13px] text-muted">{s.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section className="container-x py-20">
      <Eyebrow color="text-cyan">Why CoinSiglieri</Eyebrow>
      <h2 className="mt-3 text-[36px] font-bold tracking-tight max-w-3xl">
        Where EU crypto operators pay attention.
      </h2>
      <div
        className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-px"
        style={{ background: "rgba(255,255,255,0.07)" }}
      >
        {WHY_CARDS.map((c) => (
          <div
            key={c.t}
            className="bg-bg p-8 card-lift"
            style={{ border: "0.5px solid transparent" }}
          >
            <Quote size={20} className="text-cyan" />
            <h3 className="mt-4 text-[18px] font-semibold">{c.t}</h3>
            <p className="mt-2 text-[14px] text-muted leading-relaxed">{c.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CampaignSolutions() {
  return (
    <section id="solutions" className="container-x py-20">
      <Eyebrow color="text-emerald">Campaign Solutions</Eyebrow>
      <h2 className="mt-3 text-[36px] font-bold tracking-tight max-w-3xl">
        Six placement types. One disclosure standard.
      </h2>
      <BundlesGrid />
      <PlacementsGrid />
    </section>
  );
}

function BundlesGrid() {
  return (
    <div className="mt-12">
      <Eyebrow color="text-cyan">Featured Bundles</Eyebrow>
      <div
        className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-px"
        style={{ background: "rgba(255,255,255,0.07)" }}
      >
        {BUNDLES.map((b) => (
          <BundleCard key={b.name} bundle={b} />
        ))}
      </div>
    </div>
  );
}

function BundleCard({ bundle: b }) {
  return (
    <div className="bg-bg p-7 card-lift" style={{ border: "0.5px solid transparent" }}>
      <div className="flex items-center justify-between">
        <h3 className="text-[22px] font-semibold">{b.name}</h3>
        <Badge tone="emerald">Save {b.save}</Badge>
      </div>
      <p className="mt-3 text-[13px] text-muted leading-relaxed">{b.desc}</p>
      <div className="mt-5">
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted">Bundle includes</div>
        <ul className="mt-2 space-y-1">
          {b.includes.map((x) => (
            <li key={x} className="flex items-start gap-2 text-[13px] text-txt/90">
              <Check size={12} className="text-emerald mt-[3px] shrink-0" />
              {x}
            </li>
          ))}
        </ul>
      </div>
      <a href="#contact" className="btn-cyan mt-6 !text-[12px]">
        Reserve {b.name} <ArrowRight size={12} />
      </a>
    </div>
  );
}

function PlacementsGrid() {
  return (
    <div className="mt-16">
      <Eyebrow color="text-cyan">Build Your Own Campaign</Eyebrow>
      <h3 className="mt-3 text-[22px] font-semibold">Individual placements — mix and match.</h3>
      <div
        className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
        style={{ background: "rgba(255,255,255,0.07)" }}
      >
        {SOLUTIONS.map((s) => (
          <PlacementCard key={s.t} placement={s} />
        ))}
      </div>
      <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-muted">
        Custom packages on request · No public pricing · All quotes via direct contact
      </p>
    </div>
  );
}

function PlacementCard({ placement: s }) {
  return (
    <div className="bg-bg p-7 card-lift" style={{ border: "0.5px solid transparent" }}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] text-muted">{s.i}</span>
        <Badge tone="muted">{s.sub}</Badge>
      </div>
      <h4 className="mt-4 text-[18px] font-semibold">{s.t}</h4>
      <p className="mt-2 text-[13px] text-muted leading-relaxed">{s.d}</p>
      <div className="mt-5 font-mono text-[10px] uppercase tracking-widest text-muted">
        Placement · {s.page}
      </div>
      <a
        href="#contact"
        className="mt-5 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-cyan hover:text-emerald transition-colors"
      >
        Reserve placement <ArrowRight size={12} />
      </a>
    </div>
  );
}

function EditorialStandards() {
  return (
    <section className="hairline-t hairline-b">
      <div className="container-x py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <Eyebrow color="text-emerald">Editorial Standards</Eyebrow>
            <h2 className="mt-3 text-[32px] font-bold tracking-tight max-w-md">
              Editorial independence is the product.
            </h2>
          </div>
          <div className="text-[15px] text-muted leading-relaxed space-y-4">
            <p>
              Scoring at CoinSiglieri is produced by an algorithmic five-pillar model with public
              weights and documented inputs. Commercial placement does not move scores. We will
              publish a methodology change before adjusting either.
            </p>
            <p>
              Every sponsored placement is labelled. We do not run cloud-mining or gambling-related
              advertising. We will refuse paid placement that would conflict with our published
              methodology, regardless of budget.
            </p>
            <p className="font-mono text-[12px] uppercase tracking-widest text-emerald">
              All Signal. 0 Guess.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnersSection() {
  return (
    <section className="container-x py-16">
      <Eyebrow color="text-muted">Tracked partners</Eyebrow>
      <LogoStrip names={PARTNERS} />
      <div className="mt-12">
        <Eyebrow color="text-muted">As cited by</Eyebrow>
        <LogoStrip names={CITED_BY} />
      </div>
    </section>
  );
}

function LogoStrip({ names }) {
  return (
    <div className="mt-6 flex flex-wrap gap-x-10 gap-y-3">
      {names.map((n) => (
        <span key={n} className="font-mono text-[15px] text-muted hover:text-txt transition-colors">
          {n}
        </span>
      ))}
    </div>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="container-x py-20 scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
        <ContactInfo />
        <ContactForm />
      </div>
    </section>
  );
}

function ContactInfo() {
  return (
    <div>
      <Eyebrow color="text-emerald">Contact</Eyebrow>
      <h2 className="mt-3 text-[36px] font-bold tracking-tight">Reserve your placement.</h2>
      <p className="mt-4 text-[14px] text-muted leading-relaxed">We respond within 24 hours.</p>
      <ul className="mt-8 space-y-3 text-[14px]">
        <li className="flex items-center gap-3"><Mail size={14} className="text-cyan" /> ads@coinsiglieri.com</li>
        <li className="flex items-center gap-3"><Send size={14} className="text-cyan" /> @coinsiglieri on Telegram</li>
      </ul>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({
    name: "", company: "", email: "", interests: [], message: "",
  });
  const [sent, setSent] = useState(false);

  function toggleInterest(s) {
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(s)
        ? f.interests.filter((x) => x !== s)
        : [...f.interests, s],
    }));
  }

  function submit(e) {
    e.preventDefault();
    saveLeadToLocalStorage(form);
    setSent(true);
  }

  return (
    <div className="hairline p-8" style={{ borderRadius: 3, background: "#0f1422" }}>
      {sent ? <ContactSuccess /> : (
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Name" icon={User}>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-transparent outline-none w-full text-[14px]"
                placeholder="Your name"
              />
            </Field>
            <Field label="Company" icon={Building2}>
              <input
                required
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="bg-transparent outline-none w-full text-[14px]"
                placeholder="Company"
              />
            </Field>
          </div>
          <Field label="Email" icon={Mail}>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-transparent outline-none w-full text-[14px]"
              placeholder="you@company.com"
            />
          </Field>
          <InterestPicker selected={form.interests} onToggle={toggleInterest} />
          <Field label="Message" icon={MessageSquare}>
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="bg-transparent outline-none w-full text-[14px] resize-none"
              placeholder="Tell us what you're launching, and when."
            />
          </Field>
          <button className="btn-primary w-full justify-center">
            Reserve placement <ArrowRight size={14} />
          </button>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted text-center">
            We respond within 24 hours · Always disclosed · Editorial independence preserved
          </p>
        </form>
      )}
    </div>
  );
}

function ContactSuccess() {
  return (
    <div className="flex items-start gap-3">
      <Check size={24} className="text-emerald" />
      <div>
        <h3 className="text-[20px] font-semibold">Got it.</h3>
        <p className="mt-2 text-[14px] text-muted">We'll respond within 24 hours.</p>
      </div>
    </div>
  );
}

function InterestPicker({ selected, onToggle }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted mb-2">
        Interested in
      </div>
      <div className="flex flex-wrap gap-2">
        {SOLUTIONS.map((s) => {
          const isSel = selected.includes(s.t);
          return (
            <button
              type="button"
              key={s.t}
              onClick={() => onToggle(s.t)}
              className={`px-3 py-[6px] font-mono text-[10px] uppercase tracking-widest transition-colors ${
                isSel ? "bg-emerald text-bg" : "text-muted hover:text-txt"
              }`}
              style={{ border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 3 }}
            >
              {isSel && <Check size={10} className="inline mr-1" />}
              {s.t}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Field({ label, icon: Icon, children }) {
  return (
    <label className="block">
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted mb-2">{label}</div>
      <div className="input-base flex items-start gap-2">
        <Icon size={14} className="text-muted mt-[3px]" />
        <div className="flex-1">{children}</div>
      </div>
    </label>
  );
}
