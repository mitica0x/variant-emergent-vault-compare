// 8 questions, one per screen. Each option carries a `match` payload
// used by the scoring engine to nudge pillars or filter venues.

export const QUESTIONS = [
  {
    id: 'region',
    number: '01',
    prompt: 'Where do you primarily trade from?',
    hint: 'Regulatory regime determines which venues are even available to you.',
    options: [
      { value: 'us',     label: 'United States',           tag: 'US — strict licensing',     match: { region: 'us' } },
      { value: 'eu',     label: 'European Union / UK',     tag: 'EU — MiCA framework',       match: { region: 'eu' } },
      { value: 'asia',   label: 'Asia (ex-Korea)',         tag: 'Mixed regimes',             match: { region: 'asia' } },
      { value: 'kr',     label: 'South Korea',             tag: 'KRW on/off-ramp',           match: { region: 'kr' } },
      { value: 'mena',   label: 'MENA / LatAm / Africa',   tag: 'Emerging-market access',    match: { region: 'mena' } },
      { value: 'global', label: 'Global / Offshore',       tag: 'Unrestricted venues',       match: { region: 'global' } },
    ],
  },
  {
    id: 'products',
    number: '02',
    prompt: 'What instruments do you actually trade?',
    hint: 'Product depth matters more than venue size.',
    options: [
      { value: 'spot',    label: 'Spot only',                       tag: 'Cash markets',              match: { product: 'spot' } },
      { value: 'perps',   label: 'Perpetual futures',               tag: 'Funding-driven exposure',   match: { product: 'perps' } },
      { value: 'options', label: 'Options',                         tag: 'Vol surfaces, dated',       match: { product: 'options' } },
      { value: 'copy',    label: 'Copy / social trading',           tag: 'Follower strategies',       match: { product: 'copy' } },
      { value: 'mix',     label: 'Multi-product mix',               tag: 'Cross-margin needed',       match: { product: 'mix' } },
    ],
  },
  {
    id: 'card',
    number: '03',
    prompt: 'Do you want a crypto debit / credit card?',
    hint: 'A material differentiator for ~6 venues.',
    options: [
      { value: 'yes',    label: 'Yes — daily spend matters',     tag: 'Card required',            match: { card: 'yes' } },
      { value: 'maybe',  label: 'Nice to have',                  tag: 'Not deciding factor',      match: { card: 'maybe' } },
      { value: 'no',     label: 'No — pure trading',             tag: 'Skip retail features',     match: { card: 'no' } },
    ],
  },
  {
    id: 'leverage',
    number: '04',
    prompt: 'How much leverage do you use?',
    hint: 'Drives execution and risk-engine quality requirements.',
    options: [
      { value: 'none',  label: 'None — cash only',          tag: '0x',                       match: { lev: 'low' } },
      { value: 'low',   label: 'Up to 3x',                  tag: '≤ 3x',                     match: { lev: 'low' } },
      { value: 'mid',   label: 'Up to 10x',                 tag: 'Mid leverage',             match: { lev: 'mid' } },
      { value: 'high',  label: '20x and above',             tag: 'High leverage required',   match: { lev: 'high' } },
    ],
  },
  {
    id: 'size',
    number: '05',
    prompt: 'Typical position / notional size?',
    hint: 'Determines slippage tolerance and depth requirements.',
    options: [
      { value: 'retail',   label: 'Under $10k',          tag: 'Retail clip',             match: { size: 'retail' } },
      { value: 'mid',      label: '$10k – $100k',        tag: 'Active retail / prop',    match: { size: 'mid' } },
      { value: 'large',    label: '$100k – $1M',         tag: 'Semi-pro',                match: { size: 'large' } },
      { value: 'inst',     label: 'Over $1M',            tag: 'Institutional',           match: { size: 'inst' } },
    ],
  },
  {
    id: 'fees',
    number: '06',
    prompt: 'How fee-sensitive are you?',
    hint: 'Maker/taker spreads scale with frequency.',
    options: [
      { value: 'very',  label: 'Extremely — every bp matters', tag: 'Fee-first',                 match: { fees: 'low' } },
      { value: 'mid',   label: 'Moderate',                     tag: 'Balance fees & quality',    match: { fees: 'mid' } },
      { value: 'low',   label: 'Not really — I want service',  tag: 'Premium service OK',        match: { fees: 'high' } },
    ],
  },
  {
    id: 'pillar',
    number: '07',
    prompt: 'What single pillar matters most?',
    hint: 'We will heavily weight your top pillar in the final score.',
    options: [
      { value: 'custody',      label: 'Custody — security of funds',     tag: 'Cold storage, insurance',      match: { pillar: 'custody' } },
      { value: 'liquidity',    label: 'Liquidity — book depth',          tag: 'Tight spreads',                match: { pillar: 'liquidity' } },
      { value: 'transparency', label: 'Transparency — PoR, on-chain',    tag: 'Proof of reserves',            match: { pillar: 'transparency' } },
      { value: 'productDepth', label: 'Product depth — pair coverage',   tag: 'Long-tail markets',            match: { pillar: 'productDepth' } },
      { value: 'execution',    label: 'Execution — latency & fills',     tag: 'Matching engine quality',      match: { pillar: 'execution' } },
      { value: 'trackRecord',  label: 'Track record — longevity',        tag: 'No incidents',                 match: { pillar: 'trackRecord' } },
    ],
  },
  {
    id: 'regulation',
    number: '08',
    prompt: 'How important is regulation to you?',
    hint: 'High = licensed only. Low = offshore acceptable for product depth.',
    options: [
      { value: 'critical', label: 'Critical — fully licensed only', tag: 'Licensed venues only',      match: { reg: 'high' } },
      { value: 'pref',     label: 'Preferred but flexible',         tag: 'Tilt toward regulated',     match: { reg: 'mid' } },
      { value: 'low',      label: 'Not a priority',                 tag: 'Offshore acceptable',       match: { reg: 'low' } },
    ],
  },
];
