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
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px]">
          <section className="min-h-[calc(100vh-49px)] flex">
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
          <aside className="terminal-border-l bg-page lg:sticky lg:top-[49px] lg:self-start lg:h-[calc(100vh-49px)]">
            <LiveTop3 ranked={ranked} applied={appliedCount} total={QUESTIONS.length} />
          </aside>
        </main>
      ) : (
        <ResultScreen ranked={ranked} answers={answers} onRestart={onRestart} />
      )}
    </div>
  );
}
