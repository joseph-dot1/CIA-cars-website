// Single source of truth for real client details (§4 / §7).

export const SITE = {
  name: "CIA Luxury Fleets",
  tagline: "Drive Your Way, Every Day.",
  phone: "+234 907 583 1505",
  phoneHref: "tel:+2349075831505",
  whatsapp: "2349075831505",
  instagram: "@cialuxuryfleets",
  instagramHref: "https://instagram.com/cialuxuryfleets",
  rating: "4.8",
  address: {
    street: "Ada-George Road, Rumuafrikom",
    city: "Port Harcourt",
    postal: "500272",
    region: "Rivers State",
    country: "Nigeria",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://cialuxuryfleets.com",
} as const;

export function whatsappLink(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_DEFAULT = whatsappLink(
  "Hello CIA Luxury Fleets, I'd like to reserve a vehicle.",
);
