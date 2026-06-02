import { useMemo } from "react";
import { CATEGORIES } from "../../lib/newsUtils";

function dominantCategory(items) {
  if (!items.length) return null;
  const c = {};
  items.forEach((i) => {
    c[i.category] = (c[i.category] || 0) + 1;
  });
  return Object.entries(c).sort((a, b) => b[1] - a[1])[0][0];
}

export const FeedVelocity = ({ items }) => {
  const { buckets, perHour, domCat, max } = useMemo(() => {
    const now = Date.now();
    const bk = Array.from({ length: 6 }, () => []);
    items.forEach((i) => {
      const h = Math.floor((now - i.timestamp) / 3600000);
      if (h >= 0 && h < 6) bk[h].push(i);
    });
    const within6h = items.filter((i) => (now - i.timestamp) / 3600000 < 6).length;
    return {
      buckets: bk,
      max: Math.max(1, ...bk.map((b) => b.length)),
      perHour: Math.max(1, Math.round(within6h / 6)),
      domCat: dominantCategory(items),
    };
  }, [items]);

  return (
    <div className="cs-side-block" data-testid="feed-velocity">
      <p className="cs-side-title mono">Feed Velocity</p>
      <div className="cs-spark">
        {buckets
          .slice()
          .reverse()
          .map((b, k) => {
            const cat = dominantCategory(b);
            const color = cat ? CATEGORIES[cat].color : "#26304a";
            const height = b.length ? 6 + (b.length / max) * 30 : 3;
            return (
              <div
                key={k}
                className="cs-spark-bar"
                style={{ height: `${height}px`, background: color, opacity: b.length ? 1 : 0.4 }}
                title={`${b.length} ${b.length === 1 ? "story" : "stories"}`}
              />
            );
          })}
      </div>
      <p className="cs-spark-meta mono" data-testid="velocity-meta">
        {perHour} stories / hr ·{" "}
        <span style={{ color: domCat ? CATEGORIES[domCat].color : "var(--muted)" }}>
          {domCat || "—"}
        </span>
      </p>
    </div>
  );
};
