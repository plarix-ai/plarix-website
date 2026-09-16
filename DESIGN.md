# Plarix — Design Direction

## Direction contract

**THESIS:** A B2B utility product for people who don't want to be sold to — the page proves it by refusing to decorate. No kicker labels, no icon-card grids, no matching-entrance animations. The category default here is the generic SaaS template (six-card grids, badge pills over every heading); this refuses it by building each section as a distinct composition instead of the same shell reused twelve times.

**OWN-WORLD:** Near-black (`slate-950`) ground, off-white text, one warm gold accent (`amber-500`) used only for real dollar figures and the primary CTA — nowhere else. Geist throughout. Sharp corners (no radius) as the consistent geometric signature — a ledger/precision feel, not a rounded-friendly SaaS feel. Depth comes from soft tinted shadows and subtle gradient glow, never from borders stacked on borders.

**STORY:** A shop owner reading on a phone between jobs understands in one scroll: there's money sitting unfiled, Plarix finds it for free, files it, and only gets paid when they do. Nothing here asks for trust before it's earned — the pricing is public, the promises are specific, the FAQ answers the skeptical questions directly.

**FIRST VIEWPORT:** Full-height hero, centered, one confident headline at real display scale (not a template hero-with-badge), a one-line proof-first subhead, a single gold CTA. Behind it: a slow, barely-there radial glow using the brand's own graphite-to-white gradient — not a neon AI-glow, a suggestion of the logo's own material.

**FORM:** Code-led, no comp round (session has no practical image-gen/decision-page loop available; brief is already explicit and specific — dark, Linear-reference, premium, remarkable). Reference world: Linear's own marketing site — restrained color, confident oversized type, generous whitespace, sections that vary in composition rather than repeating a card-grid shell, motion that's purposeful and singular rather than scattered.

**FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Rules this build follows (from the Impeccable craft floor)

- No eyebrow/kicker pill above any heading, anywhere. Ever.
- No default "bordered box grid" as a section's structure. Cards only where grouping genuinely needs a boundary (pricing tiers), and then a soft shadow, never a border-plus-shadow ghost card.
- No repeated identical per-word blur-in heading animation on every section — that's one entrance, scattered. The hero gets the signature moment; other sections get a single calm fade/slide.
- No "big number / small label / accent" stat-tile template as the default stats treatment.
- Tracking stays in the -0.02em to -0.03em range for display type, not maxed to -0.04em.
- Selection color, focus rings, and tabular numerals are themed from the palette, not left as browser defaults.
