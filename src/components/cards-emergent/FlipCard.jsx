// FlipCard — the centerpiece interaction.
// CSS-built physical card. Rests at a dramatic 3/4 angle with a gentle breathing
// float. Drag to rotate freely (full 360°, front ↔ back) — on release the card
// stays exactly where you left it. A tap (no drag) flips it 180° around its
// current tilt. All motion runs in one requestAnimationFrame loop; the transform
// is written straight to the DOM node (no React state, no re-renders, no library).
import React, { useRef, useEffect } from "react";
import PhysicalCardFace from "./PhysicalCardFace";
import CardBackFace from "./CardBackFace";

const SIZES = {
  sm: { w: 140, h: 88 },
  md: { w: 240, h: 152 },
  lg: { w: 420, h: 264 },
  hero: { w: 340, h: 214 },
  xl: { w: 520, h: 328 },
};

const SENSITIVITY = 0.4; // degrees of rotation per pixel dragged
const DRAG_LERP = 0.15; // smoothing toward the drag target
const CLICK_THRESHOLD = 5; // px of travel below which a press counts as a click
const FLIP_MS = 400; // flip duration
const TWO_PI = Math.PI * 2;

const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

const FlipCard = ({ card, size = "lg", interactive = true, idle = true, dramatic = false }) => {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);

  // All motion lives in refs so the rAF loop never triggers a React render.
  const base = useRef({ x: 0, y: 0, z: 0 }); // anchor the float oscillates around
  const current = useRef({ x: 0, y: 0, z: 0 }); // actual rendered rotation
  const ty = useRef(0); // rendered translateY (px)
  const floatPhase = useRef(0); // time accumulator for the idle breathing
  const initialized = useRef(false);

  const isDragging = useRef(false);
  const isFlipped = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 }); // pointer position at press
  const dragBase = useRef({ x: 0, y: 0 }); // base rotation at press
  const dragTarget = useRef({ x: 0, y: 0 }); // rotation the base lerps toward
  const dragTotalDist = useRef(0);

  const flip = useRef({ active: false, t: 0, from: 0, to: 0 }); // flipProgress = flip.t
  const hover = useRef({ active: false, start: 0 }); // hoverPulsePhase via timestamp

  const holoAngle = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return undefined;

    // Dramatic resting base — set once so prop-driven effect re-runs don't yank
    // the card back out of wherever the user has dragged it.
    if (!initialized.current) {
      base.current = {
        x: dramatic ? 22 : 0,
        y: dramatic ? -38 : 0,
        z: dramatic ? -8 : 0,
      };
      current.current = { ...base.current };
      initialized.current = true;
    }

    const pointFromEvent = (e) => {
      const t = e.touches && e.touches[0];
      return t ? { x: t.clientX, y: t.clientY } : { x: e.clientX, y: e.clientY };
    };

    // ── Drag move (mouse + touch). Adds to the rotation at press, no clamp. ──
    const onMove = (e) => {
      if (!isDragging.current) return;
      if (e.type === "touchmove" && e.cancelable) e.preventDefault(); // no page scroll
      const p = pointFromEvent(e);
      const dx = p.x - dragStart.current.x;
      const dy = p.y - dragStart.current.y;
      const dist = Math.hypot(dx, dy);
      if (dist > dragTotalDist.current) dragTotalDist.current = dist;
      dragTarget.current.y = dragBase.current.y + dx * SENSITIVITY; // deltaX → rotateY
      dragTarget.current.x = dragBase.current.x - dy * SENSITIVITY; // deltaY → rotateX
    };

    // ── Release: the card STAYS where it is. A near-stationary press = a click. ──
    const endDrag = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      wrap.style.cursor = interactive ? "grab" : "default";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", endDrag);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", endDrag);

      if (dragTotalDist.current < CLICK_THRESHOLD) {
        // Tap → flip 180° around the current tilt (rotateX/rotateZ preserved).
        isFlipped.current = !isFlipped.current;
        flip.current = { active: true, t: 0, from: base.current.y, to: base.current.y + 180 };
      }
      // else: real drag — base already sits at the released rotation, nothing to do.
    };

    // ── Press: begin a potential drag from the current base rotation. ──
    const onDown = (e) => {
      if (!interactive) return;
      isDragging.current = true;
      flip.current.active = false; // cancel any in-flight flip
      hover.current.active = false;
      dragTotalDist.current = 0;
      const p = pointFromEvent(e);
      dragStart.current = { x: p.x, y: p.y };
      dragBase.current = { x: base.current.x, y: base.current.y };
      dragTarget.current = { x: base.current.x, y: base.current.y };
      wrap.style.cursor = "grabbing";
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", endDrag);
      window.addEventListener("touchmove", onMove, { passive: false });
      window.addEventListener("touchend", endDrag);
    };

    // ── Hover enter: one-shot tilt toward the user, then ease back. ──
    const onEnter = () => {
      if (!interactive || isDragging.current) return;
      hover.current = { active: true, start: performance.now() };
    };

    wrap.addEventListener("mousedown", onDown);
    wrap.addEventListener("touchstart", onDown, { passive: true });
    wrap.addEventListener("mouseenter", onEnter);
    wrap.style.cursor = interactive ? "grab" : "default";

    let last = performance.now();
    const loop = (now) => {
      const dt = Math.min((now - last) / 1000, 0.032);
      last = now;
      floatPhase.current += dt;
      holoAngle.current = (holoAngle.current + dt * 30) % 360;
      const ph = floatPhase.current;

      // Flip drives the base rotateY over FLIP_MS (runs even alongside float).
      if (flip.current.active) {
        flip.current.t += (dt * 1000) / FLIP_MS;
        const e = easeInOut(Math.min(flip.current.t, 1));
        base.current.y = flip.current.from + (flip.current.to - flip.current.from) * e;
        if (flip.current.t >= 1) {
          base.current.y = flip.current.to;
          flip.current.active = false;
        }
      }

      if (isDragging.current) {
        // Drag the base toward the pointer target; float is paused, ty frozen.
        base.current.x += (dragTarget.current.x - base.current.x) * DRAG_LERP;
        base.current.y += (dragTarget.current.y - base.current.y) * DRAG_LERP;
        current.current.x = base.current.x;
        current.current.y = base.current.y;
        current.current.z = base.current.z;
      } else {
        // Breathing float on top of the base (the base may be anywhere the user
        // left it — float resumes from there, not from the dramatic angle).
        const fx = idle ? Math.sin(ph * (TWO_PI / 6)) * 2 : 0; // ±2°, ~6s
        const fy = idle ? Math.sin(ph * (TWO_PI / 5)) * 3 : 0; // ±3°, ~5s
        const ft = idle ? Math.sin(ph * (TWO_PI / 4)) * 6 : 0; // ±6px, ~4s

        // One-shot hover pulse: 0–200ms to (+4, -8), 200–500ms ease back to 0.
        let hx = 0;
        let hy = 0;
        if (hover.current.active) {
          const p = (now - hover.current.start) / 1000;
          if (p < 0.2) {
            const k = p / 0.2;
            hx = 4 * k;
            hy = -8 * k;
          } else if (p < 0.5) {
            const k = 1 - (p - 0.2) / 0.3;
            hx = 4 * k;
            hy = -8 * k;
          } else {
            hover.current.active = false;
          }
        }

        current.current.x = base.current.x + fx + hx;
        current.current.y = base.current.y + fy + hy;
        current.current.z = base.current.z;
        ty.current = ft;
      }

      if (innerRef.current) {
        const rx = current.current.x;
        const ry = current.current.y;
        const rz = current.current.z;
        innerRef.current.style.transform = `perspective(1200px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) rotateZ(${rz.toFixed(2)}deg) translateY(${ty.current.toFixed(2)}px)`;
        innerRef.current.style.setProperty("--x", `${50 + Math.max(-50, Math.min(50, ry % 360))}%`);
        innerRef.current.style.setProperty("--y", `${50 - Math.max(-50, Math.min(50, rx))}%`);
        innerRef.current.style.setProperty("--angle", `${holoAngle.current}deg`);
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      wrap.removeEventListener("mousedown", onDown);
      wrap.removeEventListener("touchstart", onDown);
      wrap.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", endDrag);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", endDrag);
    };
  }, [interactive, idle, dramatic]);

  const dims = SIZES[size] || SIZES.lg;

  return (
    <div
      ref={wrapRef}
      className="card3d-wrap"
      style={{
        width: dims.w,
        height: dims.h,
        userSelect: "none",
        touchAction: "none",
      }}
      data-testid={`flip-card-${card.id}`}
      aria-label={`${card.brand} card — drag to rotate, click to flip`}
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
