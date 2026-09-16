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

export function Logo({
  collapsed = false,
  scale = 1,
  className = "",
}: {
  /** Drops the wordmark and closes the gap, leaving the mark alone. */
  collapsed?: boolean;
  /** Multiplies the shared logo height, for the footer's larger lockup. */
  scale?: number;
  className?: string;
}) {
  const h = scale === 1 ? "var(--logo-h)" : `calc(var(--logo-h) * ${scale})`;
  const s = (expr: string) => (scale === 1 ? expr : expr.replace("var(--logo-h)", h));

  return (
    <Link
      href="/"
      aria-label="Plarix, home"
      className={`inline-flex shrink-0 items-center ${className}`}
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
