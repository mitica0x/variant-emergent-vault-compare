import { CATEGORIES, CYAN } from "../../lib/newsUtils";

const PILLS = ["ALL", "EXCHANGES", "REGULATION", "MARKET", "DEFI", "BREAKING"];

export const FilterPills = ({ active, setActive }) => {
  const colorFor = (p) => (p === "ALL" ? CYAN : CATEGORIES[p].color);

  return (
    <div className="cs-pills" data-testid="filter-pills">
      {PILLS.map((p) => {
        const isActive = active === p;
        return (
          <button
            key={p}
            data-testid={`pill-${p.toLowerCase()}`}
            className={`cs-pill mono ${isActive ? "is-active" : ""}`}
            style={
              isActive
                ? { color: colorFor(p), borderColor: colorFor(p) }
                : undefined
            }
            onClick={() => setActive(p)}
          >
            {p}
          </button>
        );
      })}
    </div>
  );
};
