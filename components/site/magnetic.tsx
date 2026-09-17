"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * The control leans toward the cursor as it approaches, then returns when it
 * leaves. Pull is capped at a few pixels: enough that the button feels alive
 * under the hand, never enough to move the hit target out from under a click,
 * which is the failure mode of every magnetic button that overdoes it.
 *
 * Pointer position is read on pointermove and written on the next frame as a
 * transform, so it never reads layout mid-gesture and never leaves the
 * compositor. Coarse pointers and reduced motion opt out entirely: there is no
 * cursor to follow on a phone, and the whole effect is decoration there.
 */
export function Magnetic({
  children,
  strength = 0.28,
  max = 6,
  className = "",
  style,
}: {
  children: ReactNode;
  /** Fraction of the cursor's offset from centre the control travels. */
  strength?: number;
  /** Hard cap on travel, in pixels, in either axis. */
  max?: number;
  className?: string;
  /**
   * Any entrance animation belongs here rather than on the control inside.
   * A filled CSS animation keeps ownership of `transform` for good, and an
   * animated property outranks an inline style, so a control that plays its
   * own entrance can never afterwards be moved by hover or press. Putting the
   * entrance on the wrapper leaves the control's own transform free.
   */
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const mover = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;

    const fine = window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;
    const still = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!fine || still) return;

    const target = mover.current;
    if (!target) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const write = () => {
      frame = 0;
      target.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    };

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * strength;
      const dy = (e.clientY - (r.top + r.height / 2)) * strength;
      x = Math.max(-max, Math.min(max, dx));
      y = Math.max(-max, Math.min(max, dy));
      if (!frame) frame = requestAnimationFrame(write);
    };

    const release = () => {
      x = 0;
      y = 0;
      if (!frame) frame = requestAnimationFrame(write);
    };

    const onEnter = () => {
      /* Only transition on the way out. Following the cursor has to be
         immediate or the control lags behind the hand; returning to rest is
         the part that wants easing. */
      target.style.transition = "none";
    };
    const onLeave = () => {
      target.style.transition = "transform 320ms var(--ease-out)";
      release();
    };

    host.addEventListener("pointerenter", onEnter);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    /* A click can move focus and never fire pointerleave. Reset there too so a
       control can never be left parked off centre. */
    host.addEventListener("blur", onLeave, true);

    return () => {
      cancelAnimationFrame(frame);
      host.removeEventListener("pointerenter", onEnter);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("blur", onLeave, true);
      target.style.transform = "";
      target.style.transition = "";
    };
  }, [strength, max]);

  /*
   * Three layers, because three different things want to own a transform and
   * only one of them can own it on any given element. The outer span takes
   * any entrance animation, the inner span takes the magnetic offset, and the
   * control itself keeps its own transform free for press and hover. Writing
   * the offset onto the control instead would also mean writing an inline
   * `transition` onto it, which silently replaces the control's own press
   * spring; that is exactly what this structure avoids.
   */
  return (
    <span ref={ref} className={`inline-flex ${className}`} style={style}>
      <span ref={mover} className="inline-flex">
        {children}
      </span>
    </span>
  );
}
