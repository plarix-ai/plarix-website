"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a figure up once, the first time it is seen. Used on exactly one number on
 * the site. A page where every number animates is a page nobody believes.
 */
export function Counted({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    const digits = value.replace(/[^0-9]/g, "");
    const target = Number(digits);
    if (!digits || !Number.isFinite(target)) return;

    const prefix = value.slice(0, value.indexOf(digits[0]));
    const format = (n: number) => prefix + Math.round(n).toLocaleString("en-US");

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const DURATION = 1100;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION);
          // exponential ease out, so it lands rather than crawls
          const eased = 1 - Math.pow(1 - t, 4);
          setShown(format(target * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        setShown(format(0));
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.45 },
    );
    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {shown}
    </span>
  );
}
