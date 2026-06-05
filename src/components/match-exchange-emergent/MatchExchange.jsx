import React, { useMemo, useState, useCallback } from 'react';
import './match-exchange.css';
import { QUESTIONS } from './data/questions';
import { scoreExchanges, defaultRanking } from './lib/scoring';
import TopBar from './quiz/TopBar';
import QuestionScreen from './quiz/QuestionScreen';
import LiveTop3 from './quiz/LiveTop3';
import ResultScreen from './result/ResultScreen';

export default function MatchExchange() {
  const [step, setStep] = useState(0); // 0..7 quiz, 8 = result
  const [answers, setAnswers] = useState({});

  const appliedCount = Object.keys(answers).length;

  const ranked = useMemo(() => {
    if (appliedCount === 0) return defaultRanking();
    return scoreExchanges(answers);
  }, [answers, appliedCount]);

  const onAnswer = useCallback((qid, value) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
    // advance after a short beat to let user see live re-rank
    setTimeout(() => {
      setStep((s) => Math.min(s + 1, QUESTIONS.length));
    }, 280);
  }, []);

  const onBack = useCallback(() => {
    setStep((s) => Math.max(0, s - 1));
  }, []);

  const onRestart = useCallback(() => {
    setAnswers({});
    setStep(0);
  }, []);

  const isResult = step >= QUESTIONS.length;

  return (
    <div className="min-h-screen flex flex-col bg-page">
      <TopBar
        step={step}
        total={QUESTIONS.length}
        appliedCount={appliedCount}
        isResult={isResult}
        onRestart={onRestart}
      />

      {!isResult ? (
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px]">
          <section className="min-w-0 flex flex-col">
            <div className="w-full max-w-[820px] mx-auto px-6 md:px-10 pt-10" style={{ paddingBottom: 32 }}>
              <p className="text-xs uppercase tracking-widest text-cyan-400 mb-2">• MATCH EXCHANGE · LIVE · 2026</p>
              <h1 className="text-4xl font-bold text-white">Find your card.</h1>
              <p className="text-gray-400 mt-2 text-base">Answer 4 questions. Get your ranked match.</p>
            </div>
            <QuestionScreen
              key={step}
              question={QUESTIONS[step]}
              index={step}
              total={QUESTIONS.length}
              selected={answers[QUESTIONS[step].id]}
              onAnswer={onAnswer}
              onBack={step > 0 ? onBack : null}
            />
          </section>
          <aside className="terminal-border-l bg-page overflow-y-auto lg:sticky lg:top-[49px] lg:self-start lg:h-[calc(100vh-49px)]">
            <LiveTop3 ranked={ranked} applied={appliedCount} total={QUESTIONS.length} />
          </aside>
        </main>
      ) : (
        <ResultScreen ranked={ranked} answers={answers} onRestart={onRestart} />
      )}
    </div>
  );
}
