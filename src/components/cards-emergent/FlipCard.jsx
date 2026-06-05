// FlipCard — the centerpiece interaction.
// CSS-built physical card. Drag to rotate freely (front ↔ back), release to
// spring back to neutral, gentle sine/cosine idle float when untouched.
// All motion is driven by a single requestAnimationFrame loop (no CSS keyframes,
// no animation library). Used at hero, featured, result reveal.
import React, { useRef, useEffect } from "react";
import PhysicalCardFace from "./PhysicalCardFace";
import CardBackFace from "./CardBackFace";

const SIZES = {
  sm: { w: 140, h: 88 },
  md: { w: 240, h: 152 },
  lg: { w: 420, h: 264 },
  xl: { w: 520, h: 328 },
};

const SENSITIVITY = 0.4; // degrees of rotation per pixel dragged
const DRAG_LERP = 0.15; // smoothing toward the drag target
const SPRING_STIFFNESS = 120; // spring constant k (toward neutral)
const SPRING_DAMPING = 14; // damping c (underdamped → slight overshoot)

const FlipCard = ({ card, size = "lg", interactive = true, idle = true }) => {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);

  // Motion lives entirely in refs so the rAF loop never triggers React renders.
  const rot = useRef({ x: 0, y: 0 }); // applied rotation (deg)
  const vel = useRef({ x: 0, y: 0 }); // angular velocity (deg/s) for the spring
  const ty = useRef(0); // applied translateY (px) — idle float only
  const dragTarget = useRef({ x: 0, y: 0 }); // rotation target while dragging
  const dragging = useRef(false);
  const springing = useRef(false); // snap-back active after release
  const dragStart = useRef({ x: 0, y: 0, rx: 0, ry: 0 });
  const pulse = useRef({ active: false, start: 0 }); // one-shot hover-enter tilt
  const holoAngle = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return undefined;

    const pointFromEvent = (e) => {
      const t = e.touches && e.touches[0];
      return t ? { x: t.clientX, y: t.clientY } : { x: e.clientX, y: e.clientY };
    };

    // ── Drag move (mouse + touch). Full 360° freedom, no clamp. ──
    const onMove = (e) => {
      if (!dragging.current) return;
      if (e.type === "touchmove" && e.cancelable) e.preventDefault(); // no page scroll
      const p = pointFromEvent(e);
      const dx = p.x - dragStart.current.x;
      const dy = p.y - dragStart.current.y;
      dragTarget.current.y = dragStart.current.ry + dx * SENSITIVITY; // deltaX → rotateY
      dragTarget.current.x = dragStart.current.rx - dy * SENSITIVITY; // deltaY → rotateX
    };

    // ── Release → hand off to the spring snap-back. ──
    const endDrag = () => {
      if (!dragging.current) return;
      dragging.current = false;
      springing.current = true;
      wrap.style.cursor = interactive ? "grab" : "default";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", endDrag);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", endDrag);
    };

    // ── Press → begin dragging from the current rotation. ──
    const onDown = (e) => {
      if (!interactive) return;
      dragging.current = true;
      springing.current = false;
      pulse.current.active = false;
      vel.current.x = 0;
      vel.current.y = 0;
      const p = pointFromEvent(e);
      dragStart.current = { x: p.x, y: p.y, rx: rot.current.x, ry: rot.current.y };
      dragTarget.current = { x: rot.current.x, y: rot.current.y };
      wrap.style.cursor = "grabbing";
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", endDrag);
      window.addEventListener("touchmove", onMove, { passive: false });
      window.addEventListener("touchend", endDrag);
    };

    // ── Hover enter → a single subtle "tilt toward the user" pulse. ──
    const onEnter = () => {
      if (!interactive || dragging.current) return;
      pulse.current = { active: true, start: performance.now() };
    };

    // ── Leaving the card releases an active drag / cancels a pulse. ──
    const onLeave = () => {
      if (dragging.current) {
        endDrag();
        return;
      }
      if (pulse.current.active) {
        pulse.current.active = false;
        springing.current = true;
      }
    };

    wrap.addEventListener("mousedown", onDown);
    wrap.addEventListener("touchstart", onDown, { passive: true });
    wrap.addEventListener("mouseenter", onEnter);
    wrap.addEventListener("mouseleave", onLeave);
    wrap.style.cursor = interactive ? "grab" : "default";

    let last = performance.now();
    const loop = (now) => {
      const dt = Math.min((now - last) / 1000, 0.032);
      last = now;
      const t = now * 0.001;
      holoAngle.current = (holoAngle.current + dt * 30) % 360;

      if (dragging.current) {
        // Follow the pointer smoothly; idle float is paused.
        rot.current.x += (dragTarget.current.x - rot.current.x) * DRAG_LERP;
        rot.current.y += (dragTarget.current.y - rot.current.y) * DRAG_LERP;
        ty.current += (0 - ty.current) * 0.2;
      } else if (pulse.current.active) {
        // 0–300ms tilt to (6, -10); 300–500ms settle back to neutral.
        const p = (now - pulse.current.start) / 1000;
        let tx = 0;
        let tyr = 0;
        if (p < 0.3) {
          tx = 6;
          tyr = -10;
        } else if (p >= 0.5) {
          pulse.current.active = false;
        }
        rot.current.x += (tx - rot.current.x) * 0.25;
        rot.current.y += (tyr - rot.current.y) * 0.25;
        ty.current += (0 - ty.current) * 0.2;
      } else if (springing.current) {
        // Damped spring toward neutral: a = -k·x - c·v (mass = 1).
        const ax = -SPRING_STIFFNESS * rot.current.x - SPRING_DAMPING * vel.current.x;
        const ay = -SPRING_STIFFNESS * rot.current.y - SPRING_DAMPING * vel.current.y;
        vel.current.x = Math.max(-6000, Math.min(6000, vel.current.x + ax * dt));
        vel.current.y = Math.max(-6000, Math.min(6000, vel.current.y + ay * dt));
        rot.current.x += vel.current.x * dt;
        rot.current.y += vel.current.y * dt;
        ty.current += (0 - ty.current) * 0.2;
        const settled =
          Math.abs(rot.current.x) < 0.5 &&
          Math.abs(rot.current.y) < 0.5 &&
          Math.hypot(vel.current.x, vel.current.y) < 8;
        if (settled) {
          rot.current.x = 0;
          rot.current.y = 0;
          vel.current.x = 0;
          vel.current.y = 0;
          springing.current = false;
        }
      } else if (idle) {
        // Continuous idle float — neutral-centered sine/cosine, no keyframes.
        rot.current.x = Math.sin(t * ((2 * Math.PI) / 6)) * 3; // ~6s period, ±3°
        rot.current.y = Math.sin(t * ((2 * Math.PI) / 5)) * 5; // ~5s period, ±5°
        ty.current = Math.sin(t * ((2 * Math.PI) / 4)) * 8; // ~4s period, ±8px
      } else {
        // idle disabled → ease to a flat rest.
        rot.current.x += (0 - rot.current.x) * 0.1;
        rot.current.y += (0 - rot.current.y) * 0.1;
        ty.current += (0 - ty.current) * 0.1;
      }

      if (innerRef.current) {
        innerRef.current.style.transform = `translateY(${ty.current.toFixed(2)}px) rotateX(${rot.current.x.toFixed(2)}deg) rotateY(${rot.current.y.toFixed(2)}deg)`;
        innerRef.current.style.setProperty("--x", `${50 + Math.max(-50, Math.min(50, rot.current.y))}%`);
        innerRef.current.style.setProperty("--y", `${50 - Math.max(-50, Math.min(50, rot.current.x))}%`);
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
      wrap.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", endDrag);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", endDrag);
    };
  }, [interactive, idle]);

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
      aria-label={`${card.brand} card — drag to rotate`}
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
