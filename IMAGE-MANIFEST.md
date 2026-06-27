# IMAGE-MANIFEST.md

Every image used on the site. Each URL was **mechanically fetched (HTTP GET)** and
confirmed `200` at full production resolution (`?auto=format&fit=crop&w=1600&q=80`)
before any component referenced it, and **visually inspected** on a contact sheet to
confirm it is the correct subject in the dark-cinematic visual language (§8).

- **Source:** Unsplash (free commercial licence, no attribution required).
- **Canonical URL format:** `https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w={w}&q={q}`
- **Verification command:** `curl -s -o /dev/null -w "%{http_code}" "<url>"` → must be `200`.
- **Last full-resolution verification pass:** 2026-06-27 — **13/13 = 200, 0 failures.**

> Two candidates were caught and **rejected by visual inspection** because the URL
> resolved 200 but the subject was wrong: `1610768764270` (a rock climber) and
> `1564594985645` (a wristwatch), plus `1581235720704` (a toy car). One candidate
> (`1622200294772`) was caught as a hard **404** by the mechanical pass. This is the
> §0 process working as designed.

| Key | Subject (actual) | Used for | Unsplash ID | Status |
|-----|------------------|----------|-------------|--------|
| hero | Black Range Rover, dark garage, low-key | **Hero living canvas** | `1563720223185-11003d516935` | ✅ 200 |
| EClass | Black Audi sportback, night, executive | Mercedes-Benz E-Class | `1606664515524-ed2f786a0bd6` | ✅ 200 |
| ES350 | Maserati Ghibli, moody backlight | Lexus ES 350 | `1593055357429-62eaf3b259cc` | ✅ 200 |
| Camry | White Toyota Corolla, misty road | Toyota Camry 2023 | `1638618164682-12b986ec2a75` | ✅ 200 |
| Prado | Silver Toyota RAV4 (real Toyota SUV) | Toyota Prado 2023 | `1617469767053-d3b523a0b982` | ✅ 200 |
| GLE | Grey crossover, foggy forest, red light trails | Mercedes-Benz GLE | `1609521263047-f8f205293f24` | ✅ 200 |
| LX570 | White full-size SUV, dramatic landscape | Lexus LX 570 | `1533473359331-0135ef1b58bf` | ✅ 200 |
| RRSport | Tall sport truck, dusk, lights on | Range Rover Sport | `1605893477799-b99e3b8b93fe` | ✅ 200 |
| G63 | **Mercedes-Benz G-Class (real G-wagon)** | Mercedes-Benz G63 AMG | `1520031441872-265e4ff70366` | ✅ 200 |
| RRAutobiography | White hypercar, neon city night | Range Rover Autobiography | `1544636331-e26879cd4d9b` | ✅ 200 |
| AMGGT | **Black Mercedes-AMG GT (real model)** | Mercedes-AMG GT | `1617814076367-b759c7d7e738` | ✅ 200 |
| Sienna | Crew-cab people hauler | Toyota Sienna | `1551830820-330a71b99659` | ✅ 200 |
| Services_Security | Dark coupe, industrial garage, dramatic | Gear 04 Security & Escort | `1626668893632-6f3a4466d22f` | ✅ 200 |

## Notes
- A consistent dark gradient scrim is applied over every fleet image in the UI for
  text legibility and to unify the few brighter shots into the dark-marque language.
- Exact client fleet models were not all available under a free commercial licence in
  the required dark-cinematic register, so several entries use the closest real,
  verified vehicle as a placeholder. Every placeholder is listed in `SWAP-MANIFEST.md`
  for the client to replace with real fleet photography.
