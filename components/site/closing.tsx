import { Reveal } from "./reveal";
import { CountForm } from "./count-form";
import { Parallax, SectionRule } from "./scroll-motion";
import { closing } from "@/content/site";

export function Closing() {
  return (
    <section id="count" className="relative scroll-mt-24 border-t border-hairline bg-ink-900">
      <SectionRule />
      <div className="shell py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-16">
          <div>
            <Reveal as="h2" clip className="t-h1">
              {closing.heading}
            </Reveal>
            <Reveal as="p" delay={90} className="mt-7 max-w-[50ch] t-body-lg text-text-secondary">
              {closing.body}
            </Reveal>
          </div>

          <Parallax distance={18}>
            <Reveal delay={160}>
              <CountForm />
            </Reveal>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
