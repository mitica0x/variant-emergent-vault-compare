// Beat 2 — The Intelligence. Filter sidebar + 17 ranked rows w/ expandable detail
import React, { useMemo, useState } from "react";
import { CARDS, COUNTRIES } from "../../data/cards";
import FlipCard from "./FlipCard";
import ScoreRing from "./ScoreRing";
import DimensionBars from "./DimensionBars";

const Toggle = ({ label, value, onChange, testId }) => (
  <button
    type="button"
    onClick={() => onChange(!value)}
    data-testid={testId}
    style={{
      display: "flex",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 0",
      cursor: "pointer",
      background: "transparent",
      border: "none",
      color: "inherit",
      textAlign: "left",
    }}
  >
    <span
      className="font-mono"
      style={{ fontSize: 11, color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase" }}
    >
      {label}
    </span>
    <span
      style={{
        width: 32,
        height: 18,
        background: value ? "#0dbe82" : "rgba(255,255,255,0.08)",
        borderRadius: 999,
        position: "relative",
        transition: "background 0.2s",
        display: "inline-block",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 2,
          left: value ? 16 : 2,
          width: 14,
          height: 14,
          background: "#080b16",
          borderRadius: 999,
          transition: "left 0.2s",
        }}
      />
    </span>
  </button>
);

const Chip = ({ children, active, onClick, color = "#18b4d4", testId }) => (
  <button
    onClick={onClick}
    data-testid={testId}
    className="font-mono"
    style={{
      fontSize: 10,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      padding: "6px 10px",
      borderRadius: 3,
      border: `0.5px solid ${active ? color : "rgba(255,255,255,0.1)"}`,
      background: active ? `${color}1f` : "transparent",
      color: active ? color : "#9ca3af",
      cursor: "pointer",
      transition: "all 0.18s",
    }}
  >
    {children}
  </button>
);

const Badge = ({ children, color }) => (
  <span
    className="font-mono"
    style={{
      fontSize: 9,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      padding: "3px 7px",
      borderRadius: 3,
      border: `0.5px solid ${color}66`,
      color,
      background: `${color}10`,
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </span>
);

const badgeColor = (b) => {
  if (b === "SIGNUP BONUS") return "#0dbe82";
  if (b === "0% FX") return "#18b4d4";
  if (b === "NON-CUSTODIAL") return "#70a848";
  if (b === "FEATURED ★") return "#e8703a";
  if (b === "METAL TIER") return "#9ca3af";
  if (b === "MiCA") return "#18b4d4";
  return "#9ca3af";
};

const ScoreCell = ({ score }) => {
  const color = score >= 85 ? "#0dbe82" : score >= 70 ? "#18b4d4" : "#70a848";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "flex-end" }}>
      <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 1, maxWidth: 80 }}>
        <div style={{ width: `${score}%`, height: "100%", background: color, borderRadius: 1 }} />
      </div>
      <div className="font-mono tabnum" style={{ fontSize: 16, color: "#e8eaf0", fontWeight: 500, width: 56, textAlign: "right" }}>
        {score}<span style={{ color: "#6b7280", fontSize: 11 }}>/100</span>
      </div>
    </div>
  );
};

const Row = ({ card, expanded, onToggle, rank }) => {
  return (
    <div
      className="mini-row"
      style={{
        borderTop: "0.5px solid rgba(255,255,255,0.08)",
        background: expanded ? "rgba(13,190,130,0.03)" : "transparent",
        transition: "background 0.25s",
      }}
      data-testid={`card-row-${card.id}`}
    >
      <div
        style={{
          padding: "20px 24px",
          display: "grid",
          gridTemplateColumns: "44px 256px 1fr 220px 230px 36px",
          alignItems: "center",
          gap: 20,
          cursor: "pointer",
        }}
        onClick={onToggle}
      >
        {/* rank */}
        <div
          className="font-mono tabnum"
          style={{ color: "#6b7280", fontSize: 12, letterSpacing: "0.1em" }}
        >
          {String(rank).padStart(2, "0")}
        </div>
        {/* mini card — interactive FlipCard: flip on click, tilt on hover.
            onClickCapture stops a thumbnail click from toggling the row accordion
            (capture-phase stopPropagation prevents the row's bubble onClick). */}
        <div
          style={{ width: 240 }}
          onClickCapture={(e) => e.stopPropagation()}
        >
          <FlipCard card={card} size="md" idle={false} dramatic={false} interactive={true} />
        </div>
        {/* name + badges */}
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: "Geist, sans-serif",
              fontSize: 16,
              color: "#e8eaf0",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            {card.name}
            <span className="font-mono" style={{ fontSize: 10, color: "#6b7280", letterSpacing: "0.14em" }}>
              {card.network.toUpperCase()} · {card.region.toUpperCase()}
            </span>
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
            {card.badges.map((b) => (
              <Badge key={b} color={badgeColor(b)}>
                {b}
              </Badge>
            ))}
            {card.badges.length === 0 && (
              <span className="font-mono" style={{ fontSize: 10, color: "#6b7280", letterSpacing: "0.12em" }}>
                {card.custody === "Non-custodial" ? "NON-CUSTODIAL" : `CUSTODIAL · ${card.cashbackType.toUpperCase()}`}
              </span>
            )}
          </div>
        </div>
        {/* metrics */}
        <div
          className="font-mono tabnum"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, color: "#9ca3af", fontSize: 11 }}
        >
          <div>
            <div className="kicker" style={{ marginBottom: 4 }}>Cashback</div>
            <div style={{ color: "#0dbe82", fontSize: 13 }}>{card.cashback}</div>
          </div>
          <div>
            <div className="kicker" style={{ marginBottom: 4 }}>FX</div>
            <div style={{ color: "#e8eaf0", fontSize: 13 }}>{card.fxFee}</div>
          </div>
          <div>
            <div className="kicker" style={{ marginBottom: 4 }}>Issuance</div>
            <div style={{ color: "#e8eaf0", fontSize: 13 }}>{card.issuance}</div>
          </div>
        </div>
        {/* score */}
        <ScoreCell score={card.score} />
        {/* expand */}
        <div
          style={{
            width: 32,
            height: 32,
            border: "0.5px solid rgba(255,255,255,0.1)",
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#9ca3af",
            transform: expanded ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.25s",
          }}
          data-testid={`expand-${card.id}`}
        >
          ▾
        </div>
      </div>

      {expanded && (
        <div
          style={{
            padding: "8px 24px 40px",
            display: "flex",
            gap: 24,
            borderTop: "0.5px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Left: detail */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.6, margin: "16px 0 24px", maxWidth: 600 }}>
              {card.description}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              <div>
                <div className="kicker" style={{ marginBottom: 12, color: "#0dbe82" }}>
                  Pros
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {card.pros.map((p) => (
                    <li key={p} style={{ fontSize: 13, color: "#e8eaf0", padding: "6px 0", display: "flex", gap: 8 }}>
                      <span style={{ color: "#0dbe82" }}>✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="kicker" style={{ marginBottom: 12, color: "#e8703a" }}>
                  Cons
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {card.cons.map((p) => (
                    <li key={p} style={{ fontSize: 13, color: "#e8eaf0", padding: "6px 0", display: "flex", gap: 8 }}>
                      <span style={{ color: "#e8703a" }}>✗</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Fees grid */}
            <div className="kicker" style={{ marginTop: 28, marginBottom: 10 }}>
              Fee structure
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                border: "0.5px solid rgba(255,255,255,0.08)",
                borderRadius: 3,
              }}
            >
              {Object.entries(card.fees).map(([k, v], i) => (
                <div
                  key={k}
                  style={{
                    padding: "10px 12px",
                    borderRight: (i + 1) % 5 !== 0 ? "0.5px solid rgba(255,255,255,0.06)" : "none",
                    borderBottom: i < 5 ? "0.5px solid rgba(255,255,255,0.06)" : "none",
                  }}
                >
                  <div className="font-mono" style={{ fontSize: 9, letterSpacing: "0.14em", color: "#6b7280", textTransform: "uppercase" }}>
                    {k}
                  </div>
                  <div className="font-mono tabnum" style={{ fontSize: 12, color: "#e8eaf0", marginTop: 4 }}>
                    {v}
                  </div>
                </div>
              ))}
            </div>

            {/* Tiers */}
            {card.tiers && card.tiers.length > 0 && (
              <>
                <div className="kicker" style={{ marginTop: 24, marginBottom: 10 }}>
                  Tier levels
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {card.tiers.map((t) => (
                    <div
                      key={t.name}
                      style={{
                        padding: "10px 14px",
                        border: "0.5px solid rgba(255,255,255,0.1)",
                        borderRadius: 3,
                        minWidth: 160,
                      }}
                    >
                      <div className="font-mono" style={{ fontSize: 10, color: "#9ca3af", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                        {t.name}
                      </div>
                      <div className="font-mono" style={{ fontSize: 16, color: "#0dbe82", marginTop: 4 }}>
                        {t.cashback}
                      </div>
                      <div className="font-mono" style={{ fontSize: 10, color: "#6b7280", marginTop: 2 }}>
                        {t.fee}
                        {t.note ? ` · ${t.note}` : ""}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Availability */}
            <div className="kicker" style={{ marginTop: 24, marginBottom: 8 }}>
              Availability
            </div>
            <div style={{ fontSize: 13, color: "#cbd5e1", display: "flex", gap: 14, flexWrap: "wrap" }}>
              <span>
                <span style={{ color: "#0dbe82" }}>✓ </span>
                {card.availability.available}
              </span>
              <span>
                <span style={{ color: "#e8703a" }}>✗ </span>
                {card.availability.notAvailable}
              </span>
              {card.availability.romania && (
                <span style={{ color: "#0dbe82", fontFamily: "Geist Mono", fontSize: 11, letterSpacing: "0.14em" }}>
                  · Romania ✓
                </span>
              )}
            </div>

            {/* Referral */}
            {card.referral?.active && (
              <div
                style={{
                  marginTop: 24,
                  padding: "12px 16px",
                  background: "rgba(13,190,130,0.08)",
                  border: "0.5px solid rgba(13,190,130,0.3)",
                  borderRadius: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div style={{ fontSize: 13, color: "#e8eaf0" }}>
                  <span style={{ color: "#0dbe82" }}>● </span>
                  Referral active — <strong style={{ color: "#0dbe82" }}>{card.referral.bonus}</strong>
                </div>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="font-mono"
                  style={{ fontSize: 10, color: "#9ca3af", letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none" }}
                >
                  T&C →
                </a>
              </div>
            )}

            <button
              onClick={(e) => e.stopPropagation()}
              data-testid={`row-request-${card.id}`}
              style={{
                marginTop: 24,
                background: "#0dbe82",
                color: "#08110a",
                padding: "12px 18px",
                fontFamily: "Geist Mono, monospace",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                borderRadius: 3,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Request {card.brand} card →
            </button>
          </div>

          {/* Right: compact sticky score panel — ring + caption + compact bars.
              No card preview, no weight labels, no second CTA; sized to fit one viewport. */}
          <div
            className="hair"
            style={{
              width: 220,
              flexShrink: 0,
              alignSelf: "flex-start",
              position: "sticky",
              top: 80,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              padding: 16,
              background: "var(--surface)",
              borderRadius: 3,
            }}
          >
            {/* Score ring — number centered inside; score/label caption below */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <ScoreRing
                score={card.score}
                size={88}
                label=""
                color={card.score >= 85 ? "#0dbe82" : card.score >= 70 ? "#18b4d4" : "#70a848"}
              />
              <div
                className="font-mono"
                style={{ fontSize: 11, color: "#6b7280", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 12 }}
              >
                {card.score} / 100 · Score
              </div>
            </div>

            {/* Compact dimension bars — single line, no weight labels */}
            <DimensionBars card={card} compact={true} />
          </div>
        </div>
      )}
    </div>
  );
};

const Beat2 = ({ explorRef }) => {
  const [country, setCountry] = useState("Romania");
  const [cashbackType, setCashbackType] = useState("any");
  const [custody, setCustody] = useState("any");
  const [staking, setStaking] = useState("any");
  const [network, setNetwork] = useState("any");
  const [monthlyFree, setMonthlyFree] = useState(false);
  const [applePay, setApplePay] = useState(false);
  const [signupBonus, setSignupBonus] = useState(false);
  const [zeroFx, setZeroFx] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const filtered = useMemo(() => {
    return CARDS.filter((c) => {
      if (country === "Romania" && !c.romania) return false;
      if (country === "US" && !c.region.includes("US")) return false;
      if (country === "UK" && !c.region.includes("UK") && !c.region.includes("EEA + UK")) return false;
      if (country === "EEA" && !(c.region.includes("EEA") || c.region.includes("EU"))) return false;
      if (cashbackType !== "any" && c.cashbackType !== cashbackType) return false;
      if (custody !== "any" && c.custody.toLowerCase() !== custody) return false;
      if (staking === "yes" && !c.stakingRequired) return false;
      if (staking === "no" && c.stakingRequired) return false;
      if (network !== "any" && c.network.toLowerCase() !== network) return false;
      if (monthlyFree && c.monthly !== "free") return false;
      if (applePay && !c.applePay) return false;
      if (signupBonus && !c.signupBonus) return false;
      if (zeroFx && c.fxFeePct > 0.05) return false;
      return true;
    });
  }, [country, cashbackType, custody, staking, network, monthlyFree, applePay, signupBonus, zeroFx]);

  const reset = () => {
    setCountry("Romania");
    setCashbackType("any");
    setCustody("any");
    setStaking("any");
    setNetwork("any");
    setMonthlyFree(false);
    setApplePay(false);
    setSignupBonus(false);
    setZeroFx(false);
  };

  return (
    <section
      ref={explorRef}
      id="explore"
      style={{ padding: "100px 28px 80px", background: "var(--bg)" }}
      data-testid="beat-2-intelligence"
    >
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 36 }}>
          <div>
            <div className="kicker" style={{ color: "#18b4d4" }}>
              ● The Intelligence · 17 cards
            </div>
            <h2
              style={{
                fontFamily: "Geist, sans-serif",
                fontSize: "clamp(28px, 3.6vw, 48px)",
                fontWeight: 300,
                lineHeight: 1.02,
                letterSpacing: "-0.025em",
                margin: "12px 0 0",
                color: "#e8eaf0",
              }}
            >
              Every card. Every dimension. Scored.
            </h2>
          </div>
          <div className="font-mono" style={{ fontSize: 11, color: "#6b7280", letterSpacing: "0.16em" }}>
            <span className="live-dot" style={{ display: "inline-block", marginRight: 8 }} />
            {filtered.length} / {CARDS.length} cards match
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 28, alignItems: "flex-start" }}>
          {/* Filters */}
          <aside
            className="hair"
            style={{
              position: "sticky",
              top: 80,
              background: "var(--surface)",
              borderRadius: 3,
              padding: 18,
            }}
            data-testid="filters-sidebar"
          >
            <div className="kicker" style={{ marginBottom: 14 }}>Filters</div>

            <div style={{ marginBottom: 14 }}>
              <div className="kicker" style={{ marginBottom: 6, fontSize: 10 }}>Country</div>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                data-testid="filter-country"
                style={{
                  width: "100%",
                  background: "var(--bg)",
                  color: "#e8eaf0",
                  border: "0.5px solid rgba(255,255,255,0.1)",
                  padding: "9px 10px",
                  fontFamily: "Geist Mono, monospace",
                  fontSize: 12,
                  borderRadius: 3,
                  appearance: "none",
                  outline: "none",
                  letterSpacing: "0.1em",
                }}
              >
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: 14 }}>
              <div className="kicker" style={{ marginBottom: 6, fontSize: 10 }}>Cashback type</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {["any", "btc", "stablecoin", "token"].map((v) => (
                  <Chip key={v} active={cashbackType === v} onClick={() => setCashbackType(v)} testId={`filter-cb-${v}`}>
                    {v}
                  </Chip>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <div className="kicker" style={{ marginBottom: 6, fontSize: 10 }}>Custody</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {[
                  { v: "any", l: "Any" },
                  { v: "custodial", l: "Custodial" },
                  { v: "non-custodial", l: "Non-custodial" },
                ].map((c) => (
                  <Chip key={c.v} active={custody === c.v} onClick={() => setCustody(c.v)}>
                    {c.l}
                  </Chip>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <div className="kicker" style={{ marginBottom: 6, fontSize: 10 }}>Staking required</div>
              <div style={{ display: "flex", gap: 6 }}>
                {[
                  { v: "any", l: "Any" },
                  { v: "yes", l: "Yes" },
                  { v: "no", l: "No" },
                ].map((c) => (
                  <Chip key={c.v} active={staking === c.v} onClick={() => setStaking(c.v)}>
                    {c.l}
                  </Chip>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 6 }}>
              <div className="kicker" style={{ marginBottom: 6, fontSize: 10 }}>Network</div>
              <div style={{ display: "flex", gap: 6 }}>
                {[
                  { v: "any", l: "Any" },
                  { v: "visa", l: "Visa" },
                  { v: "mastercard", l: "MC" },
                ].map((c) => (
                  <Chip key={c.v} active={network === c.v} onClick={() => setNetwork(c.v)}>
                    {c.l}
                  </Chip>
                ))}
              </div>
            </div>

            <div className="hair-t" style={{ marginTop: 14, paddingTop: 6 }}>
              <Toggle label="Monthly free only" value={monthlyFree} onChange={setMonthlyFree} testId="toggle-monthly-free" />
              <Toggle label="Apple / Google Pay" value={applePay} onChange={setApplePay} testId="toggle-apple-pay" />
              <Toggle label="Signup bonus" value={signupBonus} onChange={setSignupBonus} testId="toggle-signup" />
              <Toggle label="0% FX only" value={zeroFx} onChange={setZeroFx} testId="toggle-zero-fx" />
            </div>

            <button
              onClick={reset}
              data-testid="reset-filters"
              className="font-mono"
              style={{
                marginTop: 14,
                width: "100%",
                background: "transparent",
                color: "#9ca3af",
                border: "0.5px solid rgba(255,255,255,0.1)",
                padding: "9px",
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                borderRadius: 3,
                cursor: "pointer",
              }}
            >
              Reset filters
            </button>
          </aside>

          {/* List */}
          <div
            className="hair"
            style={{ background: "var(--surface)", borderRadius: 3, overflow: "hidden" }}
            data-testid="card-list"
          >
            {/* Header */}
            <div
              style={{
                padding: "14px 24px",
                display: "grid",
                gridTemplateColumns: "44px 256px 1fr 220px 230px 36px",
                gap: 20,
                background: "rgba(255,255,255,0.015)",
              }}
            >
              <div className="kicker" style={{ fontSize: 10 }}>Rank</div>
              <div className="kicker" style={{ fontSize: 10 }}>Card</div>
              <div className="kicker" style={{ fontSize: 10 }}>Issuer</div>
              <div className="kicker" style={{ fontSize: 10 }}>Key metrics</div>
              <div className="kicker" style={{ fontSize: 10, textAlign: "right" }}>Score</div>
              <div />
            </div>

            {filtered.length === 0 && (
              <div style={{ padding: "60px 24px", textAlign: "center" }}>
                <div className="font-mono" style={{ fontSize: 11, color: "#6b7280", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                  No cards match these filters
                </div>
              </div>
            )}

            {filtered.map((c, i) => (
              <Row
                key={c.id}
                card={c}
                rank={i + 1}
                expanded={expanded === c.id}
                onToggle={() => setExpanded(expanded === c.id ? null : c.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Beat2;
