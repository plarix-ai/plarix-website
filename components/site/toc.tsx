"use client";

import { useEffect, useState } from "react";

import { tocId } from "@/lib/slug";

/**
 * Jump links for a long piece, which give the empty right column a job and give a
 * search or an assistant named anchors to cite.
 */
export function Toc({ headings }: { headings: string[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const nodes = headings
      .map((h) => document.getElementById(tocId(h)))
      .filter((n): n is HTMLElement => Boolean(n));
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav aria-label="On this page" className="sticky top-32">
      <h2 className="t-label mb-5 text-text-tertiary">On this page</h2>
      <ol className="space-y-3.5">
        {headings.map((h) => {
          const id = tocId(h);
          const on = active === id;
          return (
            <li key={id} className="flex items-baseline gap-3">
              <span
                aria-hidden="true"
                className="mt-2 h-px shrink-0 transition-all duration-300"
                style={{
                  width: on ? "1.5rem" : "0.5rem",
                  background: on ? "#fff" : "rgba(255,255,255,0.22)",
                  transitionTimingFunction: "var(--ease-out)",
                }}
              />
              <a
                href={`#${id}`}
                className="t-body-sm transition-colors duration-200"
                style={{ color: on ? "#fff" : "var(--text-tertiary)" }}
              >
                {h}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
