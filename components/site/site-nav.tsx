"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Logo } from "./logo";
import { nav } from "@/content/site";

export function SiteNav({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (overlay) return;
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={
        overlay
          ? "relative z-50"
          : `sticky top-0 z-50 transition-colors duration-300 ${
              scrolled ? "bg-black/80 backdrop-blur-xl" : "bg-transparent"
            }`
      }
    >
      <div className="shell flex items-center justify-between py-4 md:py-6">
        <div
          className={overlay ? "animate-blur-fade-up" : undefined}
          style={overlay ? { animationDelay: "0ms" } : undefined}
        >
          <Logo />
        </div>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[15px] text-text-secondary transition-colors duration-200 hover:text-white ${
                overlay ? "animate-blur-fade-up" : ""
              }`}
              style={overlay ? { animationDelay: `${100 + i * 50}ms` } : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            href="/#count"
            className={`liquid-glass hidden rounded-full px-5 py-2.5 text-[15px] font-medium text-white sm:inline-flex md:px-6 ${
              overlay ? "animate-blur-fade-up" : ""
            }`}
            style={overlay ? { animationDelay: "350ms" } : undefined}
          >
            Get your count
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`liquid-glass relative flex h-11 w-11 items-center justify-center rounded-full text-white lg:hidden ${
              overlay ? "animate-blur-fade-up" : ""
            }`}
            style={overlay ? { animationDelay: "400ms" } : undefined}
          >
            <Menu
              size={18}
              className="absolute transition-all duration-300 ease-out"
              style={{
                opacity: open ? 0 : 1,
                transform: open ? "rotate(180deg) scale(0.5)" : "none",
              }}
            />
            <X
              size={18}
              className="absolute transition-all duration-300 ease-out"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "none" : "rotate(-180deg) scale(0.5)",
              }}
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
          <nav className="flex flex-col p-2" aria-label="Mobile">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3.5 text-base text-text-secondary transition-all duration-200 hover:bg-white/5 hover:text-white"
                style={{
                  transform: open ? "none" : "translateX(-8px)",
                  opacity: open ? 1 : 0,
                  transitionDelay: open ? `${60 + i * 45}ms` : "0ms",
                }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#count"
              onClick={() => setOpen(false)}
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
