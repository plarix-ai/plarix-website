"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Layers, Timer, Unlink } from "lucide-react";

import { HeroBackdrop } from "./hero-backdrop";
import { SiteNav } from "./site-nav";
import { hero, processes } from "@/content/site";

const factIcons = [Layers, Timer, Unlink];
const ROTATE_MS = 5200;

export function Hero({ videoSrc, posterSrc }: { videoSrc?: string; posterSrc?: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((dir: 1 | -1) => {
    setIndex((i) => (i + dir + processes.length) % processes.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    timer.current = setInterval(() => setIndex((i) => (i + 1) % processes.length), ROTATE_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused]);

  const current = processes[index];

  return (
    <section className="relative flex min-h-[100svh] flex-col">
      <HeroBackdrop videoSrc={videoSrc} posterSrc={posterSrc} />

      {/*
        The blur veil. No darkening gradient anywhere: the footage keeps its own
        exposure and the type sits on a bed of blur that fades out by mid screen.
      */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] backdrop-blur-xl"
        aria-hidden="true"
        style={{
          WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 45%)",
          maskImage: "linear-gradient(to top, black 0%, transparent 45%)",
        }}
      />

      <SiteNav overlay />

      <div className="shell relative z-10 flex flex-1 flex-col justify-end pb-10 pt-24 md:pb-16">
        <div className="flex flex-col items-start gap-10 md:flex-row md:items-end md:gap-12">
          {/* Left: the statement */}
          <div className="flex-1">
            <ul
              className="animate-blur-fade-up mb-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-white/80 sm:gap-x-7 sm:text-sm md:mb-9"
              style={{ animationDelay: "300ms" }}
            >
              {hero.facts.map((fact, i) => {
                const Icon = factIcons[i];
                return (
                  <li key={fact} className="flex items-center gap-2">
                    <Icon size={15} strokeWidth={1.75} className="shrink-0 text-white/55" />
                    <span>{fact}</span>
                  </li>
                );
              })}
            </ul>

            <h1
              className="animate-blur-fade-up display mb-5 max-w-[15ch] text-[clamp(2.75rem,9vw,6rem)] text-white md:mb-7"
              style={{ animationDelay: "400ms" }}
            >
              {hero.headline}
            </h1>

            <p
              className="animate-blur-fade-up mb-8 max-w-[52ch] text-base leading-relaxed text-white/70 sm:text-lg md:mb-11 md:text-xl"
              style={{ animationDelay: "500ms" }}
            >
              {hero.subhead}
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href={hero.primaryCta.href}
                className="solid-btn animate-blur-fade-up group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[15px] font-medium text-black hover:bg-white/90 sm:px-8 sm:text-base"
                style={{ animationDelay: "600ms" }}
              >
                {hero.primaryCta.label}
                <ArrowRight
                  size={17}
                  strokeWidth={2}
                  className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href={hero.secondaryCta.href}
                className="liquid-glass animate-blur-fade-up inline-flex items-center rounded-full px-6 py-3 text-[15px] font-medium text-white sm:px-8 sm:text-base"
                style={{ animationDelay: "700ms" }}
              >
                {hero.secondaryCta.label}
              </Link>
            </div>
          </div>

          {/*
            Right: the rotator. The arrows from the reference template, given an
            actual job: proving in the first viewport that warranty is one process
            of several rather than the whole company.
          */}
          <div
            className="animate-blur-fade-up w-full md:w-[23rem] md:shrink-0"
            style={{ animationDelay: "800ms" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-[0.18em] text-white/45">
                {hero.rotatorLabel}
              </span>
              <span className="text-[11px] tabular-nums text-white/45">
                {String(index + 1).padStart(2, "0")} / {String(processes.length).padStart(2, "0")}
              </span>
            </div>

            <div
              className="liquid-glass rounded-2xl p-5"
              aria-live="polite"
              style={{ minHeight: "9.5rem" }}
            >
              {/* Blur bridges the two states so the swap reads as one object changing. */}
              <div key={current.id} className="animate-[blurFadeUp_600ms_var(--ease-out)_forwards]">
                <p className="mb-2 text-[15px] font-medium leading-snug text-white">
                  {current.name}
                </p>
                <p className="text-[13.5px] leading-relaxed text-white/60">{current.short}</p>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous process"
                className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-white"
              >
                <ChevronLeft size={17} strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next process"
                className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-white"
              >
                <ChevronRight size={17} strokeWidth={2} />
              </button>
              <div className="ml-1 flex flex-1 gap-1.5" aria-hidden="true">
                {processes.map((p, i) => (
                  <span
                    key={p.id}
                    className="h-px flex-1 transition-colors duration-300"
                    style={{
                      background: i === index ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.18)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
