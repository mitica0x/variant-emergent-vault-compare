import React from 'react';
import { RotateCcw } from 'lucide-react';

export default function TopBar({ step, total, appliedCount, isResult, onRestart }) {
  const pct = isResult ? 100 : Math.round((step / total) * 100);
  return (
    <header className="terminal-border-b bg-page sticky top-0 z-30">
      <div className="flex items-stretch h-[48px]">
        {/* Brand */}
        <div className="flex items-center gap-2 px-4 terminal-border-r min-w-[200px]">
          <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: '#0dbe82' }} />
          <span className="font-mono text-[11px] text-muted-mx ml-1">/ Match Exchange</span>
        </div>

        {/* Center bread */}
        <div className="flex-1 flex items-center justify-between px-4">
          <div className="font-mono text-[11px] text-muted-mx tracking-terminal uppercase">
            {isResult ? 'Result · Ranked 37 venues' : `Question ${String(step + 1).padStart(2, '0')} of ${String(total).padStart(2, '0')}`}
          </div>
          <div className="hidden md:flex items-center gap-3 font-mono text-[11px] text-muted-mx tracking-terminal uppercase">
            <span>Universe</span>
            <span className="text-primary-mx">37 venues</span>
            <span className="text-muted-mx">·</span>
            <span>Pillars</span>
            <span className="text-primary-mx">7</span>
            <span className="text-muted-mx">·</span>
            <span>Applied</span>
            <span className="text-data">{appliedCount}/{total}</span>
          </div>
        </div>

        {/* Restart */}
        <button
          onClick={onRestart}
          data-testid="topbar-reset-btn"
          className="flex items-center gap-2 px-4 terminal-border-l font-mono text-[11px] uppercase tracking-terminal text-muted-mx hover:text-primary-mx transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>
      {/* Progress hairline */}
      <div className="h-[2px] w-full bg-transparent">
        <div
          className="h-[2px] score-gradient transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </header>
  );
}
