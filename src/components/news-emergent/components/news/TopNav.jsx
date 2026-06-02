import { LayoutGrid, List } from "lucide-react";

export const TopNav = ({ view, setView }) => (
  <header className="cs-nav" data-testid="top-nav">
    <div className="cs-wordmark" data-testid="brand-wordmark">
      <span style={{ color: "#ffffff" }}>Coin</span>
      <span style={{ color: "var(--cyan)" }}>Siglieri</span>
    </div>

    <div className="cs-nav-center mono" data-testid="nav-title">
      NEWS FEED
    </div>

    <div className="cs-view-toggle">
      <button
        data-testid="grid-view-btn"
        aria-label="Grid view"
        className={`cs-icon-btn ${view === "grid" ? "is-active" : ""}`}
        onClick={() => setView("grid")}
      >
        <LayoutGrid size={16} strokeWidth={1.75} />
      </button>
      <button
        data-testid="list-view-btn"
        aria-label="List view"
        className={`cs-icon-btn ${view === "list" ? "is-active" : ""}`}
        onClick={() => setView("list")}
      >
        <List size={16} strokeWidth={1.75} />
      </button>
    </div>
  </header>
);
