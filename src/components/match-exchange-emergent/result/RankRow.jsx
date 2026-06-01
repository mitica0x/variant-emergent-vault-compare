import React from 'react';
import LogoBadge from './LogoBadge';
import Fingerprint from './Fingerprint';

export default function RankRow({ ex, rank, maxScore }) {
  const isTop3 = rank <= 3;
  const rankColor = rank === 1 ? '#0dbe82' : rank === 2 ? '#18b4d4' : rank === 3 ? '#70a848' : '#6b7280';
  const pct = (ex.score / maxScore) * 100;
  const accent = rank === 1 ? '#0dbe82' : rank <= 3 ? '#18b4d4' : '#70a848';

  return (
    <div
      data-testid={`rank-row-${rank}`}
      className={[
        'grid grid-cols-[40px_36px_1fr_auto_60px] md:grid-cols-[44px_40px_1fr_120px_72px] items-center gap-3 md:gap-4 px-3 md:px-4 py-3 terminal-border-b bg-card-mx',
        isTop3 ? 'accent-border-l' : '',
      ].join(' ')}
      style={{ borderLeftColor: isTop3 ? rankColor : undefined }}
    >
      <span className="font-mono text-[11px] uppercase tracking-terminal" style={{ color: rankColor }} data-testid={`rank-row-${rank}-rank`}>
        #{String(rank).padStart(2, '0')}
      </span>
      <LogoBadge code={ex.logo} size={32} rank={rank} />
      <div className="min-w-0">
        <div className="text-[13px] md:text-[14px] text-primary-mx truncate" data-testid={`rank-row-${rank}-name`}>{ex.name}</div>
        <div className="font-mono text-[10px] md:text-[11px] text-muted-mx truncate">{ex.tagline}</div>
      </div>
      <div className="hidden md:block" data-testid={`rank-row-${rank}-fingerprint`}>
        <Fingerprint p={ex.p} accent={accent} />
      </div>
      <div className="text-right">
        <div className="font-mono text-[14px] md:text-[15px] font-medium" style={{ color: rankColor }} data-testid={`rank-row-${rank}-score`}>
          {ex.score}
        </div>
        <div className="mt-1 h-[2px] w-full hidden md:block" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div
            className="h-full score-gradient fill-bar origin-left"
            style={{ width: `${Math.max(6, pct)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
