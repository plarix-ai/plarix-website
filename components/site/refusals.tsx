import { Reveal } from "./reveal";
import { refusals } from "@/content/site";

export function Refusals() {
  return (
    <section className="border-t border-hairline">
      <div className="shell py-28 md:py-40">
        <div className="max-w-[44ch]">
          <Reveal as="h2" className="display text-[clamp(2rem,5.2vw,3.5rem)]">
            {refusals.heading}
          </Reveal>
          <Reveal as="p" delay={80} className="mt-7 text-lg leading-relaxed text-text-secondary md:text-xl">
            {refusals.intro}
          </Reveal>
        </div>

        <ul className="mt-14 md:mt-20">
          {refusals.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.never}
              delay={i * 60}
              className="grid gap-2 border-t border-hairline py-7 last:border-b md:grid-cols-[minmax(0,26rem)_1fr] md:gap-12 md:py-9"
            >
              <p className="text-xl text-white md:text-[27px]" style={{ letterSpacing: "-0.02em" }}>
                {item.never}
              </p>
              <p className="max-w-[58ch] text-base leading-relaxed text-text-secondary md:pt-1.5 md:text-[17px]">
                {item.because}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
