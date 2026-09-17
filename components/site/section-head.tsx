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
      {/* The heading uncovers rather than fades, so display weight is correct
          from the first frame it is visible at all. */}
      <Reveal as="h2" clip className="t-h2 max-w-[15ch]">
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
