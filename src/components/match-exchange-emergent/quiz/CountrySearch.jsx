import React, { useEffect, useMemo, useRef, useState } from 'react';

// Q01 country typeahead. Maps a freetext country pick to one of the six region
// codes the scoring engine already understands (us / eu / asia / kr / mena /
// global). The region codes are the SAME values as the original radio options,
// so scoring's findOption('region', value) keeps resolving — questions.js is
// left untouched on purpose.

const BUCKETS = {
  us: ['United States'],
  eu: [
    'Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Belgium', 'Austria',
    'Portugal', 'Greece', 'Romania', 'Poland', 'Czech Republic', 'Hungary',
    'Sweden', 'Denmark', 'Finland', 'Norway', 'Switzerland', 'United Kingdom',
    'Ireland', 'Luxembourg', 'Croatia', 'Bulgaria', 'Slovakia', 'Slovenia',
    'Estonia', 'Latvia', 'Lithuania', 'Malta', 'Cyprus',
  ],
  kr: ['South Korea'],
  asia: [
    'Japan', 'China', 'Singapore', 'Hong Kong', 'Taiwan', 'Thailand', 'Vietnam',
    'Malaysia', 'Indonesia', 'Philippines', 'India', 'Pakistan', 'Bangladesh',
  ],
  mena: [
    'United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Bahrain', 'Oman',
    'Egypt', 'Turkey', 'Israel', 'Nigeria', 'Kenya', 'South Africa', 'Ghana',
    'Brazil', 'Argentina', 'Mexico', 'Colombia', 'Chile',
  ],
};

// Extra countries that fall through to the 'global' bucket so the list feels
// complete rather than abruptly truncated at the named regions.
const GLOBAL_EXTRA = [
  'Canada', 'Australia', 'New Zealand', 'Ukraine', 'Russia', 'Iceland',
  'Liechtenstein', 'Monaco',
];

const FLAGS = {
  'United States': '🇺🇸', Germany: '🇩🇪', France: '🇫🇷', Italy: '🇮🇹', Spain: '🇪🇸',
  Netherlands: '🇳🇱', Belgium: '🇧🇪', Austria: '🇦🇹', Portugal: '🇵🇹', Greece: '🇬🇷',
  Romania: '🇷🇴', Poland: '🇵🇱', 'Czech Republic': '🇨🇿', Hungary: '🇭🇺', Sweden: '🇸🇪',
  Denmark: '🇩🇰', Finland: '🇫🇮', Norway: '🇳🇴', Switzerland: '🇨🇭',
  'United Kingdom': '🇬🇧', Ireland: '🇮🇪', Luxembourg: '🇱🇺', Croatia: '🇭🇷',
  Bulgaria: '🇧🇬', Slovakia: '🇸🇰', Slovenia: '🇸🇮', Estonia: '🇪🇪', Latvia: '🇱🇻',
  Lithuania: '🇱🇹', Malta: '🇲🇹', Cyprus: '🇨🇾', 'South Korea': '🇰🇷', Japan: '🇯🇵',
  China: '🇨🇳', Singapore: '🇸🇬', 'Hong Kong': '🇭🇰', Taiwan: '🇹🇼', Thailand: '🇹🇭',
  Vietnam: '🇻🇳', Malaysia: '🇲🇾', Indonesia: '🇮🇩', Philippines: '🇵🇭', India: '🇮🇳',
  Pakistan: '🇵🇰', Bangladesh: '🇧🇩', 'United Arab Emirates': '🇦🇪',
  'Saudi Arabia': '🇸🇦', Qatar: '🇶🇦', Kuwait: '🇰🇼', Bahrain: '🇧🇭', Oman: '🇴🇲',
  Egypt: '🇪🇬', Turkey: '🇹🇷', Israel: '🇮🇱', Nigeria: '🇳🇬', Kenya: '🇰🇪',
  'South Africa': '🇿🇦', Ghana: '🇬🇭', Brazil: '🇧🇷', Argentina: '🇦🇷', Mexico: '🇲🇽',
  Colombia: '🇨🇴', Chile: '🇨🇱', Canada: '🇨🇦', Australia: '🇦🇺', 'New Zealand': '🇳🇿',
  Ukraine: '🇺🇦', Russia: '🇷🇺', Iceland: '🇮🇸', Liechtenstein: '🇱🇮', Monaco: '🇲🇨',
};

const COUNTRIES = (() => {
  const list = [];
  Object.entries(BUCKETS).forEach(([region, names]) => {
    names.forEach((name) => list.push({ name, region, flag: FLAGS[name] || '🏳️' }));
  });
  GLOBAL_EXTRA.forEach((name) =>
    list.push({ name, region: 'global', flag: FLAGS[name] || '🏳️' })
  );
  return list.sort((a, b) => a.name.localeCompare(b.name));
})();

// Region → terminal tag shown under the locked input after selection.
const REGION_TAG = {
  us: 'US — Strict licensing',
  eu: 'EU — MiCA framework',
  asia: 'Asia — Mixed regimes',
  kr: 'South Korea — KRW on/off-ramp',
  mena: 'Emerging — Market access',
  global: 'Global — Unrestricted venues',
};

// Sensible display label + flag when re-entering Q01 via Back (we only persist
// the region code, not the original country pick).
const REGION_LABEL = {
  us: 'United States', eu: 'European Union', asia: 'Asia',
  kr: 'South Korea', mena: 'MENA / LatAm / Africa', global: 'Global / Offshore',
};
const REGION_FLAG = { us: '🇺🇸', eu: '🇪🇺', asia: '🌏', kr: '🇰🇷', mena: '🌍', global: '🌐' };

const GLOBAL_FALLBACK = { name: 'Global / Offshore', region: 'global', flag: '🌐' };

export default function CountrySearch({ questionId, initialValue, onAnswer }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const [selected, setSelected] = useState(
    initialValue && REGION_LABEL[initialValue]
      ? { name: REGION_LABEL[initialValue], region: initialValue, flag: REGION_FLAG[initialValue] }
      : null
  );
  const [focused, setFocused] = useState(false);

  const inputRef = useRef(null);
  const activeRef = useRef(null);

  // Autofocus on mount (only when no prior selection to revise).
  useEffect(() => {
    if (!selected && inputRef.current) inputRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const q = query.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!open) return [];
    return q ? COUNTRIES.filter((c) => c.name.toLowerCase().includes(q)) : COUNTRIES;
  }, [q, open]);

  const clamped = Math.max(0, Math.min(highlight, filtered.length - 1));

  // Keep the keyboard-highlighted row in view.
  useEffect(() => {
    if (activeRef.current) activeRef.current.scrollIntoView({ block: 'nearest' });
  }, [clamped, open]);

  const select = (country) => {
    setSelected(country);
    setOpen(false);
    // Parent's onAnswer already holds the 280ms beat before auto-advancing,
    // identical to clicking a radio option — so we fire immediately here.
    onAnswer(questionId, country.region);
  };

  const onKeyDown = (e) => {
    if (selected) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setHighlight((h) => Math.min(h + 1, Math.max(0, filtered.length - 1)));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered.length) select(filtered[clamped]);
      else select(GLOBAL_FALLBACK); // no match → Global / Offshore
    } else if (e.key === 'Escape') {
      setQuery('');
      setOpen(false);
      setHighlight(0);
    }
  };

  // ── Locked state: country chosen, region tag revealed, awaiting auto-advance.
  // Clicking it clears the pick so Q01 can be re-answered (e.g. after Back).
  if (selected) {
    return (
      <div className="mt-10 w-full" data-testid="country-search">
        <button
          type="button"
          onClick={() => {
            setSelected(null);
            setQuery('');
            setOpen(true);
            setTimeout(() => inputRef.current?.focus(), 0);
          }}
          className="relative w-full flex items-center gap-3 bg-card-mx px-4 py-3.5 text-left transition-colors hover:bg-card-elev"
          style={{ border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: 3 }}
          data-testid="country-search-locked"
          title="Change country"
        >
          <span className="font-mono text-[15px] flex-none" style={{ color: '#18b4d4' }}>›</span>
          <span className="text-[17px] flex-none leading-none">{selected.flag}</span>
          <span className="text-[15px] text-primary-mx flex-1 truncate" data-testid="country-search-selected">
            {selected.name}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-terminal flex-none" style={{ color: '#0dbe82' }}>
            ✓ Locked
          </span>
        </button>
        <div
          className="mt-3 font-mono text-[11px] text-data uppercase tracking-wider"
          data-testid="country-search-region-tag"
        >
          {REGION_TAG[selected.region]}
        </div>
      </div>
    );
  }

  // ── Search state.
  return (
    <div className="mt-10 w-full relative" data-testid="country-search">
      <div
        className="relative w-full flex items-center gap-3 bg-card-mx px-4"
        style={{
          border: `0.5px solid ${focused ? '#18b4d4' : 'rgba(255,255,255,0.12)'}`,
          borderRadius: 3,
          transition: 'border-color 200ms cubic-bezier(0.25,1,0.5,1)',
        }}
      >
        <span className="font-mono text-[15px] flex-none" style={{ color: '#18b4d4' }} aria-hidden>
          ›
        </span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setHighlight(0);
          }}
          onFocus={() => {
            setFocused(true);
            setOpen(true);
          }}
          onBlur={() => {
            setFocused(false);
            // Delay close so a row mousedown can register first.
            setTimeout(() => setOpen(false), 120);
          }}
          onKeyDown={onKeyDown}
          placeholder="Type your country…"
          aria-label="Search for your country"
          autoComplete="off"
          spellCheck={false}
          className="country-input flex-1 bg-transparent outline-none text-[15px] text-primary-mx py-3.5"
          data-testid="country-search-input"
        />
      </div>

      {open && (
        <div
          className="country-dd country-scroll absolute left-0 right-0 z-20 overflow-y-auto bg-card-mx"
          style={{
            top: 'calc(100% + 2px)',
            maxHeight: 260,
            border: '0.5px solid rgba(255,255,255,0.10)',
            borderRadius: 3,
          }}
          data-testid="country-search-dropdown"
          onMouseDown={(e) => e.preventDefault()} // keep input focus until click
        >
          {filtered.length === 0 ? (
            <button
              type="button"
              onMouseDown={() => select(GLOBAL_FALLBACK)}
              className="w-full text-left font-mono text-[12px] text-muted-mx px-4 py-3"
              data-testid="country-search-no-match"
            >
              No match — defaulting to Global / Offshore
            </button>
          ) : (
            filtered.map((c, i) => {
              const active = i === clamped;
              return (
                <button
                  key={`${c.name}-${c.region}`}
                  type="button"
                  ref={active ? activeRef : null}
                  onMouseEnter={() => setHighlight(i)}
                  onMouseDown={() => select(c)}
                  className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-[13px] text-primary-mx"
                  style={{
                    background: active ? 'rgba(24,180,212,0.08)' : 'transparent',
                    borderLeft: `2px solid ${active ? '#18b4d4' : 'transparent'}`,
                  }}
                  data-testid={`country-option-${c.name}`}
                >
                  <span className="text-[15px] leading-none flex-none">{c.flag}</span>
                  <span className="flex-1 truncate">{c.name}</span>
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
