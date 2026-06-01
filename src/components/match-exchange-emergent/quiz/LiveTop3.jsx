import React from 'react';
import LogoBadge from '../result/LogoBadge';

export default function LiveTop3({ ranked, applied, total }) {
  const top3 = ranked.slice(0, 3);
  const maxScore = top3[0]?.score || 100;

  return (
    <div className="h-full flex flex-col" data-testid="live-top3-panel">
      {/* Header */}
      <div className="px-5 py-4 terminal-border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: '#0dbe82' }} />
          <span className="font-mono text-[11px] uppercase tracking-terminal text-primary-mx">Live Top 3</span>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-terminal" data-testid="live-applied-count">
          <span className="text-data">{applied}</span>
          <span className="text-muted-mx">/{total} applied</span>
        </span>
      </div>

      {/* Rows */}
      <div className="flex-1 overflow-y-auto" data-testid="live-top3-rows">
        {top3.map((ex, i) => (
          <Row key={ex.name} ex={ex} rank={i + 1} pct={(ex.score / maxScore) * 100} />
        ))}

        {/* Tail indicator */}
        <div className="px-5 py-4 terminal-border-t">
          <div className="font-mono text-[10px] uppercase tracking-terminal text-muted-mx mb-2">Next up</div>
          {ranked.slice(3, 6).map((ex, i) => (
            <div key={ex.name} className="flex items-center justify-between py-1.5">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-muted-mx w-4">{String(i + 4).padStart(2, '0')}</span>
                <span className="text-[12px] text-primary-mx">{ex.name}</span>
              </div>
              <span className="font-mono text-[10px] text-lime-mx">{ex.score}</span>
            </div>
          ))}
        </div>

        {/* Footer meta */}
        <div className="px-5 py-4 terminal-border-t font-mono text-[10px] uppercase tracking-terminal text-muted-mx leading-relaxed">
          <div className="flex justify-between"><span>Universe</span><span className="text-primary-mx">37</span></div>
          <div className="flex justify-between"><span>Pillars weighted</span><span className="text-primary-mx">7</span></div>
          <div className="flex justify-between"><span>Confidence</span><span className="text-data">{Math.min(100, Math.round((applied / total) * 100))}%</span></div>
        </div>
      </div>
    </div>
  );
}

function Row({ ex, rank, pct }) {
  const rankColor = rank === 1 ? '#0dbe82' : rank === 2 ? '#18b4d4' : '#70a848';
  return (
    <div className="rerank-enter px-5 py-4 terminal-border-b" key={`${ex.name}-${rank}-${pct.toFixed(2)}`} data-testid={`live-row-${rank}`}>
      <div className="flex items-center gap-3">
        <span className="font-mono text-[10px] uppercase tracking-terminal w-6" style={{ color: rankColor }} data-testid={`live-row-${rank}-rank`}>
          #{String(rank).padStart(2, '0')}
        </span>
        <LogoBadge code={ex.logo} size={28} rank={rank} />
        <div className="flex-1 min-w-0">
          <div className="text-[13px] text-primary-mx truncate" data-testid={`live-row-${rank}-name`}>{ex.name}</div>
          <div className="font-mono text-[10px] text-muted-mx truncate">{ex.tagline}</div>
        </div>
        <div className="font-mono text-[13px] font-medium" style={{ color: rankColor }} data-testid={`live-row-${rank}-score`}>{ex.score}</div>
      </div>
      <div className="mt-3 h-[3px] w-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <div className="h-full score-gradient fill-bar origin-left" style={{ width: `${Math.max(8, pct)}%` }} />
      </div>
    </div>
  );
}
