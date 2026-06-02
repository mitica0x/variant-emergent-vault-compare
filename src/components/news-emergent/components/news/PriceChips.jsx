import { detectAssets, formatChange } from "../../lib/newsUtils";
import { usePrices } from "../../lib/PricesContext";

// Inline price chips for any asset (BTC/ETH/BNB/SOL/XRP) named in the headline,
// using the live prices already in context. No extra API calls.
export const PriceChips = ({ headline }) => {
  const { bySymbol } = usePrices();
  const assets = detectAssets(headline).filter((s) => bySymbol[s]);
  if (!assets.length) return null;

  return (
    <div className="cs-chips">
      {assets.map((s) => {
        const chg = bySymbol[s].change24h;
        const up = chg >= 0;
        return (
          <span
            key={s}
            data-testid={`price-chip-${s.toLowerCase()}`}
            className="cs-price-chip mono"
            style={{
              color: up ? "var(--emerald)" : "var(--red)",
              borderColor: up ? "rgba(13,190,130,0.4)" : "rgba(255,77,109,0.4)",
            }}
          >
            {s} {formatChange(chg)}
          </span>
        );
      })}
    </div>
  );
};
