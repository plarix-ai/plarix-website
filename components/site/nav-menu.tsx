"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

export type PanelItem = { label: string; href: string; description: string };

/**
 * A top level entry that opens a panel of real pages.
 *
 * The trigger is a link to the section index, not a toggle. Hovering or focusing it
 * opens the panel; clicking it goes to the index page. That means a click always does
 * something useful, including on a phone where there is no hover and the panel never
 * opens, and it removes the trap where hover opens the menu and the click that
 * follows closes it again.
 *
 * Escape closes and returns focus. Tab moves through the panel and out the far side.
 */
export function NavMenu({
  label,
  items,
  blurb,
  indexHref,
  footerLinks,
  active,
}: {
  label: string;
  items: PanelItem[];
  blurb: string;
  indexHref: string;
  footerLinks: { label: string; href: string }[];
  active: boolean;
}) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const id = useId();

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  // A short grace period so crossing the gap between trigger and panel does not
  // close it out from under the pointer.
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  useEffect(() => cancelClose, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      wrap.current?.querySelector("a")?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div
      ref={wrap}
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType !== "touch") {
          cancelClose();
          setOpen(true);
        }
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "touch") scheduleClose();
      }}
      onBlurCapture={(e) => {
        if (!wrap.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <Link
        href={indexHref}
        aria-expanded={open}
        aria-controls={id}
        aria-haspopup="true"
        aria-current={active ? "page" : undefined}
        onFocus={() => setOpen(true)}
        className={`link-sweep flex items-center gap-1.5 t-body-sm transition-colors duration-200 ${
          active || open ? "text-white" : "text-text-secondary hover:text-white"
        }`}
      >
        {label}
        <ChevronDown
          size={14}
          strokeWidth={2}
          aria-hidden="true"
          className="transition-transform duration-200 ease-out"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
        />
      </Link>

      <div
        id={id}
        className="absolute left-1/2 top-full z-50 pt-3 transition-all duration-200"
        style={{
          transform: `translateX(-50%) translateY(${open ? "0" : "-6px"})`,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transitionTimingFunction: "var(--ease-out)",
          width: items.length > 4 ? "42rem" : "24rem",
        }}
      >
        <div className="overflow-hidden rounded-2xl bg-ink-800 shadow-[0_28px_70px_-16px_rgba(0,0,0,0.95)] ring-1 ring-hairline-strong">
          <p className="px-5 pt-5 t-caption text-text-tertiary">{blurb}</p>

          <ul className={`grid gap-0.5 p-2.5 ${items.length > 4 ? "sm:grid-cols-2" : ""}`}>
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  tabIndex={open ? 0 : -1}
                  className="block rounded-xl px-3 py-3 transition-colors duration-150 hover:bg-white/[0.06]"
                >
                  <span className="block t-body-sm font-medium text-white">{item.label}</span>
                  <span className="mt-1 block t-caption text-text-tertiary">
                    {item.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="border-t border-hairline">
            {footerLinks.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                tabIndex={open ? 0 : -1}
                className="group flex items-center justify-between gap-4 px-5 py-3.5 transition-colors duration-150 hover:bg-white/[0.04]"
              >
                <span className="t-body-sm text-text-secondary transition-colors duration-150 group-hover:text-white">
                  {f.label}
                </span>
                <ArrowRight
                  size={15}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="text-text-tertiary transition-all duration-200 ease-out group-hover:translate-x-0.5 group-hover:text-white"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
