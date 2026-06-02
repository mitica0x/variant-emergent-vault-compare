import { motion } from "framer-motion";
import { CATEGORIES, clockTime } from "../../lib/newsUtils";
import { Highlight } from "./Highlight";

export const ListRow = ({ item, index, query, dimmed }) => {
  const c = CATEGORIES[item.category];

  return (
    <motion.div
      data-testid={`list-row-${item.id}`}
      className="cs-list-row"
      style={{ "--cat": c.color }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: dimmed ? 0.4 : 1, y: 0 }}
      transition={{
        duration: 0.2,
        delay: index * 0.04,
        ease: "easeOut",
        opacity: { duration: 0.25, delay: 0 },
      }}
    >
      <span className="cs-list-time mono">{clockTime(item.timestamp)}</span>
      <span className="cs-list-sep mono">·</span>
      <span
        className="cs-tag cs-tag-sm mono"
        style={{ color: c.color, borderColor: `${c.color}55` }}
      >
        {item.category}
      </span>
      <span className="cs-list-head">
        <Highlight text={item.headline} query={query} />
      </span>
      <span className="cs-list-source mono">{item.source}</span>
    </motion.div>
  );
};
