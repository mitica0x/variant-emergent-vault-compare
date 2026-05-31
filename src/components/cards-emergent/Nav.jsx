// Top navigation — CoinSiglieri wordmark + section links + Open App CTA
import React from "react";

const NavLink = ({ children, active = false }) => (
  <a
    href="#"
    onClick={(e) => e.preventDefault()}
    className="font-mono"
    style={{
      fontSize: 11,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: active ? "#e8eaf0" : "#6b7280",
      textDecoration: "none",
      transition: "color 0.2s",
      whiteSpace: "nowrap",
      padding: "8px 0",
      borderBottom: active ? "0.5px solid #18b4d4" : "0.5px solid transparent",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.color = "#e8eaf0")}
    onMouseLeave={(e) => (e.currentTarget.style.color = active ? "#e8eaf0" : "#6b7280")}
    data-testid={`nav-${String(children).toLowerCase().replace(/\s+/g, "-")}`}
  >
    {children}
  </a>
);

const Nav = () => {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(8,11,22,0.72)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "0.5px solid rgba(255,255,255,0.08)",
      }}
      data-testid="top-nav"
    >
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "14px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          style={{
            display: "flex",
            alignItems: "baseline",
            textDecoration: "none",
            fontFamily: "Geist, sans-serif",
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "#e8eaf0",
          }}
          data-testid="wordmark"
        >
          <span>Coin</span>
          <span style={{ color: "#18b4d4" }}>Si</span>
          <span>glieri</span>
          <span
            className="font-mono"
            style={{
              fontSize: 9,
              color: "#6b7280",
              letterSpacing: "0.18em",
              marginLeft: 10,
              textTransform: "uppercase",
              borderLeft: "0.5px solid rgba(255,255,255,0.1)",
              paddingLeft: 10,
            }}
          >
            v1.0
          </span>
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <NavLink>Compare</NavLink>
          <NavLink>Match Exchange</NavLink>
          <NavLink active>Cards</NavLink>
          <NavLink>News</NavLink>
          <NavLink>Advertise</NavLink>
          <NavLink>About</NavLink>
        </div>

        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          data-testid="open-app-cta"
          style={{
            background: "#0dbe82",
            color: "#08110a",
            padding: "9px 16px",
            fontFamily: "Geist Mono, monospace",
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            borderRadius: 3,
            fontWeight: 600,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          Open App →
        </a>
      </div>
    </nav>
  );
};

export default Nav;
