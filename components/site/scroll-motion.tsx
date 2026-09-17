"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/* ------------------------------------------------------------------
   One scroll engine for the whole page.

   Parallax and scrub are both "recompute a number on scroll, write it to
   an element". Done naively that is one listener and one rAF per element,
   which is how the first version of this page reached 3fps. Instead every
   subscriber joins a single registry driven by a single rAF, and only the
   ones an IntersectionObserver currently reports on screen are read or
   written at all. Off-screen work costs nothing.

   Everything written is either a transform or a custom property consumed
   by a transform, so no subscriber can trigger layout.
------------------------------------------------------------------ */

type Subscriber = {
  el: HTMLElement;
  /** Called with the element's progress through the viewport, 0 to 1. */
  apply: (progress: number, el: HTMLElement) => void;
  visible: boolean;
  /** Last value written, so an unchanged frame costs nothing at all. */
  last: number;
  /** Smallest change worth a write. */
  epsilon: number;
};

const subs = new Set<Subscriber>();
const byEl = new WeakMap<Element, Subscriber>();
const reads: { sub: Subscriber; p: number }[] = [];
let io: IntersectionObserver | null = null;
let frame = 0;
let running = false;

function measure(sub: Subscriber, vh: number) {
  const rect = sub.el.getBoundingClientRect();
  /*
   * 0 when the element's top edge first touches the bottom of the viewport,
   * 1 when its bottom edge leaves the top. Height is folded in so a tall
   * section and a short one both traverse the full range.
   */
  const span = rect.height + vh;
  const travelled = vh - rect.top;
  return Math.min(1, Math.max(0, travelled / span));
}

/*
 * Every read first, then every write.
 *
 * Interleaving them is what makes a scroll effect expensive: each write
 * invalidates layout, so the next getBoundingClientRect has to flush it again,
 * and a page with twenty subscribers pays for twenty layouts a frame instead of
 * one. Splitting the loop in two measurably recovered most of that.
 *
 * A subscriber whose value has not moved past its own epsilon is then skipped
 * entirely, so a section that is on screen but not actually moving, which is
 * most of them on any given frame, costs one rect read and nothing else.
 */
function tick() {
  frame = 0;
  const vh = window.innerHeight || 1;

  reads.length = 0;
  for (const sub of subs) {
    if (!sub.visible) continue;
    const p = measure(sub, vh);
    if (Math.abs(p - sub.last) < sub.epsilon) continue;
    sub.last = p;
    reads.push({ sub, p });
  }

  for (let i = 0; i < reads.length; i++) reads[i].sub.apply(reads[i].p, reads[i].sub.el);
  reads.length = 0;
}

function request() {
  if (frame) return;
  frame = requestAnimationFrame(tick);
}

function start() {
  if (running) return;
  running = true;
  io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const sub = byEl.get(entry.target);
        if (!sub) continue;
        sub.visible = entry.isIntersecting;
        /* Settle to a correct value on the frame it enters, not on the next
           scroll event, so an element scrolled past while the tab was hidden
           is never left at a stale offset. */
        if (entry.isIntersecting) request();
      }
    },
    /* Enough margin that an element's first painted frame is already correct,
       but not so much that a long page keeps a dozen off-screen subscribers
       being measured every frame. */
    { rootMargin: "12% 0px 12% 0px" },
  );
  window.addEventListener("scroll", request, { passive: true });
  window.addEventListener("resize", request, { passive: true });
}

function subscribe(el: HTMLElement, apply: Subscriber["apply"], epsilon = 0.0008) {
  start();
  /* -1 rather than 0, so the first measurement always passes the epsilon test
     and the element is written once even if it starts at exactly zero. */
  const sub: Subscriber = { el, apply, visible: false, last: -1, epsilon };
  subs.add(sub);
  byEl.set(el, sub);
  io?.observe(el);
  request();
  return () => {
    subs.delete(sub);
    byEl.delete(el);
    io?.unobserve(el);
  };
}

function reducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true
  );
}

/* ------------------------------------------------------------------
   Parallax: layers move at different speeds.
------------------------------------------------------------------ */

/**
 * Moves its contents against the scroll at a fraction of the page's speed, so a
 * surface behind the reading column sits at a different depth from the words on
 * it. `distance` is the total travel in pixels across the element's whole pass
 * through the viewport, not a multiplier, because a multiplier makes the travel
 * depend on how tall the element happens to be and a tall panel then flies.
 *
 * Kept deliberately small. Parallax reads as depth up to roughly 40px and as a
 * broken sticky element past it.
 */
export function Parallax({
  children,
  distance = 28,
  className = "",
  style,
  as: Tag = "div",
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
  style?: CSSProperties;
  /** So a parallax layer can still be the landmark it ought to be. */
  as?: "div" | "aside" | "figure";
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const inner = el.firstElementChild as HTMLElement | null;
    if (!inner) return;
    /* Half a pixel of travel. Below that nothing on screen changes, so the
       write is pure cost. */
    const eps = 0.5 / Math.max(1, distance);
    return subscribe(el, (p) => {
      /* Centred on the midpoint, so the element sits at its authored position
         when it is in the middle of the viewport and the offset is shared
         evenly between arriving and leaving. */
      inner.style.transform = `translate3d(0, ${((0.5 - p) * distance).toFixed(2)}px, 0)`;
    }, eps);
  }, [distance]);

  /*
   * The moved element is an inner wrapper rather than the host, because a
   * transform makes an element the containing block for anything absolutely
   * positioned inside it. The wrapper therefore has to carry the host's full
   * height, or a layer built out of `absolute inset-0` children collapses to
   * nothing. Against an auto-height host this resolves to auto and changes
   * nothing, so it is safe on both shapes.
   */
  return (
    <Tag ref={ref as never} className={className} style={style}>
      <div className="h-full">{children}</div>
    </Tag>
  );
}

/* ------------------------------------------------------------------
   Scrub: motion follows scroll progress.
------------------------------------------------------------------ */

/**
 * Publishes the element's progress through the viewport as `--scrub`, a number
 * from 0 to 1 that CSS can consume. Nothing here decides what moves; the
 * stylesheet does, which keeps the motion on the compositor and means a section
 * can change what it scrubs without touching any JavaScript.
 *
 * `from` and `to` narrow the window, so a rail can finish drawing by the time
 * the section is centred rather than only as it leaves.
 */
export function Scrub({
  children,
  as: Tag = "div",
  from = 0.1,
  to = 0.62,
  className = "",
}: {
  children: ReactNode;
  as?: "div" | "section";
  from?: number;
  to?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) {
      /* Reduced motion gets the finished state, not the starting one. An
         element whose CSS scales it from --scrub would otherwise stay at zero
         and simply never appear. */
      el.style.setProperty("--scrub", "1");
      return;
    }
    const range = Math.max(0.0001, to - from);
    let written = "";
    return subscribe(
      el,
      (p) => {
        const v = Math.min(1, Math.max(0, (p - from) / range));
        /*
         * Three decimals, and only when the printed value actually changes.
         * Setting a custom property invalidates style for everything beneath
         * it, and beneath a scrubbed list that is every row, so a write worth
         * nothing on screen is the single most expensive thing this file can
         * do. Quantising here is what keeps an eighteen row list free.
         */
        const next = v.toFixed(3);
        if (next === written) return;
        written = next;
        el.style.setProperty("--scrub", next);
      },
      /* Matched to the quantisation above, scaled back into progress space. */
      0.001 * range,
    );
  }, [from, to]);

  return (
    <Tag ref={ref as never} className={className} style={{ "--scrub": 0 } as CSSProperties}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------
   Two shapes built on Scrub that the whole site uses.
------------------------------------------------------------------ */

/**
 * The hairline at the top of a section, drawn as the section arrives rather
 * than already present before it. The static border underneath stays as the
 * track, so the divide is never a gap and nothing about the page's structure
 * depends on JavaScript having run.
 *
 * Its host is one pixel tall, so its progress is simply how far down the
 * viewport the line has travelled, and the window is set so the rule finishes
 * drawing while the section's heading is still arriving rather than as the
 * section leaves.
 */
export function SectionRule({ tone = "rgba(255,255,255,0.34)" }: { tone?: string }) {
  return (
    <Scrub
      className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px"
      from={0.04}
      to={0.42}
    >
      <span className="scrub-rule block h-px w-full" style={{ background: tone }} aria-hidden="true" />
    </Scrub>
  );
}

/**
 * A list whose items light in turn as the reader moves through it, each one
 * keyed to its own position rather than to a timer. A stagger fires once on
 * arrival and is over; this tracks the reader, so scrolling back up dims the
 * items again and the list always reflects where they actually are.
 *
 * `count` is what spaces the items along the scrub, so the component needs it
 * rather than counting children, which would not survive a fragment.
 */
export function ScrubList({
  children,
  count,
  className = "",
  from = 0.08,
  to = 0.66,
  as = "div",
}: {
  children: ReactNode;
  count: number;
  className?: string;
  from?: number;
  to?: number;
  as?: "div" | "section";
}) {
  return (
    <Scrub as={as} className={className} from={from} to={to}>
      {children}
    </Scrub>
  );
}
