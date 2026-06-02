// Category metadata + colour system (exact palette, no deviation)
export const CATEGORIES = {
  EXCHANGES: { label: "EXCHANGES", color: "#18b4d4" },
  REGULATION: { label: "REGULATION", color: "#e8703a" },
  MARKET: { label: "MARKET", color: "#70a848" },
  DEFI: { label: "DEFI", color: "#0dbe82" },
  BREAKING: { label: "BREAKING", color: "#ff4d6d" },
};

export const CYAN = "#18b4d4";

export function categoryColor(key) {
  return CATEGORIES[key]?.color || CYAN;
}

// Relative time, e.g. "4m ago", "2h 14m ago"
export function relativeTime(date) {
  const diff = Math.max(0, Date.now() - date.getTime());
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  const rem = mins % 60;
  return rem ? `${hours}h ${rem}m ago` : `${hours}h ago`;
}

// 24h terminal clock, e.g. "14:32"
export function clockTime(date) {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

// Price formatting for the ticker
export function formatPrice(value) {
  if (value == null) return "—";
  return value.toLocaleString("en-US", {
    minimumFractionDigits: value >= 1000 ? 0 : 2,
    maximumFractionDigits: value >= 1000 ? 0 : 2,
  });
}

export function formatChange(value) {
  if (value == null) return "—";
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

// Asset keyword detection for inline price chips on cards.
export const ASSET_KEYWORDS = {
  BTC: /\b(btc|bitcoin)\b/i,
  ETH: /\b(eth|ether|ethereum)\b/i,
  BNB: /\b(bnb)\b/i,
  SOL: /\b(sol|solana)\b/i,
  XRP: /\b(xrp|ripple)\b/i,
};

export const ASSET_NAMES = {
  BTC: "Bitcoin",
  ETH: "Ether",
  BNB: "BNB",
  SOL: "Solana",
  XRP: "XRP",
};

export function detectAssets(headline) {
  const out = [];
  for (const [sym, re] of Object.entries(ASSET_KEYWORDS)) {
    if (re.test(headline)) out.push(sym);
  }
  return out.slice(0, 2);
}
