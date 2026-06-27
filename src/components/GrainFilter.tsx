// Always-on SVG grain overlay at 4% opacity (§3 background treatment).
export function GrainFilter() {
  return (
    <>
      <svg className="grain" aria-hidden="true" focusable="false">
        <filter id="grain-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-noise)" />
      </svg>
    </>
  );
}
