"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion, useReducedMotion, useSpring } from "framer-motion";
import { ChevronLeft, ChevronRight, Users, Cog, Banknote } from "lucide-react";
import type { Car } from "@/lib/fleet";
import { formatNaira } from "@/lib/fleet";
import { img } from "@/lib/images";
import { springs } from "@/lib/motion";
import { whatsappLink } from "@/lib/site";

// One slide. Its own component so the tilt hooks get their own scope
// (avoids hooks-in-loop / hooks-in-helper). Active frame tilts toward the cursor.
function FleetSlide({ car, isActive }: { car: Car; isActive: boolean }) {
  const reduced = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 250, damping: 22 });
  const rotateY = useSpring(0, { stiffness: 250, damping: 22 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !isActive) return;
    const r = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    rotateY.set(nx * 6);
    rotateX.set(-ny * 6);
  };
  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div className={`fleet-slide ${isActive ? "is-active" : ""}`} aria-hidden={!isActive}>
      <motion.div
        className="fleet-frame"
        style={{ rotateX, rotateY, transformPerspective: 1100 }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <Image
          src={img(car.imageId, 1400, 78)}
          alt={car.alt}
          fill
          sizes="(max-width: 768px) 92vw, 70vw"
          quality={78}
          style={{ objectFit: "cover" }}
        />
        <div className="scrim" />
        <div className="fleet-overlay">
          <span className="mono-label">{car.name.split(" ")[0]}</span>
          <h3 className="fleet-name font-display">{car.name}</h3>
          <p className="fleet-tagline">{car.tagline}</p>
          <p className="fleet-price font-mono">
            from {formatNaira(car.priceFrom)}
            <span className="fleet-price-unit">/day</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export function FleetCarousel({ cars }: { cars: Car[] }) {
  const reduced = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const active = cars[selected] ?? cars[0];

  return (
    <div className="fleet-carousel">
      <div className="fleet-viewport" ref={emblaRef}>
        <div className="fleet-track">
          {cars.map((car, i) => (
            <FleetSlide key={car.id} car={car} isActive={i === selected} />
          ))}
        </div>
      </div>

      <div className="fleet-controls">
        <button
          className="fleet-arrow"
          aria-label="Previous vehicle"
          onClick={() => emblaApi?.scrollPrev()}
        >
          <ChevronLeft size={18} />
        </button>
        <span className="fleet-count mono-stat">
          {String(selected + 1).padStart(2, "0")} / {String(cars.length).padStart(2, "0")}
        </span>
        <button
          className="fleet-arrow"
          aria-label="Next vehicle"
          onClick={() => emblaApi?.scrollNext()}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Specs drawer (§4) — mono data, hairline rules, no cards. */}
      <AnimatePresence mode="wait">
        <motion.div
          className="specs-drawer"
          key={active.id}
          initial={reduced ? false : { y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduced ? undefined : { y: 16, opacity: 0 }}
          transition={springs.reveal}
        >
          <div className="specs-row">
            <span className="specs-label mono-label">
              <Users size={13} /> Seats
            </span>
            <span className="specs-value font-mono">{active.seats}</span>
          </div>
          <div className="specs-row">
            <span className="specs-label mono-label">
              <Cog size={13} /> Transmission
            </span>
            <span className="specs-value font-mono">{active.transmission}</span>
          </div>
          <div className="specs-row">
            <span className="specs-label mono-label">
              <Banknote size={13} /> Per day
            </span>
            <span className="specs-value font-mono accent-value">
              {formatNaira(active.priceFrom)}
            </span>
          </div>
          <a
            className="specs-cta btn-ghost"
            href={whatsappLink(
              `Hello CIA Luxury Fleets, I'd like to reserve the ${active.name}.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            Reserve the {active.name.split(" ").slice(-1)[0]} →
          </a>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
