import { Reveal } from "./reveal";
import { faqs } from "@/content/site";

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 border-t border-hairline">
      <div className="shell py-28 md:py-40">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <Reveal>
            <h2 className="display text-[clamp(2rem,5.2vw,3.5rem)] lg:sticky lg:top-28">
              The questions
              <br />
              we always get.
            </h2>
          </Reveal>

          <Reveal delay={100}>
            {faqs.map((item, i) => (
              <details key={item.q} className="group border-b border-hairline" open={i === 0}>
                <summary className="flex items-start justify-between gap-6 py-6 text-lg text-white marker:hidden [&::-webkit-details-marker]:hidden md:text-xl">
                  <span style={{ letterSpacing: "-0.015em" }}>{item.q}</span>
                  <span className="relative mt-2.5 h-[13px] w-[13px] shrink-0" aria-hidden="true">
                    <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/50" />
                    <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/50 transition-transform duration-200 ease-out group-open:rotate-90 group-open:opacity-0" />
                  </span>
                </summary>
                <p className="max-w-[66ch] pb-7 pr-8 text-base leading-relaxed text-text-secondary md:text-[17px]">
                  {item.a}
                </p>
              </details>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
