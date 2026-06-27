# LAYOUT-SHAPES-REPORT.md

Each gear owns a **distinct layout shape**. The Repetition Test: no two *adjacent*
gears may share the same shape. Two sections sharing a shape is treated as a bug.

| Gear | Name | Layout shape | Distinct from neighbour? |
|------|------|--------------|--------------------------|
| 01 | Hero | Full-bleed **fixed photo canvas** + oversized serif headline, animated ₦ stat, cycling subline, two CTAs. No cards, no grid, no chrome. | — |
| 02 | Trust Strip | Full-width **horizontal bar**: mono stats, thin vertical rules, single entrance then silence. 56px tall. No cards. | ✅ vs 01 (bar ≠ canvas) |
| 03 | The Fleet | Full-viewport **carousel** — one car dominates, neighbours scaled `0.86`/`0.35`. Category tabs (layoutId underline) + slide-up specs drawer + velocity marquee. | ✅ vs 02 (carousel ≠ bar) |
| 04 | Services | **Featured asymmetric block** (Security & Escort, 58/42 split) + compact 4-up icon row below. Not equal cards. | ✅ vs 03 (split block ≠ carousel) |
| 05 | Why CIA | Tight **6-up spec-sheet grid** (3×2), hairline dividers only — no cards, no shadows, no background. | ✅ vs 04 (data grid ≠ featured block) |
| 06 | Story | Two sub-beats, 120px apart: **(A)** three numbered fragments with giant faded Cormorant numerals + a single connecting hairline; **(B)** one centred italic testimonial, word-by-word reveal, no card. | ✅ vs 05 (numerals/quote ≠ data grid) |
| 07 | Reserve | **Split-panel** — editorial contact block (left) + functional booking form (right). | ✅ vs 06 (form panel ≠ numerals/quote) |

## Adjacency check (the rule)

```
01 canvas    → 02 bar          ✓ different
02 bar       → 03 carousel     ✓ different
03 carousel  → 04 split block  ✓ different
04 split     → 05 data grid    ✓ different
05 grid      → 06 numerals/quote ✓ different
06 story     → 07 split-panel form ✓ different
```

**No two adjacent gears share a shape. Repetition Test: PASS.**

## Within Gear 06

How-It-Works (numbered fragments + connecting rule) and Testimonial (single centred
serif quote) are sub-beats inside Gear 06, separated by 120px of vertical space, and
use **different internal shapes** — satisfying the "no adjacent shape repeat" rule at
the sub-beat level too.

## Permanently banned (verified absent)

- One repeated card shape across sections — not used; each gear is bespoke.
- Floating `ud` avatar / badge / debug widget — not present anywhere.
- Uniform `whileHover={{ scale: 1.05 }}` on every card — not used; hovers are
  per-context (variant propagation on the featured block, single-axis `x:4` on
  compact items).
