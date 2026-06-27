"use client";

import { motion, useReducedMotion } from "framer-motion";

const STEPS = [
  { n: "01", title: "Choose & set dates", note: "Pick your vehicle and window" },
  { n: "02", title: "Reserve", note: "Form or WhatsApp" },
  { n: "03", title: "Drive", note: "Delivered to your door" },
];

const QUOTE = "Enjoyed the ride, and the security service is top-notch.";

export function Gear06HowTestimonial() {
  const reduced = useReducedMotion();
  const words = QUOTE.split(" ");

  return (
    <section id="gear-06" className="gear how-gear" aria-label="How it works and testimonial">
      {/* Sub-beat A — How It Works */}
      <div className="shell how-block">
        <span className="mono-label">Gear 06 / How It Works</span>
        <div className="how-steps">
          <span className="how-rule" aria-hidden />
          {STEPS.map((s) => (
            <div className="how-step" key={s.n}>
              <span className="how-numeral font-display" aria-hidden>
                {s.n}
              </span>
              <div className="how-step-body">
                <h3 className="how-step-title font-display">{s.title}</h3>
                <p className="how-step-note">{s.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sub-beat B — Testimonial (120px apart, different internal shape) */}
      <div className="shell testimonial-block">
        <span className="testimonial-mark font-display" aria-hidden>
          &ldquo;
        </span>
        <motion.blockquote
          className="testimonial-quote font-display"
          initial={reduced ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.03 } },
          }}
        >
          {words.map((w, i) => (
            <motion.span
              key={`${w}-${i}`}
              className="testimonial-word"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { duration: 0.4 } },
              }}
            >
              {w}{" "}
            </motion.span>
          ))}
        </motion.blockquote>
        <motion.p
          className="testimonial-attr mono-label"
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: reduced ? 0 : 0.4 + words.length * 0.03, duration: 0.5 }}
        >
          — Verified client
        </motion.p>
      </div>
    </section>
  );
}
