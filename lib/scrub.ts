import type { CSSProperties } from "react";

/**
 * Where item `i` of `count` sits along a ScrubList, published as `--at` for the
 * stylesheet to compare against `--scrub`.
 *
 * This is a plain module rather than part of `scroll-motion.tsx` because that
 * file is a client component, and a server component cannot call a function
 * exported from one. Every list this is used on is server rendered.
 */
export function at(i: number, count: number): CSSProperties {
  /* Spread across the first 78% of the range so the last item lights before
     the list has fully left, rather than exactly as it goes. */
  return { "--at": ((i / Math.max(1, count)) * 0.78).toFixed(4) } as CSSProperties;
}
