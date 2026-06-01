// Deterministic scoring engine.
// Input: answers map { questionId -> optionValue }
// Output: ranked array of { ...exchange, score, reasons[] } with score 0-100

import { EXCHANGES, PILLAR_KEYS } from '../data/exchanges';
import { QUESTIONS } from '../data/questions';

function baselineScore(p) {
  // Equal-weight pillar average as the baseline.
  const vals = PILLAR_KEYS.map((k) => p[k.key]);
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}

function findOption(qid, value) {
  const q = QUESTIONS.find((x) => x.id === qid);
  if (!q) return null;
  return q.options.find((o) => o.value === value) || null;
}

export function scoreExchanges(answers) {
  return EXCHANGES.map((ex) => {
    let score = baselineScore(ex.p);
    const reasons = [];
    let hardPenalty = 0;

    // Q1 — region
    const region = findOption('region', answers.region)?.match.region;
    if (region) {
      if (ex.regions.includes(region) || ex.regions.includes('global')) {
        const bump = ex.regions.includes(region) ? 6 : 2;
        score += bump;
        if (ex.regions.includes(region) && region !== 'global') {
          reasons.push(`Operates in your region (${region.toUpperCase()})`);
        }
      } else {
        hardPenalty += 18;
      }
    }

    // Q2 — products
    const product = findOption('products', answers.products)?.match.product;
    if (product) {
      const required = product === 'mix' ? ['spot', 'perps'] : [product];
      const ok = required.every((r) => ex.products.includes(r));
      if (ok) {
        score += product === 'mix' ? 7 : 5;
        if (product !== 'spot') reasons.push(`Supports ${product === 'mix' ? 'cross-product trading' : product}`);
      } else {
        hardPenalty += 14;
      }
    }

    // Q3 — card
    const card = findOption('card', answers.card)?.match.card;
    if (card === 'yes') {
      if (ex.hasCard) { score += 6; reasons.push('Issues a crypto card'); }
      else hardPenalty += 10;
    } else if (card === 'maybe' && ex.hasCard) {
      score += 2;
    }

    // Q4 — leverage
    const lev = findOption('leverage', answers.leverage)?.match.lev;
    if (lev) {
      const map = { low: 1, mid: 2, high: 3 };
      const exLev = map[ex.leverage] || 0;
      const want = map[lev] || 0;
      if (exLev >= want) score += 3 + (lev === 'high' ? 2 : 0);
      else hardPenalty += 8;
      if (lev === 'high' && ex.leverage === 'high') reasons.push('High leverage available');
    }

    // Q5 — size
    const size = findOption('size', answers.size)?.match.size;
    if (size) {
      // Larger sizes want liquidity + custody.
      const liqWeight = { retail: 0.04, mid: 0.08, large: 0.14, inst: 0.20 }[size];
      const custodyWeight = { retail: 0.02, mid: 0.04, large: 0.08, inst: 0.14 }[size];
      score += (ex.p.liquidity - 70) * liqWeight;
      score += (ex.p.custody - 70) * custodyWeight;
      if (size === 'inst' && ex.p.liquidity > 85) reasons.push('Institutional-grade depth');
    }

    // Q6 — fees
    const fees = findOption('fees', answers.fees)?.match.fees;
    if (fees === 'low') {
      if (ex.fees === 'low') { score += 5; reasons.push('Among the lowest fee schedules'); }
      else if (ex.fees === 'high') score -= 6;
    } else if (fees === 'high') {
      if (ex.fees === 'high') score += 2;
    }

    // Q7 — top pillar (heavy weight)
    const pillar = findOption('pillar', answers.pillar)?.match.pillar;
    if (pillar && ex.p[pillar] != null) {
      const v = ex.p[pillar];
      score += (v - 70) * 0.35;
      if (v >= 90) {
        const label = PILLAR_KEYS.find((k) => k.key === pillar)?.label;
        reasons.push(`Best-in-class ${label?.toLowerCase()}`);
      }
    }

    // Q8 — regulation
    const reg = findOption('regulation', answers.regulation)?.match.reg;
    if (reg === 'high') {
      if (ex.regulation === 'high') { score += 7; reasons.push('Fully licensed in major jurisdictions'); }
      else if (ex.regulation === 'mid') score -= 4;
      else hardPenalty += 16;
    } else if (reg === 'mid') {
      if (ex.regulation === 'high') score += 4;
      else if (ex.regulation === 'mid') score += 2;
      else score -= 4;
    }

    score -= hardPenalty;
    // Soft cap to give visual spread; baseline ~70, peak ~98, hard floor 8.
    score = Math.max(8, Math.min(98, Math.round(score)));

    // Tiny deterministic tiebreaker (sub-integer) so identical scores still rank
    // by user-chosen top pillar, then trackRecord, then custody. Stored separately
    // to keep the displayed integer score clean.
    const pillarKey = findOption('pillar', answers.pillar)?.match.pillar;
    const tieBreak =
      (pillarKey ? (ex.p[pillarKey] || 0) * 0.001 : 0) +
      (ex.p.trackRecord || 0) * 0.0001 +
      (ex.p.custody || 0) * 0.00001;

    // Cap and dedupe reasons (max 4 stored, top 2 used in shortlist card)
    const dedup = Array.from(new Set(reasons)).slice(0, 4);

    return { ...ex, score, _sortKey: score + tieBreak, reasons: dedup };
  }).sort((a, b) => b._sortKey - a._sortKey);
}

export function defaultRanking() {
  // Used before any answer is submitted — show neutral baseline.
  return EXCHANGES.map((ex) => ({
    ...ex,
    score: Math.round(baselineScore(ex.p)),
    reasons: [],
  })).sort((a, b) => b.score - a.score);
}
