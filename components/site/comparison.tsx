import { Reveal } from "./reveal";
import { ScrubList, SectionRule } from "./scroll-motion";
import { at } from "@/lib/scrub";
import { pricing } from "@/content/site";

/** A scorecard, because the decision this page supports is a comparison. */
export function Comparison() {
  const { comparison } = pricing;

  return (
    <section className="relative border-t border-hairline bg-ink-900">
      <SectionRule />
      <div className="shell py-16 md:py-24">
        <Reveal as="h2" clip className="t-h2 max-w-[16ch]">
          {comparison.heading}
        </Reveal>

        {/* Desktop: a real table, which is also the form an assistant can quote. */}
        <ScrubList as="div" count={comparison.rows.length} className="mt-12 hidden md:block" to={0.68}>
        <Reveal delay={100}>
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              Comparing hiring a warranty coordinator, absorbing the work, and using Plarix
            </caption>
            <thead>
              <tr>
                <th scope="col" className="w-[16rem] pb-5 pr-6 align-bottom">
                  <span className="sr-only">Factor</span>
                </th>
                {comparison.columns.map((col, i) => (
                  <th
                    key={col}
                    scope="col"
                    className={`pb-5 pr-6 align-bottom t-body font-medium ${
                      i === comparison.columns.length - 1 ? "text-white" : "text-text-secondary"
                    }`}
                   
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row, ri) => (
                <tr
                  key={row.label}
                  className="scrub-fill border-t border-hairline align-top"
                  style={at(ri, comparison.rows.length)}
                >
                  <th
                    scope="row"
                    className="py-6 pr-6 t-label font-normal text-text-tertiary"
                  >
                    {row.label}
                  </th>
                  {row.values.map((v, i) => (
                    <td
                      key={i}
                      className={`py-6 pr-6 t-body ${
                        i === row.values.length - 1 ? "text-white" : "text-text-secondary"
                      }`}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        </ScrubList>

        {/* Mobile: the same content, one column at a time. */}
        <div className="mt-10 space-y-8 md:hidden">
          {comparison.columns.map((col, ci) => (
            <Reveal
              key={col}
              delay={ci * 80}
              className={`zoom-frame relative rounded-2xl p-6 ring-1 ${
                ci === comparison.columns.length - 1
                  ? "bg-ink-600 ring-hairline-strong"
                  : "bg-ink-800 ring-hairline"
              }`}
            >
              <span
                className="zoom-surface"
                aria-hidden="true"
                style={{
                  background:
                    "radial-gradient(72% 54% at 70% 0%, rgba(227,176,75,0.10) 0%, rgba(227,176,75,0.03) 44%, rgba(0,0,0,0) 76%)",
                }}
              />
              <h3 className="text-lg text-white">
                {col}
              </h3>
              <dl className="mt-5 space-y-4">
                {comparison.rows.map((row) => (
                  <div key={row.label}>
                    <dt className="t-label text-text-tertiary">
                      {row.label}
                    </dt>
                    <dd className="mt-1 t-body-sm text-text-secondary">
                      {row.values[ci]}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
