// Match Card scoring engine — re-ranks cards by user quiz answers
import { CARDS } from "./cards";

export const DEALBREAKER_KEYS = [
  { id: "applePay", label: "Apple Pay" },
  { id: "physical", label: "Physical card" },
  { id: "noStaking", label: "No staking" },
  { id: "nonCustodial", label: "Non-custodial" },
  { id: "iban", label: "IBAN" },
  { id: "zeroFx", label: "0% FX" },
  { id: "noMonthly", label: "No monthly fee" },
  { id: "metal", label: "Metal card" },
];

export const SPEND_TYPES = [
  { id: "debit", label: "Debit / Prepaid", desc: "Top up first" },
  { id: "credit", label: "Credit / Secured", desc: "Borrow against crypto" },
  { id: "either", label: "Either" },
];

export const CASHBACK_PRIORITIES = [
  { id: "max", label: "Max possible, accept staking" },
  { id: "noStake", label: "Good rate, no lock-up" },
  { id: "zeroFee", label: "Zero fees over cashback" },
  { id: "stablecoin", label: "Stablecoin only (USDC/USDG)" },
];

export const ECOSYSTEMS = [
  { id: "eth", label: "Ethereum / EVM" },
  { id: "sol", label: "Solana" },
  { id: "btc", label: "Bitcoin" },
  { id: "any", label: "Don't care" },
];

// Compute a personalized score given quiz answers
export function rankCards(answers) {
  const { country = "Romania", dealbreakers = [], spend = "either", cashbackPriority = "noStake", ecosystem = "any" } = answers || {};

  const scored = CARDS.map((c) => {
    let s = c.score;
    let reasons = [];

    // Country gating
    if (country === "Romania" && !c.romania) s -= 40;
    if (country === "US" && !c.region.includes("US")) s -= 35;
    if (country === "UK" && !c.region.includes("UK") && !c.region.includes("EEA + UK")) s -= 25;
    if (country === "EEA" && !(c.region.includes("EEA") || c.region.includes("EU"))) s -= 20;

    // Dealbreakers — penalize cards that fail AND boost cards that satisfy
    if (dealbreakers.includes("applePay") && !c.applePay) s -= 25;
    else if (dealbreakers.includes("applePay") && c.applePay) { s += 3; reasons.push("Apple Pay native"); }
    if (dealbreakers.includes("noStaking") && c.stakingRequired) s -= 22;
    else if (dealbreakers.includes("noStaking") && !c.stakingRequired) { s += 5; reasons.push("No staking required"); }
    if (dealbreakers.includes("nonCustodial") && c.custody !== "Non-custodial") s -= 30;
    else if (dealbreakers.includes("nonCustodial") && c.custody === "Non-custodial") { s += 10; reasons.push("Non-custodial"); }
    if (dealbreakers.includes("zeroFx") && c.fxFeePct > 0.05) s -= 18;
    else if (dealbreakers.includes("zeroFx") && c.fxFeePct <= 0.05) { s += 5; reasons.push("0% FX"); }
    if (dealbreakers.includes("noMonthly") && c.monthly !== "free") s -= 14;
    else if (dealbreakers.includes("noMonthly") && c.monthly === "free") { s += 2; }
    if (dealbreakers.includes("iban") && !c.integrations.includes("IBAN")) s -= 12;
    else if (dealbreakers.includes("iban") && c.integrations.includes("IBAN")) { s += 5; reasons.push("IBAN included"); }
    if (dealbreakers.includes("metal") && !c.badges.includes("METAL TIER")) s -= 10;
    else if (dealbreakers.includes("metal") && c.badges.includes("METAL TIER")) { s += 6; reasons.push("Metal tier optional"); }
    if (dealbreakers.includes("physical")) s += 1; // most cards have physical

    // Spend mode
    if (spend === "credit" && c.integrations.includes("Credit Mode")) { s += 14; reasons.push("Credit mode"); }
    if (spend === "credit" && !c.integrations.includes("Credit Mode")) s -= 6;
    if (spend === "debit" && !c.integrations.includes("Credit Mode")) s += 2;

    // Cashback priority
    if (cashbackPriority === "max") {
      const max = parseFloat(c.cashbackHeadline) || 0;
      s += Math.min(15, max);
      if (max >= 8) reasons.push(`Up to ${c.cashbackHeadline} cashback`);
    }
    if (cashbackPriority === "noStake" && !c.stakingRequired) { s += 10; reasons.push("No staking required"); }
    if (cashbackPriority === "noStake" && c.stakingRequired) s -= 12;
    if (cashbackPriority === "zeroFee" && c.fxFeePct <= 0.1 && c.monthly === "free") { s += 12; reasons.push("Lowest fees on the list"); }
    if (cashbackPriority === "stablecoin" && c.cashbackType === "stablecoin") { s += 16; reasons.push("Stablecoin native cashback"); }
    if (cashbackPriority === "stablecoin" && c.cashbackType !== "stablecoin") s -= 8;

    // Ecosystem
    if (ecosystem === "eth" && (c.id === "metamask" || c.id === "gnosis")) { s += 8; reasons.push("Native EVM ecosystem"); }
    if (ecosystem === "btc" && c.cashbackType === "btc") { s += 6; reasons.push(`BTC-denominated cashback`); }

    // Build match reasons from card defaults if we don't have many
    while (reasons.length < 3) {
      const next = c.matchReasons[reasons.length];
      if (!next) break;
      reasons.push(next);
    }
    reasons = Array.from(new Set(reasons)).slice(0, 3);

    return { ...c, matchScore: Math.max(0, Math.min(100, Math.round(s))), matchReasonsLive: reasons };
  });

  scored.sort((a, b) => b.matchScore - a.matchScore);
  return scored;
}
