import Image from "next/image";
import Link from "next/link";

/**
 * The lockup, composed from two exact crops rather than one flat image, so the
 * wordmark can collapse into the mark on scroll without either part shifting.
 * Widths are derived from the source art's own proportions, held in CSS variables.
 */
const markW = "calc(var(--logo-h) * var(--logo-mark-ratio))";
const wordW = "calc(var(--logo-h) * var(--logo-word-ratio))";
const gap = "calc(var(--logo-h) * var(--logo-gap-ratio))";
/* The full lockup, mark plus gap plus wordmark, used to hold the space open. */
const lockupW =
  "calc(var(--logo-h) * (var(--logo-mark-ratio) + var(--logo-gap-ratio) + var(--logo-word-ratio)))";

export function Logo({
  collapsed = false,
  scale = 1,
  reserve = false,
  className = "",
}: {
  /** Drops the wordmark and closes the gap, leaving the mark alone. */
  collapsed?: boolean;
  /** Multiplies the shared logo height, for the footer's larger lockup. */
  scale?: number;
  /**
   * Hold the full lockup's width open whether or not the wordmark is showing.
   *
   * In a `justify-between` bar, a logo that narrows hands its width back to the
   * row and everything to its right slides over to take it. Reserving the space
   * means the collapse is a change to the logo alone: the navigation and the
   * call to action never move, which is the entire point of collapsing a logo
   * on scroll rather than just hiding one.
   */
  reserve?: boolean;
  className?: string;
}) {
  const h = scale === 1 ? "var(--logo-h)" : `calc(var(--logo-h) * ${scale})`;
  const s = (expr: string) => (scale === 1 ? expr : expr.replace("var(--logo-h)", h));

  return (
    <Link
      href="/"
      aria-label="Plarix, home"
      className={`inline-flex shrink-0 items-center ${className}`}
      style={reserve ? { width: s(lockupW) } : undefined}
    >
      <span className="relative block shrink-0" style={{ height: h, width: s(markW) }}>
        <Image
          src="/brand/plarix-mark.png"
          alt=""
          fill
          sizes="80px"
          priority
          className="object-contain"
        />
      </span>

      <span
        className="relative block overflow-hidden"
        style={{
          height: h,
          width: collapsed ? 0 : s(wordW),
          marginLeft: collapsed ? 0 : s(gap),
          opacity: collapsed ? 0 : 1,
          filter: collapsed ? "blur(3px)" : "blur(0px)",
          transition:
            "width 480ms var(--ease-out), margin-left 480ms var(--ease-out), opacity 260ms var(--ease-out), filter 260ms var(--ease-out)",
        }}
      >
        <Image
          src="/brand/plarix-wordmark.png"
          alt="Plarix"
          width={957}
          height={333}
          priority
          className="block max-w-none"
          style={{ height: h, width: s(wordW) }}
        />
      </span>
    </Link>
  );
}
