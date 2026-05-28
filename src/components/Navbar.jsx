import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";

const LINKS = [
  { to: "/compare", label: "Compare" },
  { to: "/find-my-exchange", label: "Find Exchange" },
  { to: "/cards", label: "Cards" },
  { to: "/news", label: "News" },
  { to: "/advertise", label: "Advertise" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header
      className="sticky top-0 z-50 bg-bg/90 backdrop-blur-sm"
      style={{ borderBottom: "0.5px solid rgba(255,255,255,0.07)" }}
    >
      <div className="container-x flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <div className="w-7 h-7 flex items-center justify-center" style={{ border: "0.5px solid rgba(255,255,255,0.12)", borderRadius: 3 }}>
            <span className="font-mono text-[11px] tracking-widest text-cyan">C</span>
          </div>
          <span className="text-[15px] font-semibold tracking-tight">
            Coin<span className="text-cyan">S</span>iglieri
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `eyebrow px-3 py-2 text-muted hover:text-txt transition-colors ${
                  isActive ? "text-txt relative after:absolute after:left-3 after:right-3 after:bottom-1 after:h-[2px] after:bg-emerald" : ""
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://app.coinsiglieri.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden md:inline-flex !py-2 !px-3 !text-[13px]"
          >
            Open App
            <ArrowUpRight size={14} />
          </a>
          <button
            className="lg:hidden p-2 text-muted hover:text-txt"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden hairline-t">
          <div className="container-x py-4 flex flex-col gap-1">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`eyebrow py-3 ${pathname === l.to ? "text-emerald" : "text-txt"}`}
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://app.coinsiglieri.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-3 w-full justify-center"
            >
              Open App <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
