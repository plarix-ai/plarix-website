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
};

const subs = new Set<Subscriber>();
const byEl = new WeakMap<Element, Subscriber>();
let io: IntersectionObserver | null = null;
let frame = 0;
let running = false;

function measure(sub: Subscriber) {
  const rect = sub.el.getBoundingClientRect();
  const vh = window.innerHeight || 1;
  /*
   * 0 when the element's top edge first touches the bottom of the viewport,
   * 1 when its bottom edge leaves the top. Height is folded in so a tall
   * section and a short one both traverse the full range.
   */
  const span = rect.height + vh;
  const travelled = vh - rect.top;
  return Math.min(1, Math.max(0, travelled / span));
}

function tick() {
  frame = 0;
  for (const sub of subs) {
    if (!sub.visible) continue;
    sub.apply(measure(sub), sub.el);
  }
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
    /* A generous margin so an element is subscribed slightly before it is
       seen and its first painted frame is already correct. */
    { rootMargin: "20% 0px 20% 0px" },
  );
  window.addEventListener("scroll", request, { passive: true });
  window.addEventListener("resize", request, { passive: true });
}

function subscribe(el: HTMLElement, apply: Subscriber["apply"]) {
  start();
  const sub: Subscriber = { el, apply, visible: false };
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
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const inner = el.firstElementChild as HTMLElement | null;
    if (!inner) return;
    inner.style.willChange = "transform";
    return subscribe(el, (p) => {
      /* Centred on the midpoint, so the element sits at its authored position
         when it is in the middle of the viewport and the offset is shared
         evenly between arriving and leaving. */
      inner.style.transform = `translate3d(0, ${((0.5 - p) * distance).toFixed(2)}px, 0)`;
    });
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
    <div ref={ref} className={className} style={style}>
      <div className="h-full">{children}</div>
    </div>
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
    return subscribe(el, (p) => {
      const v = Math.min(1, Math.max(0, (p - from) / range));
      el.style.setProperty("--scrub", v.toFixed(4));
    });
  }, [from, to]);

  return (
    <Tag ref={ref as never} className={className} style={{ "--scrub": 0 } as CSSProperties}>
      {children}
    </Tag>
  );
}
