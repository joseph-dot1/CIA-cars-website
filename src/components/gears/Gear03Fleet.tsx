"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CATEGORIES, carsByCategory, type CategoryId } from "@/lib/fleet";
import { springs } from "@/lib/motion";
import { FleetCarousel } from "./FleetCarousel";
import { VelocityMarquee } from "@/components/VelocityMarquee";

// Full-viewport carousel; the car IS the UI (§4 Gear 03). Category tabs filter
// instantly with a layoutId underline indicator.
export function Gear03Fleet() {
  const [active, setActive] = useState<CategoryId>("executive");
  const cars = carsByCategory(active);

  return (
    <section id="gear-03" className="gear fleet-gear" aria-label="The fleet">
      <div className="shell fleet-head">
        <span className="mono-label">Gear 03 / The Fleet</span>
        <h2 className="section-h2 font-display">The fleet, one frame at a time.</h2>

        <div className="fleet-tabs" role="tablist" aria-label="Filter fleet by category">
          {CATEGORIES.map((cat) => {
            const isActive = active === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                className={`fleet-tab mono-stat ${isActive ? "is-active" : ""}`}
                onClick={() => setActive(cat.id)}
              >
                {cat.label}
                {isActive && (
                  <motion.span
                    layoutId="fleet-tab-indicator"
                    className="fleet-tab-indicator"
                    transition={springs.snap}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="shell">
        <FleetCarousel key={active} cars={cars} />
      </div>

      <div className="fleet-marquee">
        <VelocityMarquee />
      </div>
    </section>
  );
}
