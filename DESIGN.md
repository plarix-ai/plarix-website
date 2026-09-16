# Plarix — Design Direction

Replaces the previous direction entirely. The old look is evidence and anti-reference, not a base.

## Direction contract

**THESIS:** A cinematic, near-silent industrial page for a company whose product is invisible work.
The category sells itself with product screenshots, purple gradients and stock "AI" abstraction.
This refuses all three. There is no dashboard hero, because the promise is that the owner never has
to look at a dashboard. The page shows the world the work happens in, and then gets out of the way.

**OWN-WORLD:** Pure black ground. Behind the entire first viewport, a full-viewport fragment shader
renders light raking across brushed, machined metal: the logo's own material at viewport scale. A
single fixed blur veil masked to the bottom 45% lifts the type off it without darkening it. Type is
Inter, 300–600,
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
- No video, anywhere. The hero surface is drawn live at the device pixel ratio, which is the only
  way a background is genuinely sharp on a 4K or 5K panel; an encoded file cannot be. It also ships
  zero bytes of media.
- The surface is graded inside the shader, never under a scrim. SpaceX's rule: grade the image so
  the type lands cleanly on it.
- Every dark ramp is dithered. An eight bit near-black gradient bands into visible steps without it,
  and banding is the single most common tell of a cheap dark page.

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


## Reference world, and what was taken from each

Researched before the visual layer was rebuilt, and each borrowing is deliberate:

- **SpaceX / Tesla.** Two colours: black and white. No decorative chrome. Type sits directly on the
  imagery at full opacity with no scrim, because the imagery is graded to receive it. Hierarchy
  comes from scale contrast, never from colour. Spacing on a strict 4px grid.
- **Linear.** Near-black ground. Hairlines carry surface separation, not soft shadows, so no panel
  reads as a floating SaaS card. One accent, used scarcely. Linear deliberately refuses atmospheric
  gradients and spotlight cards; so does this.
- **Vercel.** Column rules marking the shell measure on wide displays, which reads as precision
  rather than decoration. Extreme negative tracking on display type.
- **Awwwards / Three.js work, 2026.** Real-time shaders over encoded media. SDF and raymarched
  surfaces have, in the literature's own phrase, virtually infinite resolution. That is the actual
  answer to "must be sharp at 4K and 8K", and it is why there is no video file in this repository.
- **Apple.** One idea per viewport. The restraint to leave most of the frame empty and black.

## Built result

**The hero surface.** A WebGL fragment shader: an anisotropic brushed-metal read, where a fine
screen-space grain modulates the coordinate at which a dark environment of three soft light bars is
sampled. The panel is gently formed rather than flat, so highlights bend as they travel on a roughly
100 second cycle. Grain is measured in CSS pixels so the brush reads at one density on any panel,
with one extra octave below that pitch which only a high-density display resolves. Output is
dithered at one part in 255. Brightness is graded up toward the top right and held down across the
navigation strip, so the headline in the lower left always sits on near black and the nav never
washes out. It pauses on tab hide, renders a single composed frame under `prefers-reduced-motion`,
and falls back to a composed radial surface if WebGL is missing or the context is lost. Verified in
all three states.

**Motion.** Two entrances, deliberately different weights. The hero plays a staggered blur-fade-up
once, 0 to 900ms. Anything that repeats, like the rotator swapping every five seconds, uses a 260ms
`swapIn` instead: a heavy entrance on a repeating element reads as the panel breaking rather than
changing, which is exactly how it failed on first build.

**Sections.** Four share a two-column head. Their bodies deliberately do not share a shape: a
directory with a live detail pane, a rail running through three moments, a full-width list of
refusals, three pricing surfaces, a two-column accordion, a paper-trail timeline.

**Raster inventory.** The logo lockup and mark, cropped tight from the source art, plus a 2400x1260
social card rendered from the live hero. Nothing else. There are no photographs, no stock, and no
video to compress.

Verified at 1920x1080, 1440x900 and 390x844 at 3x: no horizontal overflow, no console errors, small
labels above 4.5:1, the mechanical detector clean.


## Multi-page architecture

The site is nineteen real pages, not one page with anchor links. The navigation goes to
pages that exist and have their own reason to: `/processes` and one page per process,
`/how-it-works`, `/pricing`, `/company`, `/journal` and its posts, `/faq`, `/count`,
`/privacy`. That is a genuine surface for search and for an assistant, and it is how a
buyer actually reads: he wants the one thing he came for, not a scroll past five things
he did not.

**The nav.** Sticky on every page. At the top it is transparent and carries the full
lockup. Past 40px it collapses: the bar shortens from 4.75rem to 3.75rem, a blurred
surface and a hairline fade in, and the wordmark closes into the mark. The lockup is
composed from two exact crops of the source art rather than one flat image, with widths
derived from the art's own proportions, so the name slides away and nothing shifts a
pixel. The collapse uses hysteresis, 40px down and 8px back, so a logo sitting on the
threshold cannot flicker.

**Type.** One scale. Six display steps and five text steps, each with its own tracking
and leading; display tightens as it grows, body loosens as it shrinks. Nothing on the
site sets a size outside it. The scale sits at 80% of its first draft, which is the
difference between a billboard and a piece of software. The two smallest steps do not
take that reduction: label holds at 12px and caption at 13px, because below that they
stop being readable, and a scale that wins an argument with legibility has lost.

**Motion, and what earns it.** The hero entrance plays once. Section reveals are one
calm arrival each. Repeating elements get the 260ms `swapIn`, which never reaches zero
opacity, because a panel that blanks for a quarter second reads as broken rather than as
changing. Exactly one number on the site counts up. Links wipe their underline in with
`clip-path` rather than switching it on. Articles carry a reading-progress hairline and a
table of contents that tracks the section in view. Everything stays under 300ms except
the nav and logo transitions, which are movement rather than feedback.

**Inner pages** carry a static whisper of the hero's material behind their header, so
they are not plain documents, while the live shader stays a signature the home page alone
spends. Its dither is a real 96px tile, not `feTurbulence`.

**GEO and SEO.** Every page has a canonical, a written description, one h1, and stacked
JSON-LD: Organization, WebSite and Service site-wide, plus BreadcrumbList everywhere and
ItemList, FAQPage, HowTo, Service or Article as the page warrants. `llms.txt` states the
positioning, the six processes, the method, the pricing shape and the citable figures,
and explicitly tells an assistant which number not to cite. `robots.txt` names the
assistant crawlers and allows them.

Verified at 320, 390, 768, 1024, 1440 and 1920 across all eleven route shapes: no
horizontal overflow anywhere, no console errors, nothing below the legible type floor,
and the mechanical detector clean.


## Audit results

Measured rather than asserted, on the shipped build:

- **Accessibility.** axe-core against WCAG 2.0 and 2.1 A and AA, all twelve route shapes:
  zero violations. Tab order from a cold load runs skip link, logo, the four nav items,
  then the primary action, which is the order the page is written in.
- **Layout.** 320, 390, 768, 1024, 1440 and 1920 across every route: no horizontal
  overflow, exactly one h1 per page, no console errors, and nothing below the type floor.
- **Stability.** Cumulative layout shift 0.000 on the home page, pricing and a journal
  post. First contentful paint 60 to 232ms locally. The shader carries no layout cost
  because it is a fixed full-viewport canvas that never participates in flow.
- **Structured data.** FAQPage resolves on exactly one route. Repeating the same
  question set across three pages, which the first multi-page pass did, is duplicate
  structured data rather than three chances to be cited.

## Copy that reaches a user

Error text is written for the person reading it, not the person who wrote it. The lead
endpoint used to answer a failed submission with "Missing server configuration", which is
a sentence about our infrastructure shown to a contractor. It now says we could not
record it and names the email address that will.


## Compaction pass

The shell came in from 1440 to 1200, which is where a marketing page stops reading as a
wide dashboard. The scale came down another step with it, section rhythm tightened, and
the nav and logo shrank in proportion. The two smallest type steps still hold at 12 and
13px; the floor does not move when the scale does.

## Navigation that opens pages

Two of the four top level entries open a panel of real pages: Processes lists the six and
Resources lists the journal, glossary, questions and company. The panel is derived from
the same arrays the pages are generated from, so a menu entry cannot point at a page that
does not exist.

The trigger is a **link to the section index, not a toggle**. Hovering or focusing opens
the panel; clicking goes to the index. That was a correction: as a toggle button, hover
opened the panel and the click that followed closed it, which is a trap. As a link, a
click always does something useful, including on a phone where there is no hover and the
panel never opens at all. The mobile menu lists every child inline instead, so nothing in
the panel is reachable only by hovering.

Escape closes and returns focus to the trigger. Panel links are removed from the tab
order while closed. Verified with axe while open: zero violations.

## Content built for citation

`/glossary` publishes eighteen plain definitions of the vocabulary that shows up in a
warranty rejection or a supplier statement, marked up as a `DefinedTermSet` with one
`DefinedTerm` per entry and an anchor each. It is the single most quotable thing a site
like this can publish, and it is useful whether or not anyone ever buys anything.

`/integrations` names the platforms a shop actually runs on and states plainly what we
are not: no certified partnership, no reseller status, no app store listing. Read access
during the count, and anything that writes is scoped and approved first.

The journal is six pieces now, each teaching one specific mechanism, with the anchor
structure and `Article` markup an answer engine needs to quote a section rather than a
page.
