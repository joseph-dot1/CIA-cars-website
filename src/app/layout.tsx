import type { Metadata, Viewport } from "next";
import { display, sans, mono } from "./fonts";
import { SITE } from "@/lib/site";
import { img, IMAGE_IDS } from "@/lib/images";
import { GrainFilter } from "@/components/GrainFilter";
import "./globals.css";
import "./components.css";

const ogImage = img(IMAGE_IDS.hero, 1200, 80);

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "CIA Luxury Fleets — Drive Your Way, Every Day | Port Harcourt",
    template: "%s · CIA Luxury Fleets",
  },
  description:
    "Port Harcourt's premier luxury car rental. A fully insured, professionally chauffeured fleet of executive sedans, SUVs and statement cars — with security escort and airport pickups. From ₦70,000/day.",
  keywords: [
    "luxury car rental Port Harcourt",
    "chauffeur Port Harcourt",
    "G63 rental Nigeria",
    "Range Rover hire",
    "executive car rental Rivers State",
    "CIA Luxury Fleets",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: SITE.url,
    siteName: SITE.name,
    title: "CIA Luxury Fleets — Drive Your Way, Every Day",
    description:
      "A cinematic fleet of elite vehicles in Port Harcourt. Fully insured. Professionally chauffeured. Security-escorted. From ₦70,000/day.",
    images: [{ url: ogImage, width: 1200, height: 800, alt: "CIA Luxury Fleets hero vehicle at blue hour" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CIA Luxury Fleets — Drive Your Way, Every Day",
    description: "Port Harcourt's premier luxury fleet. From ₦70,000/day.",
    images: [ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRental",
  name: SITE.name,
  description:
    "Premier luxury car rental and chauffeur service in Port Harcourt, Nigeria.",
  url: SITE.url,
  image: ogImage,
  telephone: SITE.phone,
  priceRange: "₦₦₦",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    postalCode: SITE.address.postal,
    addressRegion: SITE.address.region,
    addressCountry: "NG",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: SITE.rating,
    bestRating: "5",
    reviewCount: "55",
  },
  sameAs: [SITE.instagramHref],
  openingHours: "Mo-Su 00:00-23:59",
  areaServed: { "@type": "City", name: "Port Harcourt" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="ambient-glow" aria-hidden="true" />
        <GrainFilter />
        {children}
      </body>
    </html>
  );
}
