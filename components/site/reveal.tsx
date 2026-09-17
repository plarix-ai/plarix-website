"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * One IntersectionObserver for the whole page rather than one per element. A long
 * page carries around forty reveals, and forty observers is forty setup costs on a
 * phone at hydration for a job a single shared observer does.
 */
let shared: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, () => void>();

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
          callbacks.get(entry.target)?.();
          callbacks.delete(entry.target);
          shared?.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.06 },
    );
  }
  callbacks.set(node, onEnter);
  shared.observe(node);
  return () => {
    callbacks.delete(node);
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
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
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
      data-visible={visible ? "true" : "false"}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${clip ? "reveal-clip " : ""}${className}`}
    >
      {clip ? <span className="clip-reveal-inner">{children}</span> : children}
    </Tag>
  );
}
