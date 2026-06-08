import React from "react";
import MatchExchange from "../components/match-exchange-emergent/MatchExchange";
import PageHero from "../components/PageHero";

export default function FindMyExchange() {
  return (
    <>
      <div className="container-x">
        <PageHero
          eyebrow="MATCH EXCHANGE · LIVE · 2026"
          title="37 venues. One ranked for you."
          subtitle="Eight questions built from real trading data. Your ranked shortlist updates live as you answer."
        />
      </div>

      <MatchExchange />
    </>
  );
}