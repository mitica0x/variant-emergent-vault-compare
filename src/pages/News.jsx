import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Mail } from "lucide-react";
import { Eyebrow, Badge } from "../components/UI";
import { ARTICLES } from "../data/mock";

const CATS = ["All", "MiCAR", "Exchanges", "Crypto Cards", "Regulation", "Market Signals"];

export default function News() {
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? ARTICLES : ARTICLES.filter((a) => a.category === cat);
  const featured = ARTICLES.find((a) => a.featured);
  const grid = list.filter((a) => !a.featured);

  return (
    <div className="container-x pt-12 md:pt-[153px] pb-24">
      <section className="max-w-3xl">
        <Eyebrow color="text-emerald">News</Eyebrow>
        <h1 className="mt-4 text-[44px] sm:text-[56px] font-bold tracking-tight leading-[1.02]">
          What we're watching.
        </h1>
        <p className="mt-20 text-[18px] text-muted leading-relaxed max-w-2xl">
          Weekly signal on EU crypto licensing, exchange moves and the data that actually changes a leaderboard.
        </p>
      </section>

      <div className="mt-20 flex flex-wrap gap-2">
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-3 py-[6px] font-mono text-[11px] uppercase tracking-widest transition-colors ${
              cat === c ? "bg-emerald text-bg" : "text-muted hover:text-txt"
            }`}
            style={{ border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 3 }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Featured */}
      {featured && cat === "All" && (
        <Link to={`/news/${featured.slug}`} className="block mt-20">
          <div className="hairline p-8 lg:p-12 card-lift" style={{ borderRadius: 3, background: "#0f1422" }}>
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="emerald">{featured.category}</Badge>
              <span className="font-mono text-[12px] text-muted">{featured.date} · {featured.readMin} min read</span>
            </div>
            <h2 className="mt-5 text-[28px] lg:text-[40px] font-bold tracking-tight max-w-3xl leading-tight">
              {featured.title}
            </h2>
            <p className="mt-4 text-[17px] text-muted max-w-3xl leading-relaxed">{featured.excerpt}</p>
            <div className="mt-6 flex items-center gap-3">
              <span className="text-[14px] text-txt/90">By {featured.author}</span>
              <ArrowRight size={14} className="text-emerald" />
            </div>
          </div>
        </Link>
      )}

      {/* Grid */}
      <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.07)" }}>
        {grid.map((a) => (
          <Link key={a.slug} to={`/news/${a.slug}`} className="bg-bg p-6 card-lift block" style={{ border: "0.5px solid transparent" }}>
            <Badge tone="cyan">{a.category}</Badge>
            <h3 className="mt-4 text-[18px] font-semibold tracking-tight leading-snug">{a.title}</h3>
            <p className="mt-3 text-[14px] text-muted line-clamp-3">{a.excerpt}</p>
            <div className="mt-5 flex items-center justify-between">
              <span className="font-mono text-[12px] text-muted">{a.date}</span>
              <span className="font-mono text-[12px] text-muted">{a.readMin} min</span>
            </div>
          </Link>
        ))}
      </section>

      {/* Newsletter band */}
      <section className="mt-20 hairline p-10" style={{ borderRadius: 3, background: "#0f1422" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <Eyebrow color="text-cyan">Newsletter</Eyebrow>
            <h3 className="mt-3 text-[28px] font-bold tracking-tight">Weekly intelligence. Zero noise.</h3>
            <p className="mt-3 text-[15px] text-muted max-w-md">Score deltas, license changes and the moves that matter. One email, every Friday.</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-3">
            <div className="flex-1 flex items-center gap-2 input-base">
              <Mail size={14} className="text-muted" />
              <input className="bg-transparent flex-1 outline-none text-[15px]" placeholder="you@operator.com" />
            </div>
            <button className="btn-primary whitespace-nowrap">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
