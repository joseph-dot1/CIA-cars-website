import type { Transition } from "framer-motion";

// Named spring presets (§5). Every Framer Motion spring uses one of these.
export const springs = {
  snap: { type: "spring", stiffness: 400, damping: 35 } satisfies Transition,
  reveal: { type: "spring", stiffness: 300, damping: 28 } satisfies Transition,
  gesture: { type: "spring", stiffness: 400, damping: 28 } satisfies Transition,
  hero: { type: "spring", stiffness: 260, damping: 24 } satisfies Transition,
} as const;

export const EASE_EDITORIAL = [0.25, 0.46, 0.45, 0.94] as const;
