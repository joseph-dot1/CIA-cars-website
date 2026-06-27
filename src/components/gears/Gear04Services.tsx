"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Plane, Briefcase, Heart, CalendarClock, ArrowUpRight } from "lucide-react";
import { img, IMAGE_IDS } from "@/lib/images";
import { EASE_EDITORIAL } from "@/lib/motion";

const COMPACT = [
  { icon: Plane, name: "Airport Transfers", note: "On-time, every flight" },
  { icon: Briefcase, name: "Corporate & Executive", note: "Boardroom-ready" },
  { icon: Heart, name: "Weddings & Events", note: "Your day, chauffeured" },
  { icon: CalendarClock, name: "Long-Term Hire", note: "Weeks or months" },
];

// Featured Security & Escort block (60/40) + compact icon row below (§4 Gear 04).
// Not five equal cards.
export function Gear04Services() {
  return (
    <section id="gear-04" className="gear services-gear" aria-label="Services">
      <motion.div
        className="services-featured"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        <motion.div
          className="services-featured-media"
          variants={{ rest: { scale: 1 }, hover: { scale: 1.04 } }}
          transition={{ duration: 0.6, ease: EASE_EDITORIAL }}
        >
          <Image
            src={img(IMAGE_IDS.security, 1400, 78)}
            alt="A dark coupe under dramatic industrial light, evoking discreet security escort"
            fill
            sizes="(max-width: 900px) 100vw, 58vw"
            quality={78}
            style={{ objectFit: "cover" }}
          />
          <div className="scrim" />
        </motion.div>

        <div className="services-featured-body">
          <span className="mono-label">Gear 04 / Services</span>
          <h2 className="services-featured-title font-display">Security &amp; Escort</h2>
          <motion.p
            className="services-featured-note"
            variants={{
              rest: { y: 8, opacity: 0.7 },
              hover: { y: 0, opacity: 1 },
            }}
            transition={{ duration: 0.3 }}
          >
            Discreet protection, on call.
          </motion.p>
          <a className="services-featured-cta" href="#gear-07">
            Arrange an escort <ArrowUpRight size={16} />
          </a>
        </div>
      </motion.div>

      <div className="services-row shell">
        {COMPACT.map((s) => {
          const Icon = s.icon;
          return (
            <motion.a
              key={s.name}
              href="#gear-07"
              className="services-item"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.25, ease: EASE_EDITORIAL }}
            >
              <Icon size={20} className="services-item-icon" aria-hidden />
              <span className="services-item-name">{s.name}</span>
              <span className="services-item-note">{s.note}</span>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
