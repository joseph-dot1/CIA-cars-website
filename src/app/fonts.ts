import { Cormorant_Garamond, DM_Sans, DM_Mono } from "next/font/google";

// §3 typography — self-hosted via next/font (zero FOUT). Never Inter/Roboto/Space Grotesk.
export const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

export const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
