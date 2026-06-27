"use client";

import { GEARS, useActiveGear } from "./GearContext";

// Fixed vertical gear progress indicator on the left edge (§6).
export function GearProgress() {
  const active = useActiveGear();

  return (
    <aside className="gear-progress" aria-hidden="true">
      <span className="gear-progress-label mono-label">
        {GEARS[active].num}
        <span className="gear-progress-name">{GEARS[active].name}</span>
      </span>
      <ul className="gear-dots">
        {GEARS.map((g, i) => (
          <li
            key={g.id}
            className={`gear-dot ${i === active ? "is-active" : ""} ${
              i < active ? "is-passed" : ""
            }`}
          />
        ))}
      </ul>
    </aside>
  );
}
