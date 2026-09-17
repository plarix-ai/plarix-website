import { Reveal } from "./reveal";
import { ScrubList, SectionRule } from "./scroll-motion";
import { SectionHead } from "./section-head";
import { at } from "@/lib/scrub";
import { refusals } from "@/content/site";

export function Refusals() {
  return (
    <section className="relative border-t border-hairline">
      <SectionRule />
      <div className="shell py-16 md:py-24">
        <SectionHead heading={refusals.heading}>{refusals.intro}</SectionHead>

        {/*
          Six promises, lit one at a time as the reader moves down them rather
          than all at once on arrival. This is the section a sceptical owner
          actually reads, so the page slows him down through it: each line comes
          up to full weight only when it is the one in front of him.
        */}
        <ScrubList as="div" count={refusals.items.length} className="mt-10 md:mt-14">
          <ul>
            {refusals.items.map((item, i) => (
              <Reveal
                as="li"
                key={item.never}
                delay={i * 60}
                className="scrub-item relative grid gap-2 border-t border-hairline py-7 last:border-b md:grid-cols-[minmax(0,26rem)_1fr] md:gap-12 md:py-9"
                style={at(i, refusals.items.length)}
              >
                <p className="t-h3 text-white">
                  {item.never}
                </p>
                <p className="max-w-[58ch] t-body text-text-secondary md:pt-1.5">
                  {item.because}
                </p>
              </Reveal>
            ))}
          </ul>
        </ScrubList>
      </div>
    </section>
  );
}
