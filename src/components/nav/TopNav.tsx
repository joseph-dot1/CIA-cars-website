"use client";

import { useEffect, useState } from "react";
import { Star, Phone } from "lucide-react";
import { GEARS, useActiveGear } from "./GearContext";
import { SITE } from "@/lib/site";

const LINKS = [
  { id: "gear-03", label: "Fleet" },
  { id: "gear-04", label: "Services" },
  { id: "gear-05", label: "Why CIA" },
  { id: "gear-07", label: "Reserve" },
];

export function TopNav() {
  const active = useActiveGear();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`top-nav ${scrolled ? "is-scrolled" : ""}`}>
      <a href="#gear-01" className="nav-brand">
        <span className="nav-brand-mark font-display">CIA</span>
        <span className="nav-brand-sub mono-label">Luxury Fleets</span>
      </a>

      <nav className="nav-links" aria-label="Primary">
        {LINKS.map((l) => (
          <a key={l.id} href={`#${l.id}`} className="nav-link">
            {l.label}
          </a>
        ))}
      </nav>

      <div className="nav-meta">
        <span className="nav-gear mono-label" aria-live="polite">
          gear {GEARS[active].num}
        </span>
        <span className="nav-rating mono-stat">
          <Star size={12} className="nav-star" aria-hidden /> {SITE.rating}
        </span>
        <a href={SITE.phoneHref} className="nav-phone" aria-label={`Call ${SITE.name} on ${SITE.phone}`}>
          <Phone size={14} aria-hidden />
          <span className="nav-phone-text">{SITE.phone}</span>
        </a>
      </div>
    </header>
  );
}
