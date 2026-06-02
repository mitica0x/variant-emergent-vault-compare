// 24 mock news items. Timestamps are computed relative to load time so the
// feed always "spans the last ~6 hours". Sorted most-recent first.
const RAW = [
  // ---- BREAKING (2-3 items, most recent) ----
  {
    id: "n01",
    category: "BREAKING",
    source: "Reuters",
    minsAgo: 4,
    headline: "Mid-size exchange halts withdrawals, citing emergency infrastructure upgrade",
    summary:
      "The venue paused all fiat and crypto withdrawals for an unscheduled maintenance window, telling users funds are safe while engineers migrate hot-wallet infrastructure.",
  },
  {
    id: "n02",
    category: "BREAKING",
    source: "Bloomberg",
    minsAgo: 9,
    headline: "SEC files emergency action against offshore derivatives platform",
    summary:
      "Regulators are seeking an asset freeze, alleging the platform offered unregistered leveraged products to U.S. retail traders without disclosures.",
  },
  {
    id: "n03",
    category: "BREAKING",
    source: "The Block",
    minsAgo: 14,
    headline: "Bitcoin flash-dips 6% in minutes as leveraged longs liquidate",
    summary:
      "A cascade of liquidations wiped out more than $300M in positions before buyers stepped in to defend the prior trading range.",
  },

  // ---- EXCHANGES (~40%) ----
  {
    id: "n04",
    category: "EXCHANGES",
    source: "Bybit",
    minsAgo: 18,
    headline: "Bybit rolls out institutional custody suite for EU clients under MiCAR license",
    summary:
      "The offering bundles segregated cold storage, insurance and on-chain proof-of-reserves aimed at funds and treasuries across the bloc.",
  },
  {
    id: "n05",
    category: "MARKET",
    source: "Bloomberg",
    minsAgo: 31,
    headline: "Bitcoin reclaims key level as spot ETF inflows hit a weekly record",
    summary:
      "Net inflows topped previous highs as institutional desks rotated back into BTC exposure ahead of the next macro print.",
  },
  {
    id: "n06",
    category: "EXCHANGES",
    source: "Binance",
    minsAgo: 42,
    headline: "Binance lists new layer-1 perpetuals with up to 75x leverage",
    summary:
      "The contract goes live with USDT margin and a phased position-limit schedule to manage early volatility for retail traders.",
  },
  {
    id: "n07",
    category: "REGULATION",
    source: "Reuters",
    minsAgo: 56,
    headline: "EU finalizes MiCAR stablecoin reserve-reporting standards for 2026",
    summary:
      "Issuers must publish monthly attestations and hold a defined share of reserves with EU-supervised credit institutions.",
  },
  {
    id: "n08",
    category: "EXCHANGES",
    source: "Kraken",
    minsAgo: 67,
    headline: "Kraken expands EU derivatives desk after Dublin licensing approval",
    summary:
      "The desk adds regulated perpetual futures for qualifying clients, with localized onboarding and reporting under MiCAR.",
  },
  {
    id: "n09",
    category: "DEFI",
    source: "DeFiLlama",
    minsAgo: 73,
    headline: "Hyperliquid TVL tops $4.2B after fee-share upgrade",
    summary:
      "A revised revenue model that routes trading fees back to stakers drove fresh deposits and a jump in open interest.",
  },
  {
    id: "n10",
    category: "MARKET",
    source: "Cointelegraph",
    minsAgo: 83,
    headline: "Ether volatility jumps ahead of the next network upgrade activation",
    summary:
      "Options desks repriced short-dated ETH skew as traders positioned around the upcoming hard fork timeline.",
  },
  {
    id: "n11",
    category: "EXCHANGES",
    source: "OKX",
    minsAgo: 95,
    headline: "OKX integrates Lightning Network for instant Bitcoin deposits",
    summary:
      "Users can now move BTC on and off the platform in seconds with sub-cent fees, starting in select regions.",
  },
  {
    id: "n12",
    category: "REGULATION",
    source: "Bloomberg",
    minsAgo: 110,
    headline: "SEC drops appeal in landmark crypto custody dispute",
    summary:
      "The decision narrows a long-running fight over how qualified custodians must hold digital assets for advisers.",
  },
  {
    id: "n13",
    category: "EXCHANGES",
    source: "Coinbase",
    minsAgo: 121,
    headline: "Coinbase adds native layer-2 bridging across Prime and retail",
    summary:
      "The update lets institutional and retail users move assets to a leading rollup directly inside the app, cutting reliance on third-party bridges.",
  },
  {
    id: "n14",
    category: "DEFI",
    source: "The Defiant",
    minsAgo: 135,
    headline: "Aave deploys V4 with unified cross-chain liquidity layer",
    summary:
      "The release introduces a shared liquidity hub and a redesigned risk module intended to reduce fragmentation across markets.",
  },
  {
    id: "n15",
    category: "EXCHANGES",
    source: "The Block",
    minsAgo: 144,
    headline: "Bybit and a major L1 foundation announce $20M liquidity incentive program",
    summary:
      "The joint program targets deeper order books and maker rebates for ecosystem tokens over a six-month rollout.",
  },
  {
    id: "n16",
    category: "MARKET",
    source: "CoinDesk",
    minsAgo: 158,
    headline: "Total crypto market cap adds $140B as macro fears ease",
    summary:
      "Softer rate expectations and a weaker dollar pushed risk assets higher, with large caps leading the rebound.",
  },
  {
    id: "n17",
    category: "EXCHANGES",
    source: "Cointelegraph",
    minsAgo: 176,
    headline: "Binance cuts spot maker fees for VIP tiers in volume push",
    summary:
      "The temporary schedule sharpens competition with rivals chasing high-frequency and institutional flow.",
  },
  {
    id: "n18",
    category: "REGULATION",
    source: "The Block",
    minsAgo: 188,
    headline: "FCA greenlights first tokenized money-market fund in the UK",
    summary:
      "The approval lets eligible investors subscribe and redeem fund units on-chain under a defined regulatory perimeter.",
  },
  {
    id: "n19",
    category: "EXCHANGES",
    source: "Decrypt",
    minsAgo: 205,
    headline: "OKX Web3 wallet crosses 60M users, ships account abstraction",
    summary:
      "Smart-account features add gas sponsorship and session keys aimed at smoothing onboarding for new users.",
  },
  {
    id: "n20",
    category: "DEFI",
    source: "DeFiLlama",
    minsAgo: 215,
    headline: "Lido stETH yield climbs as staking demand rebounds",
    summary:
      "Rising network activity lifted validator rewards, nudging the benchmark liquid-staking yield higher week over week.",
  },
  {
    id: "n21",
    category: "EXCHANGES",
    source: "Kraken",
    minsAgo: 233,
    headline: "Kraken Pro adds trailing-stop and bracket orders for futures",
    summary:
      "The new order types give active traders tighter risk controls without leaving the advanced trading interface.",
  },
  {
    id: "n22",
    category: "MARKET",
    source: "Decrypt",
    minsAgo: 240,
    headline: "BNB outperforms majors as token-burn schedule accelerates",
    summary:
      "A faster quarterly burn paired with steady on-chain activity supported relative strength against BTC and ETH.",
  },
  {
    id: "n23",
    category: "EXCHANGES",
    source: "CoinDesk",
    minsAgo: 268,
    headline: "Coinbase International lists three new perpetual markets",
    summary:
      "The additions broaden non-US derivatives access, each launching with conservative initial leverage caps.",
  },
  {
    id: "n24",
    category: "REGULATION",
    source: "CoinDesk",
    minsAgo: 305,
    headline: "EU Parliament opens debate on DeFi liability framework under MiCAR",
    summary:
      "Lawmakers are weighing how responsibility should be assigned across front-ends, developers and protocol governance.",
  },
];

export const NEWS = RAW.map((n) => ({
  ...n,
  timestamp: new Date(Date.now() - n.minsAgo * 60000),
})).sort((a, b) => b.timestamp - a.timestamp);
