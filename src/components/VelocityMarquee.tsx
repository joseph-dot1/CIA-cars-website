"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimationFrame,
  wrap,
  useReducedMotion,
} from "framer-motion";

const TEXT = "CIA LUXURY FLEETS  ·  PORT HARCOURT  ·  THE GARDEN CITY  ·  ";

// Scroll-velocity marquee that reverses with scroll direction (§3 Gear 03).
// Mobile (<768px) uses constant speed only, heavy damping (gotcha #3).
export function VelocityMarquee() {
  const reduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const directionRef = useRef(1);

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  const smoothVelocity = useSpring(scrollVelocity, {
    damping: isMobile ? 80 : 50,
    stiffness: isMobile ? 200 : 400,
  });
  const velocityFactor = useTransform(
    smoothVelocity,
    [0, 1000],
    [0, isMobile ? 0 : 4],
    { clamp: false },
  );

  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let moveBy = directionRef.current * (isMobile ? 1.6 : 2.4) * (delta / 1000);
    if (!isMobile) {
      if (velocityFactor.get() < 0) directionRef.current = -1;
      else if (velocityFactor.get() > 0) directionRef.current = 1;
      moveBy += directionRef.current * moveBy * velocityFactor.get();
    }
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      aria-hidden="true"
      style={{ overflow: "hidden", whiteSpace: "nowrap", display: "flex" }}
    >
      <motion.div
        style={{ x, display: "flex", whiteSpace: "nowrap" }}
        className="font-display"
      >
        {Array.from({ length: 4 }).map((_, idx) => (
          <span
            key={idx}
            style={{
              display: "block",
              fontSize: 16,
              letterSpacing: "0.25em",
              color: "var(--ink-3)",
              fontWeight: 300,
              paddingRight: "0.5em",
            }}
          >
            {TEXT}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
