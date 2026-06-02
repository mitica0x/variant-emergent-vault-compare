import { useEffect, useMemo, useState } from "react";
import { buildSignals } from "../../lib/signals";

export const SignalScanner = ({ items }) => {
  const signals = useMemo(() => buildSignals(items), [items]);
  const [idx, setIdx] = useState(0);

  // Reset rotation when the underlying signals change (e.g. filter change)
  useEffect(() => {
    setIdx(0);
  }, [signals]);

  // Cycle to the next signal every 30 seconds
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => i + 1), 30000);
    return () => clearInterval(id);
  }, []);

  const msg = signals.length ? signals[idx % signals.length] : "Scanning the feed…";

  return (
    <div className="cs-scanner" data-testid="signal-scanner">
      <span className="cs-scanner-dot" />
      <span className="cs-scanner-label mono">SIGNAL SCANNER</span>
      <span className="cs-scanner-text mono" data-testid="signal-text">
        {msg}
      </span>
    </div>
  );
};
