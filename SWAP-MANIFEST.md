# SWAP-MANIFEST.md

Assets and copy to replace with **real CIA Luxury Fleets** material before/at launch.
None of this is fabricated client data presented as real — it is clearly-marked
placeholder imagery in the correct visual language, plus a few content fields to
confirm.

## 1. Fleet & hero photography (highest priority)

Free stock under a commercial licence does not contain every exact client model in
the required dark-cinematic register, so each fleet entry currently uses the closest
real, verified vehicle as a placeholder. Replace the image **id** in
`src/lib/images.ts` (`IMAGE_IDS`) with the client's own photo for each car. Keep the
dark, low-key, 3/4-view visual language (§8) so the set stays coherent.

| Slot | Current placeholder (subject) | Client photo needed | Match quality |
|------|-------------------------------|---------------------|---------------|
| `hero` | Black Range Rover, dark garage | Flagship hero — G63 AMG or Range Rover, blue hour | Strong (luxury SUV, dark) |
| `g63` | **Real Mercedes G-Class** | Mercedes-Benz G63 AMG | Excellent (correct model) |
| `amggt` | **Real black Mercedes-AMG GT** | Mercedes-AMG GT | Excellent (correct model) |
| `prado` | Real silver Toyota RAV4 | Toyota Prado 2023 | Good (Toyota SUV) |
| `camry` | Real white Toyota Corolla | Toyota Camry 2023 | Good (Toyota sedan) |
| `eclass` | Black executive sportback | Mercedes-Benz E-Class | Fair (dark sedan) |
| `es350` | Maserati Ghibli (dark) | Lexus ES 350 | Fair (luxury sedan look) |
| `gle` | Crossover, foggy forest | Mercedes-Benz GLE | Fair (dark SUV) |
| `lx570` | Full-size SUV, landscape | Lexus LX 570 | Fair (full-size SUV) |
| `rrsport` | Tall sport truck, dusk | Range Rover Sport | Fair (tall, sporty) |
| `rrauto` | White hypercar, neon night | Range Rover Autobiography | Placeholder (statement energy) — **swap recommended** |
| `sienna` | Crew-cab people hauler | Toyota Sienna (MPV) | Placeholder — **swap recommended** (no free dark MPV available) |
| `security` (Gear 04) | Dark coupe, industrial garage | Security/escort scene or convoy | Placeholder (mood match) |

> After swapping, re-run the verification pass (any HTTP 200 source or local
> `/public` asset) and update `IMAGE-MANIFEST.md`.

## 2. Content fields to confirm (`src/lib/site.ts`)

These are the details supplied in the brief — confirm they are current:

- Phone / WhatsApp: `+234 907 583 1505`
- Instagram: `@cialuxuryfleets`
- Address: Ada-George Road, Rumuafrikom, Port Harcourt 500272, Rivers State
- Rating: `4.8` ★ (and review count `55` in the JSON-LD / layout.tsx)

## 3. Fleet data to confirm (`src/lib/fleet.ts`)

- Per-car names, taglines (≤6 words), prices, seats, transmission. Add/remove cars
  here; the carousel, tabs, and booking form's vehicle list update automatically.

## 4. Testimonial (`src/components/gears/Gear06HowTestimonial.tsx`)

- Quote currently: *"Enjoyed the ride, and the security service is top-notch."* —
  attributed to "Verified client". Replace with a real, attributable review when
  available.

## 5. Booking email (optional, `.env`)

- Add `RESEND_API_KEY`, `BOOKING_TO_EMAIL`, `BOOKING_FROM_EMAIL` to receive booking
  emails. Until then, submissions are acknowledged in-UI and routed to WhatsApp.

## 6. SEO / OpenGraph

- `NEXT_PUBLIC_SITE_URL` — set to the real production domain so canonical + OG URLs
  and the JSON-LD `url` resolve correctly.
- The OG image currently reuses the hero photo; swap to a branded OG card if desired.
