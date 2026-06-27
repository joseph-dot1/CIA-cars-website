"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface GearMeta {
  id: string;
  num: string;
  name: string;
}

export const GEARS: GearMeta[] = [
  { id: "gear-01", num: "01", name: "Hero" },
  { id: "gear-02", num: "02", name: "Trust" },
  { id: "gear-03", num: "03", name: "Fleet" },
  { id: "gear-04", num: "04", name: "Services" },
  { id: "gear-05", num: "05", name: "Why CIA" },
  { id: "gear-06", num: "06", name: "Story" },
  { id: "gear-07", num: "07", name: "Reserve" },
];

const GearCtx = createContext(0);
export const useActiveGear = () => useContext(GearCtx);

export function GearProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = GEARS.map((g) => document.getElementById(g.id)).filter(
      Boolean,
    ) as HTMLElement[];

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = GEARS.findIndex((g) => g.id === entry.target.id);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return <GearCtx.Provider value={active}>{children}</GearCtx.Provider>;
}
