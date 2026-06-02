import "./news.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NEWS } from "./data/mockNews";
import { PricesProvider } from "./lib/PricesContext";
import { TopNav } from "./components/news/TopNav";
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
          <TopNav view={view} setView={setView} />
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
        </div>
      </div>
    </PricesProvider>
  );
}
