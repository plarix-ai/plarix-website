"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Logo } from "./logo";
import { NavMenu, type PanelItem } from "./nav-menu";
import { nav, processes } from "@/content/site";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Hysteresis: collapse at 40px, expand again at 8px, so a logo sitting
    // exactly on the threshold cannot flicker between the two states.
    let state = false;
    const onScroll = () => {
      const y = window.scrollY;
      const next = state ? y > 8 : y > 40;
      if (next !== state) {
        state = next;
        setCompact(next);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  /** Panel contents, derived so the menu cannot drift from the pages it points at. */
  const panelItems = (entry: (typeof nav)[number]): PanelItem[] => {
    if (!("panel" in entry) || !entry.panel) return [];
    const fromProcesses: PanelItem[] =
      entry.panel.source === "processes"
        ? processes.map((p) => ({
            label: p.name,
            href: `/processes/${p.slug}`,
            description: p.short,
          }))
        : [];
    return [...fromProcesses, ...entry.panel.extra];
  };

  return (
    <header className="sticky top-0 z-50">
      {/*
        The bar's own surface, faded in rather than switched on, so the nav
        separates from the page only once there is a page behind it.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 border-b transition-[opacity,background-color] duration-500"
        style={{
          opacity: compact ? 1 : 0,
          background: "rgba(4, 5, 7, 0.88)",
          backdropFilter: "blur(20px) saturate(140%)",
          WebkitBackdropFilter: "blur(20px) saturate(140%)",
          borderColor: "var(--hairline)",
          transitionTimingFunction: "var(--ease-out)",
        }}
      />

      <div
        className="shell relative flex items-center justify-between transition-[height] duration-500"
        style={{
          height: compact ? "var(--nav-h-compact)" : "var(--nav-h)",
          transitionTimingFunction: "var(--ease-out)",
        }}
      >
        <Logo collapsed={compact} />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {nav.map((item) =>
            "panel" in item && item.panel ? (
              <NavMenu
                key={item.href}
                label={item.label}
                items={panelItems(item)}
                blurb={item.panel.blurb}
                indexHref={item.href}
                footerLinks={[...item.panel.footerLinks]}
                active={isCurrent(item.href)}
              />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrent(item.href) ? "page" : undefined}
                className={`link-sweep t-body-sm transition-colors duration-200 ${
                  isCurrent(item.href) ? "text-white" : "text-text-secondary hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            href="/count"
            className="liquid-glass hidden rounded-full px-5 py-2.5 t-body-sm font-medium text-white sm:inline-flex md:px-6"
          >
            Get your count
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="liquid-glass relative flex h-11 w-11 items-center justify-center rounded-full text-white lg:hidden"
          >
            <Menu
              size={18}
              className="absolute transition-all duration-300 ease-out"
              style={{ opacity: open ? 0 : 1, transform: open ? "rotate(180deg) scale(0.5)" : "none" }}
            />
            <X
              size={18}
              className="absolute transition-all duration-300 ease-out"
              style={{ opacity: open ? 1 : 0, transform: open ? "none" : "rotate(-180deg) scale(0.5)" }}
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`absolute inset-x-0 top-full z-40 origin-top transition-all duration-300 lg:hidden ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
        }`}
        style={{ transitionTimingFunction: "var(--ease-out)" }}
      >
        <div className="mx-4 overflow-hidden rounded-2xl bg-ink-700 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.95)] md:mx-12">
          <nav className="flex max-h-[70svh] flex-col overflow-y-auto p-2" aria-label="Mobile">
            {nav.map((item, i) => {
              const children = panelItems(item);
              return (
                <div
                  key={item.href}
                  style={{
                    transform: open ? "none" : "translateX(-8px)",
                    opacity: open ? 1 : 0,
                    transition: "transform 200ms var(--ease-out), opacity 200ms var(--ease-out)",
                    transitionDelay: open ? `${60 + i * 45}ms` : "0ms",
                  }}
                >
                  <Link
                    href={item.href}
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                    className={`block rounded-xl px-4 py-3 text-base transition-colors duration-200 hover:bg-white/5 hover:text-white ${
                      isCurrent(item.href) ? "text-white" : "text-text-secondary"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {children.length ? (
                    <ul className="mb-1 ml-4 border-l border-hairline pl-3">
                      {children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className="block rounded-lg px-3 py-2 t-body-sm text-text-tertiary transition-colors duration-200 hover:bg-white/5 hover:text-white"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              );
            })}
            <Link
              href="/count"
              className="solid-btn mt-2 rounded-xl bg-white px-4 py-3.5 text-center text-base font-medium text-black hover:bg-white/90 sm:hidden"
            >
              Get your count
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
