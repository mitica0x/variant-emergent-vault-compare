import React, { useState } from "react";
import { Check, X as XIcon } from "lucide-react";
import { scoreRingColor } from "../data/mock";
import { useInView } from "../hooks/use-in-view";

export function Eyebrow({ children, color = "text-emerald" }) {
  return <span className={`eyebrow ${color}`}>{children}</span>;
}

const BADGE_TONES = {
  emerald: { color: "text-emerald", bg: "rgba(13, 190, 130, 0.15)" },
  cyan: { color: "text-cyan", bg: "rgba(24, 180, 212, 0.15)" },
  rust: { color: "text-rust", bg: "rgba(232, 112, 58, 0.15)" },
  lime: { color: "text-lime", bg: "rgba(112, 168, 72, 0.15)" },
  amber: { color: "text-amber", bg: "rgba(212, 168, 83, 0.15)" },
  muted: { color: "text-muted", bg: "rgba(255,255,255,0.04)" },
};

export function Badge({ children, tone = "emerald" }) {
  const { color, bg } = BADGE_TONES[tone] ?? BADGE_TONES.muted;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-[3px] font-mono text-[10px] uppercase tracking-widest ${color}`}
      style={{ background: bg, borderRadius: 3 }}
    >
      {children}
    </span>
  );
}

export function MiniBar({ value, color = "#0dbe82", delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const shown = inView ? value : 0;
  return (
    <div ref={ref} className="mini-bar" style={{ width: "100%" }}>
      <span
        style={{
          transform: `scaleX(${shown / 100})`,
          transitionDelay: `${delay}ms`,
          background: color,
        }}
      />
    </div>
  );
}

export function ScoreCircle({ value, size = 72 }) {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const color = scoreRingColor(value);
  const deg = inView ? (value / 100) * 360 : 0;
  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(${color} ${deg}deg, rgba(255,255,255,0.05) 0)`,
          transition: "background 900ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      />
      <div
        className="absolute rounded-full bg-bg flex items-center justify-center"
        style={{ inset: 5 }}
      >
        <span className="font-mono font-semibold" style={{ color, fontSize: size * 0.32 }}>
          {value}
        </span>
      </div>
    </div>
  );
}

export function ProsCons({ pros = [], cons = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div>
        <h5 className="eyebrow text-emerald mb-3">Pros</h5>
        <ul className="space-y-2">
          {pros.map((p) => (
            <li key={`pro-${p}`} className="flex items-start gap-2 text-[13px] text-txt/90">
              <Check size={14} className="text-emerald shrink-0 mt-[2px]" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h5 className="eyebrow text-rust mb-3">Cons</h5>
        <ul className="space-y-2">
          {cons.map((c) => (
            <li key={`con-${c}`} className="flex items-start gap-2 text-[13px] text-txt/90">
              <XIcon size={14} className="text-rust shrink-0 mt-[2px]" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ExchangeLogo({ domain, name, size = 24 }) {
  const [err, setErr] = useState(false);
  if (err || !domain) {
    const initials = name?.slice(0, 2)?.toUpperCase() || "??";
    return (
      <div
        className="flex items-center justify-center text-[10px] font-mono text-txt/80"
        style={{
          width: size,
          height: size,
          background: "rgba(255,255,255,0.04)",
          border: "0.5px solid rgba(255,255,255,0.08)",
          borderRadius: 3,
        }}
      >
        {initials}
      </div>
    );
  }
  return (
    <img
      src={`https://logo.clearbit.com/${domain}`}
      onError={() => setErr(true)}
      alt={name}
      style={{ width: size, height: size, borderRadius: 3, background: "#fff" }}
    />
  );
}

// Stable seeded particle field: positions computed once at module load.
const PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  id: `p-${i}`,
  top: (i * 37) % 100,
  left: (i * 53 + 13) % 100,
  delay: ((i * 7) % 30) / 10,
  duration: 3 + ((i * 11) % 30) / 10,
}));

export function ParticleField({ count = 40 }) {
  const dots = PARTICLES.slice(0, count);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {dots.map((d) => (
        <span
          key={d.id}
          className="particle"
          style={{
            top: `${d.top}%`,
            left: `${d.left}%`,
            animation: `pulse-dot ${d.duration}s ${d.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}
