// CardBackFace — physical card back. Real card aesthetics.
// Magnetic stripe, number, cardholder, color stripes, network badge.
import React from 'react';

const CardBackFace = ({ card, size = 'lg' }) => {
  const dims =
    size === 'sm'
      ? { w: 140, h: 88, pad: 8, font: 7 }
      : size === 'md'
      ? { w: 240, h: 152, pad: 12, font: 9 }
      : size === 'lg'
      ? { w: 420, h: 264, pad: 22, font: 13 }
      : size === 'hero'
      ? { w: 340, h: 214, pad: 18, font: 11 }
      : { w: 520, h: 328, pad: 28, font: 15 };

  // Back bg: slightly off-white for light cards, slightly lighter dark for dark cards
  const isLight = card.face.bg === '#FFFFFF' || card.face.bg === '#F5F0E8' || card.face.bg?.startsWith('#F');
  const backBg = isLight ? '#F2F2F0' : '#16192A';
  const textPrimary = isLight ? '#1A1A1A' : '#E8EAF0';
  const textMuted = isLight ? '#888888' : '#6B7280';
  const stripeColor = isLight ? '#4A4A4A' : '#2A2A2A';
  const accent = card.face.accent || '#0dbe82';

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
      {/* Wave pattern — same as front, mirrored */}
      <svg
        aria-hidden
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        viewBox="0 0 400 252"
        preserveAspectRatio="none"
      >
        <g stroke={isLight ? '#C0C0C0' : 'rgba(255,255,255,0.055)'} strokeWidth="0.75" fill="none" opacity={isLight ? 0.6 : 1}>
          <path d="M-15 172 Q115 108 210 152 Q305 196 420 132" />
          <path d="M-15 186 Q115 122 210 166 Q305 210 420 146" />
          <path d="M-15 200 Q115 136 210 180 Q305 224 420 160" />
          <path d="M-15 158 Q115 94 210 138 Q305 182 420 118" />
          <path d="M-15 214 Q115 150 210 194 Q305 238 420 174" />
          <path d="M-15 228 Q115 164 210 208 Q305 252 420 188" />
        </g>
      </svg>

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

      {/* Color stripes — 3 thin horizontal bars bottom-left */}
      {size !== 'sm' && (
        <div style={{
          position: 'absolute',
          bottom: size === 'md' ? 28 : 44,
          left: dims.pad,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}>
          <div style={{ width: size === 'md' ? 56 : 80, height: size === 'md' ? 4 : 5, borderRadius: 1, background: accent, opacity: 0.85 }} />
          <div style={{ width: size === 'md' ? 56 : 80, height: size === 'md' ? 4 : 5, borderRadius: 1, background: '#9AB0C8', opacity: 0.75 }} />
          <div style={{ width: size === 'md' ? 56 : 80, height: size === 'md' ? 4 : 5, borderRadius: 1, background: '#B8B8B8', opacity: 0.55 }} />
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

      {/* Network badge bottom-right */}
      <div style={{
        position: 'absolute',
        bottom: size === 'md' ? 14 : 22,
        right: dims.pad,
      }}>
        {card.face.network === 'mastercard' ? (
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
