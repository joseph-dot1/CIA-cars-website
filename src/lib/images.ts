// Centralised, mechanically-verified image URLs (see IMAGE-MANIFEST.md).
// Every ID below was confirmed HTTP 200 at w=1600 and visually inspected.

const UNSPLASH = "https://images.unsplash.com/photo-";

/** Build a sized Unsplash URL from a verified photo id. */
export function img(id: string, w = 1600, q = 80): string {
  return `${UNSPLASH}${id}?auto=format&fit=crop&w=${w}&q=${q}`;
}

export const IMAGE_IDS = {
  hero: "1563720223185-11003d516935",
  eclass: "1606664515524-ed2f786a0bd6",
  es350: "1593055357429-62eaf3b259cc",
  camry: "1638618164682-12b986ec2a75",
  prado: "1617469767053-d3b523a0b982",
  gle: "1609521263047-f8f205293f24",
  lx570: "1533473359331-0135ef1b58bf",
  rrsport: "1605893477799-b99e3b8b93fe",
  g63: "1520031441872-265e4ff70366",
  rrauto: "1544636331-e26879cd4d9b",
  amggt: "1617814076367-b759c7d7e738",
  sienna: "1551830820-330a71b99659",
  security: "1626668893632-6f3a4466d22f",
} as const;
