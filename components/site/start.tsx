import { Reveal } from "./reveal";
import { start } from "@/content/site";

export function Start() {
  return (
    <section id="start" className="scroll-mt-24 border-t border-hairline bg-ink-900">
      <div className="shell py-28 md:py-40">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">
          <div>
            <Reveal as="h2" className="display max-w-[16ch] text-[clamp(2rem,5.2vw,3.5rem)]">
              {start.heading}
            </Reveal>
            <div className="mt-8 max-w-[60ch] space-y-5 text-lg leading-relaxed text-text-secondary md:mt-10 md:text-xl">
              {start.body.map((p, i) => (
                <Reveal as="p" key={i} delay={80 + i * 60}>
                  {p}
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={180} className="lg:pt-3">
            <div className="rounded-2xl bg-ink-800 p-7 ring-1 ring-hairline md:p-9">
              <h3 className="text-[13px] uppercase tracking-[0.16em] text-text-tertiary">
                {start.aside.heading}
              </h3>
              <p className="mt-5 text-base leading-relaxed text-text-secondary md:text-[17px]">
                There are <span className="text-gold">250 to 500</span> open warranty coordinator
                and claims administrator jobs in America right now, paying{" "}
                <span className="text-gold">$45,000 to $110,000</span> a year fully loaded, to do
                work that is almost entirely filing the right paperwork on time.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white md:text-[17px]">
                Somebody already decided this work is worth a salary. We are the other option.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
