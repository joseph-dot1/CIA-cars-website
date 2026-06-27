import { IMAGE_IDS } from "./images";

export type CategoryId = "executive" | "suv" | "statement" | "group";

export interface Category {
  id: CategoryId;
  label: string;
}

export interface Car {
  id: string;
  name: string;
  tagline: string;
  priceFrom: number; // naira per day
  seats: number;
  transmission: string;
  category: CategoryId;
  imageId: string;
  /** Descriptive alt text — never a filename. */
  alt: string;
}

export const CATEGORIES: Category[] = [
  { id: "executive", label: "Executive" },
  { id: "suv", label: "SUV" },
  { id: "statement", label: "Statement" },
  { id: "group", label: "Group" },
];

export const FLEET: Car[] = [
  // Executive Sedans
  {
    id: "e-class",
    name: "Mercedes-Benz E-Class",
    tagline: "Quiet authority for the boardroom run",
    priceFrom: 70000,
    seats: 4,
    transmission: "Automatic",
    category: "executive",
    imageId: IMAGE_IDS.eclass,
    alt: "A dark executive sedan photographed at night, side three-quarter view under warm key light",
  },
  {
    id: "es-350",
    name: "Lexus ES 350",
    tagline: "Effortless executive comfort",
    priceFrom: 65000,
    seats: 4,
    transmission: "Automatic",
    category: "executive",
    imageId: IMAGE_IDS.es350,
    alt: "A luxury sedan in low light with moody backlight through trees",
  },
  {
    id: "camry-2023",
    name: "Toyota Camry 2023",
    tagline: "Sharp, dependable, understated",
    priceFrom: 45000,
    seats: 4,
    transmission: "Automatic",
    category: "executive",
    imageId: IMAGE_IDS.camry,
    alt: "A white Toyota sedan on a misty road at dusk, front three-quarter view",
  },
  // Luxury SUVs
  {
    id: "prado-2023",
    name: "Toyota Prado 2023",
    tagline: "The Garden City's favourite, elevated",
    priceFrom: 120000,
    seats: 7,
    transmission: "Automatic",
    category: "suv",
    imageId: IMAGE_IDS.prado,
    alt: "A silver Toyota SUV photographed outdoors, front three-quarter view",
  },
  {
    id: "gle",
    name: "Mercedes-Benz GLE",
    tagline: "Commanding presence, plush ride",
    priceFrom: 180000,
    seats: 5,
    transmission: "Automatic",
    category: "suv",
    imageId: IMAGE_IDS.gle,
    alt: "A luxury SUV in a foggy forest at dusk with red light trails behind it",
  },
  {
    id: "lx-570",
    name: "Lexus LX 570",
    tagline: "First-class, off any road",
    priceFrom: 200000,
    seats: 7,
    transmission: "Automatic",
    category: "suv",
    imageId: IMAGE_IDS.lx570,
    alt: "A full-size luxury SUV set against a dramatic landscape, side profile",
  },
  {
    id: "range-rover-sport",
    name: "Range Rover Sport",
    tagline: "Sport-tuned prestige",
    priceFrom: 250000,
    seats: 5,
    transmission: "Automatic",
    category: "suv",
    imageId: IMAGE_IDS.rrsport,
    alt: "A tall sport utility vehicle at dusk with headlights on, front three-quarter view",
  },
  // Statement & Sports
  {
    id: "g63-amg",
    name: "Mercedes-Benz G63 AMG",
    tagline: "Arrive and be remembered",
    priceFrom: 450000,
    seats: 5,
    transmission: "Automatic",
    category: "statement",
    imageId: IMAGE_IDS.g63,
    alt: "A Mercedes-Benz G-Class photographed against architecture, front three-quarter view",
  },
  {
    id: "range-rover-autobiography",
    name: "Range Rover Autobiography",
    tagline: "The definition of arrival",
    priceFrom: 400000,
    seats: 5,
    transmission: "Automatic",
    category: "statement",
    imageId: IMAGE_IDS.rrauto,
    alt: "A flagship luxury vehicle on a neon-lit city street at night",
  },
  {
    id: "amg-gt",
    name: "Mercedes-AMG GT",
    tagline: "For moments that demand a statement",
    priceFrom: 350000,
    seats: 2,
    transmission: "Automatic",
    category: "statement",
    imageId: IMAGE_IDS.amggt,
    alt: "A black Mercedes-AMG GT sports car photographed near a harbour at dusk",
  },
  // Group & Events
  {
    id: "sienna",
    name: "Toyota Sienna",
    tagline: "Comfortable convoys for the whole party",
    priceFrom: 90000,
    seats: 7,
    transmission: "Automatic",
    category: "group",
    imageId: IMAGE_IDS.sienna,
    alt: "A spacious people-carrier on the open road at golden hour, front three-quarter view",
  },
];

export function carsByCategory(category: CategoryId): Car[] {
  return FLEET.filter((c) => c.category === category);
}

export function formatNaira(n: number): string {
  return "₦" + n.toLocaleString("en-NG");
}

/** The fleet average (used by the hero counter's target). */
export const FLEET_ENTRY_PRICE = 70000;
