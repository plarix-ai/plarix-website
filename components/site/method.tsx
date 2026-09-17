import { Reveal } from "./reveal";
import { Scrub, SectionRule } from "./scroll-motion";
import { SectionHead } from "./section-head";
import { method } from "@/content/site";

export function Method() {
  return (
    <section id="method" className="relative scroll-mt-24 border-t border-hairline">
      <SectionRule />
      <div className="shell py-16 md:py-24">
        <SectionHead heading={method.heading}>{method.intro}</SectionHead>

        {/*
          A single rail running through three moments, not three boxes. The rail
          is scrubbed: it draws itself across the section in step with how far
          the section has been read, and each moment's marker lands as the line
          reaches it. The order of the three verbs is the actual claim this
          section makes, so the motion states it rather than decorating it.
        */}
        <Scrub className="relative mt-10 md:mt-14" from={0.12} to={0.58}>
          {/* The unlit track, always fully drawn, so the rail is never a gap. */}
          <span
            className="absolute left-0 right-0 top-[7px] hidden h-px bg-white/10 md:block"
            aria-hidden="true"
          />
          {/* The lit line, drawn by scroll progress across the same span. */}
          <span
            className="scrub-rule absolute left-0 right-0 top-[7px] hidden h-px bg-white/45 md:block"
            aria-hidden="true"
          />
          <div className="grid gap-12 md:grid-cols-3 md:gap-10">
            {method.steps.map((step, i) => (
              <Reveal key={step.verb} delay={i * 110} className="relative md:pr-8">
                <span
                  className="scrub-mark absolute left-0 top-[-4px] hidden h-[15px] w-[15px] rounded-full bg-white md:block"
                  /* Where this moment sits along the rail, so its marker lands
                     as the line passes it rather than on a timer. */
                  style={{ "--at": i / method.steps.length } as React.CSSProperties}
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
        </Scrub>
      </div>
    </section>
  );
}
