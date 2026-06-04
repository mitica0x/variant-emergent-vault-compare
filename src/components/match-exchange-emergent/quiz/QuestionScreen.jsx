import React from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import CountrySearch from './CountrySearch';

export default function QuestionScreen({ question, index, total, selected, onAnswer, onBack }) {
  if (!question) return null;
  return (
    <div className="q-enter w-full max-w-[820px] mx-auto px-6 md:px-10 py-10 md:py-14 flex flex-col" data-testid={`question-screen-${question.id}`}>
      {/* Meta row */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-terminal uppercase text-muted-mx" data-testid="question-meta">
          <span className="text-data" data-testid="question-number">Q.{question.number}</span>
          <span>/ {String(total).padStart(2, '0')}</span>
          <span className="text-muted-mx">·</span>
          <span>{question.id}</span>
        </div>
        {onBack && (
          <button
            onClick={onBack}
            data-testid="question-back-btn"
            className="flex items-center gap-1.5 font-mono text-[11px] tracking-terminal uppercase text-muted-mx hover:text-primary-mx transition-colors"
          >
            <ArrowLeft className="w-3 h-3" /> Back
          </button>
        )}
      </div>

      {/* Prompt */}
      <h1 className="text-[28px] md:text-[36px] leading-[1.15] font-medium tracking-tighter-mx text-primary-mx max-w-[680px]" data-testid="question-prompt">
        {question.prompt}
        <span className="inline-block w-[10px] h-[26px] md:h-[34px] ml-1 align-[-4px] cursor-blink" style={{ background: '#0dbe82' }} />
      </h1>
      <p className="mt-4 font-mono text-[12px] md:text-[13px] text-muted-mx max-w-[560px]" data-testid="question-hint">
        {question.hint}
      </p>

      {/* Q01 region uses a country typeahead instead of the radio grid; it maps
          the chosen country to the same region code the scoring engine expects. */}
      {question.id === 'region' ? (
        <CountrySearch questionId={question.id} initialValue={selected} onAnswer={onAnswer} />
      ) : (
      /* Options */
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-2" data-testid="question-options">
        {question.options.map((opt) => {
          const isSel = selected === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onAnswer(question.id, opt.value)}
              data-testid={`option-${question.id}-${opt.value}`}
              className={[
                'group text-left bg-card-mx terminal-border px-4 py-4 flex items-center gap-4 transition-colors',
                isSel ? 'accent-border-l' : '',
                'hover:bg-card-elev',
              ].join(' ')}
              style={{ borderRadius: 3 }}
            >
              <span
                className="font-mono text-[11px] uppercase tracking-terminal w-[28px] flex-none"
                style={{ color: isSel ? '#0dbe82' : '#6b7280' }}
              >
                {String.fromCharCode(65 + question.options.indexOf(opt))}
              </span>
              <span className="flex-1">
                <span className="block text-[14px] md:text-[15px] text-primary-mx">{opt.label}</span>
                <span className="block font-mono text-[11px] text-muted-mx mt-0.5">{opt.tag}</span>
              </span>
              <ChevronRight
                className={['w-4 h-4 transition-transform group-hover:translate-x-0.5', isSel ? '' : ''].join(' ')}
                style={{ color: isSel ? '#0dbe82' : '#6b7280' }}
              />
            </button>
          );
        })}
      </div>
      )}

      {/* Footer hint line */}
      <div className="mt-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-terminal text-muted-mx">
        <span className="w-1 h-1" style={{ background: '#18b4d4' }} />
        <span>Selection auto-advances · Live top 3 updates instantly</span>
      </div>
    </div>
  );
}
