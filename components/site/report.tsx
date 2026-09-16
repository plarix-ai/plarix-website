import { Counted } from "./counted";
import { Reveal } from "./reveal";
import { report } from "@/content/site";

/**
 * The artifact the Prove step produces, drawn rather than screenshotted so it stays
 * sharp at any density. The layout is the real one. The figures are labelled as an
 * example, because we do not publish a customer's numbers and we do not invent them.
 */
export function Report() {
  return (
    <section className="border-t border-hairline">
      <div className="shell py-28 md:py-40">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-24">
          <div>
            <Reveal as="h2" className="t-h2 max-w-[14ch]">
              {report.heading}
            </Reveal>
            <Reveal
              as="p"
              delay={80}
              className="mt-7 max-w-[46ch] t-body-lg text-text-secondary"
            >
              {report.body}
            </Reveal>
            <Reveal as="p" delay={140} className="mt-8 max-w-[46ch] t-body-sm text-text-tertiary">
              {report.disclaimer}
            </Reveal>
          </div>

          <Reveal delay={160}>
            <figure className="rounded-2xl bg-ink-800 p-7 ring-1 ring-hairline md:p-10">
              <figcaption className="flex items-baseline justify-between border-b border-hairline pb-5">
                <span className="t-label text-text-tertiary">
                  Recovery report
                </span>
                <span className="t-caption text-text-tertiary">{report.period}</span>
              </figcaption>

              <div className="border-b border-hairline py-8">
                <p className="t-caption text-text-secondary">{report.headline.label}</p>
                <Counted value={report.headline.value} className="t-h1 mt-2 block tabular-nums text-gold" />
              </div>

              <Reveal as="dl" delay={200} className="reveal-stagger">
                {report.rows.map((row, i) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between border-b border-hairline py-4 last:border-b-0"
                    style={{ transitionDelay: `${240 + i * 70}ms` }}
                  >
                    <dt className="t-body-sm text-text-secondary">{row.label}</dt>
                    <dd className="t-body tabular-nums text-white">{row.value}</dd>
                  </div>
                ))}
              </Reveal>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
