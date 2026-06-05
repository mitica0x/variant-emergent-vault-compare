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
          <div style={{ paddingBottom: 32 }}>
            <p className="text-xs uppercase tracking-widest text-cyan-400 mb-2">• NEWS · LIVE · 2026</p>
            <h1 className="text-4xl font-bold text-white">News</h1>
            <p className="text-white font-medium mt-1">What we're watching.</p>
            <p className="text-gray-400 mt-2 text-sm max-w-xl">Weekly signal on EU crypto licensing, exchange moves and the data that actually changes a leaderboard.</p>
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
