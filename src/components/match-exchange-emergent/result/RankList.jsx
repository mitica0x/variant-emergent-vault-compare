import React, { useState } from 'react';
import RankRow from './RankRow';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function RankList({ ranked }) {
  const [expanded, setExpanded] = useState(false);
  const maxScore = ranked[0]?.score || 100;
  const visible = expanded ? ranked : ranked.slice(0, 10);

  return (
    <section className="terminal-border-t" data-testid="ranklist-section">
      <div className="px-4 md:px-6 py-5 flex items-center justify-between">
        <div className="flex items-baseline gap-3">
          <h2 className="font-mono text-[11px] uppercase tracking-terminal text-muted-mx">
            Section 01 · Full ranking
          </h2>
          <span className="font-mono text-[11px] text-data" data-testid="ranklist-venue-count">{ranked.length} venues</span>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-terminal text-muted-mx hidden sm:block">
          Score · 7-pillar fingerprint
        </span>
      </div>

      {/* Header row */}
      <div className="hidden md:grid grid-cols-[44px_40px_1fr_120px_72px] gap-4 px-4 py-2 terminal-border-t terminal-border-b font-mono text-[10px] uppercase tracking-terminal text-muted-mx">
        <span>Rank</span>
        <span></span>
        <span>Venue / Tagline</span>
        <span>Fingerprint</span>
        <span className="text-right">Score</span>
      </div>

      {/* Rows */}
      <div data-testid="ranklist-rows">
        {visible.map((ex, i) => (
          <RankRow key={ex.name} ex={ex} rank={i + 1} maxScore={maxScore} />
        ))}
      </div>

      {/* Toggle */}
      {ranked.length > 10 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          data-testid="ranklist-toggle-btn"
          className="w-full px-4 py-4 terminal-border-t flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-terminal text-muted-mx hover:text-primary-mx transition-colors bg-card-mx"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-3 h-3" /> Collapse — show top 10
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3" /> Show all {ranked.length} venues
            </>
          )}
        </button>
      )}
    </section>
  );
}
