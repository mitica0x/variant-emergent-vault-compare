import React from "react";
import MatchExchange from "../components/match-exchange-emergent/MatchExchange";
import PageHero from "../components/PageHero";

// Renders the Match Exchange quiz built in the emergent workspace.
// The component is fully self-contained: own TopBar, deterministic scoring
// engine, exchange dataset, and scoped styles
// (match-exchange-emergent/match-exchange.css).
export default function FindMyExchange() {
  return (
    <>
      <div className="container-x">
        <PageHero
          eyebrow="MATCH EXCHANGE · LIVE · 2026"
          title="Find your exchange."
          subtitle="Answer 8 questions. Get your ranked match across 37 venues."
        />
      </div>
      <MatchExchange />
    </>
  );
}
