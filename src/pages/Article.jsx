import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Mail, Calendar, Clock, User } from "lucide-react";
import { Eyebrow, Badge, ExchangeLogo, ScoreCircle } from "../components/UI";
import { ARTICLES, EXCHANGES } from "../data/mock";

const TOC = [
  { id: "what-is-micar", label: "What MiCAR actually is" },
  { id: "why-it-matters", label: "Why it matters in 2026" },
  { id: "top-5", label: "The Top 5 ranked" },
  { id: "methodology", label: "How we scored" },
  { id: "outlook", label: "What changes next" },
];

const HERO_STATS = [
  { label: "Top 5 MiCAR", value: "7 licensed", tone: "text-emerald" },
  { label: "Of 60+ tracked", value: "11.7%", tone: "" },
  { label: "Average score", value: "83.4", tone: "text-cyan" },
  { label: "Updated", value: "May 2026", tone: "" },
];

export default function Article() {
  const { slug } = useParams();

  const article = useMemo(
    () => ARTICLES.find((a) => a.slug === slug) || ARTICLES[0],
    [slug]
  );

  const top5 = useMemo(
    () => EXCHANGES.filter((e) => e.micarLicensed).slice(0, 5),
    []
  );

  const related = useMemo(
    () => ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3),
    [article.slug]
  );

  return (
    <div className="container-x pt-12 pb-24">
      <article className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 max-w-[1200px]">
        <div>
          <ArticleHeader article={article} />
          <HeroStrip />
          <ArticleBody top5={top5} />
          <InlineCTA />
        </div>
        <ArticleSidebar />
      </article>
      <RelatedArticles related={related} />
    </div>
  );
}

function ArticleHeader({ article }) {
  return (
    <>
      <div className="flex items-center gap-3 flex-wrap">
        <Badge tone="emerald">{article.category}</Badge>
        <span className="font-mono text-[11px] text-muted flex items-center gap-1">
          <Calendar size={11} /> {article.date}
        </span>
        <span className="font-mono text-[11px] text-muted flex items-center gap-1">
          <Clock size={11} /> {article.readMin} min read
        </span>
        <span className="font-mono text-[11px] text-muted flex items-center gap-1">
          <User size={11} /> {article.author}
        </span>
      </div>
      <h1 className="mt-6 text-[40px] sm:text-[52px] font-bold tracking-tight leading-[1.05]">
        {article.title}
      </h1>
      <p className="mt-6 text-[18px] text-muted leading-relaxed max-w-2xl">{article.excerpt}</p>
    </>
  );
}

function HeroStrip() {
  return (
    <div
      className="mt-10 hairline p-6 flex items-center gap-6 flex-wrap"
      style={{ borderRadius: 3, background: "#0f1422" }}
    >
      {HERO_STATS.map((s) => (
        <div key={s.label}>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted">{s.label}</div>
          <div className={`font-mono text-[24px] mt-1 ${s.tone}`}>{s.value}</div>
        </div>
      ))}
    </div>
  );
}

function ArticleBody({ top5 }) {
  return (
    <div className="mt-12 space-y-6 text-[15px] leading-[1.75] text-txt/90 max-w-2xl">
      <h2 id="what-is-micar" className="text-[28px] font-bold tracking-tight scroll-mt-24 pt-4">
        What MiCAR actually is
      </h2>
      <p>
        The Markets in Crypto-Assets Regulation — MiCAR — is the European Union's single rulebook
        for crypto issuers and service providers. It moved from political agreement to law in 2023
        and is now in force across the EEA. For exchanges, it means a real licensing track,
        real capital requirements, real disclosure obligations, and a real passport across
        all 27 member states once authorized in one.
      </p>
      <p>
        In practice, MiCAR is the first time a major economic bloc has built a unified license
        regime for crypto venues. That changes how operators allocate capital, where they domicile
        entities, and — over time — which venues EU residents can legally use.
      </p>

      <h2 id="why-it-matters" className="text-[28px] font-bold tracking-tight scroll-mt-24 pt-4">
        Why it matters in 2026
      </h2>
      <p>
        The transitional regime closes in mid-2026 in most member states. After that, only
        MiCAR-authorized venues (or those operating under cross-border passporting) can legally
        service EU retail. Venues that have not started the application by now are effectively out
        of the EU market by next year.
      </p>
      <p>
        That is why MiCAR licensure is no longer one feature among many. It is now a gating
        condition for EU market access. Our 7-pillar scoring model weights it accordingly:
        Compliance & Licensing is 20% of the total.
      </p>

      <h2 id="top-5" className="text-[28px] font-bold tracking-tight scroll-mt-24 pt-4">
        The Top 5 ranked
      </h2>
      {top5.map((e, idx) => (
        <RankedArticleCard key={e.id} exchange={e} rank={idx + 1} />
      ))}

      <h2 id="methodology" className="text-[28px] font-bold tracking-tight scroll-mt-24 pt-4">
        How we scored
      </h2>
      <p>
        Every exchange in this leaderboard is rescored every 30 days against five weighted
        pillars: Security & Custody (30%), Proof of Reserves (25%), Compliance & Licensing (20%),
        Liquidity & Execution (15%), and Track Record (10%). The weights are public, the inputs
        are documented, and featured placement has no effect on the resulting score.
      </p>
      <p>
        We open accounts. We deposit. We trade. We withdraw. The numbers in the table above are
        the ones we observed, not the ones an exchange's marketing team wanted us to observe.
      </p>

      <h2 id="outlook" className="text-[28px] font-bold tracking-tight scroll-mt-24 pt-4">
        What changes next
      </h2>
      <p>
        Three things are likely to shift the leaderboard over the next two cycles. First, a wider
        rollout of monthly Proof of Reserves — the new floor, in our view, by end of 2026. Second,
        MiCAR licensing closures in tier-2 and tier-3 venues, which will compress the ranked field.
        Third, the rise of EU-domiciled derivatives books, which will start to chip away at
        offshore concentration.
      </p>
      <p>
        We will publish the next leaderboard cycle on the first Monday of next month. As always,
        score changes will be disclosed alongside the methodology notes that drove them.
      </p>
    </div>
  );
}

function RankedArticleCard({ exchange: e, rank }) {
  return (
    <div className="hairline p-6 mt-4" style={{ borderRadius: 3 }}>
      <div className="flex items-center gap-4">
        <span className="font-mono text-[18px] text-emerald">#{rank}</span>
        <ExchangeLogo domain={e.domain} name={e.name} size={40} />
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-[18px]">{e.name}</span>
            <Badge tone="emerald">MiCAR</Badge>
            {e.featured && <Badge tone="rust">Featured</Badge>}
          </div>
          <div className="text-[12px] text-muted mt-1">{e.bestFor}</div>
        </div>
        <ScoreCircle value={e.score} size={48} />
      </div>
      <p className="mt-4 text-[14px] text-muted leading-relaxed">{e.proSummary}</p>
      <a
        href={e.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-cyan mt-4 !text-[12px] !py-2"
      >
        Visit {e.name} <ArrowUpRight size={12} />
      </a>
    </div>
  );
}

function InlineCTA() {
  return (
    <div className="mt-12 hairline p-7" style={{ borderRadius: 3, background: "#0f1422" }}>
      <Eyebrow color="text-emerald">Open the leaderboard</Eyebrow>
      <h3 className="mt-3 text-[22px] font-bold">See the full ranking live.</h3>
      <p className="mt-2 text-[14px] text-muted">22 venues, scored on seven pillars, every 30 days.</p>
      <Link to="/compare" className="btn-primary mt-5">
        Go to /compare <ArrowRight size={14} />
      </Link>
    </div>
  );
}

function ArticleSidebar() {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 space-y-8">
        <div>
          <Eyebrow color="text-muted">On this page</Eyebrow>
          <nav className="mt-3 flex flex-col">
            {TOC.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className="py-2 text-[13px] text-muted hover:text-txt transition-colors hairline-b"
              >
                {t.label}
              </a>
            ))}
          </nav>
        </div>
        <SidebarNewsletter />
      </div>
    </aside>
  );
}

function SidebarNewsletter() {
  return (
    <div className="hairline p-5" style={{ borderRadius: 3 }}>
      <Eyebrow color="text-cyan">Newsletter</Eyebrow>
      <h4 className="mt-2 text-[15px] font-semibold">Weekly intelligence.</h4>
      <p className="mt-1 text-[12px] text-muted">One email. Friday.</p>
      <form onSubmit={(e) => e.preventDefault()} className="mt-4">
        <div className="flex items-center gap-2 input-base">
          <Mail size={14} className="text-muted" />
          <input
            className="bg-transparent flex-1 outline-none text-[13px]"
            placeholder="you@operator.com"
          />
        </div>
        <button className="btn-primary mt-3 w-full justify-center !text-[12px]">Subscribe</button>
      </form>
    </div>
  );
}

function RelatedArticles({ related }) {
  return (
    <section className="mt-24">
      <Eyebrow color="text-emerald">Related</Eyebrow>
      <h2 className="mt-3 text-[24px] font-bold tracking-tight">More from CoinSiglieri.</h2>
      <div
        className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-px"
        style={{ background: "rgba(255,255,255,0.07)" }}
      >
        {related.map((a) => (
          <Link
            key={a.slug}
            to={`/news/${a.slug}`}
            className="bg-bg p-6 card-lift block"
            style={{ border: "0.5px solid transparent" }}
          >
            <Badge tone="cyan">{a.category}</Badge>
            <h3 className="mt-4 text-[16px] font-semibold tracking-tight leading-snug">{a.title}</h3>
            <div className="mt-4 font-mono text-[11px] text-muted">
              {a.date} · {a.readMin} min
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
