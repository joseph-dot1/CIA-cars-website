# CIA Luxury Fleets

A cinematic, scroll-storytelling marketing site for **CIA Luxury Fleets** — Port
Harcourt's premier luxury car rental and chauffeur service. Built in the
**Dark Marque Editorial** register: a dark living canvas, a gear/chapter-driven
narrative, marque-level restraint, and conversion-confident, trust-first fleet
presentation.

> **Tagline:** Drive Your Way, Every Day.

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS** + CSS-variable design tokens (OKLCH)
- **next/font** — Cormorant Garamond · DM Sans · DM Mono (self-hosted, zero FOUT)
- **GSAP 3 + ScrollTrigger** — the hero's single pinned timeline
- **Lenis** — smooth scroll (gated on `prefers-reduced-motion`)
- **Framer Motion** — all user-reactive motion (tabs, drawers, reveals, magnetic CTA, cycling subline, form)
- **Embla Carousel** — fleet drag/swipe mechanics
- **react-hook-form + zod** — booking form validation
- **Resend** (optional) — booking email
- **lucide-react** — icons
- JSON-LD `AutoRental` + full OpenGraph + canonical metadata

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit (strict)
npm run lint       # next lint
```

## Environment variables

Copy `.env.example` to `.env.local`. **Every variable is optional** — the booking
form always works, falling back to a pre-filled WhatsApp deep-link.

| Variable | Purpose | Required |
|----------|---------|----------|
| `RESEND_API_KEY` | Enables booking emails via Resend. Without it the API acknowledges the lead and the UI confirms; WhatsApp remains the primary path. | No |
| `BOOKING_TO_EMAIL` | Inbox that receives booking emails. | No |
| `BOOKING_FROM_EMAIL` | Verified Resend sender (or `onboarding@resend.dev` for testing). | No |
| `NEXT_PUBLIC_SITE_URL` | Canonical/OpenGraph base URL (no trailing slash). | No |

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Import the project in Vercel — it auto-detects Next.js.
3. (Optional) add the env vars above in Project → Settings → Environment Variables.
4. Deploy. The fleet images are served from Unsplash's CDN and are already
   allow-listed in `next.config.mjs`.

## Project structure

```
src/
  app/
    layout.tsx           # fonts, SEO metadata, JSON-LD, grain filter
    page.tsx             # assembles the 7 gears
    globals.css          # design tokens + base
    components.css       # gear layout system (one shape per gear)
    fonts.ts             # next/font config
    api/booking/route.ts # validates + (optionally) emails via Resend
    icon.svg             # favicon
  components/
    gears/               # Gear01Hero … Gear07Booking + FleetCarousel
    nav/                 # TopNav, GearProgress, GearContext (scroll-spy)
    SmoothScroll.tsx     # Lenis ↔ GSAP ticker wiring
    CountUp / CyclingSubline / VelocityMarquee / MagneticCTA / BookingForm / GrainFilter
  lib/
    fleet.ts  images.ts  site.ts  motion.ts
```

## Deliverable docs

- `IMAGE-MANIFEST.md` — every image URL, source, and verification status (all 200).
- `LAYOUT-SHAPES-REPORT.md` — each gear's distinct layout shape + repetition check.
- `SWAP-MANIFEST.md` — real client asset swap list (placeholders → client photography).

## Notes on real client data

Address, phone, WhatsApp, Instagram and rating live in `src/lib/site.ts`. The
fleet (names, taglines, prices, specs) lives in `src/lib/fleet.ts`. Fleet imagery
uses verified best-match stock placeholders in the correct dark-cinematic
register — see `SWAP-MANIFEST.md` to replace them with real fleet photography.
