import type { ReactNode } from "react";

import { Reveal } from "./reveal";

/**
 * Heading left, the line that qualifies it on the right. Keeps the top of a
 * section from being half an empty screen, and keeps display type on a measure
 * short enough that it breaks where a person would break it.
 */
export function SectionHead({
  heading,
  children,
}: {
  heading: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-14">
      <Reveal as="h2" className="t-h2 max-w-[15ch]">
        {heading}
      </Reveal>
      <Reveal
        as="p"
        delay={90}
        className="max-w-[46ch] t-body-lg text-text-secondary lg:pb-2"
      >
        {children}
      </Reveal>
    </div>
  );
}
