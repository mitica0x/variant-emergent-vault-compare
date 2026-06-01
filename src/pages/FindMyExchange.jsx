import React from "react";
import MatchExchange from "../components/match-exchange-emergent/MatchExchange";

// Renders the Match Exchange quiz built in the emergent workspace.
// The component is fully self-contained: own TopBar, deterministic scoring
// engine, exchange dataset, and scoped styles
// (match-exchange-emergent/match-exchange.css).
export default function FindMyExchange() {
  return <MatchExchange />;
}
