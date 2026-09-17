import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Magnetic } from "./magnetic";
import { Reveal } from "./reveal";
import { ScrubList, SectionRule } from "./scroll-motion";
import { at } from "@/lib/scrub";
import { faqs } from "@/content/site";

/**
 * A selection on the home page, the full set at /faq. The schema lives on /faq only:
 * the same FAQPage repeated on three routes is duplicate structured data.
 */
export function Faq({ limit = 6 }: { limit?: number }) {
  const shown = faqs.slice(0, limit);
  const remaining = faqs.length - shown.length;

  return (
    <section id="faq" className="relative scroll-mt-24 border-t border-hairline">
      <SectionRule />
      <div className="shell py-18 md:py-26">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          {/* Pinned: the question the section answers stays put while the
              answers themselves move past it. */}
          <Reveal clip className="t-h2 lg:sticky lg:top-28 lg:self-start">
            <span className="block">
              The questions
              <br />
              we always get.
            </span>
          </Reveal>

          <ScrubList as="div" count={shown.length} to={0.7}>
          <Reveal delay={100}>
            {shown.map((item, i) => (
              <details
                key={item.q}
                className="scrub-item group border-b border-hairline"
                style={at(i, shown.length)}
                open={i === 0}
              >
                <summary className="press flex cursor-pointer items-start justify-between gap-6 py-6 t-h4 text-white marker:hidden [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <span className="relative mt-2 h-[13px] w-[13px] shrink-0" aria-hidden="true">
                    <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/50" />
                    <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/50 transition-transform duration-200 ease-out group-open:rotate-90 group-open:opacity-0" />
                  </span>
                </summary>
                <p className="max-w-[66ch] pb-7 pr-8 t-body text-text-secondary">{item.a}</p>
              </details>
            ))}

            {remaining > 0 ? (
              <Magnetic className="mt-8" max={5}>
                <Link
                  href="/faq"
                  className="group press-sm inline-flex items-center gap-2.5 t-body text-text-secondary transition-colors duration-200 hover:text-white"
                >
                  <span className="link-sweep">{remaining} more questions</span>
                  <ArrowRight
                    size={17}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className="text-shift"
                  />
                </Link>
              </Magnetic>
            ) : null}
          </Reveal>
          </ScrubList>
        </div>
      </div>
    </section>
  );
}
