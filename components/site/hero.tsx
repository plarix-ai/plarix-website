"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Layers, Timer, Unlink } from "lucide-react";

import { Magnetic } from "./magnetic";
import { Parallax } from "./scroll-motion";

import { HeroBackdrop } from "./hero-backdrop";
import { hero, processes } from "@/content/site";

const factIcons = [Layers, Timer, Unlink];
const ROTATE_MS = 5600;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((dir: 1 | -1) => {
    setIndex((i) => (i + dir + processes.length) % processes.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    timer.current = setInterval(() => setIndex((i) => (i + 1) % processes.length), ROTATE_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused]);

  const current = processes[index];

  return (
    <section
      className="relative flex flex-col"
      style={{ minHeight: "calc(100svh - var(--nav-h))" }}
    >
      <HeroBackdrop />

      {/*
        The bed the copy sits on. This was a fixed full-viewport backdrop-blur, which
        forces the compositor to re-blur the entire screen on every frame of a live
        canvas underneath it. The shader already grades its own falloff toward the
        lower left, so a plain gradient does the same visual work at no cost.
      */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-3/5"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.72) 26%, rgba(0,0,0,0.34) 56%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="shell relative z-10 flex flex-1 flex-col justify-end pb-10 pt-16 md:pb-16">
        {/*
          The two halves of the first viewport sit on different planes, so
          scrolling off the hero separates them instead of sliding one flat
          card away. The headline column holds back and the rotator leads,
          which is the same depth order as the shader behind both of them.
        */}
        <div className="flex flex-col items-start gap-10 md:flex-row md:items-end md:gap-12">
          <Parallax distance={26} className="w-full flex-1">
            <ul
              className="animate-blur-fade-up mb-7 flex flex-wrap items-center gap-x-5 gap-y-2 t-caption text-white/80 sm:gap-x-7 md:mb-9"
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
              className="animate-blur-fade-up t-display mb-5 max-w-[15ch] text-white md:mb-7"
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

            {/*
              The page's two most important controls lean toward the cursor as
              it comes in. Pull is capped well inside the button, so the target
              never moves out from under the click it is inviting.
            */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Magnetic className="animate-blur-fade-up" style={{ animationDelay: "600ms" }}>
                <Link
                  href={hero.primaryCta.href}
                  className="solid-btn group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 t-body-sm font-medium text-black hover:bg-white/90 sm:px-8 sm:text-base"
                >
                  {hero.primaryCta.label}
                  <ArrowRight size={17} strokeWidth={2} className="text-shift" />
                </Link>
              </Magnetic>
              <Magnetic className="animate-blur-fade-up" style={{ animationDelay: "700ms" }}>
                <Link
                  href={hero.secondaryCta.href}
                  className="liquid-glass inline-flex items-center rounded-full px-6 py-3 t-body-sm font-medium text-white sm:px-8"
                >
                  {hero.secondaryCta.label}
                </Link>
              </Magnetic>
            </div>
          </Parallax>

          {/*
            The rotator. The arrows from the reference template, given an actual
            job: proving in the first viewport that warranty is one process of
            several rather than the whole company. The counter carries position,
            so there are no progress bars underneath it saying the same thing.
          */}
          <Parallax distance={54} className="w-full md:w-[22rem] md:shrink-0">
          <div
            className="animate-blur-fade-up w-full"
            style={{ animationDelay: "800ms" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            <div className="mb-4 flex items-center justify-between border-b border-white/15 pb-3">
              <span className="t-label text-white/60">
                {hero.rotatorLabel}
              </span>
              <span className="t-caption tabular-nums text-white/60">
                {String(index + 1).padStart(2, "0")} / {String(processes.length).padStart(2, "0")}
              </span>
            </div>

            <div aria-live="polite" className="flex items-start" style={{ minHeight: "6.5rem" }}>
              <div key={current.id} className="animate-swap w-full">
                <Link
                  href={`/processes/${current.slug}`}
                  className="link-sweep press-sm t-h4 font-medium text-white"
                >
                  {current.name}
                </Link>
                <p className="mt-2 t-body-sm text-white/70">{current.short}</p>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-2">
              <Magnetic max={4}>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous process"
                  className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-white"
                >
                  <ChevronLeft size={17} strokeWidth={2} />
                </button>
              </Magnetic>
              <Magnetic max={4}>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next process"
                  className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-white"
                >
                  <ChevronRight size={17} strokeWidth={2} />
                </button>
              </Magnetic>
              <Link
                href="/processes"
                className="link-sweep press-sm ml-3 t-caption text-white/70 transition-colors duration-200 hover:text-white"
              >
                See all six
              </Link>
            </div>
          </div>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
