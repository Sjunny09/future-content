# DESIGN.md — Future Content

Editorial, warm, premium. Light by default with deliberate dark sections for drama. The opposite of generic AI-SaaS.

## Color strategy

Committed-neutral: warm near-black and warm off-white carry the surface, brass-gold is the single committed accent (used with intent, not sprinkled). Dark sections (near-black) anchor the hero and key moments for contrast.

OKLCH (never #000 or #fff, neutrals tinted warm):

```
--bg:        oklch(0.98 0.004 95)    /* #FAFAF8 warm off-white */
--bg-warm:   oklch(0.96 0.008 90)    /* subtle warm panel */
--ink:       oklch(0.21 0.004 95)    /* #1A1A18 near-black, body + headings */
--ink-deep:  oklch(0.16 0.004 95)    /* #0F0F0D dark sections */
--gold:      oklch(0.75 0.075 80)    /* #C9A96E brass accent */
--gold-soft: oklch(0.90 0.04 85)     /* #F0E6D0 tints, fills */
--muted:     oklch(0.56 0.012 90)    /* warm gray secondary text */
--border:    oklch(0.91 0.008 90)    /* #E5E0D8 hairlines */
```

Accent discipline: gold on key CTAs, active states, the analysis "spine", and small marks. Not on every heading. Dark sections use gold + off-white text.

## Typography

- Display: Playfair Display (600/700) for headings and the hero. Editorial, premium.
- Text: Inter (400/500/600) for body and UI.
- Scale ratio >= 1.25. Hero clamp(2.5rem, 6vw, 4.75rem). Body 16-18px, line-length 65-72ch.
- Tracking: tight on large display (-0.02em), normal on body, wide uppercase (0.15em) for small labels/eyebrows.
- Hierarchy via scale + weight, not color.

## Layout

- Generous, varied vertical rhythm (sections breathe: 96-140px). Never uniform padding.
- Asymmetry over centered-everything. Editorial column + wide bleed images.
- Max content width ~1100px; full-bleed for hero and dark sections.
- Cards only where they are the right affordance (portfolio items, packages). No nested cards. No identical icon-card rows.
- Hairline borders (1px) and warm panels for separation, not boxes everywhere.

## Motion (Framer Motion)

- Reveal on scroll: opacity + small y (12-20px), ease-out-expo, 0.5-0.7s, staggered children.
- Hero: subtle, confident entrance. No bounce, no elastic.
- Hover: gold underline grows, image scale 1.02, arrow nudge. Never animate layout props (use transform/opacity).
- Respect prefers-reduced-motion.

## Components

- Eyebrow label (uppercase, tracked, gold) + display heading + lead paragraph: the section header pattern.
- Primary CTA: solid near-black pill, white text, gold on hover, "Plan een gesprek". Secondary: ghost with hairline border.
- Gold-underline link with arrow for navigation between sections.
- The analysis method as a vertical numbered "spine" (not a card grid): connected steps with a gold thread.
- Infographics: clean SVG, brand colors, line-based, editorial. No clip-art.

## Bans (enforced)

No gradient text, no side-stripe borders, no decorative glassmorphism, no hero-metric template, no identical card grids, no modal-first, no em-dashes. No purple/blue AI-gradient. No robot/brain/circuit imagery.
