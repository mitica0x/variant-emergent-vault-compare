import React, { useEffect, useState } from 'react';
import LogoBadge from '../result/LogoBadge';

export default function LiveTop3({ ranked, applied, total }) {
  const top10 = ranked.slice(0, 10);
  const maxScore = top10[0]?.score || 100;

  return (
    <div className="h-full flex flex-col" data-testid="live-top3-panel">
      {/* Header */}
      <div className="px-5 py-4 terminal-border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: '#0dbe82' }} />
          <span className="font-mono text-[11px] uppercase tracking-terminal text-primary-mx">Live Ranking</span>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-terminal" data-testid="live-applied-count">
          <span className="text-data">{applied}</span>
          <span className="text-muted-mx">/{total} applied</span>
        </span>
      </div>

      {/* Rows */}
      <div className="flex-1 overflow-y-auto" data-testid="live-top3-rows">
        {top10.map((ex, i) => (
          // Key includes rank so a row replays the rerank-enter animation only
          // when its position actually changes.
          <Row key={`${ex.name}-${i + 1}`} ex={ex} rank={i + 1} pct={(ex.score / maxScore) * 100} />
        ))}

        {/* Footer meta */}
        <div className="px-5 py-4 terminal-border-t font-mono text-[10px] uppercase tracking-terminal text-muted-mx leading-relaxed">
          <div className="flex justify-between"><span>Universe</span><span className="text-primary-mx">{ranked.length}</span></div>
          <div className="flex justify-between"><span>Pillars weighted</span><span className="text-primary-mx">7</span></div>
          <div className="flex justify-between"><span>Confidence</span><span className="text-data">{Math.min(100, Math.round((applied / total) * 100))}%</span></div>
        </div>
      </div>
    </div>
  );
}

function Row({ ex, rank, pct }) {
  const isTop3 = rank <= 3;
  const rankColor =
    rank === 1 ? '#0dbe82' : rank === 2 ? '#18b4d4' : rank === 3 ? '#70a848' : 'rgba(255,255,255,0.40)';
  const badgeSize = isTop3 ? 28 : 22;

  // Grow the gradient bar from 0 → final width on mount (rows remount on each
  // re-rank via their keyed identity, so this replays with the rerank fade).
  const [grown, setGrown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGrown(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={['rerank-enter px-5 terminal-border-b', isTop3 ? 'py-4' : 'py-2.5'].join(' ')}
      data-testid={`live-row-${rank}`}
    >
      <div className="flex items-center gap-3">
        <span
          className="font-mono text-[10px] uppercase tracking-terminal w-6 flex-none"
          style={{ color: rankColor }}
          data-testid={`live-row-${rank}-rank`}
        >
          #{String(rank).padStart(2, '0')}
        </span>
        <LogoBadge code={ex.logo} size={badgeSize} rank={rank} />
        <div className="flex-1 min-w-0">
          <div className="text-[13px] text-primary-mx truncate" data-testid={`live-row-${rank}-name`}>{ex.name}</div>
          {isTop3 && <div className="font-mono text-[10px] text-muted-mx truncate">{ex.tagline}</div>}
        </div>
        <div className="font-mono text-[13px] font-medium" style={{ color: rankColor }} data-testid={`live-row-${rank}-score`}>
          {ex.score}
        </div>
      </div>
      <div className={[isTop3 ? 'mt-3' : 'mt-2', 'h-[3px] w-full'].join(' ')} style={{ background: 'rgba(255,255,255,0.05)' }}>
        <div
          className="h-full score-gradient fill-bar origin-left"
          style={{ width: grown ? `${Math.max(8, pct)}%` : 0 }}
        />
      </div>
    </div>
  );
}
