# Plarix — Design Direction

Replaces the previous direction entirely. The old look is evidence and anti-reference, not a base.

## Direction contract

**THESIS:** A cinematic, near-silent industrial page for a company whose product is invisible work.
The category sells itself with product screenshots, purple gradients and stock "AI" abstraction.
This refuses all three. There is no dashboard hero, because the promise is that the owner never has
to look at a dashboard. The page shows the world the work happens in, and then gets out of the way.

**OWN-WORLD:** Pure black ground. Full-bleed cinematic video of a suburban neighborhood at dusk,
lights coming on in sequence, held behind the entire first viewport. A single fixed blur veil masked
to the bottom 45% lifts the type off the footage without darkening it. Type is Inter, 300–600,
tracking -0.03em on display. Colour is monochrome: black, graphite, silver, off-white, taken
straight from the logo's own brushed-metal material. One warm amber note, used only where real money
is named. Controls are "liquid glass": near-transparent, 4px backdrop blur, a 1.4px gradient stroke
that catches light top and bottom, never a flat border. Pills for controls, 14–16px radius for
surfaces.

**STORY:** An owner lands and reads four words that name a problem he has never heard named. He
scrolls and sees the trail of work every job leaves behind. He sees the six processes we run, and
that warranty is one of them and not the company. He sees how we work, in three verbs. He sees what
we will never do, which is the part he actually believes. He books the count.

**FIRST VIEWPORT:** Full height. Video behind everything. Nav at top with an oversized logo lockup.
Content anchored to the bottom, not centred: three facts, one four-word headline at display scale,
one line of subhead, two buttons, and a rotating process panel on the right whose arrows do real
work. Everything arrives on a single staggered blur-fade-up, 0 to 900ms, and never repeats.

**FORM:** Code-led. Next.js App Router, Tailwind v4, Lucide icons, Framer Motion only where a spring
or scroll-linked value is genuinely needed; CSS transitions and keyframes everywhere else so motion
stays off the main thread.

**FINISH:** The hero entrance is the page's one authored moment. Every section below it gets a single
calm in-view reveal, not a second entrance competing with the first.

## Rules this build follows

- No eyebrow or kicker label above any heading. Anywhere. Ever.
- No same-size icon-card grid as a section's structure. Each section is its own composition.
- No gradient text. Emphasis is weight and size.
- No section numbers except where they mark real position in a sequence (the hero rotator counter).
- Display tracking -0.03em, never past -0.04em. Body measure 65–75ch.
- Glass is a specific material with a stated recipe, used on controls only, never sprinkled as decor.
- Elevation declared once: shadow or stroke, never a 1px border sitting under a wide soft shadow.
- Selection colour, focus rings, scrollbar and tabular numerals are themed from the palette.
- Every `:active` on a pressable element scales to 0.97. Every entrance eases out, never in.
- No em dashes in shipped copy.
- The video is progressive enhancement. The page is finished and cinematic with the video absent,
  failed, or suppressed by `prefers-reduced-motion`.

## Motion recipe

```
--ease-out:    cubic-bezier(0.23, 1, 0.32, 1)     entrances, reveals
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)    on-screen movement
```

Hero entrance 1000ms, stagger 50ms. Section reveals 700ms. Controls 160–220ms. Nothing in the UI
layer runs past 300ms.

## Built result

The hero backdrop is a canvas scene, not a placeholder. A perspective field of windows
recedes to a horizon at 30% viewport height; a bloom travels across the grid on a 21s
cycle so the neighbourhood is always lit and the motion reads as light moving through
it. The field fades out by 78% height on desktop and 50% on narrow screens, which is
what keeps the headline on clean black at every size. Lights are stamped from one
pre-rendered glow sprite rather than a per-light gradient, so the scene holds frame
rate with a few thousand points. It pauses on tab hide and renders a single composed
still under `prefers-reduced-motion`.

`public/video/hero.mp4` overrides it when present, checked on the server at build time
so no client code pays for the absence. See `public/video/README.md`.

Four sections share a two-column head (heading left, qualifying line right). Their
bodies deliberately do not share a shape: a directory with a live detail pane, a rail
running through three moments, a full-width list of refusals, three pricing surfaces, a
two-column accordion, a paper-trail timeline. Variety lives in the bodies.

Verified at 1440x900 and 390x844: no horizontal overflow, no console errors, small
labels above 4.5:1, the mechanical detector clean.
