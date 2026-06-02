import { usePrices } from "../../lib/PricesContext";
import { formatPrice, formatChange } from "../../lib/newsUtils";

const COINS = [
  { symbol: "BTC", name: "Bitcoin" },
  { symbol: "ETH", name: "Ethereum" },
  { symbol: "BNB", name: "BNB" },
];

export const PriceTicker = () => {
  const { bySymbol, dir, tick, loaded } = usePrices();

  return (
    <div data-testid="price-ticker">
      {COINS.map((coin) => {
        const p = bySymbol[coin.symbol];
        const change = p?.change24h;
        const flash = dir[coin.symbol];
        const chgClass = change == null ? "" : change >= 0 ? "up" : "down";
        return (
          <div
            key={`${coin.symbol}-${tick}`}
            data-testid={`ticker-${coin.symbol.toLowerCase()}`}
            className={`cs-ticker-row ${
              flash === "up" ? "flash-up" : flash === "down" ? "flash-down" : ""
            }`}
          >
            <div className="cs-ticker-left">
              <span className="cs-ticker-sym mono">{coin.symbol}</span>
              <span className="cs-ticker-name">{coin.name}</span>
            </div>
            <div className="cs-ticker-right">
              <span className="cs-ticker-price mono">
                {loaded && p ? `$${formatPrice(p.price)}` : "—"}
              </span>
              <span className={`cs-ticker-chg mono ${chgClass}`}>
                {loaded && p ? formatChange(change) : ""}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
