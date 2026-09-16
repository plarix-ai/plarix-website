import { Reveal } from "./reveal";
import { SectionHead } from "./section-head";
import { refusals } from "@/content/site";

export function Refusals() {
  return (
    <section className="border-t border-hairline">
      <div className="shell py-28 md:py-40">
        <SectionHead heading={refusals.heading}>{refusals.intro}</SectionHead>

        <ul className="mt-14 md:mt-20">
          {refusals.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.never}
              delay={i * 60}
              className="grid gap-2 border-t border-hairline py-7 last:border-b md:grid-cols-[minmax(0,26rem)_1fr] md:gap-12 md:py-9"
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
      </div>
    </section>
  );
}
