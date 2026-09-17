"use client";

import { useState } from "react";

import { Reveal } from "./reveal";
import { ScrubList, SectionRule } from "./scroll-motion";
import { SectionHead } from "./section-head";
import { at } from "@/lib/scrub";
import { processes } from "@/content/site";

export function Processes() {
  const [active, setActive] = useState(0);
  const current = processes[active];

  return (
    <section id="processes" className="relative scroll-mt-24 border-t border-hairline bg-ink-900">
      <SectionRule />
      <div className="shell py-16 md:py-24">
        <SectionHead heading="We run one process at a time, and we finish it.">
          Not a platform. Not a suite. A specific piece of your operation, handed over
          completely, then the next one.
        </SectionHead>

        {/* Desktop: a directory. Names on the left, the selected one open on the right. */}
        <Reveal delay={140} className="mt-16 hidden gap-16 lg:grid lg:grid-cols-[1fr_1fr] md:mt-20">
          <ScrubList as="div" count={processes.length} className="-mt-2" to={0.66}>
          <ul>
            {processes.map((p, i) => {
              const on = i === active;
              return (
                <li key={p.id} className="scrub-item" style={at(i, processes.length)}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    aria-current={on}
                    className="press group flex w-full items-baseline gap-5 border-b border-hairline py-6 text-left"
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
                      style={{ color: on ? "#fff" : "#828a95" }}
                    >
                      {p.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          </ScrubList>

          {/*
            Pin and transform. The pane holds its place while the six names
            travel past it, so the section stays put and only its contents
            change. That is what the directory is actually for: the reader
            moves down the list and the answer stays where their eye already
            is, rather than being chased down the page.
          */}
          <div className="relative lg:sticky lg:top-28 lg:self-start lg:pt-4">
            <div key={current.id} className="animate-swap">
              <p className="t-lead text-white">{current.short}</p>
              <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-text-secondary md:text-lg">
                {current.detail}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Mobile: the same content, opened in place. */}
        <ScrubList as="div" count={processes.length} className="mt-14 lg:hidden" to={0.72}>
          {processes.map((p, i) => (
            <details
              key={p.id}
              className="scrub-item group border-b border-hairline py-5"
              style={at(i, processes.length)}
              open={i === 0}
            >
              <summary className="press flex cursor-pointer items-start justify-between gap-4 text-lg text-white marker:hidden [&::-webkit-details-marker]:hidden">
                <span>{p.name}</span>
                <span
                  aria-hidden="true"
                  className="mt-2 h-px w-4 shrink-0 bg-white/40 transition-transform duration-200 group-open:rotate-90"
                />
              </summary>
              <p className="mt-4 t-body-sm text-white/85">{p.short}</p>
              <p className="mt-3 t-body-sm text-text-secondary">{p.detail}</p>
            </details>
          ))}
        </ScrubList>
      </div>
    </section>
  );
}
