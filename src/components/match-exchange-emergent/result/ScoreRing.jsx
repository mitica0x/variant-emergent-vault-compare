import React, { useEffect, useState } from 'react';

export default function ScoreRing({ score, size = 92, stroke = 6, accent = '#0dbe82' }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const target = c - (score / 100) * c;
  const id = `ringGrad-${score}-${size}`;

  // Start with the ring empty (offset = full circumference), then transition to
  // the real value on mount. The CSS transition on stroke-dashoffset does the
  // animation — no requestAnimationFrame.
  const [offset, setOffset] = useState(c);
  useEffect(() => {
    const t = setTimeout(() => setOffset(target), 40);
    return () => clearTimeout(t);
  }, [target]);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#18b4d4" />
            <stop offset="100%" stopColor={accent} />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={`url(#${id})`}
          strokeWidth={stroke}
          strokeLinecap="butt"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 900ms cubic-bezier(0.25,1,0.5,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-[20px] font-medium" style={{ color: accent }}>{score}</span>
        <span className="font-mono text-[9px] uppercase tracking-terminal text-muted-mx">score</span>
      </div>
    </div>
  );
}
