"use client";

import { useEffect, useRef } from "react";

/**
 * A hairline under the sticky nav showing how far through an article the reader is.
 * Written straight to the element's transform on scroll, never through React state,
 * so it cannot cause a render on every frame.
 */
export function ReadingProgress() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="pointer-events-none sticky z-40 h-px w-full bg-transparent"
      style={{ top: "var(--nav-h-compact)" }}
      aria-hidden="true"
    >
      <div ref={ref} className="h-px w-full origin-left bg-white/45" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}
