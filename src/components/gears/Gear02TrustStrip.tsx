"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CountUp } from "@/components/CountUp";

interface Stat {
  value?: number;
  prefix?: string;
  suffix?: string;
  display?: string;
  label: string;
}

const STATS: Stat[] = [
  { value: 4.8, suffix: "★", label: "rating" },
  { value: 55, suffix: "+", label: "clients" },
  { display: "Airport", label: "pickups" },
  { display: "Fully", label: "insured" },
  { display: "~2hr", label: "replies" },
];

// Full-width horizontal bar, mono numbers, thin vertical rules, silence after
// entrance (§4 Gear 02). No cards.
export function Gear02TrustStrip() {
  const reduced = useReducedMotion();

  return (
    <section id="gear-02" className="trust-strip" aria-label="Trust signals">
      <motion.div
        className="trust-inner"
        initial={reduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6 }}
      >
        {STATS.map((s, i) => (
          <div key={s.label} className="trust-item">
            <span className="trust-figure mono-stat">
              {s.display ? (
                s.display
              ) : (
                <>
                  <CountUp
                    to={s.value!}
                    onView
                    duration={1200}
                    format={(n) =>
                      s.value! % 1 === 0
                        ? Math.round(n).toString()
                        : n.toFixed(1)
                    }
                  />
                  {s.suffix}
                </>
              )}
            </span>
            <span className="trust-label">{s.label}</span>
            {i < STATS.length - 1 && <span className="trust-rule" aria-hidden />}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
