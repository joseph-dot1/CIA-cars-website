"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useSpring, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { img, IMAGE_IDS } from "@/lib/images";
import { CountUp } from "@/components/CountUp";
import { CyclingSubline } from "@/components/CyclingSubline";
import { MagneticCTA } from "@/components/MagneticCTA";
import { WHATSAPP_DEFAULT } from "@/lib/site";
import { FLEET_ENTRY_PRICE } from "@/lib/fleet";

const LINE_1 = "Drive Your Way,";
const LINE_2 = "Every Day.";

function splitChars(text: string, lineKey: string) {
  return text.split("").map((ch, i) => (
    <span
      key={`${lineKey}-${i}`}
      className="hero-char"
      style={{ display: "inline-block", whiteSpace: "pre" }}
    >
      {ch}
    </span>
  ));
}

export function Gear01Hero() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  // Living-field parallax: the canvas drifts against the cursor (Sui principle).
  const px = useSpring(0, { stiffness: 120, damping: 22 });
  const py = useSpring(0, { stiffness: 120, damping: 22 });

  const onPointerMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const nx = (e.clientX / window.innerWidth - 0.5) * 2;
    const ny = (e.clientY / window.innerHeight - 0.5) * 2;
    px.set(-nx * 14);
    py.set(-ny * 14);
  };

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // On-load entrance (fires once).
      const chars = gsap.utils.toArray<HTMLElement>(".hero-char");
      const entrance = gsap.timeline({ delay: 0.15 });
      entrance
        .from(chars, {
          yPercent: 110,
          opacity: 0,
          stagger: 0.025,
          duration: 0.9,
          ease: "power3.out",
        })
        .from("#hero-stat", { opacity: 0, y: 20, duration: 0.6 }, "-=0.45")
        .from(".hero-cta", { opacity: 0, y: 24, stagger: 0.12, duration: 0.6 }, "-=0.3")
        .from("#hero-cycling-line", { opacity: 0, duration: 0.5 }, "-=0.4");

      // Pinned scrub timeline (the site's one orchestrated GSAP sequence).
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#gear-01",
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        },
      });
      tl.to("#hero-photo", { scale: 1.06, ease: "none" }, 0)
        .to("#hero-headline", { y: -48, opacity: 0, ease: "power2.in" }, 0.1)
        .to("#hero-stat", { opacity: 0, ease: "power2.in" }, 0.2)
        .to("#hero-cycling-line", { opacity: 0, ease: "power2.in" }, 0.15)
        .to(".hero-cta-row", { opacity: 0, ease: "power2.in" }, 0.18);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gear-01"
      ref={root}
      className="hero"
      aria-label="Hero"
      onMouseMove={onPointerMove}
    >
      <div id="hero-photo" className="hero-photo">
        <motion.div className="hero-photo-inner" style={{ x: px, y: py }}>
          <Image
            src={img(IMAGE_IDS.hero, 1920, 72)}
            alt="A black luxury SUV under dramatic low-key light in a dark garage at blue hour"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={72}
            style={{ objectFit: "cover", objectPosition: "center 60%" }}
          />
        </motion.div>
        <div className="scrim" />
      </div>

      <div className="hero-content shell">
        <span className="mono-label hero-gear-label">Gear 01 / Hero</span>

        <div id="hero-stat" className="hero-stat" aria-label="Fleet from 70,000 naira per day">
          <span className="stat-currency" aria-hidden>
            ₦
          </span>
          <CountUp to={FLEET_ENTRY_PRICE} duration={1400} className="stat-number" />
          <span className="stat-unit">/day</span>
        </div>

        <h1 id="hero-headline" className="hero-h1 font-display">
          <span className="hero-line">{splitChars(LINE_1, "l1")}</span>
          <span className="hero-line">{splitChars(LINE_2, "l2")}</span>
        </h1>

        <CyclingSubline className="hero-cycling font-mono" />
        <span id="hero-cycling-line" aria-hidden />

        <div className="hero-cta-row">
          <span className="hero-cta">
            <MagneticCTA label="Reserve your ride" href="#gear-07" />
          </span>
          <a
            href={WHATSAPP_DEFAULT}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta hero-cta-secondary btn-ghost"
          >
            Book on WhatsApp →
          </a>
        </div>
      </div>

      <div className="hero-scroll-cue mono-label" aria-hidden>
        Scroll <span className="hero-scroll-rule" />
      </div>
    </section>
  );
}
