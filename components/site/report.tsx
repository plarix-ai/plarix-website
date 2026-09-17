import { Counted } from "./counted";
import { Reveal } from "./reveal";
import { Parallax, Scrub, SectionRule } from "./scroll-motion";
import { at } from "@/lib/scrub";
import { report } from "@/content/site";

/**
 * The artifact the Prove step produces, drawn rather than screenshotted so it stays
 * sharp at any density. The layout is the real one. The figures are labelled as an
 * example, because we do not publish a customer's numbers and we do not invent them.
 */
export function Report() {
  return (
    <section className="relative border-t border-hairline">
      <SectionRule />
      <div className="shell py-16 md:py-24">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <Reveal as="h2" clip className="t-h2 max-w-[14ch]">
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

          {/*
            The report drifts against the column beside it as the section
            passes, which is the only thing on the page that says these are two
            layers rather than one flat band. Travel is small on purpose: past
            roughly forty pixels parallax stops reading as depth and starts
            reading as a sticky element that has come loose.
          */}
          <Reveal delay={160}>
            <Parallax distance={30}>
              <figure className="zoom-frame relative rounded-2xl bg-ink-800 p-7 ring-1 ring-hairline md:p-10">
                {/* The wash that lights on hover. Decoration only, and the words
                    above it never move. */}
                <span
                  className="zoom-surface"
                  aria-hidden="true"
                  style={{
                    background:
                      "radial-gradient(70% 50% at 72% 0%, rgba(227,176,75,0.10) 0%, rgba(227,176,75,0.03) 42%, rgba(0,0,0,0) 74%)",
                  }}
                />
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

                {/* The rows read in as the report is read, in the order a
                    person reads them, rather than all arriving together. */}
                <Scrub as="div" from={0.2} to={0.72}>
                  <Reveal as="dl" delay={200} className="reveal-stagger">
                    {report.rows.map((row, i) => (
                      <div
                        key={row.label}
                        className="scrub-fill flex items-baseline justify-between border-b border-hairline py-4 last:border-b-0"
                        style={{ ...at(i, report.rows.length), transitionDelay: `${240 + i * 70}ms` }}
                      >
                        <dt className="t-body-sm text-text-secondary">{row.label}</dt>
                        <dd className="t-body tabular-nums text-white">{row.value}</dd>
                      </div>
                    ))}
                  </Reveal>
                </Scrub>
              </figure>
            </Parallax>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
