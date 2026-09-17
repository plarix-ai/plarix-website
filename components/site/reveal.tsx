"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

/**
 * One IntersectionObserver for the whole page rather than one per element. A long
 * page carries around forty reveals, and forty observers is forty setup costs on a
 * phone at hydration for a job a single shared observer does.
 */
let shared: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, () => void>();

/**
 * Everything still waiting, so the page bottom can flush what the observer's
 * bottom margin will never reach on its own.
 */
const pending = new Set<Element>();

function fire(node: Element) {
  callbacks.get(node)?.();
  callbacks.delete(node);
  pending.delete(node);
  shared?.unobserve(node);
}

/*
 * The rootMargin below shrinks the bottom of the root by 10% so an element
 * reveals just after it enters rather than exactly at the edge. That margin is
 * unsatisfiable for anything sitting in the last 10% of the document: the page
 * cannot scroll any further, so the element never reaches the shrunk root and
 * stays at opacity 0 for good. The footer's last row is exactly that element,
 * on every page.
 *
 * So the document bottom flushes whatever is left. Checked on scroll and on
 * resize, since a resize can put the page at its end without a scroll event.
 */
function atBottom() {
  return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
}

function flushIfBottomed() {
  if (!pending.size || !atBottom()) return;
  for (const node of [...pending]) fire(node);
}

function observe(node: Element, onEnter: () => void) {
  if (typeof IntersectionObserver === "undefined") {
    onEnter();
    return () => {};
  }
  if (!shared) {
    shared = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          fire(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.06 },
    );
    window.addEventListener("scroll", flushIfBottomed, { passive: true });
    window.addEventListener("resize", flushIfBottomed, { passive: true });
  }
  callbacks.set(node, onEnter);
  pending.add(node);
  shared.observe(node);
  /* A short page can already be at its end on load, before any scroll. */
  requestAnimationFrame(flushIfBottomed);
  return () => {
    callbacks.delete(node);
    pending.delete(node);
    shared?.unobserve(node);
  };
}

/**
 * The one calm entrance sections get. The hero owns the page's authored moment;
 * everything below simply arrives once, from an already-visible resting state.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  clip = false,
  style,
  id,
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  /**
   * Stays on the outer element, which is the one a heading anchor, the table of
   * contents and a deep link all point at. Putting it on the clip wrapper would
   * silently move every anchor on an article one element inward.
   */
  id?: string;
  className?: string;
  /** Merged under the delay, so an item can also publish its own custom props. */
  style?: CSSProperties;
  /**
   * Uncover the contents from the leading edge instead of fading them in.
   *
   * The clip goes on an inner wrapper, never on the observed element, and that
   * is not a style preference. Chrome reports an element with a `clip-path` to
   * IntersectionObserver at ratio 0, so a clipped element can never trigger the
   * reveal that would unclip it: it stays invisible for good. Measured, not
   * assumed, with the same observer options this file uses.
   */
  clip?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    return observe(node, () => setVisible(true));
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      data-visible={visible ? "true" : "false"}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
      className={`reveal ${clip ? "reveal-clip " : ""}${className}`}
    >
      {clip ? <span className="clip-reveal-inner">{children}</span> : children}
    </Tag>
  );
}
