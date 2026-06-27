"use client";

import { useRef } from "react";
import { motion, useSpring, useReducedMotion } from "framer-motion";
import { springs } from "@/lib/motion";

interface MagneticCTAProps {
  label: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}

const CAP = 12; // ±12px (gotcha guidance §4)

// A real component (not a hook in a helper — gotcha #2). Cursor-following
// magnetic offset, capped, reduced-motion-safe.
export function MagneticCTA({
  label,
  href,
  onClick,
  type = "button",
  disabled,
  className = "btn-primary",
}: MagneticCTAProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, springs.gesture);
  const y = useSpring(0, springs.gesture);

  const handleMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const dy = (e.clientY - rect.top - rect.height / 2) * 0.25;
    x.set(Math.max(-CAP, Math.min(CAP, dx)));
    y.set(Math.max(-CAP, Math.min(CAP, dy)));
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const inner = <span>{label}</span>;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x, y, display: "inline-flex" }}
      whileTap={reduced ? undefined : { scale: 0.97 }}
    >
      {href ? (
        <a href={href} className={className}>
          {inner}
        </a>
      ) : (
        <button type={type} onClick={onClick} disabled={disabled} className={className}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}
