"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const PHRASES = [
  "Fully insured.",
  "Professionally chauffeured.",
  "Security-escorted.",
  "Delivered to your door.",
];

// Sui-style inline phrase that cycles in place, 2s per beat (§4). Each phrase
// uses a unique key so AnimatePresence detects the change (gotcha #8).
// Reduced motion: first phrase only, static.
export function CyclingSubline({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setI((p) => (p + 1) % PHRASES.length), 2000);
    return () => clearInterval(id);
  }, [reduced]);

  if (reduced) {
    return <p className={className}>{PHRASES[0]}</p>;
  }

  return (
    <span className={className} style={{ display: "inline-block", minHeight: "1.6em" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          style={{ display: "inline-block" }}
        >
          {PHRASES[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
