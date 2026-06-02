import { detectAssets, ASSET_NAMES } from "./newsUtils";

// Client-side pattern detection over the current feed. Returns an ordered list
// of "AI-style" signals; the scanner cycles through them every 30s.
export function buildSignals(items) {
  const sigs = [];
  if (!items || !items.length) return sigs;

  const now = Date.now();
  const total = items.length;

  // 1) BREAKING spike in the last 20 minutes
  const recentBreaking = items.filter(
    (i) => i.category === "BREAKING" && (now - i.timestamp) / 60000 <= 20
  );
  if (recentBreaking.length >= 2) {
    sigs.push(
      `${recentBreaking.length} BREAKING stories in the last 20 minutes — markets on alert`
    );
  }

  // 2) Regulation density (MiCAR keyword)
  const micar = items.filter((i) => /micar/i.test(i.headline));
  if (micar.length >= 2) {
    sigs.push(
      `Regulation density up: ${micar.length} of ${total} stories reference MiCAR`
    );
  }

  // 3) Dominant category cluster
  const counts = {};
  items.forEach((i) => {
    counts[i.category] = (counts[i.category] || 0) + 1;
  });
  const [topCat, topCount] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  if (topCount >= 2) {
    sigs.push(`${topCat} dominate the feed — ${topCount} of ${total} stories`);
  }

  // 4) Leading asset coverage
  const assetCounts = {};
  items.forEach((i) =>
    detectAssets(i.headline).forEach((s) => {
      assetCounts[s] = (assetCounts[s] || 0) + 1;
    })
  );
  const aTop = Object.entries(assetCounts).sort((a, b) => b[1] - a[1])[0];
  if (aTop && aTop[1] >= 2) {
    sigs.push(
      `${ASSET_NAMES[aTop[0]]} leads coverage with ${aTop[1]} mentions in view`
    );
  }

  // 5) Publishing velocity (last hour)
  const lastHour = items.filter((i) => (now - i.timestamp) / 3600000 <= 1).length;
  if (lastHour >= 1) {
    sigs.push(
      `${lastHour} ${lastHour === 1 ? "story" : "stories"} published in the last hour`
    );
  }

  if (!sigs.length) sigs.push(`Tracking ${total} stories across the feed`);
  return sigs;
}
