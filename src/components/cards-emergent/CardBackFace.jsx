// CardBackFace — physical card back. Real card aesthetics.
// Magnetic stripe, number, cardholder, color stripes, network badge.
// Per-card brand stripes + network badge live in CARD_BACK, keyed by card.id,
// so each back matches its front (PhysicalCardFace CARD_OVERRIDES).
import React from 'react';

// 3 accent stripe colors + network badge per card.
const CARD_BACK = {
  bybit: { stripes: ['#C8A04A', '#4A90D9', '#9E9E9E'], network: 'mc' },
  kraken: { stripes: ['#E30613', '#2a0a0a', '#1A1A2E'], network: 'mc' },
  coca: { stripes: ['#222222', '#111111', '#0D0D0D'], network: 'visa' },
  okx: { stripes: ['#333333', '#222222', '#111111'], network: 'mc' },
  gnosis: { stripes: ['#00A86B', '#2ECC71', '#A8E063'], network: 'visa' },
  cryptocom: { stripes: ['#1B4FBF', '#0B1426', '#091020'], network: 'visa' },
  bitget: { stripes: ['#00C2B4', '#003D35', '#111111'], network: 'visa' },
  kucoin: { stripes: ['#1BA27A', '#111111', '#0A0A0A'], network: 'visa' },
  metamask: { stripes: ['#F6851B', '#E2761B', '#C66A00'], network: 'mc' },
  nexo: { stripes: ['#7B8EC8', '#1E2A3A', '#131C28'], network: 'mc' },
  coinbase: { stripes: ['#1652F0', '#0A3DD1', '#0830B0'], network: 'visa' },
  wirex: { stripes: ['#00B4F0', '#0080C0', '#005A8A'], network: 'visa' },
  whitebit: { stripes: ['#4A6FD4', '#0D1B4B', '#091230'], network: 'visa' },
  brighty: { stripes: ['#333333', '#1A1A1A', '#0A0A0A'], network: 'mc' },
  kast: { stripes: ['#C0A060', '#16213E', '#0F3460'], network: 'visa' },
  plutus: { stripes: ['#4B2EFF', '#3520CC', '#210FA0'], network: 'visa' },
  bitpanda: { stripes: ['#00B8A9', '#1A2B4A', '#111E33'], network: 'visa' },
};

const DEFAULT_BACK = { stripes: ['#0dbe82', '#9AB0C8', '#B8B8B8'], network: 'visa' };

const CardBackFace = ({ card, size = 'lg' }) => {
  const dims =
    size === 'sm'
      ? { w: 140, h: 88, pad: 8, font: 7 }
      : size === 'md'
      ? { w: 240, h: 152, pad: 12, font: 9 }
      : size === 'lg'
      ? { w: 420, h: 264, pad: 22, font: 13 }
      : size === 'hero'
      ? { w: 380, h: 240, pad: 18, font: 11 }
      : { w: 520, h: 328, pad: 28, font: 15 };

  const back = CARD_BACK[card.id] || DEFAULT_BACK;
  const stripes = back.stripes;

  // Back bg: slightly off-white for light cards, slightly lighter dark for dark cards
  const isLight = card.face.bg === '#FFFFFF' || card.face.bg === '#F5F0E8' || card.face.bg?.startsWith('#F');
  const backBg = isLight ? '#F2F2F0' : '#16192A';
  const textPrimary = isLight ? '#1A1A1A' : '#E8EAF0';
  const textMuted = isLight ? '#888888' : '#6B7280';
  const stripeColor = isLight ? '#4A4A4A' : '#2A2A2A';

  return (
    <div
      style={{
        width: dims.w,
        height: dims.h,
        background: backBg,
        borderRadius: 14,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 30px 60px -25px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 0.5px rgba(255,255,255,0.06)',
      }}
      data-testid={`card-back-${card.id}`}
    >
      {/* Support email top — only lg */}
      {size === 'lg' && (
        <div style={{
          position: 'absolute', top: 10, left: dims.pad, right: dims.pad,
          display: 'flex', justifyContent: 'space-between',
          fontFamily: 'Geist Mono, monospace', fontSize: 7,
          color: textMuted, letterSpacing: '0.3px', textTransform: 'uppercase',
        }}>
          <span>FOR HELP: SUPPORT@{card.brand.toUpperCase().replace(/\s/g,'')}.COM</span>
          <span>{card.brand.toUpperCase().replace(/\s/g,'')}.COM</span>
        </div>
      )}

      {/* Magnetic stripe */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: size === 'sm' ? 14 : size === 'md' ? 22 : 32,
          left: 0, right: 0,
          height: size === 'sm' ? 12 : size === 'md' ? 28 : 44,
          background: stripeColor,
        }}
      />

      {/* Card number */}
      {size !== 'sm' && (
        <div style={{
          position: 'absolute',
          top: size === 'md' ? 72 : 100,
          left: dims.pad,
          fontFamily: 'Geist Mono, monospace',
          fontSize: size === 'md' ? 11 : dims.font,
          fontWeight: 600,
          color: textPrimary,
          letterSpacing: '1.8px',
        }}>
          4242  ••••  ••••  0421
        </div>
      )}

      {/* Valid thru */}
      {size === 'lg' && (
        <div style={{
          position: 'absolute', top: 120, left: dims.pad,
          fontFamily: 'Geist Mono, monospace', fontSize: 8,
          color: textMuted, letterSpacing: '0.5px', textTransform: 'uppercase',
        }}>
          VALID THRU  ••/••
        </div>
      )}

      {/* Cardholder name */}
      {size !== 'sm' && (
        <div style={{
          position: 'absolute',
          top: size === 'md' ? 92 : 148,
          left: dims.pad,
          fontFamily: 'Geist, sans-serif',
          fontSize: size === 'md' ? 10 : 13,
          fontWeight: 700,
          letterSpacing: '1.5px',
          color: textPrimary,
          textTransform: 'uppercase',
        }}>
          CARDHOLDER NAME
        </div>
      )}

      {/* Color stripes — 3 thin horizontal bars bottom-left, per-card brand colors */}
      {size !== 'sm' && (
        <div style={{
          position: 'absolute',
          bottom: size === 'md' ? 28 : 44,
          left: dims.pad,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}>
          <div style={{ width: size === 'md' ? 56 : 80, height: size === 'md' ? 4 : 5, borderRadius: 1, background: stripes[0], opacity: 0.85 }} />
          <div style={{ width: size === 'md' ? 56 : 80, height: size === 'md' ? 4 : 5, borderRadius: 1, background: stripes[1], opacity: 0.75 }} />
          <div style={{ width: size === 'md' ? 56 : 80, height: size === 'md' ? 4 : 5, borderRadius: 1, background: stripes[2], opacity: 0.55 }} />
        </div>
      )}

      {/* Powered by Reap */}
      {size === 'lg' && (
        <div style={{
          position: 'absolute', bottom: 14, left: dims.pad,
          fontFamily: 'Geist Mono, monospace', fontSize: 8,
          color: textMuted, letterSpacing: '0.3px',
        }}>
          Powered by Reap
        </div>
      )}

      {/* NFC icon */}
      {size !== 'sm' && (
        <svg
          aria-hidden
          style={{ position: 'absolute', bottom: size === 'md' ? 24 : 38, right: size === 'md' ? 60 : 90 }}
          width={size === 'md' ? 16 : 22}
          height={size === 'md' ? 16 : 22}
          viewBox="0 0 22 22"
          fill="none"
        >
          <path d="M2 20 Q8 10 8 1" stroke={textMuted} strokeWidth="1.3" strokeLinecap="round" />
          <path d="M7 20 Q15 10 15 1" stroke={textMuted} strokeWidth="1.3" strokeLinecap="round" />
          <path d="M12 20 Q22 10 22 1" stroke={textMuted} strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      )}

      {/* Network badge bottom-right — per-card (matches the front) */}
      <div style={{
        position: 'absolute',
        bottom: size === 'md' ? 14 : 22,
        right: dims.pad,
      }}>
        {back.network === 'mc' ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: size === 'md' ? 22 : 32,
              height: size === 'md' ? 22 : 32,
              borderRadius: '50%',
              background: '#EB001B',
              opacity: 0.95,
            }} />
            <div style={{
              width: size === 'md' ? 22 : 32,
              height: size === 'md' ? 22 : 32,
              borderRadius: '50%',
              background: '#F79E1B',
              opacity: 0.95,
              marginLeft: size === 'md' ? -9 : -13,
            }} />
          </div>
        ) : (
          <div style={{
            fontFamily: 'Arial Black, sans-serif',
            fontSize: size === 'md' ? 14 : 20,
            fontWeight: 900,
            color: isLight ? '#1A1A8C' : '#FFFFFF',
            letterSpacing: '-0.5px',
          }}>
            VISA
          </div>
        )}
      </div>
    </div>
  );
};

export default CardBackFace;
