import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "./reveal";
import { faqs } from "@/content/site";

/**
 * A selection on the home page, the full set at /faq. The schema lives on /faq only:
 * the same FAQPage repeated on three routes is duplicate structured data.
 */
export function Faq({ limit = 6 }: { limit?: number }) {
  const shown = faqs.slice(0, limit);
  const remaining = faqs.length - shown.length;

  return (
    <section id="faq" className="scroll-mt-24 border-t border-hairline">
      <div className="shell py-24 md:py-36">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <Reveal>
            <h2 className="t-h2 lg:sticky lg:top-28">
              The questions
              <br />
              we always get.
            </h2>
          </Reveal>

          <Reveal delay={100}>
            {shown.map((item, i) => (
              <details key={item.q} className="group border-b border-hairline" open={i === 0}>
                <summary className="flex items-start justify-between gap-6 py-6 t-h4 text-white marker:hidden [&::-webkit-details-marker]:hidden">
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
              <Link
                href="/faq"
                className="group mt-8 inline-flex items-center gap-2.5 t-body text-text-secondary transition-colors duration-200 hover:text-white"
              >
                <span className="link-sweep">{remaining} more questions</span>
                <ArrowRight
                  size={17}
                  strokeWidth={1.75}
                  aria-hidden="true"
                  className="transition-transform duration-200 ease-out group-hover:translate-x-1"
                />
              </Link>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
