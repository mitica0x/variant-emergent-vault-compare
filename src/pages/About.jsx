import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Mic, Mail, Send, Linkedin } from "lucide-react";
import { Eyebrow } from "../components/UI";
import { TEAM, CITED_BY, SCORE_PILLARS } from "../data/mock";

const SPEAKING = [
  { ev: "CryptoExpoEurope", yr: "2024" },
  { ev: "Next Block Expo Warsaw", yr: "2024" },
  { ev: "ETH Bucharest", yr: "2023" },
  { ev: "DISB", yr: "2023" },
  { ev: "Banking 4.0", yr: "2022" },
];

const TRACK_STATS = [
  { v: "2016", l: "In crypto since cycle one" },
  { v: "15+", l: "Years in derivatives markets" },
  { v: "EU-native", l: "MiCAR-first by design" },
];

export default function About() {
  return (
    <>
      <AboutHero />
      <TrackRecord />
      <SpeakingSection />
      <TeamSection />
      <MethodologySection />
      <CitedBySection />
      <ContactStrip />
      <FinalCTA />
    </>
  );
}

function AboutHero() {
  return (
    <section className="container-x pt-12 md:pt-[153px] pb-20">
      <Eyebrow color="text-emerald">About</Eyebrow>
      <h1 className="mt-5 text-[44px] sm:text-[72px] font-bold tracking-tight leading-[0.98] max-w-4xl">
        Built by operators. Not by reporters.
      </h1>
      <p className="mt-20 text-[17px] text-muted leading-relaxed max-w-2xl">
        CoinSiglieri is an EU/MiCAR-focused crypto exchange intelligence platform. Independent,
        score-driven, operator-built.
      </p>
    </section>
  );
}

function TrackRecord() {
  return (
    <section className="hairline-t hairline-b">
      <div className="container-x py-16">
        <Eyebrow color="text-cyan">Track Record</Eyebrow>
        <div
          className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-px"
          style={{ background: "rgba(255,255,255,0.07)" }}
        >
          {TRACK_STATS.map((s) => (
            <div key={s.l} className="bg-bg p-8">
              <div className="font-mono text-[44px] text-txt leading-none">{s.v}</div>
              <div className="mt-3 text-[14px] text-muted">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpeakingSection() {
  return (
    <section className="container-x py-16">
      <Eyebrow color="text-cyan">Speaking</Eyebrow>
      <h2 className="mt-3 text-[28px] font-bold tracking-tight">Where we've been on stage.</h2>
      <div className="mt-8 hairline" style={{ borderRadius: 3 }}>
        {SPEAKING.map((s, i) => (
          <div
            key={s.ev}
            className={`flex items-center px-5 py-4 ${
              i === SPEAKING.length - 1 ? "" : "hairline-b"
            } hover:bg-white/[0.02] transition-colors`}
          >
            <Mic size={14} className="text-cyan mr-4" />
            <span className="flex-1 text-[15px] font-semibold">{s.ev}</span>
            <span className="font-mono text-[12px] text-muted">{s.yr}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section className="container-x py-16">
      <Eyebrow color="text-emerald">Team</Eyebrow>
      <h2 className="mt-3 text-[28px] font-bold tracking-tight">Operator-led.</h2>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {TEAM.map((p) => (
          <TeamCard key={p.name} member={p} />
        ))}
      </div>
    </section>
  );
}

function TeamCard({ member: p }) {
  const initials = p.name.split(" ").map((n) => n[0]).join("");
  return (
    <div className="hairline p-7" style={{ borderRadius: 3, background: "#0f1422" }}>
      <div className="flex items-start gap-5">
        <div
          className="flex items-center justify-center font-mono text-[24px] text-emerald shrink-0"
          style={{
            width: 80,
            height: 80,
            background: "rgba(13,190,130,0.08)",
            border: "0.5px solid rgba(13,190,130,0.2)",
            borderRadius: 3,
          }}
        >
          {initials}
        </div>
        <div>
          <h3 className="text-[20px] font-semibold">{p.name}</h3>
          <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-cyan">{p.role}</div>
          <p className="mt-4 text-[14px] text-muted leading-relaxed">{p.bio}</p>
        </div>
      </div>
    </div>
  );
}

function MethodologySection() {
  return (
    <section className="container-x py-16">
      <Eyebrow color="text-cyan">Methodology</Eyebrow>
      <h2 className="mt-3 text-[28px] font-bold tracking-tight max-w-3xl">
        Seven pillars. Public weights. Documented inputs.
      </h2>
      <div className="mt-8 hairline" style={{ borderRadius: 3 }}>
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
    </section>
  );
}

function CitedBySection() {
  return (
    <section className="hairline-t hairline-b">
      <div className="container-x py-14">
        <Eyebrow color="text-muted">As cited by</Eyebrow>
        <div className="mt-6 flex flex-wrap gap-x-10 gap-y-3">
          {CITED_BY.map((c) => (
            <span
              key={c}
              className="font-mono text-[15px] text-muted hover:text-txt transition-colors"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactStrip() {
  return (
    <section className="container-x py-16">
      <div
        className="hairline p-10 flex flex-col lg:flex-row gap-6 lg:items-center justify-between"
        style={{ borderRadius: 3, background: "#0f1422" }}
      >
        <div>
          <Eyebrow color="text-emerald">Get in touch</Eyebrow>
          <h3 className="mt-3 text-[24px] font-bold tracking-tight">
            Operator, investor, or press — we read every message.
          </h3>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="mailto:hello@coinsiglieri.com" className="btn-primary">
            <Mail size={14} /> hello@coinsiglieri.com
          </a>
          <a
            href="https://t.me/coinsiglieri"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cyan"
          >
            <Send size={14} /> Telegram
          </a>
          <a
            href="https://linkedin.com/company/coinsiglieri"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <Linkedin size={14} /> LinkedIn <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="container-x py-16">
      <div className="text-center">
        <Eyebrow color="text-cyan">Up next</Eyebrow>
        <h2 className="mt-3 text-[40px] sm:text-[52px] font-bold tracking-tight leading-[1.02]">
          All Signal. <span className="text-cyan">0</span> Guess.
        </h2>
        <p className="mt-4 text-[15px] text-muted max-w-xl mx-auto">
          Open the leaderboard or run the matcher — either way, you'll be in the data in under
          30 seconds.
        </p>
        <div className="mt-7 flex flex-wrap gap-3 justify-center">
          <Link to="/compare" className="btn-primary">
            Open the leaderboard <ArrowRight size={14} />
          </Link>
          <Link to="/find-my-exchange" className="btn-outline">
            Find my exchange <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
