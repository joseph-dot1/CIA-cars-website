"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface CountUpProps {
  to: number;
  duration?: number;
  /** Start when scrolled into view (true) or immediately on mount (false). */
  onView?: boolean;
  format?: (n: number) => string;
  className?: string;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

// rAF counter with easeOutCubic. SSR-safe (renders final value as text first),
// reduced-motion shows the target instantly. Owns the ₦0→70,000 hero stat and
// the trust-strip stats (§4).
export function CountUp({
  to,
  duration = 1400,
  onView = false,
  format = (n) => Math.round(n).toLocaleString("en-NG"),
  className,
}: CountUpProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (reduced) {
      setValue(to);
      return;
    }

    const run = () => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        setValue(to * easeOutCubic(p));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (!onView) {
      run();
      return;
    }

    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration, onView, reduced]);

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}
