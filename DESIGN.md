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


## Performance

The first version of this design was unusable and the design notes did not say so,
because nobody had measured it. Profiled on software rendering, which is the worst case:
**3fps on desktop and 7fps on a throttled phone**, with a continuous run of 400 to 570ms
long tasks. Three causes, compounding.

**The shader was doing about a hundred noise samples per pixel.** Four separate
four-octave fbm calls, plus `pow(x, 2.0)` six times where a multiply would do, on every
pixel of a full-screen quad at twice device resolution at sixty frames a second. It now
runs one octave where two was already generous, a constant brush angle with a linear
tilt on it, `exp(-(x*x))` instead of `exp(-pow(x,2))`, and squaring instead of `pow` in
the grade curve.

**It rendered at device resolution.** The surface is soft. It does not need retina
pixels, and asking for them costs four times the work for a difference nobody can point
at. It renders at CSS resolution now, capped at 760k pixels total so a large window
cannot quietly become expensive, at thirty frames a second because the highlight travels
on a hundred second cycle, and it stops completely once the hero scrolls off screen.

**A fixed full-viewport `backdrop-blur-xl` sat over a live canvas.** That forces the
compositor to re-blur the entire screen every frame. The shader already grades its own
falloff, so a plain gradient does the same visual work for nothing. `liquid-glass` lost
its 4px backdrop filter for the same reason: the 1.4px gradient stroke is what reads as
glass, and five of those over a moving surface is five backdrop composites a frame. The
nav keeps its blur only once it is opaque, which is exactly when there is content behind
it to blur.

Two more, smaller: links now prefetch on intent rather than on sight, which took the
home page from 86 requests to 50 by not fetching sixty route payloads for links inside a
panel nobody has opened; and the forty reveals on a long page share one
IntersectionObserver instead of creating forty.

Measured after, same software rendering:

| | Before | After |
| --- | --- | --- |
| Desktop, idle on hero | 3fps | 60fps |
| Desktop, while scrolling | 2fps | 60fps |
| Desktop long tasks | 24, averaging 470ms | 2, averaging 59ms |
| Phone at 4x CPU throttle, idle | 7fps | 61fps |
| Phone, while scrolling | 6fps | 60fps |
| Phone long tasks | 91, averaging 155ms | 3, averaging 126ms |
| Every inner page, scrolling | not measured | 60 to 61fps |
| Home page requests | 86 | 50 |

The look did not pay for it. The one-octave warp makes the streaks straighter, which
reads as more machined rather than less.


## Search and answer engines

The hard problem here is not ranking, it is identity. A much larger and much older
company called Playrix owns almost every signal for the near-identical string, so the
site has to establish that Plarix is a separate entity before any page can rank for its
own name.

**Entity signals.** The Organization graph now carries `legalName`, `alternateName`,
`slogan`, `foundingDate`, a NAICS code and a `disambiguatingDescription` that says in
plain words what this company is and is not. `/about` is a dedicated entity page with
`AboutPage` markup pointing at that same `@id`, an at-a-glance fact table, and a section
that names the confusion directly rather than hoping a reader works it out. An industry
classification separates two entities far better than a description does.

`sameAs` lists only profiles that actually exist. An unclaimed URL is a broken signal,
not a stronger one, so the rest of that list is the owner's to fill in.

**Answer blocks.** The home page, pricing, how it works and about each open with a
question and an answer written to be lifted whole. An answer engine quotes a passage,
not a page, and a passage that leads with the answer is the one it can use.

**Content with a reason to exist.** Two guides, each targeting a real question rather
than a keyword: how warranty claim recovery actually works, and whether hiring a
coordinator is worth it. Both end with an audit the reader can run themselves without
buying anything, which is the test of whether a page deserved to be written. Both carry
`Article` plus `FAQPage`, a `speakable` selector naming the passage to read first, and
their own question set. The glossary links each term to the process that handles it,
which is what turns eighteen definitions into a cluster rather than a list.

**Per-route social cards** are generated at build from one drawn layout, so a link to
any page carries that page's own title instead of a shared image.

**Feeds and discovery.** An RSS feed at `/feed.xml` generated from the same array the
journal renders from, a web manifest, `x-default` hreflang, and an `llms.txt` that leads
with direct answers, states the Playrix distinction explicitly, and names the one figure
an assistant should not cite.

Measured on the shipped build, all seventeen indexable routes:

| | Before | After |
| --- | --- | --- |
| Metadata defects | 14 | 0 |
| Titles over 62 characters | 2 | 0 |
| Descriptions outside 110 to 170 | 13 | 0 |
| Duplicate titles or descriptions | 0 | 0 |
| Routes without a social card | 1 | 0 |
| Schema types present | 8 | 10 |
| axe violations | 0 | 0 |

Ten schema types now resolve across the site: Organization, WebSite, Service, AboutPage,
Article, BreadcrumbList, DefinedTermSet, FAQPage, HowTo and ItemList.

**What the site cannot do for itself.** Ranking for the brand name depends mostly on
signals that live off this domain: Search Console and Bing Webmaster verification, a
Google Business Profile, claimed and consistent profiles on LinkedIn, X, Crunchbase and
GitHub, a Wikidata entry, and citations from trade publications. The code makes the
entity legible. It cannot make it known.


## The interaction layer

Four families of technique, eleven in total, layered onto the existing composition
rather than rebuilt around. Nothing here changed a layout: every one of them is either
a wrapper that carries a transform, a class on an element that already existed, or a
state the form already had and did not show.

**Scroll.** One engine drives all of it: a single `requestAnimationFrame` loop and a
single `IntersectionObserver` in `components/site/scroll-motion.tsx`, with subscribers
skipped entirely while off screen. One listener per element is how the first build of
this page reached 3fps, and this is the same lesson applied to a second system.

- *Parallax* moves the inner-page header material and the recovery report against the
  columns beside them. Travel is capped at 44px and 30px: past roughly forty pixels the
  effect stops reading as depth and starts reading as a sticky element that came loose.
- *Scrub* publishes progress as a `--scrub` custom property that CSS consumes, so the
  motion stays on the compositor and a section can change what it scrubs without
  touching any JavaScript. The method rail draws itself across the section as the
  section is read, and each of the three markers lands as the line reaches it rather
  than on a timer. The reading-progress hairline on articles is the same idea.
- *Pin and transform* holds the process detail pane while the six names travel past it.
  One `position: sticky`, no restructuring: the reader moves down the list and the
  answer stays where their eye already is.

**Reveal.** Fade and lift, and stagger, already existed. Clip reveal is new: section
headings and page titles uncover from the leading edge instead of fading, so display
weight is correct from the first frame rather than arriving through a grey.

**Hover.** Magnetic pull on the two hero controls and the form's submit, capped at 6px
so the target never moves out from under the click it is inviting. Image zoom applied
to the material this site actually has, which is not photographs: the wash behind a
panel lights and scales inside a frame that holds its exact box, so no type is
re-rasterised at a fractional scale and nothing around a hovered panel can reflow. Text
shift on the arrows was already there and stayed.

**Click.** Press compresses in 90ms on a linear-ish curve, because a compress that eases
reads as lag rather than as force, and releases on a curve that overshoots once and
settles. The count form now passes through all four states it always had internally:
idle, sending with a spinner, sent with a check held for 900ms, then the confirmation
panel. That hold exists because a request that succeeds in 200ms would otherwise replace
the form before the reader registers that their click did anything, and a form that
vanishes reads as an error.

### Two bugs this pass found, both measured rather than reasoned about

**`clip-path` hides an element from `IntersectionObserver`.** Chrome reports a clipped
element at intersection ratio 0. A heading that clipped itself could therefore never
trigger the reveal that would uncover it: it would have shipped permanently invisible on
the home page and on every inner page title. Proved with a two-element probe, identical
but for the clip: ratio 0.000 against ratio 1.000. The clip now lives on an inner
wrapper and the observed element is never clipped.

**A filled CSS animation owns `transform` for good.** An animated property outranks an
inline style, so a control that played its own `animate-blur-fade-up` entrance could
never afterwards be moved by hover or press. This had already been silently disabling
the `:active` press scale on both hero buttons before any of this work. Entrances now sit
on a wrapper; the control keeps its own transform. `Magnetic` uses three layers for the
same reason: entrance outside, magnetic offset in the middle, press on the control.

Reduced motion resolves every technique to its finished state, never its starting one,
and those overrides are placed after the rules they undo, because equal specificity
means source order decides and a reset written earlier loses silently.

### Measured on the shipped build

51fps on desktop and 56fps on a 4x-throttled phone while scrolling the entire page, zero
long tasks on desktop and one of 60ms on mobile. Fifteen routes at 390, 768, 1440 and
1920: no horizontal overflow, exactly one h1 each, no console errors, and every reveal
and clip resolved. All eleven techniques verified by reading computed style out of a real
browser rather than by inspection.


## Both hosts, one canonical

`www.plarix.dev` and `plarix.dev` both resolve, and www redirects permanently to the apex
with the path preserved. A redirect that collapses the path to the home page throws away
whatever the link was for and is treated as a soft 404.

Apex is the canonical because every signal already published names it: the canonical tag
on all nineteen routes, the sitemap's 27 URLs, the RSS feed, `llms.txt` and the
Organization markup. Choosing www would have meant rewriting all of them to point away
from the host being redirected to.

Search console ownership is read from `GOOGLE_SITE_VERIFICATION` and
`BING_SITE_VERIFICATION` so no token sits in the repository, and an unset variable drops
the tag rather than shipping an empty one, which is the usual reason a property quietly
fails to verify.
