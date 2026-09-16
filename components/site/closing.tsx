import { Reveal } from "./reveal";
import { CountForm } from "./count-form";
import { closing } from "@/content/site";

export function Closing() {
  return (
    <section id="count" className="scroll-mt-24 border-t border-hairline bg-ink-900">
      <div className="shell py-28 md:py-40">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-24">
          <div>
            <Reveal as="h2" className="display text-[clamp(2.25rem,6vw,4.25rem)]">
              {closing.heading}
            </Reveal>
            <Reveal as="p" delay={90} className="mt-7 max-w-[50ch] text-lg leading-relaxed text-text-secondary md:text-xl">
              {closing.body}
            </Reveal>
          </div>

          <Reveal delay={160}>
            <CountForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
