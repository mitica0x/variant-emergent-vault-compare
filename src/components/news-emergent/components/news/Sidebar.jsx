import { Search } from "lucide-react";
import { PriceTicker } from "./PriceTicker";
import { FeedVelocity } from "./FeedVelocity";

const SIDE_FILTERS = ["ALL", "EXCHANGES", "REGULATION", "MARKET", "DEFI"];
const TRENDING = ["Bybit", "Binance", "Kraken", "OKX", "Coinbase"];

export const Sidebar = ({
  query,
  setQuery,
  active,
  setActive,
  onTrending,
  searchRef,
  velocityItems,
}) => (
  <aside className="cs-sidebar" data-testid="sidebar">
    <div className="cs-side-block">
      <div className="cs-search-wrap">
        <Search size={14} strokeWidth={1.75} className="cs-search-icon" />
        <input
          ref={searchRef}
          data-testid="search-input"
          className="cs-search-input"
          placeholder="Search the feed…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="cs-side-filters">
        {SIDE_FILTERS.map((f) => (
          <button
            key={f}
            data-testid={`side-filter-${f.toLowerCase()}`}
            className={`cs-side-filter mono ${active === f ? "is-active" : ""}`}
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        ))}
      </div>
    </div>

    <div className="cs-side-block">
      <p className="cs-side-title mono">Live Prices</p>
      <PriceTicker />
    </div>

    <div className="cs-side-block">
      <p className="cs-side-title mono">Trending Exchanges</p>
      <div className="cs-trend-pills">
        {TRENDING.map((t) => (
          <button
            key={t}
            data-testid={`trending-${t.toLowerCase()}`}
            className="cs-trend-pill mono"
            onClick={() => onTrending(t)}
          >
            {t}
          </button>
        ))}
      </div>
    </div>

    <FeedVelocity items={velocityItems} />

    <p className="cs-foot mono" data-testid="powered-by">
      Powered by CryptoPanic
    </p>

    <p className="cs-kbd-hint mono" data-testid="kbd-hint">
      G · L · / · ESC
    </p>
  </aside>
);
