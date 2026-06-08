import "./news.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NEWS } from "./data/mockNews";
import { PricesProvider } from "./lib/PricesContext";
import { FilterPills } from "./components/news/FilterPills";
import { SignalScanner } from "./components/news/SignalScanner";
import { HeroCard } from "./components/news/HeroCard";
import { NewsCard } from "./components/news/NewsCard";
import { ListRow } from "./components/news/ListRow";
import { Sidebar } from "./components/news/Sidebar";
import PageHero from "../PageHero";

// Right-side hero visual: a live-feeling signal ticker. Static editorial
// content (no lorem) that reads as the newsroom's current watchlist.
const SIGNAL_ITEMS = [
  {
    tag: "REGULATION",
    tagColor: "#18b4d4",
    headline: "MiCAR stablecoin reserve rules take effect Q3 2026",
    source: "EBA",
    time: "2h ago",
  },
  {
    tag: "BREAKING",
    tagColor: "#e8703a",
    headline: "Major EU exchange halts withdrawals — incident active",
    source: "CoinSiglieri",
    time: "14m ago",
  },
  {
    tag: "EXCHANGES",
    tagColor: "#0dbe82",
    headline: "Bybit EU licensed entity clears MiCAR compliance audit",
    source: "Bybit",
    time: "1d ago",
  },
];

// Tag colours are known hex values; render their 0.15-alpha badge background.
function hexToRgba(hex, alpha) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function SignalTicker() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {SIGNAL_ITEMS.map((s, i) => (
        <div
          key={s.tag}
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "0.5px solid rgba(255,255,255,0.08)",
            borderRadius: 3,
            padding: "12px 14px",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
            transition: `opacity 400ms ease-out ${i * 80}ms, transform 400ms ease-out ${i * 80}ms`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                fontSize: 9,
                textTransform: "uppercase",
                padding: "2px 6px",
                borderRadius: 2,
                background: hexToRgba(s.tagColor, 0.15),
                color: s.tagColor,
              }}
            >
              {s.tag}
            </span>
            <span
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.4)",
                marginLeft: "auto",
              }}
            >
              {s.source} · {s.time}
            </span>
          </div>
          <div
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.88)",
              marginTop: 6,
              lineHeight: 1.4,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {s.headline}
          </div>
        </div>
      ))}
      <div
        style={{
          fontSize: 10,
          color: "#18b4d4",
          letterSpacing: "0.1em",
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginTop: 4,
        }}
      >
        <span
          className="signal-pulse-dot"
          style={{
            width: 4,
            height: 4,
            background: "#18b4d4",
            borderRadius: "50%",
            display: "inline-block",
          }}
        />
        SIGNAL SCANNER ACTIVE · UPDATED EVERY 15 MIN
      </div>
    </div>
  );
}

export default function NewsFeed() {
  const [view, setView] = useState("grid");
  const [category, setCategory] = useState("ALL");
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);

  // Category is a hard filter; search only dims/highlights (keeps items in DOM).
  const categoryItems = useMemo(
    () => NEWS.filter((n) => category === "ALL" || n.category === category),
    [category]
  );

  const q = query.trim().toLowerCase();
  const isMatch = (n) =>
    !q ||
    n.headline.toLowerCase().includes(q) ||
    n.source.toLowerCase().includes(q) ||
    n.category.toLowerCase().includes(q);

  // Keyboard shortcuts: G=grid, L=list, /=focus search, Esc=clear search
  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target.tagName || "").toLowerCase();
      const typing = tag === "input" || tag === "textarea";
      if (e.key === "Escape") {
        setQuery("");
        if (searchRef.current) searchRef.current.blur();
      } else if (e.key === "/" && !typing) {
        e.preventDefault();
        if (searchRef.current) searchRef.current.focus();
      } else if (!typing && (e.key === "g" || e.key === "G")) {
        setView("grid");
      } else if (!typing && (e.key === "l" || e.key === "L")) {
        setView("list");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const hero = categoryItems[0];
  const rest = categoryItems.slice(1);

  return (
    <PricesProvider>
      <div className="cs-app">
        <div className="cs-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center pt-14 pb-12">
            <div>
              <PageHero
                eyebrow="NEWS · LIVE · 2026"
                title="What we're watching."
                subtitle="Weekly signal on EU crypto licensing, exchange moves and the data that actually changes a leaderboard."
              />
            </div>
            <div className="hidden md:block">
              <SignalTicker />
            </div>
          </div>
          <FilterPills active={category} setActive={setCategory} />
          <SignalScanner items={categoryItems} />

          <div className="cs-layout">
            <main data-testid="news-feed">
              <AnimatePresence mode="wait">
                <motion.div
                  key={view}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {categoryItems.length === 0 ? (
                    <div className="cs-empty mono" data-testid="empty-state">
                      No stories in this category.
                    </div>
                  ) : view === "grid" ? (
                    <div key={category}>
                      <HeroCard item={hero} query={query} dimmed={!isMatch(hero)} />
                      <div className="cs-grid">
                        {rest.map((item, i) => (
                          <NewsCard
                            key={item.id}
                            item={item}
                            index={i}
                            query={query}
                            dimmed={!isMatch(item)}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="cs-list" key={category}>
                      {categoryItems.map((item, i) => (
                        <ListRow
                          key={item.id}
                          item={item}
                          index={i}
                          query={query}
                          dimmed={!isMatch(item)}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </main>

            <Sidebar
              query={query}
              setQuery={setQuery}
              active={category}
              setActive={setCategory}
              onTrending={(name) => setQuery(name)}
              searchRef={searchRef}
              velocityItems={categoryItems}
            />
          </div>

          <section className="cs-newsletter" data-testid="newsletter">
            <div className="cs-nl-left">
              <span className="cs-nl-label mono">NEWSLETTER</span>
              <h2 className="cs-nl-headline">Weekly intelligence. Zero noise.</h2>
              <p className="cs-nl-body">
                Score deltas, license changes and the moves that matter. One
                email, every Friday.
              </p>
            </div>
            <form className="cs-nl-right" onSubmit={(e) => e.preventDefault()}>
              <div className="cs-nl-input-wrap">
                <svg
                  className="cs-nl-input-icon"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="14" rx="1" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                <input
                  type="email"
                  className="cs-nl-input"
                  placeholder="you@operator.com"
                  aria-label="Email address"
                />
              </div>
              <button type="submit" className="cs-nl-btn">
                Subscribe
              </button>
            </form>
          </section>
        </div>
      </div>
    </PricesProvider>
  );
}
