import React, { useEffect, useState } from 'react';
import LogoBadge from './LogoBadge';
import ScoreRing from './ScoreRing';
import { PILLAR_KEYS } from '../data/exchanges';
import { ExternalLink, ArrowUpRight } from 'lucide-react';

export default function Shortlist({ ranked }) {
  const top3 = ranked.slice(0, 3);
  return (
    <section className="terminal-border-t" data-testid="shortlist-section">
      <div className="px-4 md:px-6 py-5 flex items-baseline justify-between flex-wrap gap-2">
        <div className="flex items-baseline gap-3">
          <h2 className="font-mono text-[11px] uppercase tracking-terminal text-data">
            Section 02 · The Shortlist
          </h2>
          <span className="font-mono text-[11px] text-muted-mx">Curated top 3</span>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-terminal text-muted-mx">
          Intentional hierarchy · #1 dominant
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 terminal-border-t" data-testid="shortlist-grid">
        {top3.map((ex, i) => (
          <ShortlistCard key={ex.name} ex={ex} rank={i + 1} last={i === 2} />
        ))}
      </div>
    </section>
  );
}

function ShortlistCard({ ex, rank, last }) {
  const isOne = rank === 1;
  const accent = rank === 1 ? '#0dbe82' : rank === 2 ? '#18b4d4' : '#70a848';
  const reasons = (ex.reasons && ex.reasons.length >= 2)
    ? ex.reasons.slice(0, 2)
    : [...(ex.reasons || []), 'Balanced 7-pillar profile', 'Strong overall composite score'].slice(0, 2);

  // Single mount flag that drives the staggered pillar-bar grow (0% → value).
  const [active, setActive] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setActive(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Card entrance: fade + rise, staggered by rank (80 / 200 / 320ms).
  const cardDelay = rank === 1 ? 80 : rank === 2 ? 200 : 320;

  return (
    <article
      data-testid={`shortlist-card-${rank}`}
      className={[
        'result-card-enter bg-card-mx p-5 md:p-6 flex flex-col gap-5',
        !last ? 'md:terminal-border-r' : '',
        isOne ? '' : '',
      ].join(' ')}
      style={{
        borderTop: isOne ? `2px solid ${accent}` : '0.5px solid transparent',
        position: 'relative',
        animationDelay: `${cardDelay}ms`,
      }}
    >
      {/* Rank ribbon */}
      <div className="flex items-center justify-between">
        <span
          className="font-mono text-[11px] uppercase tracking-terminal px-2 py-1"
          style={{
            color: accent,
            border: `0.5px solid ${isOne ? accent : 'rgba(255,255,255,0.12)'}`,
            borderRadius: 3,
          }}
        >
          Match · #{String(rank).padStart(2, '0')}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-terminal text-muted-mx">
          {isOne ? 'Primary recommendation' : rank === 2 ? 'Alternative' : 'Backup'}
        </span>
      </div>

      {/* Head */}
      <div className="flex items-start gap-4">
        <LogoBadge code={ex.logo} size={48} rank={rank} />
        <div className="min-w-0 flex-1">
          <div
            className="truncate"
            style={{
              color: '#e8eaf0',
              fontSize: isOne ? 30 : 22,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              fontWeight: isOne ? 600 : 500,
            }}
          >
            {ex.name}
          </div>
          <div className="font-mono text-[11px] text-muted-mx mt-1.5 truncate">{ex.tagline}</div>
        </div>
        <ScoreRing score={ex.score} size={isOne ? 96 : 78} stroke={6} accent={accent} />
      </div>

      {/* Pillars grid */}
      <div>
        <div className="font-mono text-[10px] uppercase tracking-terminal text-muted-mx mb-2">7-pillar breakdown</div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          {PILLAR_KEYS.map((k, idx) => (
            <PillarLine key={k.key} label={k.label} value={ex.p[k.key]} index={idx} active={active} />
          ))}
        </div>
      </div>

      {/* Reasons */}
      <div className="mt-auto">
        <div className="font-mono text-[10px] uppercase tracking-terminal text-muted-mx mb-2">Why it matched</div>
        <ul className="space-y-1.5">
          {reasons.map((r, idx) => (
            <li key={idx} className="flex items-start gap-2 text-[12.5px] text-primary-mx">
              <span className="font-mono text-[10px] mt-0.5" style={{ color: accent }}>→</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          data-testid={`shortlist-visit-btn-${rank}`}
          className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-3 font-mono text-[12px] uppercase tracking-terminal transition-colors"
          style={
            isOne
              ? { background: accent, color: '#080b16', borderRadius: 3 }
              : { background: 'transparent', color: '#e8eaf0', border: `0.5px solid ${accent}`, borderRadius: 3 }
          }
          onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(ex.name + ' crypto exchange')}`, '_blank', 'noopener,noreferrer')}
        >
          Visit {ex.name}
          {isOne ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ExternalLink className="w-3 h-3" />}
        </button>
      </div>
    </article>
  );
}

function PillarLine({ label, value, index, active }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[10.5px] text-muted-mx w-[88px] truncate uppercase tracking-terminal">{label}</span>
      <div className="flex-1 h-[3px]" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div
          className="h-full score-gradient fill-bar"
          style={{
            width: active ? `${value}%` : '0%',
            transition: `width 700ms cubic-bezier(0.25,1,0.5,1) ${index * 80}ms`,
          }}
        />
      </div>
      <span className="font-mono text-[11px] text-primary-mx w-7 text-right">{value}</span>
    </div>
  );
}
