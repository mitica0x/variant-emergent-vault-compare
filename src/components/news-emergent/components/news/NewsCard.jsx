import { motion } from "framer-motion";
import { CATEGORIES, relativeTime } from "../../lib/newsUtils";
import { Highlight } from "./Highlight";
import { PriceChips } from "./PriceChips";

export const NewsCard = ({ item, index, query, dimmed }) => {
  const c = CATEGORIES[item.category];

  return (
    <motion.article
      data-testid={`news-card-${item.id}`}
      className="cs-card cs-grid-card"
      style={{
        background: `linear-gradient(135deg, ${c.color}0f, transparent 55%), var(--card-bg)`,
      }}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: dimmed ? 0.4 : 1, y: 0 }}
      transition={{
        duration: 0.2,
        delay: index * 0.04,
        ease: "easeOut",
        opacity: { duration: 0.25, delay: 0 },
      }}
    >
      <div className="cs-card-top">
        <span
          className="cs-tag mono"
          style={{ color: c.color, borderColor: `${c.color}55` }}
        >
          {item.category}
        </span>
        <PriceChips headline={item.headline} />
      </div>
      <h3 className="cs-card-title">
        <Highlight text={item.headline} query={query} />
      </h3>
      <div className="cs-card-meta mono">
        <span>{item.source}</span>
        <span className="cs-dot">·</span>
        <span>{relativeTime(item.timestamp)}</span>
      </div>
    </motion.article>
  );
};
