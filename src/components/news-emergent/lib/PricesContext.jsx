import { createContext, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

// Live prices straight from CoinGecko's public API — no backend required.
const PRICES_URL =
  "https://api.coingecko.com/api/v3/simple/price" +
  "?ids=bitcoin,ethereum,binancecoin&vs_currencies=usd&include_24hr_change=true";

// CoinGecko id -> ticker symbol used throughout the feed.
const COIN_IDS = {
  bitcoin: "BTC",
  ethereum: "ETH",
  binancecoin: "BNB",
};

const PricesCtx = createContext({ bySymbol: {}, dir: {}, tick: 0, loaded: false });

export const usePrices = () => useContext(PricesCtx);

export const PricesProvider = ({ children }) => {
  const [bySymbol, setBySymbol] = useState({});
  const [dir, setDir] = useState({});
  const [tick, setTick] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const prevRef = useRef({});

  const fetchPrices = async () => {
    try {
      const { data } = await axios.get(PRICES_URL);
      // Normalize CoinGecko's shape into the { symbol, price, change24h } the
      // ticker and price chips already consume.
      const list = Object.entries(COIN_IDS)
        .filter(([id]) => data[id] && data[id].usd != null)
        .map(([id, symbol]) => ({
          symbol,
          price: data[id].usd,
          change24h: data[id].usd_24h_change,
        }));
      if (!list.length) return;

      const next = {};
      const dirs = {};
      list.forEach((p) => {
        next[p.symbol] = p;
        const prev = prevRef.current[p.symbol];
        if (prev != null && p.price != null && p.price !== prev) {
          dirs[p.symbol] = p.price > prev ? "up" : "down";
        }
        if (p.price != null) prevRef.current[p.symbol] = p.price;
      });

      setBySymbol(next);
      setDir(dirs);
      setTick((t) => t + 1);
      setLoaded(true);
    } catch (e) {
      /* keep last known prices */
    }
  };

  useEffect(() => {
    fetchPrices();
    const id = setInterval(fetchPrices, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <PricesCtx.Provider value={{ bySymbol, dir, tick, loaded }}>
      {children}
    </PricesCtx.Provider>
  );
};
