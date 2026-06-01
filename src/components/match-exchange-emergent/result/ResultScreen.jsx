import React, { useEffect, useState } from 'react';
import Shortlist from './Shortlist';
import RankList from './RankList';
import { RotateCcw, Download, Share2 } from 'lucide-react';

export default function ResultScreen({ ranked, answers, onRestart }) {
  const top = ranked[0];
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="flex-1 bg-page" data-testid="result-screen">
      {/* Reveal banner */}
      <section className="px-4 md:px-8 pt-10 md:pt-14 pb-8 md:pb-12 max-w-[1320px] mx-auto">
        <div className="flex flex-col gap-2">
          <div className="font-mono text-[11px] uppercase tracking-terminal text-data">
            Match Exchange · Result
          </div>
          <div className="font-mono text-[11px] uppercase tracking-terminal text-muted-mx" data-testid="result-summary-meta">
            Universe scanned: 37 venues · 7 pillars weighted · {Object.keys(answers).length}/8 filters applied
          </div>
        </div>

        <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-[1fr_auto] items-end gap-6">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-terminal text-muted-mx mb-2">
              Your best match
            </div>
            <h1
              className="q-enter"
              data-testid="result-top-name"
              style={{
                fontSize: 'clamp(48px, 9vw, 112px)',
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                fontWeight: 600,
                color: '#e8eaf0',
              }}
            >
              <span style={{ color: '#0dbe82' }}>{top.name}</span>
              <span className="inline-block w-[0.5ch]" />
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-[12px] text-muted-mx">
              <span>{top.tagline}</span>
              <span className="text-muted-mx">·</span>
              <span className="text-data" data-testid="result-top-score">Score {top.score}</span>
              <span className="text-muted-mx">·</span>
              <span>Margin over #2: <span className="text-primary-mx">+{Math.max(0, top.score - (ranked[1]?.score || 0))}</span></span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onRestart}
              data-testid="result-rerun-btn"
              className="flex items-center gap-2 px-3.5 py-2.5 terminal-border font-mono text-[11px] uppercase tracking-terminal text-primary-mx hover:bg-card-elev transition-colors"
              style={{ borderRadius: 3 }}
            >
              <RotateCcw className="w-3 h-3" /> Re-run
            </button>
            <button
              data-testid="result-copy-btn"
              className="flex items-center gap-2 px-3.5 py-2.5 terminal-border font-mono text-[11px] uppercase tracking-terminal text-muted-mx hover:text-primary-mx transition-colors"
              style={{ borderRadius: 3 }}
              onClick={() => navigator.clipboard?.writeText(`${top.name} — Match Exchange result (${top.score}/100)`)}
            >
              <Share2 className="w-3 h-3" /> Copy
            </button>
            <button
              data-testid="result-export-btn"
              className="flex items-center gap-2 px-3.5 py-2.5 terminal-border font-mono text-[11px] uppercase tracking-terminal text-muted-mx hover:text-primary-mx transition-colors"
              style={{ borderRadius: 3 }}
              onClick={() => exportJSON(ranked, answers)}
            >
              <Download className="w-3 h-3" /> Export
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-[1320px] mx-auto">
        <Shortlist ranked={ranked} />
        <RankList ranked={ranked} />
        <FooterMeta ranked={ranked} answers={answers} />
      </div>
    </main>
  );
}

function FooterMeta({ ranked, answers }) {
  return (
    <footer className="terminal-border-t mt-2 px-4 md:px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-[10px] uppercase tracking-terminal text-muted-mx">
      <div>
        <div className="text-muted-mx">Engine</div>
        <div className="text-primary-mx mt-1">C0insiglieri / v0.4</div>
      </div>
      <div>
        <div className="text-muted-mx">Universe</div>
        <div className="text-primary-mx mt-1">{ranked.length} venues</div>
      </div>
      <div>
        <div className="text-muted-mx">Filters</div>
        <div className="text-primary-mx mt-1">{Object.keys(answers).length}/8 applied</div>
      </div>
      <div>
        <div className="text-muted-mx">Pillars</div>
        <div className="text-primary-mx mt-1">Custody · Liquidity · Compliance · Transparency · Product Depth · Track Record · Execution</div>
      </div>
    </footer>
  );
}

function exportJSON(ranked, answers) {
  const blob = new Blob([JSON.stringify({ answers, ranked: ranked.map((r) => ({ name: r.name, score: r.score, p: r.p })) }, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'match-exchange-result.json';
  a.click();
  URL.revokeObjectURL(url);
}
