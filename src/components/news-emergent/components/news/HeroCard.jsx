import { motion } from "framer-motion";
import { CATEGORIES, relativeTime } from "../../lib/newsUtils";
import { Highlight } from "./Highlight";
import { PriceChips } from "./PriceChips";

export const HeroCard = ({ item, query, dimmed }) => {
  if (!item) return null;
  const c = CATEGORIES[item.category];

  return (
    <motion.article
      data-testid="hero-card"
      className="cs-card cs-hero"
      style={{
        background: `linear-gradient(120deg, ${c.color}14, transparent 52%), var(--card-bg)`,
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: dimmed ? 0.4 : 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut", opacity: { duration: 0.25 } }}
    >
      <div className="cs-hero-top">
        <span
          className="cs-tag mono"
          style={{ color: c.color, borderColor: `${c.color}66` }}
        >
          {item.category}
        </span>
        <PriceChips headline={item.headline} />
      </div>
      <h2 className="cs-hero-title">
        <Highlight text={item.headline} query={query} />
      </h2>
      <p className="cs-hero-sub">{item.summary}</p>
      <div className="cs-card-meta mono">
        <span>{item.source}</span>
        <span className="cs-dot">·</span>
        <span>{relativeTime(item.timestamp)}</span>
      </div>
    </motion.article>
  );
};
