import React from 'react';
import { PILLAR_KEYS } from '../data/exchanges';

// 7-bar mini fingerprint. Single accent color (cyan/emerald per row context).
export default function Fingerprint({ p, height = 22, accent = '#18b4d4', muted = 'rgba(255,255,255,0.08)' }) {
  return (
    <div className="flex items-end gap-[3px]" style={{ height }}>
      {PILLAR_KEYS.map((k) => {
        const v = p[k.key] || 0;
        const h = Math.max(2, Math.round((v / 100) * height));
        return (
          <div key={k.key} className="relative" style={{ width: 4, height }}>
            <div className="absolute bottom-0 left-0 w-full" style={{ height, background: muted }} />
            <div
              className="absolute bottom-0 left-0 w-full fp-grow origin-bottom"
              style={{ height: h, background: accent, transformOrigin: 'bottom' }}
              title={`${k.label}: ${v}`}
            />
          </div>
        );
      })}
    </div>
  );
}
