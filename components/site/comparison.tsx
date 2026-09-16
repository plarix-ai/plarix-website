import { Reveal } from "./reveal";
import { pricing } from "@/content/site";

/** A scorecard, because the decision this page supports is a comparison. */
export function Comparison() {
  const { comparison } = pricing;

  return (
    <section className="border-t border-hairline bg-ink-900">
      <div className="shell py-20 md:py-28">
        <Reveal as="h2" className="t-h2 max-w-[16ch]">
          {comparison.heading}
        </Reveal>

        {/* Desktop: a real table, which is also the form an assistant can quote. */}
        <Reveal delay={100} className="mt-12 hidden md:block">
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
              {comparison.rows.map((row) => (
                <tr key={row.label} className="border-t border-hairline align-top">
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

        {/* Mobile: the same content, one column at a time. */}
        <div className="mt-10 space-y-8 md:hidden">
          {comparison.columns.map((col, ci) => (
            <Reveal
              key={col}
              delay={ci * 80}
              className={`rounded-2xl p-6 ring-1 ${
                ci === comparison.columns.length - 1
                  ? "bg-ink-600 ring-hairline-strong"
                  : "bg-ink-800 ring-hairline"
              }`}
            >
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
