import { Reveal } from "./reveal";
import { method } from "@/content/site";

export function Method() {
  return (
    <section id="method" className="scroll-mt-24 border-t border-hairline">
      <div className="shell py-28 md:py-40">
        <div className="max-w-[46ch]">
          <Reveal as="h2" className="display text-[clamp(2rem,5.2vw,3.5rem)]">
            {method.heading}
          </Reveal>
          <Reveal as="p" delay={80} className="mt-7 text-lg leading-relaxed text-text-secondary md:text-xl">
            {method.intro}
          </Reveal>
        </div>

        {/* A single rail running through three moments, not three boxes. */}
        <div className="relative mt-16 md:mt-24">
          <span
            className="absolute left-0 right-0 top-[7px] hidden h-px bg-white/10 md:block"
            aria-hidden="true"
          />
          <div className="grid gap-12 md:grid-cols-3 md:gap-10">
            {method.steps.map((step, i) => (
              <Reveal key={step.verb} delay={i * 110} className="relative md:pr-8">
                <span
                  className="absolute left-0 top-0 hidden h-[15px] w-[15px] -translate-y-[4px] rounded-full bg-white md:block"
                  aria-hidden="true"
                />
                <div className="md:pt-12">
                  <div className="mb-4 flex items-baseline gap-3">
                    <h3 className="text-2xl text-white md:text-3xl" style={{ letterSpacing: "-0.02em" }}>
                      {step.verb}
                    </h3>
                    <span className="text-[13px] text-text-tertiary">{step.time}</span>
                  </div>
                  <p className="max-w-[44ch] text-base leading-relaxed text-text-secondary md:text-[17px]">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
