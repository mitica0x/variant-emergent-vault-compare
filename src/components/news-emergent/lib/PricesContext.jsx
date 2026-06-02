import { createContext, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

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
      const { data } = await axios.get(`${API}/prices`);
      const list = data.prices || [];
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
