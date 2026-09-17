import type { ReactNode } from "react";

import { Reveal } from "./reveal";
import { Parallax } from "./scroll-motion";

/**
 * Heading left, the line that qualifies it on the right. Keeps the top of a
 * section from being half an empty screen, and keeps display type on a measure
 * short enough that it breaks where a person would break it.
 *
 * The heading uncovers from its leading edge and the line beside it drifts on a
 * slightly different plane, so the two halves of the head arrive as two things
 * rather than as one block fading up. Drift is 12px: enough to separate them,
 * far too little to read as movement on its own.
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
      <Reveal as="h2" clip className="t-h2 max-w-[15ch]">
        {heading}
      </Reveal>
      <Parallax distance={12}>
        <Reveal
          as="p"
          delay={90}
          className="max-w-[46ch] t-body-lg text-text-secondary lg:pb-2"
        >
          {children}
        </Reveal>
      </Parallax>
    </div>
  );
}
