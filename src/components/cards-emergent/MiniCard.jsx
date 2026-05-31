// Mini card with hover-tilt — used in Beat 2 list rows
import React, { useRef } from "react";
import PhysicalCardFace from "./PhysicalCardFace";

const MiniCard = ({ card, size = "sm" }) => {
  const ref = useRef(null);

  const handleMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 2 - 1;
    const y = ((e.clientY - r.top) / r.height) * 2 - 1;
    ref.current.style.setProperty("--ry-h", `${x * 18 - 14}deg`);
    ref.current.style.setProperty("--rx-h", `${-y * 8 + 6}deg`);
    ref.current.style.setProperty("--x", `${(x + 1) * 50}%`);
    ref.current.style.setProperty("--y", `${(y + 1) * 50}%`);
  };

  const handleLeave = () => {
    if (!ref.current) return;
    ref.current.style.removeProperty("--ry-h");
    ref.current.style.removeProperty("--rx-h");
  };

  return (
    <div
      ref={ref}
      className="mini-tilt"
      style={{ perspective: 700, transformStyle: "preserve-3d" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <PhysicalCardFace card={card} size={size} />
    </div>
  );
};

export default MiniCard;
