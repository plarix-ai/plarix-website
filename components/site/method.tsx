import { Reveal } from "./reveal";
import { SectionHead } from "./section-head";
import { method } from "@/content/site";

export function Method() {
  return (
    <section id="method" className="scroll-mt-24 border-t border-hairline">
      <div className="shell py-16 md:py-24">
        <SectionHead heading={method.heading}>{method.intro}</SectionHead>

        {/* A single rail running through three moments, not three boxes. */}
        <div className="relative mt-10 md:mt-14">
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
                    <h3 className="t-h3 text-white">
                      {step.verb}
                    </h3>
                    <span className="t-caption text-text-tertiary">{step.time}</span>
                  </div>
                  <p className="max-w-[44ch] t-body text-text-secondary">
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
