import { Reveal } from "./reveal";
import { start } from "@/content/site";

export function Start() {
  return (
    <section id="start" className="scroll-mt-24 border-t border-hairline bg-ink-900">
      <div className="shell py-16 md:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <Reveal as="h2" className="t-h2 max-w-[16ch]">
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
              <h3 className="t-label text-text-tertiary">
                {start.aside.heading}
              </h3>
              <p className="mt-5 t-body text-text-secondary">
                There are <span className="text-gold">250 to 500</span> open warranty coordinator
                and claims administrator jobs in America right now, paying{" "}
                <span className="text-gold">$45,000 to $110,000</span> a year fully loaded, to do
                work that is almost entirely filing the right paperwork on time.
              </p>
              <p className="mt-4 t-body text-white">
                Somebody already decided this work is worth a salary. We are the other option.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
