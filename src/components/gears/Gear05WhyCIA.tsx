"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Wrench,
  ShieldCheck,
  SprayCan,
  UserCheck,
  EyeOff,
  Receipt,
} from "lucide-react";

const ITEMS = [
  { icon: Wrench, text: "Meticulously maintained" },
  { icon: ShieldCheck, text: "Fully insured" },
  { icon: SprayCan, text: "Sanitized pre-hire" },
  { icon: UserCheck, text: "Professional chauffeurs" },
  { icon: EyeOff, text: "Discreet security" },
  { icon: Receipt, text: "Transparent pricing" },
];

// Tight 6-up spec-sheet grid; no cards, no shadows, hairline dividers only (§4).
export function Gear05WhyCIA() {
  const reduced = useReducedMotion();

  return (
    <section id="gear-05" className="gear why-gear" aria-label="Why CIA">
      <div className="shell">
        <span className="mono-label">Gear 05 / Why CIA</span>
        <h2 className="section-h2 font-display">Built on trust, kept on standard.</h2>

        <motion.ul
          className="why-grid"
          initial={reduced ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.07 } },
          }}
        >
          {ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.li
                key={item.text}
                className="why-item"
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <Icon size={18} className="why-icon" aria-hidden />
                <span className="why-text">{item.text}</span>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
