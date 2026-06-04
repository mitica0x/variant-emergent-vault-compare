// FlipCard — the centerpiece interaction.
// CSS-built physical card. Cursor parallax. Click to flip. Holographic shimmer.
// Used at hero, featured, result reveal.
import React, { useRef, useState, useEffect, useCallback } from "react";
import PhysicalCardFace from "./PhysicalCardFace";
import CardBackFace from "./CardBackFace";

const SIZES = {
  sm: { w: 140, h: 88 },
  md: { w: 240, h: 152 },
  lg: { w: 420, h: 264 },
  xl: { w: 520, h: 328 },
};

const FlipCard = ({ card, size = "lg", interactive = true, idle = true, autoFlipOnReveal = false, dramatic = false }) => {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const tilt = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const angle = useRef(0);
  const rafRef = useRef(null);

  const dims = SIZES[size] || SIZES.lg;

  // Animation loop — smooth tilt + idle float + holographic angle
  useEffect(() => {
    let last = performance.now();
    const loop = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      // ease tilt toward target
      tilt.current.x += (target.current.x - tilt.current.x) * 0.12;
      tilt.current.y += (target.current.y - tilt.current.y) * 0.12;
      angle.current = (angle.current + dt * 30) % 360;

      if (innerRef.current) {
        // Dramatic mode anchors to a steep 3/4 angle with small hover deltas;
        // flat mode keeps the original wide cursor parallax. Idle float and the
        // 180° flip are layered on top of whichever base is active, and mouse
        // leave eases tilt back to {0,0} → returning to the dramatic base.
        const baseRX = dramatic ? 22 : 0;
        const baseRY = dramatic ? -38 : 0;
        const baseRZ = dramatic ? -8 : 0;
        const tiltRangeY = dramatic ? 6 : 18;
        const tiltRangeX = dramatic ? 4 : 12;
        const ry = baseRY + tilt.current.x * tiltRangeY + (flipped ? 180 : 0);
        const rx = baseRX + -tilt.current.y * tiltRangeX;
        // gentle idle float
        const t = now * 0.001;
        const floatY = idle && !hovered ? Math.sin(t * 0.8) * 4 : 0;
        const floatRX = idle && !hovered ? Math.sin(t * 0.6) * 1.2 : 0;
        const floatRY = idle && !hovered ? Math.cos(t * 0.7) * 1.5 : 0;
        innerRef.current.style.transform = `translateY(${floatY}px) rotateX(${rx + floatRX}deg) rotateY(${ry + floatRY}deg) rotateZ(${baseRZ}deg)`;
        // holographic vars
        const cx = (tilt.current.x + 1) * 50; // -1..1 -> 0..100
        const cy = (tilt.current.y + 1) * 50;
        innerRef.current.style.setProperty("--x", `${cx}%`);
        innerRef.current.style.setProperty("--y", `${cy}%`);
        innerRef.current.style.setProperty("--angle", `${angle.current}deg`);
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [flipped, hovered, idle, dramatic]);

  // Auto-flip on first mount when used at reveal
  useEffect(() => {
    if (autoFlipOnReveal) {
      const t = setTimeout(() => setFlipped(true), 900);
      return () => clearTimeout(t);
    }
  }, [autoFlipOnReveal]);

  const handleMove = useCallback(
    (e) => {
      if (!interactive || !wrapRef.current) return;
      const r = wrapRef.current.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 2 - 1; // -1..1
      const y = ((e.clientY - r.top) / r.height) * 2 - 1;
      target.current = { x, y };
    },
    [interactive]
  );

  const handleLeave = useCallback(() => {
    if (!interactive) return;
    target.current = { x: 0, y: 0 };
    setHovered(false);
  }, [interactive]);

  const handleEnter = useCallback(() => {
    if (!interactive) return;
    setHovered(true);
  }, [interactive]);

  const handleClick = useCallback(() => {
    if (!interactive) return;
    setFlipped((f) => !f);
  }, [interactive]);

  return (
    <div
      ref={wrapRef}
      className="card3d-wrap"
      style={{
        width: dims.w,
        height: dims.h,
        cursor: interactive ? "pointer" : "default",
        userSelect: "none",
      }}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      data-testid={`flip-card-${card.id}`}
      role="button"
      aria-label={`${card.brand} card — click to flip`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div
        ref={innerRef}
        className="card3d-inner"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="face" style={{ width: dims.w, height: dims.h }}>
          <PhysicalCardFace card={card} size={size} />
        </div>
        <div className="face back" style={{ width: dims.w, height: dims.h }}>
          <CardBackFace card={card} size={size} />
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
