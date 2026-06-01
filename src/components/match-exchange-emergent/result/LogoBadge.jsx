import React from 'react';

export default function LogoBadge({ code, size = 32, rank = null }) {
  // 2-letter monogram chip, deliberately monochrome with a thin accent for #1.
  const border = rank === 1 ? '#0dbe82' : 'rgba(255,255,255,0.12)';
  const color = rank === 1 ? '#0dbe82' : rank === 2 ? '#18b4d4' : rank === 3 ? '#70a848' : '#e8eaf0';
  return (
    <span
      className="inline-flex items-center justify-center font-mono font-medium select-none flex-none"
      style={{
        width: size,
        height: size,
        borderRadius: 3,
        background: '#0a0f1d',
        border: `0.5px solid ${border}`,
        color,
        fontSize: Math.max(10, Math.floor(size * 0.36)),
        letterSpacing: '0.05em',
      }}
    >
      {code}
    </span>
  );
}
