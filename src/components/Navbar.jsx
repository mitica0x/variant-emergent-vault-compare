import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const LINKS = [
  { to: "/compare", label: "Compare" },
  { to: "/find-my-exchange", label: "Match Exchange" },
  { to: "/cards", label: "Cards" },
  { to: "/news", label: "News" },
  { to: "/advertise", label: "Advertise" },
  { to: "/about", label: "About" },
];

// Mobile (<md) full-screen overlay links — same routes as desktop nav.
const MOBILE_LINKS = [
  { to: "/compare", label: "Compare" },
  { to: "/find-my-exchange", label: "Exchange Match" },
  { to: "/cards", label: "Cards" },
  { to: "/news", label: "News" },
  { to: "/advertise", label: "Advertise" },
];

function NavItem({ to, label }) {
  const [hover, setHover] = useState(false);
  return (
    <NavLink
      to={to}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={({ isActive }) =>
        `eyebrow px-3 py-2 transition-colors ${
          isActive
            ? "relative after:absolute after:left-3 after:right-3 after:bottom-1 after:h-[2px] after:bg-emerald"
            : ""
        }`
      }
      style={
        hover
          ? {
              background: "linear-gradient(90deg, #18b4d4, #a3e635)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }
          : { color: "rgba(255,255,255,0.85)" }
      }
    >
      {label}
    </NavLink>
  );
}

function OpenAppButton({ className = "" }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href="https://app.coinsiglieri.com"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`items-center gap-1.5 rounded-[3px] font-semibold ${className}`}
      style={{
        background: hover ? "#a3e635" : "#0dbe82",
        color: "#0a0a0a",
        transition: "background-color 150ms ease",
      }}
    >
      Open App <ArrowUpRight size={14} />
    </a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <>
    <header
      className="sticky top-0 z-50 bg-bg/90 backdrop-blur-sm"
      style={{ borderBottom: "0.5px solid rgba(255,255,255,0.07)" }}
    >
      <div className="container-x flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <span className="text-[15px] font-semibold tracking-tight">
            <span style={{ color: "#fff" }}>Coin</span><span style={{ color: "#18b4d4" }}>Siglieri</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {LINKS.map((l) => (
            <NavItem key={l.to} to={l.to} label={l.label} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <OpenAppButton className="hidden md:inline-flex py-2 px-3 text-[13px]" />
          <button
            className="hidden md:inline-flex lg:hidden p-2 text-muted hover:text-txt"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
          <button
            className="md:hidden p-2 text-muted hover:text-txt"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
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
            <OpenAppButton className="mt-3 w-full justify-center inline-flex py-2.5 px-3 text-[14px]" />
          </div>
        </div>
      )}
    </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-[60] flex flex-col"
            style={{ background: "#080b16" }}
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="container-x flex items-center justify-between h-16">
              <span className="text-[15px] font-semibold tracking-tight">
                <span style={{ color: "#fff" }}>Coin</span>
                <span style={{ color: "#18b4d4" }}>Siglieri</span>
              </span>
              <button
                className="p-2 text-muted hover:text-txt"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="container-x flex flex-col mt-8">
              {MOBILE_LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setMobileOpen(false)}
                  className="font-mono uppercase tracking-widest text-[18px] py-4"
                  style={{ color: "rgba(255,255,255,0.85)", borderBottom: "0.5px solid rgba(255,255,255,0.07)" }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
