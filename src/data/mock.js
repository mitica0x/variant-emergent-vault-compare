// Mock data + score helpers for CoinSiglieri.
// Score helpers refactored into rule-based maps to keep cyclomatic complexity low.

export const MICAR_COUNTRIES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR",
  "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL",
  "PL", "PT", "RO", "SK", "SI", "ES", "SE",
]);

export const COUNTRIES = [
  { code: "DE", name: "Germany", flag: "\uD83C\uDDE9\uD83C\uDDEA" },
  { code: "FR", name: "France", flag: "\uD83C\uDDEB\uD83C\uDDF7" },
  { code: "IT", name: "Italy", flag: "\uD83C\uDDEE\uD83C\uDDF9" },
  { code: "ES", name: "Spain", flag: "\uD83C\uDDEA\uD83C\uDDF8" },
  { code: "NL", name: "Netherlands", flag: "\uD83C\uDDF3\uD83C\uDDF1" },
  { code: "PL", name: "Poland", flag: "\uD83C\uDDF5\uD83C\uDDF1" },
  { code: "RO", name: "Romania", flag: "\uD83C\uDDF7\uD83C\uDDF4" },
  { code: "PT", name: "Portugal", flag: "\uD83C\uDDF5\uD83C\uDDF9" },
  { code: "BE", name: "Belgium", flag: "\uD83C\uDDE7\uD83C\uDDEA" },
  { code: "AT", name: "Austria", flag: "\uD83C\uDDE6\uD83C\uDDF9" },
  { code: "IE", name: "Ireland", flag: "\uD83C\uDDEE\uD83C\uDDEA" },
  { code: "SE", name: "Sweden", flag: "\uD83C\uDDF8\uD83C\uDDEA" },
  { code: "DK", name: "Denmark", flag: "\uD83C\uDDE9\uD83C\uDDF0" },
  { code: "FI", name: "Finland", flag: "\uD83C\uDDEB\uD83C\uDDEE" },
  { code: "GR", name: "Greece", flag: "\uD83C\uDDEC\uD83C\uDDF7" },
  { code: "CZ", name: "Czechia", flag: "\uD83C\uDDE8\uD83C\uDDFF" },
  { code: "HU", name: "Hungary", flag: "\uD83C\uDDED\uD83C\uDDFA" },
  { code: "GB", name: "United Kingdom", flag: "\uD83C\uDDEC\uD83C\uDDE7" },
  { code: "CH", name: "Switzerland", flag: "\uD83C\uDDE8\uD83C\uDDED" },
  { code: "NO", name: "Norway", flag: "\uD83C\uDDF3\uD83C\uDDF4" },
];

export const SCORE_PILLARS = [
  { name: "Security & Custody", weight: 30, desc: "Account protections, cold storage, certifications, incident handling" },
  { name: "Proof of Reserves", weight: 25, desc: "Asset/liability disclosure cadence, attestations, user verification" },
  { name: "Compliance & Licensing", weight: 20, desc: "Licensing, entity clarity, legal access, disclosure standards" },
  { name: "Liquidity & Execution", weight: 15, desc: "Spreads, slippage, depth, uptime under stress" },
  { name: "Track Record", weight: 10, desc: "History, response under pressure, leadership signals" },
];

const exch = (over) => ({
  scoreBreakdown: { security: 80, compliance: 75, liquidity: 80, por: 75, trackRecord: 75, productDepth: 75 },
  pros: [],
  cons: [],
  ...over,
});

export const EXCHANGES = [
  exch({
    id: "bybit", name: "Bybit", slug: "bybit", domain: "bybit.com",
    score: 94, rank: 1, bestFor: "EU traders who want depth + a card",
    micarLicensed: true, hasCryptoCard: true, hasFutures: true, hasStaking: true,
    type: ["all", "spot", "derivatives"],
    vol24h: "$18.4B", vol24hDelta: 2.4, spreadBTC: 0.012, uptime90d: 99.98,
    porCadence: "Monthly", tradingFeeLow: 0.02, tradingFeeHigh: 0.10,
    affiliateUrl: "https://partner.bybit.com/coinsiglieri",
    featured: true,
    scoreBreakdown: { security: 96, compliance: 92, liquidity: 96, por: 94, trackRecord: 92, productDepth: 95 },
    proSummary: "Bybit ranks #1 on our EU/MiCAR leaderboard with a 94. The combination of MiCAR licensing, monthly Proof of Reserves, the deepest derivatives book outside the US, and a card with up to 8% cashback makes it the most complete EU offering today.",
    pros: ["MiCAR licensed via Bybit EU (DE/NL/AT)", "Monthly PoR with self-verification", "Tightest BTC spreads in EU sample", "Card live in 27 EU countries"],
    cons: ["Not available in the US", "High leverage tools require risk literacy", "Some Earn products region-locked"],
  }),
  exch({
    id: "kraken", name: "Kraken", slug: "kraken", domain: "kraken.com",
    score: 91, rank: 2, bestFor: "Security-first long-term holders",
    micarLicensed: true, hasCryptoCard: false, hasFutures: true, hasStaking: true,
    type: ["all", "spot", "derivatives"],
    vol24h: "$1.9B", vol24hDelta: -0.6, spreadBTC: 0.022, uptime90d: 99.92,
    porCadence: "Quarterly", tradingFeeLow: 0.16, tradingFeeHigh: 0.26,
    affiliateUrl: "https://partner.kraken.com/coinsiglieri",
    scoreBreakdown: { security: 96, compliance: 94, liquidity: 84, por: 90, trackRecord: 96, productDepth: 86 },
    proSummary: "Kraken is the security and longevity play. Quarterly Proof of Reserves with Merkle-tree verification, a clean compliance track record, and one of the longest operating histories in the space.",
    pros: ["Bi-annual PoR with Merkle proofs", "15+ years operating with no major breach", "Strong staking & on-chain product depth"],
    cons: ["No native crypto card in EU", "UI/UX shows its age vs. younger venues", "Fees higher than tier-1 peers"],
  }),
  exch({
    id: "binance", name: "Binance", slug: "binance", domain: "binance.com",
    score: 88, rank: 3, bestFor: "Deepest global liquidity",
    micarLicensed: false, hasCryptoCard: true, hasFutures: true, hasStaking: true,
    type: ["all", "spot", "derivatives"],
    vol24h: "$28.6B", vol24hDelta: 1.2, spreadBTC: 0.008, uptime90d: 99.95,
    porCadence: "Monthly", tradingFeeLow: 0.08, tradingFeeHigh: 0.10,
    affiliateUrl: "https://partner.binance.com/coinsiglieri",
    scoreBreakdown: { security: 86, compliance: 70, liquidity: 100, por: 84, trackRecord: 80, productDepth: 98 },
    proSummary: "Binance still owns the deepest liquidity pool in crypto. The trade-off is regulatory exposure: settlement with US authorities and uneven EU coverage shape the compliance score.",
    pros: ["Tightest spreads on majors globally", "500+ listed assets", "Earn, copy trade, bots in one stack"],
    cons: ["Restricted/unavailable in several EU markets", "Reduced compliance posture vs. peers", "Complex UI for first-time users"],
  }),
  exch({
    id: "okx", name: "OKX", slug: "okx", domain: "okx.com",
    score: 82, rank: 4, bestFor: "Active spot + derivatives traders",
    micarLicensed: false, hasCryptoCard: false, hasFutures: true, hasStaking: true,
    type: ["all", "spot", "derivatives"],
    vol24h: "$8.2B", vol24hDelta: 3.1, spreadBTC: 0.011, uptime90d: 99.90,
    porCadence: "Monthly", tradingFeeLow: 0.08, tradingFeeHigh: 0.10,
    affiliateUrl: "https://partner.okx.com/coinsiglieri",
    scoreBreakdown: { security: 84, compliance: 72, liquidity: 90, por: 88, trackRecord: 76, productDepth: 90 },
    proSummary: "OKX has matured into a serious derivatives venue with monthly PoR, a competitive fee table, and a multi-chain Web3 wallet that bridges CEX and on-chain workflows.",
    pros: ["Monthly PoR with self-verification", "Unified margin & deep perps book", "Native Web3 wallet integration"],
    cons: ["Retail derivatives blocked in UK", "EEA fee table higher than global", "Brand still recovering trust signals"],
  }),
  exch({
    id: "coinbase", name: "Coinbase", slug: "coinbase", domain: "coinbase.com",
    score: 80, rank: 5, bestFor: "Newcomers prioritizing trust",
    micarLicensed: true, hasCryptoCard: true, hasFutures: false, hasStaking: true,
    type: ["all", "spot"],
    vol24h: "$2.4B", vol24hDelta: -1.1, spreadBTC: 0.035, uptime90d: 99.88,
    porCadence: "Quarterly", tradingFeeLow: 0.40, tradingFeeHigh: 0.60,
    affiliateUrl: "https://partner.coinbase.com/coinsiglieri",
    scoreBreakdown: { security: 92, compliance: 96, liquidity: 78, por: 76, trackRecord: 90, productDepth: 70 },
    proSummary: "Coinbase is the most regulated public exchange. MiCAR licensed, SEC-registered parent, and the cleanest compliance footprint of any major venue \u2014 at the cost of higher fees and thinner derivatives.",
    pros: ["Public NASDAQ-listed parent (COIN)", "MiCAR licensed in Ireland", "Strongest US compliance footprint"],
    cons: ["Spot fees materially above peers", "No futures for EU retail", "Spreads on majors wider than tier-1"],
  }),
  exch({
    id: "whitebit", name: "WhiteBIT", slug: "whitebit", domain: "whitebit.com",
    score: 79, rank: 6, bestFor: "EU users wanting EU-domiciled execution",
    micarLicensed: false, hasCryptoCard: true, hasFutures: true, hasStaking: true,
    type: ["all", "spot", "derivatives"],
    vol24h: "$2.1B", vol24hDelta: 0.8, spreadBTC: 0.018, uptime90d: 99.85,
    porCadence: "Quarterly", tradingFeeLow: 0.10, tradingFeeHigh: 0.20,
    affiliateUrl: "https://partner.whitebit.com/coinsiglieri",
    scoreBreakdown: { security: 88, compliance: 74, liquidity: 80, por: 76, trackRecord: 70, productDepth: 84 },
    proSummary: "WhiteBIT brings EU-native execution, a strong security posture (AAA on CER.live), and a card that actually ships. The compliance map is still maturing but the product breadth is real.",
    pros: ["AAA security rating on CER.live", "Nova Card with cashback in BTC/WBT", "9 fiat currencies + SEPA rails"],
    cons: ["PoR cadence not yet monthly", "Multi-entity licensing harder to verify", "Liquidity thinner than tier-1 peers"],
  }),
  exch({
    id: "cryptocom", name: "Crypto.com", slug: "cryptocom", domain: "crypto.com",
    score: 77, rank: 7, bestFor: "Card-first crypto spenders",
    micarLicensed: true, hasCryptoCard: true, hasFutures: true, hasStaking: true,
    type: ["all", "spot", "derivatives"],
    vol24h: "$2.8B", vol24hDelta: 1.5, spreadBTC: 0.028, uptime90d: 99.86,
    porCadence: "Quarterly", tradingFeeLow: 0.25, tradingFeeHigh: 0.40,
    affiliateUrl: "https://partner.crypto.com/coinsiglieri",
    scoreBreakdown: { security: 84, compliance: 86, liquidity: 76, por: 72, trackRecord: 74, productDepth: 88 },
    proSummary: "Crypto.com runs the most polished consumer brand in crypto. The card franchise is the moat \u2014 still the most recognizable crypto-funded card outside the US.",
    pros: ["MiCAR licensed via Malta entity", "Card live in 25+ EU countries", "Strong mobile-first product"],
    cons: ["Spot fees higher than tier-1", "PoR transparency could be deeper", "Card tiering requires CRO staking"],
  }),
  exch({
    id: "bitstamp", name: "Bitstamp", slug: "bitstamp", domain: "bitstamp.net",
    score: 75, rank: 8, bestFor: "Legacy-first European holders",
    micarLicensed: true, hasCryptoCard: false, hasFutures: false, hasStaking: true,
    type: ["all", "spot"],
    vol24h: "$420M", vol24hDelta: -0.2, spreadBTC: 0.024, uptime90d: 99.93,
    porCadence: "Quarterly", tradingFeeLow: 0.30, tradingFeeHigh: 0.40,
    affiliateUrl: "https://partner.bitstamp.net/coinsiglieri",
    scoreBreakdown: { security: 92, compliance: 90, liquidity: 64, por: 70, trackRecord: 90, productDepth: 60 },
    proSummary: "Bitstamp is the oldest operating exchange in Europe. The new Robinhood ownership brings capital and rails, with MiCAR coverage already in place across the EU.",
    pros: ["Operating since 2011 with no major breach", "MiCAR licensed via Luxembourg", "Robinhood-backed balance sheet"],
    cons: ["Thin liquidity outside top pairs", "No card, no futures for EU retail", "Fees on the higher end"],
  }),
  exch({
    id: "bitget", name: "Bitget", slug: "bitget", domain: "bitget.com",
    score: 74, rank: 9, bestFor: "Copy traders + new pair hunters",
    micarLicensed: false, hasCryptoCard: true, hasFutures: true, hasStaking: true,
    type: ["all", "spot", "derivatives"],
    vol24h: "$6.4B", vol24hDelta: 2.8, spreadBTC: 0.014, uptime90d: 99.84,
    porCadence: "Monthly", tradingFeeLow: 0.10, tradingFeeHigh: 0.10,
    affiliateUrl: "https://partner.bitget.com/coinsiglieri",
    scoreBreakdown: { security: 78, compliance: 64, liquidity: 86, por: 80, trackRecord: 70, productDepth: 86 },
    proSummary: "Bitget owns the copy-trading vertical in volume terms and has an aggressive listings pipeline. The trade-off is regulatory exposure outside its Seychelles base.",
    pros: ["Largest copy-trading book by volume", "Monthly PoR published", "Fast new-pair listings"],
    cons: ["No MiCAR license in place", "Compliance map opaque vs. EU peers", "Card limited to select regions"],
  }),
  exch({
    id: "mexc", name: "MEXC", slug: "mexc", domain: "mexc.com",
    score: 72, rank: 10, bestFor: "Long-tail token coverage",
    micarLicensed: false, hasCryptoCard: true, hasFutures: true, hasStaking: true,
    type: ["all", "spot", "derivatives"],
    vol24h: "$4.1B", vol24hDelta: 5.2, spreadBTC: 0.024, uptime90d: 99.78,
    porCadence: "None", tradingFeeLow: 0.00, tradingFeeHigh: 0.05,
    affiliateUrl: "https://partner.mexc.com/coinsiglieri",
    scoreBreakdown: { security: 74, compliance: 56, liquidity: 80, por: 50, trackRecord: 64, productDepth: 88 },
    proSummary: "MEXC leads on coin breadth and zero-fee spot promos, but the trade-off is opacity: no PoR, limited compliance footprint, and a brand built on listings velocity.",
    pros: ["0% spot maker fees on majors", "2,000+ listed pairs", "Aggressive new-pair velocity"],
    cons: ["No Proof of Reserves", "Compliance footprint thin", "KYC tiering uneven"],
  }),
  exch({
    id: "gateio", name: "Gate.io", slug: "gateio", domain: "gate.io",
    score: 70, rank: 11, bestFor: "Pre-listing token explorers",
    micarLicensed: false, hasCryptoCard: true, hasFutures: true, hasStaking: true,
    type: ["all", "spot", "derivatives"],
    vol24h: "$3.2B", vol24hDelta: 1.8, spreadBTC: 0.030, uptime90d: 99.72,
    porCadence: "Quarterly", tradingFeeLow: 0.10, tradingFeeHigh: 0.20,
    affiliateUrl: "https://partner.gate.io/coinsiglieri",
    scoreBreakdown: { security: 74, compliance: 60, liquidity: 76, por: 72, trackRecord: 70, productDepth: 80 },
    proSummary: "Gate.io covers more tokens than almost any centralized venue and runs a quarterly PoR. It is best understood as a discovery exchange, not a primary venue.",
    pros: ["Quarterly PoR published", "Wide long-tail token coverage", "Launchpad pipeline active"],
    cons: ["Compliance posture opaque", "Liquidity thin outside majors", "UX dense for new users"],
  }),
  exch({
    id: "htx", name: "HTX", slug: "htx", domain: "htx.com",
    score: 68, rank: 12, bestFor: "APAC-leaning traders",
    micarLicensed: false, hasCryptoCard: false, hasFutures: true, hasStaking: true,
    type: ["all", "spot", "derivatives"],
    vol24h: "$2.8B", vol24hDelta: -1.4, spreadBTC: 0.034, uptime90d: 99.70,
    porCadence: "Quarterly", tradingFeeLow: 0.20, tradingFeeHigh: 0.20,
    affiliateUrl: "https://partner.htx.com/coinsiglieri",
    scoreBreakdown: { security: 70, compliance: 54, liquidity: 74, por: 68, trackRecord: 60, productDepth: 80 },
    pros: ["Quarterly PoR published", "Deep APAC pair coverage", "Long operating history (since 2013)"],
    cons: ["No MiCAR or EU compliance posture", "Past incidents weigh on track record", "Liquidity uneven on EU hours"],
    proSummary: "HTX (formerly Huobi) carries weight in APAC volumes. The EU/compliance map remains the main gap.",
  }),
  exch({
    id: "kucoin", name: "KuCoin", slug: "kucoin", domain: "kucoin.com",
    score: 67, rank: 13, bestFor: "Mid-cap altcoin traders",
    micarLicensed: false, hasCryptoCard: true, hasFutures: true, hasStaking: true,
    type: ["all", "spot", "derivatives"],
    vol24h: "$1.9B", vol24hDelta: 0.9, spreadBTC: 0.028, uptime90d: 99.74,
    porCadence: "Quarterly", tradingFeeLow: 0.10, tradingFeeHigh: 0.10,
    affiliateUrl: "https://partner.kucoin.com/coinsiglieri",
    scoreBreakdown: { security: 72, compliance: 56, liquidity: 70, por: 66, trackRecord: 60, productDepth: 78 },
    pros: ["Strong mid-cap pair coverage", "Quarterly PoR published", "Launchpad + earn ecosystem"],
    cons: ["US DOJ settlement weighs on trust", "No EU MiCAR coverage", "Card limited regional"],
    proSummary: "KuCoin covers a deep altcoin book, but recent US enforcement actions still color the compliance picture.",
  }),
  exch({
    id: "bitfinex", name: "Bitfinex", slug: "bitfinex", domain: "bitfinex.com",
    score: 65, rank: 14, bestFor: "Pro/lending-focused traders",
    micarLicensed: false, hasCryptoCard: false, hasFutures: true, hasStaking: true,
    type: ["all", "spot", "derivatives"],
    vol24h: "$320M", vol24hDelta: -0.7, spreadBTC: 0.022, uptime90d: 99.80,
    porCadence: "None", tradingFeeLow: 0.10, tradingFeeHigh: 0.20,
    affiliateUrl: "https://partner.bitfinex.com/coinsiglieri",
    scoreBreakdown: { security: 72, compliance: 58, liquidity: 64, por: 50, trackRecord: 64, productDepth: 78 },
    pros: ["Pro tools and margin funding markets", "Strong API + sub-account model", "Long operating history"],
    cons: ["No PoR", "Tether ownership concentration", "Volume thinned vs. peer set"],
    proSummary: "Bitfinex remains a pro tool for funding-market traders. The lack of public PoR is the principal gap.",
  }),
  exch({
    id: "gemini", name: "Gemini", slug: "gemini", domain: "gemini.com",
    score: 64, rank: 15, bestFor: "US-regulated long holders",
    micarLicensed: false, hasCryptoCard: true, hasFutures: false, hasStaking: true,
    type: ["all", "spot"],
    vol24h: "$180M", vol24hDelta: -0.4, spreadBTC: 0.040, uptime90d: 99.84,
    porCadence: "Quarterly", tradingFeeLow: 0.40, tradingFeeHigh: 0.60,
    affiliateUrl: "https://partner.gemini.com/coinsiglieri",
    scoreBreakdown: { security: 90, compliance: 84, liquidity: 50, por: 76, trackRecord: 76, productDepth: 56 },
    pros: ["NYDFS-supervised custody", "SOC 1 & SOC 2 Type 2 reports", "Quarterly PoR published"],
    cons: ["Liquidity thin vs. global tier-1", "Fees materially above peers", "Limited EU product depth"],
    proSummary: "Gemini is a US-regulated, security-first venue. Liquidity is the principal limiter for active EU traders.",
  }),
  exch({
    id: "uniswap", name: "Uniswap", slug: "uniswap", domain: "uniswap.org",
    score: 86, rank: 16, bestFor: "On-chain ETH/L2 swaps",
    micarLicensed: false, hasCryptoCard: false, hasFutures: false, hasStaking: false,
    type: ["all", "dex"],
    vol24h: "$1.6B", vol24hDelta: 2.1, spreadBTC: 0.040, uptime90d: 100.00,
    porCadence: "None", tradingFeeLow: 0.01, tradingFeeHigh: 0.30,
    affiliateUrl: "https://app.uniswap.org/",
    scoreBreakdown: { security: 90, compliance: 50, liquidity: 90, por: 100, trackRecord: 90, productDepth: 70 },
    pros: ["Non-custodial \u2014 you keep keys", "Deepest ETH + L2 liquidity on-chain", "Permissionless listings"],
    cons: ["No fiat on/off ramp", "Gas/network fees vary", "No support desk"],
    proSummary: "Uniswap is the reference on-chain venue. Non-custodial design + deep ETH/L2 liquidity makes it a structural fit for self-custodial users.",
  }),
  exch({
    id: "jupiter", name: "Jupiter", slug: "jupiter", domain: "jup.ag",
    score: 81, rank: 17, bestFor: "Solana swaps + aggregation",
    micarLicensed: false, hasCryptoCard: false, hasFutures: true, hasStaking: false,
    type: ["all", "dex"],
    vol24h: "$2.4B", vol24hDelta: 3.4, spreadBTC: 0.050, uptime90d: 99.94,
    porCadence: "None", tradingFeeLow: 0.00, tradingFeeHigh: 0.10,
    affiliateUrl: "https://jup.ag/",
    scoreBreakdown: { security: 84, compliance: 50, liquidity: 90, por: 100, trackRecord: 70, productDepth: 84 },
    pros: ["Best routing on Solana", "Native perps venue", "Sub-second swap execution"],
    cons: ["Solana network risk", "No fiat rails", "Brand newer than tier-1 DEXs"],
    proSummary: "Jupiter is the default routing layer on Solana, with strong perps and aggregator coverage.",
  }),
  exch({
    id: "hyperliquid", name: "Hyperliquid", slug: "hyperliquid", domain: "hyperliquid.xyz",
    score: 83, rank: 18, bestFor: "On-chain perps power users",
    micarLicensed: false, hasCryptoCard: false, hasFutures: true, hasStaking: false,
    type: ["all", "dex", "derivatives"],
    vol24h: "$4.8B", vol24hDelta: 4.6, spreadBTC: 0.014, uptime90d: 99.92,
    porCadence: "None", tradingFeeLow: 0.01, tradingFeeHigh: 0.04,
    affiliateUrl: "https://app.hyperliquid.xyz/",
    scoreBreakdown: { security: 84, compliance: 50, liquidity: 92, por: 100, trackRecord: 70, productDepth: 90 },
    pros: ["CEX-like execution on-chain", "Tight perps spreads", "Non-custodial settlement"],
    cons: ["No fiat on-ramp", "L1 risk profile", "Younger track record"],
    proSummary: "Hyperliquid has emerged as the on-chain perps venue with CEX-class execution and a non-custodial settlement model.",
  }),
  exch({
    id: "dydx", name: "dYdX", slug: "dydx", domain: "dydx.exchange",
    score: 76, rank: 19, bestFor: "On-chain perps with order book",
    micarLicensed: false, hasCryptoCard: false, hasFutures: true, hasStaking: true,
    type: ["all", "dex", "derivatives"],
    vol24h: "$1.1B", vol24hDelta: 0.4, spreadBTC: 0.020, uptime90d: 99.90,
    porCadence: "None", tradingFeeLow: 0.02, tradingFeeHigh: 0.05,
    affiliateUrl: "https://dydx.exchange/",
    scoreBreakdown: { security: 80, compliance: 56, liquidity: 80, por: 100, trackRecord: 72, productDepth: 82 },
    pros: ["Order-book perps on-chain", "Non-custodial settlement", "Mature governance"],
    cons: ["US users restricted", "Liquidity below CEX tier-1", "Mobile UX still maturing"],
    proSummary: "dYdX brought the order-book model on-chain. Non-custodial settlement with governance maturity.",
  }),
  exch({
    id: "pancake", name: "PancakeSwap", slug: "pancake", domain: "pancakeswap.finance",
    score: 71, rank: 20, bestFor: "BNB Chain swaps",
    micarLicensed: false, hasCryptoCard: false, hasFutures: true, hasStaking: true,
    type: ["all", "dex"],
    vol24h: "$640M", vol24hDelta: 1.1, spreadBTC: 0.060, uptime90d: 99.86,
    porCadence: "None", tradingFeeLow: 0.01, tradingFeeHigh: 0.25,
    affiliateUrl: "https://pancakeswap.finance/",
    scoreBreakdown: { security: 76, compliance: 50, liquidity: 76, por: 100, trackRecord: 70, productDepth: 80 },
    pros: ["Largest DEX on BNB Chain", "Perps + prediction + lottery", "Active CAKE buyback model"],
    cons: ["BSC network risk", "Long-tail token risk on listings", "UX dense for newcomers"],
    proSummary: "PancakeSwap remains the dominant BNB Chain DEX with breadth across swap, perps, and prediction products.",
  }),
  exch({
    id: "curve", name: "Curve", slug: "curve", domain: "curve.fi",
    score: 78, rank: 21, bestFor: "Stablecoin + LST swaps",
    micarLicensed: false, hasCryptoCard: false, hasFutures: false, hasStaking: true,
    type: ["all", "dex"],
    vol24h: "$220M", vol24hDelta: -0.3, spreadBTC: 0.080, uptime90d: 99.92,
    porCadence: "None", tradingFeeLow: 0.04, tradingFeeHigh: 0.40,
    affiliateUrl: "https://curve.fi/",
    scoreBreakdown: { security: 84, compliance: 50, liquidity: 76, por: 100, trackRecord: 84, productDepth: 70 },
    pros: ["Best execution on stable-to-stable", "Non-custodial settlement", "Mature LST liquidity"],
    cons: ["Not built for non-stable swaps", "Lower volume vs. peer DEXs", "Complex pool model for new users"],
    proSummary: "Curve remains the reference venue for stablecoin and LST swaps with deep stable-pair liquidity.",
  }),
  exch({
    id: "gmx", name: "GMX", slug: "gmx", domain: "gmx.io",
    score: 69, rank: 22, bestFor: "On-chain perps on Arbitrum/Avax",
    micarLicensed: false, hasCryptoCard: false, hasFutures: true, hasStaking: true,
    type: ["all", "dex", "derivatives"],
    vol24h: "$340M", vol24hDelta: 0.6, spreadBTC: 0.030, uptime90d: 99.88,
    porCadence: "None", tradingFeeLow: 0.05, tradingFeeHigh: 0.10,
    affiliateUrl: "https://gmx.io/",
    scoreBreakdown: { security: 78, compliance: 50, liquidity: 72, por: 100, trackRecord: 70, productDepth: 78 },
    pros: ["Non-custodial perps on Arbitrum/Avax", "GLP/GM passive yield models", "Established v2 product"],
    cons: ["L2 / chain risk", "Funding fee swings", "Lower volume vs. Hyperliquid"],
    proSummary: "GMX pioneered the on-chain perps + LP model and remains a serious Arbitrum/Avax venue.",
  }),
];

// ---- Score helpers (refactored to rule-based maps) ----

const clamp = (v, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, v));

// Each rule returns a numeric delta to apply to base score. Pure functions.
const SCORE_MODIFIERS = [
  (e, a) => (a.country && MICAR_COUNTRIES.has(a.country) && e.micarLicensed ? 10 : 0),
  (e, a) => (a.card === "yes" && e.hasCryptoCard ? 15 : 0),
  (e, a) => (a.trades?.includes("Futures") && e.hasFutures ? 5 : 0),
  (e, a) => (a.regulation === "strict" && !e.micarLicensed ? -20 : 0),
  (e, a) => (a.invest === ">\u20AC50K" && e.score < 80 ? -6 : 0),
];

export function scoreForUser(exchange, answers) {
  const delta = SCORE_MODIFIERS.reduce(
    (sum, modifier) => sum + modifier(exchange, answers),
    0
  );
  return clamp(exchange.score + delta);
}

// Reasoning rules: each rule produces a bullet when its predicate matches.
export const REASONING_RULES = [
  {
    id: "micar-region",
    test: (e, a) => a.country && MICAR_COUNTRIES.has(a.country) && e.micarLicensed,
    text: "MiCAR-licensed in your region",
  },
  {
    id: "card-ready",
    test: (e, a) => a.card === "yes" && e.hasCryptoCard,
    text: "Ships a crypto card you can use today",
  },
  {
    id: "perps",
    test: (e, a) => a.trades?.includes("Futures") && e.hasFutures,
    text: "Full perps + futures coverage",
  },
  {
    id: "strict-regulation",
    test: (e, a) => a.regulation === "strict" && e.micarLicensed,
    text: "Matches your strict-regulation preference",
  },
  {
    id: "monthly-por",
    test: (e) => e.porCadence === "Monthly",
    text: "Monthly Proof of Reserves cadence",
  },
  {
    id: "top-decile",
    test: (e) => e.score >= 85,
    text: "Top-decile aggregate score on our 5-pillar model",
  },
];

export function getReasoning(exchange, answers, max = 4) {
  return REASONING_RULES.filter((rule) => rule.test(exchange, answers))
    .map((rule) => rule.text)
    .slice(0, max);
}

// ---- Tier color helpers (replace nested ternaries) ----

const TIERS = [
  { min: 85, color: "#0dbe82", bg: "rgba(13,190,130,0.1)", text: "text-emerald" },
  { min: 75, color: "#18b4d4", bg: "rgba(24,180,212,0.1)", text: "text-cyan" },
  { min: 65, color: "#70a848", bg: "rgba(112,168,72,0.1)", text: "text-lime" },
  { min: 0, color: "#71717a", bg: "rgba(255,255,255,0.04)", text: "text-muted" },
];

function tierFor(score) {
  return TIERS.find((tier) => score >= tier.min) ?? TIERS[TIERS.length - 1];
}

export function getTierColor(score) {
  return tierFor(score).color;
}

export function getTierBg(score) {
  return tierFor(score).bg;
}

export function scoreColor(score) {
  return tierFor(score).text;
}

export function scoreRingColor(score) {
  return tierFor(score).color;
}

// ---- Crypto cards ----
export const CARDS = [
  {
    id: "bybit-card", name: "Bybit Card", issuer: "Mastercard", domain: "bybit.com",
    region: "EEA + UK", cashback: "Up to 8%", currencies: 50, issuanceFee: "Free", monthlyFee: "\u20AC0",
    atmFee: "2% (free up to \u20AC200/mo)", applePay: true, googlePay: true, featured: true,
    affiliateUrl: "https://partner.bybit.com/card",
    proSummary: "Bybit Card is the most complete crypto-funded card in the EU today. 3M+ EU users issued, free issuance, and cashback that competes with traditional fintech cards.",
    pros: ["Up to 8% cashback in BIT/USDT", "Free issuance & no monthly fee", "27 EU country support", "Real-time auto-conversion"],
    cons: ["Cashback tiered to staking", "Limited to EEA + UK today", "ATM caps after free tier"],
  },
  {
    id: "cryptocom-visa", name: "Crypto.com Visa", issuer: "Visa", domain: "crypto.com",
    region: "EU + US + UK", cashback: "1\u20135%", currencies: 40, issuanceFee: "Free (Midnight Blue)", monthlyFee: "\u20AC0",
    atmFee: "2% (caps by tier)", applePay: true, googlePay: true,
    affiliateUrl: "https://partner.crypto.com/card",
    proSummary: "The card that built the category. Cashback tiers via CRO staking remain the moat \u2014 but the entry-tier value is now the weakest in the set.",
    pros: ["Most countries of any crypto card", "5 tiers \u2014 something for every wallet", "Mature mobile app integration"],
    cons: ["Higher tiers require large CRO lock", "Cashback cut twice since launch", "Some perks region-locked"],
  },
  {
    id: "coinbase-card", name: "Coinbase Card", issuer: "Visa", domain: "coinbase.com",
    region: "EU + US", cashback: "Up to 4%", currencies: 9, issuanceFee: "Free", monthlyFee: "\u20AC0",
    atmFee: "2.49%", applePay: true, googlePay: true,
    affiliateUrl: "https://partner.coinbase.com/card",
    proSummary: "Coinbase Card is the trust-first option. Lower cashback than peers but the cleanest compliance footprint of any major crypto card.",
    pros: ["Issued by US-public parent", "Real-time conversion at point of sale", "Cashback in chosen crypto asset"],
    cons: ["Cashback materially below peers", "Limited supported assets", "Spreads on conversions"],
  },
  {
    id: "bingx-card", name: "BingX Card", issuer: "Mastercard", domain: "bingx.com",
    region: "EEA", cashback: "Up to 5%", currencies: 28, issuanceFee: "\u20AC9.99", monthlyFee: "\u20AC0",
    atmFee: "2%", applePay: true, googlePay: true,
    affiliateUrl: "https://partner.bingx.com/card",
    proSummary: "A younger entrant with competitive cashback and clean EEA coverage. Less battle-tested than tier-1 cards but priced aggressively.",
    pros: ["Aggressive cashback for new users", "Free monthly fee", "EEA-native compliance posture"],
    cons: ["Newer brand vs. peer set", "Smaller country list", "One-time issuance fee"],
  },
  {
    id: "wirex", name: "Wirex Card", issuer: "Visa", domain: "wirexapp.com",
    region: "EU + UK", cashback: "Up to 2%", currencies: 22, issuanceFee: "Free", monthlyFee: "\u20AC1.75",
    atmFee: "2% (free up to \u20AC200)", applePay: true, googlePay: true,
    affiliateUrl: "https://partner.wirexapp.com/card",
    proSummary: "Wirex was the original crypto debit card and still ships a clean product. The cashback ceiling is now below peer set.",
    pros: ["Long operating history", "Multi-currency wallet model", "Decent ATM allowance"],
    cons: ["Cashback rate trails peers", "Monthly fee on standard tier", "Cashback in native WXT token"],
  },
  {
    id: "binance-card", name: "Binance Card", issuer: "Visa", domain: "binance.com",
    region: "Limited EEA", cashback: "Up to 8%", currencies: 14, issuanceFee: "Free", monthlyFee: "\u20AC0",
    atmFee: "Free first \u20AC200/mo", applePay: false, googlePay: true,
    affiliateUrl: "https://partner.binance.com/card",
    proSummary: "Best in-class cashback when active, but the EEA rollout has been uneven and the product is paused in several markets.",
    pros: ["Up to 8% BNB cashback", "Free first ATM band", "No monthly fee"],
    cons: ["EEA rollout paused in several markets", "Cashback requires BNB staking", "No Apple Pay in some regions"],
  },
  {
    id: "mexc-card", name: "MEXC Card", issuer: "Mastercard", domain: "mexc.com",
    region: "Selected EEA", cashback: "Up to 4%", currencies: 18, issuanceFee: "\u20AC4.99", monthlyFee: "\u20AC0",
    atmFee: "2%", applePay: true, googlePay: true,
    affiliateUrl: "https://partner.mexc.com/card",
    proSummary: "MEXC Card focuses on instant top-up from MEXC balance. Coverage is uneven and the card brand is still establishing itself.",
    pros: ["Instant balance top-up", "Apple/Google Pay support", "Competitive cashback band"],
    cons: ["Country coverage uneven", "Card brand newer in market", "Cashback may shift with promo cycles"],
  },
];

// ---- Articles ----
export const ARTICLES = [
  {
    slug: "best-micar-licensed-exchanges-eu-2026",
    category: "MiCAR",
    title: "Best MiCAR Licensed Crypto Exchanges in EU 2026",
    excerpt: "Of 60+ exchanges tracked, only seven currently hold MiCAR authorization across the EEA. Here is how the leaderboard now reads \u2014 and what that means for traders.",
    date: "May 24, 2026", readMin: 9, author: "Madalin Muraretiu", featured: true,
  },
  {
    slug: "bybit-monthly-por-q2", category: "Exchanges",
    title: "Bybit publishes 14th consecutive monthly Proof of Reserves \u2014 user-side verification still rare",
    excerpt: "Monthly cadence is the new floor. We break down what the May 2026 attestation covers \u2014 and what it still doesn't.",
    date: "May 20, 2026", readMin: 5, author: "CoinSiglieri Editorial",
  },
  {
    slug: "micar-passporting-pain", category: "Regulation",
    title: "MiCAR passporting in practice: why two licensed exchanges still can't serve the same country",
    excerpt: "The transitional regime is biting harder than the legal text suggests. We mapped the gaps across 27 member states.",
    date: "May 14, 2026", readMin: 7, author: "CoinSiglieri Editorial",
  },
  {
    slug: "crypto-cards-true-cost", category: "Crypto Cards",
    title: "The true all-in cost of crypto cards: cashback minus FX, minus spreads, minus staking",
    excerpt: "The headline cashback rate is rarely what you actually take home. A clean comparison of seven EEA crypto cards.",
    date: "May 10, 2026", readMin: 8, author: "CoinSiglieri Editorial",
  },
  {
    slug: "derivatives-eu-shift", category: "Market Signals",
    title: "EU derivatives shift: regulated venues are pulling perps volume away from offshore",
    excerpt: "The first quarter of 2026 showed a measurable shift in EU resident perps volume toward MiCAR venues.",
    date: "May 04, 2026", readMin: 6, author: "CoinSiglieri Editorial",
  },
  {
    slug: "por-cadence-floor", category: "Exchanges",
    title: "Why monthly Proof of Reserves should be the floor in 2026, not a flex",
    excerpt: "Quarterly cadence is the new bare minimum. Monthly is operationally feasible \u2014 and we explain why it matters.",
    date: "Apr 28, 2026", readMin: 6, author: "CoinSiglieri Editorial",
  },
  {
    slug: "non-eu-exchanges-eu-residents", category: "Regulation",
    title: "Non-EU exchanges and EU residents: what you can still legally use after July 2026",
    excerpt: "The transitional rules close. Here is the practical decision tree for EU residents in late 2026.",
    date: "Apr 22, 2026", readMin: 7, author: "CoinSiglieri Editorial",
  },
];

export const TEAM = [
  {
    name: "Madalin Muraretiu", role: "Co-Founder & Operator",
    bio: "Crypto trader since 2016. 15+ years in derivatives markets. Bybit Pioneer Romania. International speaker at CryptoExpoEurope, Next Block Expo Warsaw, ETH Bucharest, DISB, and Banking 4.0. Operator, not consultant.",
  },
];

export const CITED_BY = ["Bloomberg", "Forbes", "TechCrunch", "CoinDesk", "Axios", "Wired", "NBC News", "Slate", "Rolling Stone"];

export const PARTNERS = ["Bybit", "Kraken", "OKX", "Coinbase", "Crypto.com", "Bitstamp", "WhiteBIT", "Bitget"];
