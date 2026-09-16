"use client";

import { useState } from "react";

import { Reveal } from "./reveal";
import { processes } from "@/content/site";

export function Processes() {
  const [active, setActive] = useState(0);
  const current = processes[active];

  return (
    <section id="processes" className="scroll-mt-24 border-t border-hairline bg-ink-900">
      <div className="shell py-28 md:py-40">
        <div className="max-w-[46ch]">
          <Reveal as="h2" className="display text-[clamp(2rem,5.2vw,3.5rem)]">
            We run one process at a time, and we finish it.
          </Reveal>
          <Reveal as="p" delay={80} className="mt-7 text-lg leading-relaxed text-text-secondary md:text-xl">
            Not a platform. Not a suite. A specific piece of your operation, handed over
            completely, then the next one.
          </Reveal>
        </div>

        {/* Desktop: a directory. Names on the left, the selected one open on the right. */}
        <Reveal delay={140} className="mt-16 hidden gap-16 lg:grid lg:grid-cols-[1fr_1fr] md:mt-20">
          <ul className="-mt-2">
            {processes.map((p, i) => {
              const on = i === active;
              return (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    aria-current={on}
                    className="group flex w-full items-baseline gap-5 border-b border-hairline py-6 text-left"
                  >
                    <span
                      className="h-px w-8 shrink-0 self-center transition-all duration-300"
                      style={{
                        background: on ? "#fff" : "rgba(255,255,255,0.18)",
                        width: on ? "3rem" : "1.25rem",
                        transitionTimingFunction: "var(--ease-out)",
                      }}
                      aria-hidden="true"
                    />
                    <span
                      className="text-xl transition-colors duration-200 md:text-2xl"
                      style={{ color: on ? "#fff" : "var(--text-tertiary)" }}
                    >
                      {p.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="relative lg:pt-4">
            <div key={current.id} className="animate-[blurFadeUp_600ms_var(--ease-out)_forwards]">
              <p className="text-xl leading-snug text-white md:text-2xl">{current.short}</p>
              <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-text-secondary md:text-lg">
                {current.detail}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Mobile: the same content, opened in place. */}
        <div className="mt-14 lg:hidden">
          {processes.map((p, i) => (
            <details
              key={p.id}
              className="group border-b border-hairline py-5"
              open={i === 0}
            >
              <summary className="flex items-start justify-between gap-4 text-lg text-white marker:hidden [&::-webkit-details-marker]:hidden">
                <span>{p.name}</span>
                <span
                  aria-hidden="true"
                  className="mt-2 h-px w-4 shrink-0 bg-white/40 transition-transform duration-200 group-open:rotate-90"
                />
              </summary>
              <p className="mt-4 text-[15px] leading-relaxed text-white/85">{p.short}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">{p.detail}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
