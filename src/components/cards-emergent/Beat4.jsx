// Beat 4 — Match Card. 5-question quiz with live re-ranking and dramatic reveal.
import React, { useMemo, useState, useRef } from "react";
import {
  rankCards,
  DEALBREAKER_KEYS,
  SPEND_TYPES,
  CASHBACK_PRIORITIES,
  ECOSYSTEMS,
} from "../../data/scoring";
import { COUNTRIES } from "../../data/cards";
import FlipCard from "./FlipCard";
import ScoreRing from "./ScoreRing";
import MiniCard from "./MiniCard";
import DimensionBars from "./DimensionBars";

const Pill = ({ children, active, onClick, color = "#18b4d4", testId }) => (
  <button
    onClick={onClick}
    data-testid={testId}
    className="font-mono"
    style={{
      fontSize: 11,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      padding: "10px 14px",
      border: `0.5px solid ${active ? color : "rgba(255,255,255,0.12)"}`,
      borderRadius: 3,
      background: active ? `${color}1f` : "transparent",
      color: active ? color : "#cbd5e1",
      cursor: "pointer",
      transition: "all 0.2s",
    }}
  >
    {children}
  </button>
);

const StepIndicator = ({ current, total }) => (
  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        style={{
          width: i === current ? 24 : 6,
          height: 2,
          background: i <= current ? "#0dbe82" : "rgba(255,255,255,0.12)",
          transition: "all 0.3s",
        }}
      />
    ))}
    <span
      className="font-mono"
      style={{ fontSize: 10, color: "#6b7280", letterSpacing: "0.14em", marginLeft: 10 }}
    >
      {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
    </span>
  </div>
);

const QUESTIONS = ["Where are you?", "Dealbreakers?", "How do you spend?", "What cashback matters?", "Your ecosystem?"];

const Beat4 = ({ quizRef }) => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [answers, setAnswers] = useState({
    country: "Romania",
    dealbreakers: [],
    spend: "either",
    cashbackPriority: "noStake",
    ecosystem: "any",
  });

  const ranked = useMemo(() => rankCards(answers), [answers]);
  const top3 = ranked.slice(0, 3);
  const winner = ranked[0];

  const toggleDeal = (id) => {
    setAnswers((a) => ({
      ...a,
      dealbreakers: a.dealbreakers.includes(id) ? a.dealbreakers.filter((x) => x !== id) : [...a.dealbreakers, id],
    }));
  };

  const next = () => {
    if (step < 4) setStep(step + 1);
    else setSubmitted(true);
  };
  const back = () => {
    if (submitted) {
      setSubmitted(false);
      return;
    }
    if (step > 0) setStep(step - 1);
  };

  const restart = () => {
    setSubmitted(false);
    setStep(0);
    setShowAll(false);
    setAnswers({
      country: "Romania",
      dealbreakers: [],
      spend: "either",
      cashbackPriority: "noStake",
      ecosystem: "any",
    });
  };

  return (
    <section
      ref={quizRef}
      id="match-card"
      style={{ padding: "120px 28px 120px", background: "var(--bg)", position: "relative" }}
      data-testid="beat-4-match"
    >
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 36 }}>
          <div>
            <div className="kicker" style={{ color: "#18b4d4" }}>
              ● Match Card Engine
            </div>
            <h2
              style={{
                fontFamily: "Geist, sans-serif",
                fontSize: "clamp(32px, 4vw, 56px)",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                lineHeight: 1.02,
                margin: "12px 0 0",
                color: "#e8eaf0",
              }}
            >
              5 questions. Your card.
            </h2>
            <p
              style={{
                marginTop: 12,
                fontSize: 15,
                color: "#9ca3af",
                lineHeight: 1.5,
                maxWidth: 600,
              }}
            >
              We re-score all 17 cards against your answers in real time. The list on the right re-ranks as
              you pick.
            </p>
          </div>
          <div className="font-mono" style={{ fontSize: 11, color: "#6b7280", letterSpacing: "0.16em" }}>
            <span className="live-dot" style={{ display: "inline-block", marginRight: 8 }} />
            Live ranking
          </div>
        </div>

        {!submitted ? (
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) 320px", gap: 36, alignItems: "flex-start" }}>
            {/* Quiz */}
            <div
              className="hair"
              style={{ background: "var(--surface)", borderRadius: 3, padding: 36, minHeight: 380 }}
              data-testid="quiz-card"
            >
              <StepIndicator current={step} total={5} />

              <h3
                style={{
                  marginTop: 26,
                  marginBottom: 26,
                  fontFamily: "Geist, sans-serif",
                  fontSize: 30,
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                  color: "#e8eaf0",
                }}
                data-testid="quiz-question"
              >
                {QUESTIONS[step]}
              </h3>

              {step === 0 && (
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {COUNTRIES.map((c) => (
                    <Pill
                      key={c}
                      active={answers.country === c}
                      onClick={() => setAnswers({ ...answers, country: c })}
                      testId={`q-country-${c.toLowerCase()}`}
                      color="#0dbe82"
                    >
                      {c}
                    </Pill>
                  ))}
                </div>
              )}

              {step === 1 && (
                <>
                  <div className="font-mono" style={{ fontSize: 10, color: "#6b7280", letterSpacing: "0.14em", marginBottom: 14, textTransform: "uppercase" }}>
                    Select all that apply (optional)
                  </div>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {DEALBREAKER_KEYS.map((d) => (
                      <Pill
                        key={d.id}
                        active={answers.dealbreakers.includes(d.id)}
                        onClick={() => toggleDeal(d.id)}
                        testId={`q-deal-${d.id}`}
                        color="#e8703a"
                      >
                        {d.label}
                      </Pill>
                    ))}
                  </div>
                </>
              )}

              {step === 2 && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                  {SPEND_TYPES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setAnswers({ ...answers, spend: s.id })}
                      data-testid={`q-spend-${s.id}`}
                      style={{
                        padding: 18,
                        background: answers.spend === s.id ? "rgba(13,190,130,0.08)" : "transparent",
                        border: `0.5px solid ${answers.spend === s.id ? "#0dbe82" : "rgba(255,255,255,0.1)"}`,
                        borderRadius: 3,
                        textAlign: "left",
                        cursor: "pointer",
                      }}
                    >
                      <div className="font-mono" style={{ fontSize: 11, color: answers.spend === s.id ? "#0dbe82" : "#cbd5e1", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                        {s.label}
                      </div>
                      {s.desc && (
                        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 6 }}>{s.desc}</div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {step === 3 && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {CASHBACK_PRIORITIES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setAnswers({ ...answers, cashbackPriority: c.id })}
                      data-testid={`q-cashback-${c.id}`}
                      style={{
                        padding: 16,
                        background: answers.cashbackPriority === c.id ? "rgba(13,190,130,0.08)" : "transparent",
                        border: `0.5px solid ${answers.cashbackPriority === c.id ? "#0dbe82" : "rgba(255,255,255,0.1)"}`,
                        borderRadius: 3,
                        textAlign: "left",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ fontSize: 14, color: answers.cashbackPriority === c.id ? "#0dbe82" : "#e8eaf0" }}>
                        {c.label}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {step === 4 && (
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {ECOSYSTEMS.map((e) => (
                    <Pill
                      key={e.id}
                      active={answers.ecosystem === e.id}
                      onClick={() => setAnswers({ ...answers, ecosystem: e.id })}
                      testId={`q-eco-${e.id}`}
                    >
                      {e.label}
                    </Pill>
                  ))}
                </div>
              )}

              <div style={{ marginTop: 40, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <button
                  onClick={back}
                  disabled={step === 0}
                  data-testid="quiz-back"
                  className="font-mono"
                  style={{
                    background: "transparent",
                    color: step === 0 ? "#3a3f4a" : "#9ca3af",
                    border: "0.5px solid rgba(255,255,255,0.1)",
                    padding: "11px 18px",
                    fontSize: 11,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    borderRadius: 3,
                    cursor: step === 0 ? "not-allowed" : "pointer",
                  }}
                >
                  ← Back
                </button>
                <button
                  onClick={next}
                  data-testid="quiz-next"
                  className="font-mono"
                  style={{
                    background: "#0dbe82",
                    color: "#08110a",
                    border: "none",
                    padding: "12px 22px",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    borderRadius: 3,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {step === 4 ? "Reveal my card" : "Next →"}
                </button>
              </div>
            </div>

            {/* Live ranking panel */}
            <div
              className="hair"
              style={{ background: "var(--surface)", borderRadius: 3, padding: 18, position: "sticky", top: 80 }}
              data-testid="live-rank"
            >
              <div className="kicker" style={{ marginBottom: 14, color: "#0dbe82" }}>
                Live ranking · Top 5
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {ranked.slice(0, 5).map((c, i) => (
                  <div
                    key={c.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "20px 1fr 38px",
                      gap: 10,
                      alignItems: "center",
                      padding: "8px 0",
                      borderTop: i === 0 ? "none" : "0.5px solid rgba(255,255,255,0.05)",
                      transition: "all 0.6s ease",
                    }}
                  >
                    <div
                      className="font-mono"
                      style={{
                        fontSize: 10,
                        color: i === 0 ? "#0dbe82" : "#6b7280",
                        letterSpacing: "0.12em",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 13,
                          color: i === 0 ? "#e8eaf0" : "#cbd5e1",
                          fontWeight: i === 0 ? 500 : 400,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {c.name}
                      </div>
                      <div
                        className="font-mono"
                        style={{ fontSize: 9, color: "#6b7280", letterSpacing: "0.12em", marginTop: 1 }}
                      >
                        {c.network}
                      </div>
                    </div>
                    <div
                      className="font-mono tabnum"
                      style={{
                        fontSize: 13,
                        color: i === 0 ? "#0dbe82" : "#9ca3af",
                        textAlign: "right",
                        fontWeight: 500,
                      }}
                    >
                      {c.matchScore}
                    </div>
                  </div>
                ))}
              </div>
              <div className="font-mono" style={{ fontSize: 9, color: "#6b7280", letterSpacing: "0.14em", marginTop: 16, textAlign: "center", textTransform: "uppercase" }}>
                Re-scored on every answer
              </div>
            </div>
          </div>
        ) : (
          <ResultView
            winner={winner}
            top3={top3}
            ranked={ranked}
            showAll={showAll}
            onToggleAll={() => setShowAll(!showAll)}
            onRestart={restart}
          />
        )}
      </div>
    </section>
  );
};

const ResultView = ({ winner, top3, ranked, showAll, onToggleAll, onRestart }) => {
  return (
    <div data-testid="quiz-result">
      {/* Dramatic reveal */}
      <div style={{ textAlign: "center", margin: "20px 0 48px" }}>
        <div className="kicker" style={{ color: "#0dbe82", marginBottom: 18 }}>
          Your match
        </div>
        <h2
          style={{
            fontFamily: "Geist, sans-serif",
            fontSize: "clamp(48px, 8vw, 116px)",
            fontWeight: 300,
            letterSpacing: "-0.045em",
            lineHeight: 0.95,
            color: "#0dbe82",
            margin: 0,
            animation: "fadeUp 0.7s cubic-bezier(0.2,0.8,0.2,1)",
          }}
        >
          {winner.name}.
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 30,
            alignItems: "center",
            marginTop: 28,
            flexWrap: "wrap",
          }}
        >
          <ScoreRing score={winner.matchScore} label="Match" size={120} />
          <div style={{ textAlign: "left" }}>
            <div className="kicker">vs. category average</div>
            <div
              className="font-mono tabnum"
              style={{ fontSize: 32, color: "#0dbe82", fontWeight: 500, letterSpacing: "-0.02em" }}
            >
              +{Math.max(2, winner.matchScore - 70)}
            </div>
            <div className="font-mono" style={{ fontSize: 10, color: "#6b7280", letterSpacing: "0.14em", textTransform: "uppercase" }}>
              points above mean
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 56, alignItems: "center", marginBottom: 60 }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <FlipCard card={winner} size="xl" idle autoFlipOnReveal />
        </div>
        <div>
          <div className="kicker" style={{ marginBottom: 12 }}>Why this card</div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {winner.matchReasonsLive.map((r) => (
              <li
                key={r}
                style={{ padding: "10px 0", borderTop: "0.5px solid rgba(255,255,255,0.06)", display: "flex", gap: 12, alignItems: "center" }}
              >
                <span style={{ color: "#0dbe82" }}>●</span>
                <span style={{ fontSize: 15, color: "#e8eaf0" }}>{r}</span>
              </li>
            ))}
          </ul>

          {winner.referral?.active && (
            <div
              style={{
                marginTop: 22,
                padding: "12px 16px",
                background: "rgba(13,190,130,0.08)",
                border: "0.5px solid rgba(13,190,130,0.3)",
                borderRadius: 3,
                fontSize: 13,
                color: "#e8eaf0",
              }}
            >
              <span style={{ color: "#0dbe82" }}>● </span>
              Referral active — <strong style={{ color: "#0dbe82" }}>{winner.referral.bonus}</strong>
            </div>
          )}

          <div style={{ marginTop: 24 }}>
            <DimensionBars card={winner} layout="horizontal" />
          </div>

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            data-testid="result-request-cta"
            style={{
              display: "inline-flex",
              marginTop: 32,
              background: "#0dbe82",
              color: "#08110a",
              padding: "14px 24px",
              fontFamily: "Geist Mono, monospace",
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              borderRadius: 3,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Request {winner.brand} card →
          </a>
        </div>
      </div>

      {/* Top 3 */}
      <div className="kicker" style={{ marginBottom: 18 }}>Your top 3</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, marginBottom: 64 }}>
        {top3.map((c, i) => (
          <div
            key={c.id}
            className="hair"
            style={{
              background: "var(--surface)",
              padding: 22,
              borderRadius: 3,
              borderColor: i === 0 ? "rgba(13,190,130,0.5)" : "rgba(255,255,255,0.08)",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              alignItems: "center",
              textAlign: "center",
              boxShadow: i === 0 ? "0 20px 60px -30px rgba(13,190,130,0.4)" : "none",
            }}
            data-testid={`top3-${c.id}`}
          >
            <div
              className="font-mono"
              style={{
                alignSelf: "flex-start",
                fontSize: 9,
                color: i === 0 ? "#0dbe82" : "#6b7280",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              # {i + 1} · {c.matchScore}/100
            </div>
            <MiniCard card={c} size="md" />
            <ScoreRing score={c.matchScore} size={72} label="Match" />
            <div style={{ fontSize: 15, color: "#e8eaf0", fontWeight: 500 }}>{c.name}</div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", textAlign: "left", width: "100%" }}>
              {c.matchReasonsLive.slice(0, 3).map((r) => (
                <li key={r} style={{ fontSize: 12, color: "#9ca3af", padding: "4px 0", display: "flex", gap: 8 }}>
                  <span style={{ color: "#0dbe82" }}>✓</span>
                  {r}
                </li>
              ))}
            </ul>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              data-testid={`top3-cta-${c.id}`}
              className="font-mono"
              style={{
                width: "100%",
                background: i === 0 ? "#0dbe82" : "transparent",
                color: i === 0 ? "#08110a" : "#e8eaf0",
                padding: "10px 14px",
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontWeight: 600,
                border: i === 0 ? "none" : "0.5px solid rgba(255,255,255,0.18)",
                borderRadius: 3,
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              {i === 0 ? `Request ${c.brand} →` : "View details →"}
            </a>
          </div>
        ))}
      </div>

      {/* Full ranking */}
      <div className="hair" style={{ background: "var(--surface)", borderRadius: 3, overflow: "hidden" }} data-testid="full-ranking">
        <div
          style={{
            padding: "14px 22px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "0.5px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="kicker">Full ranking · 17 cards</div>
          <button
            onClick={onToggleAll}
            data-testid="toggle-full-ranking"
            className="font-mono"
            style={{
              background: "transparent",
              color: "#9ca3af",
              border: "0.5px solid rgba(255,255,255,0.1)",
              padding: "6px 12px",
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              borderRadius: 3,
              cursor: "pointer",
            }}
          >
            {showAll ? "Show 5" : "Show all 17"}
          </button>
        </div>

        {(showAll ? ranked : ranked.slice(0, 5)).map((c, i) => (
          <div
            key={c.id}
            style={{
              padding: "12px 22px",
              display: "grid",
              gridTemplateColumns: "32px 1fr 1fr 90px",
              gap: 16,
              alignItems: "center",
              borderTop: i === 0 ? "none" : "0.5px solid rgba(255,255,255,0.05)",
            }}
          >
            <div className="font-mono" style={{ fontSize: 11, color: "#6b7280", letterSpacing: "0.12em" }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <div style={{ fontSize: 14, color: "#e8eaf0" }}>{c.name}</div>
            <div className="font-mono" style={{ fontSize: 11, color: "#9ca3af", letterSpacing: "0.1em" }}>
              {c.network} · {c.cashback}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "flex-end" }}>
              <div style={{ width: 50, height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 1 }}>
                <div
                  style={{
                    width: `${c.matchScore}%`,
                    height: "100%",
                    background: i === 0 ? "#0dbe82" : c.matchScore > 70 ? "#18b4d4" : "#70a848",
                  }}
                />
              </div>
              <span className="font-mono tabnum" style={{ fontSize: 12, color: "#e8eaf0" }}>{c.matchScore}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: 32 }}>
        <button
          onClick={onRestart}
          data-testid="restart-quiz"
          className="font-mono"
          style={{
            background: "transparent",
            color: "#9ca3af",
            border: "0.5px solid rgba(255,255,255,0.18)",
            padding: "12px 22px",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            borderRadius: 3,
            cursor: "pointer",
          }}
        >
          ↻ Run again
        </button>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); filter: blur(8px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
      `}</style>
    </div>
  );
};

export default Beat4;
