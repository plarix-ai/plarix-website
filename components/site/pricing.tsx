import { Reveal } from "./reveal";
import { Parallax, ScrubList, SectionRule } from "./scroll-motion";
import { SectionHead } from "./section-head";
import { at } from "@/lib/scrub";
import { pricing } from "@/content/site";

export function Pricing() {
  return (
    <section id="pricing" className="relative scroll-mt-24 border-t border-hairline bg-ink-900">
      <SectionRule />
      <div className="shell py-16 md:py-24">
        <SectionHead heading={pricing.heading}>
          A warranty coordinator costs <span className="text-gold">$45,000 to $110,000</span> a
          year fully loaded, and needs a desk, training and a reason to stay. That is the number
          we ask you to hold us against.
        </SectionHead>

        {/*
          Three surfaces, each on its own plane and each lighting as it is
          reached. The featured one drifts least, so it settles first and the
          eye lands on it rather than on whichever card happens to be nearest.
        */}
        <ScrubList
          count={pricing.tiers.length}
          className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3"
          to={0.6}
        >
          {pricing.tiers.map((tier, i) => (
            <Parallax key={tier.name} distance={tier.featured ? 8 : 18}>
              <Reveal
                delay={i * 90}
                style={at(i, pricing.tiers.length)}
                className={`zoom-frame scrub-item relative flex h-full flex-col rounded-2xl p-7 md:p-8 ring-1 ${
                  tier.featured
                    ? "bg-ink-600 ring-hairline-strong"
                    : "bg-ink-800 ring-hairline"
                }`}
              >
                <span
                  className="zoom-surface"
                  aria-hidden="true"
                  style={{
                    background:
                      "radial-gradient(72% 54% at 70% 0%, rgba(227,176,75,0.11) 0%, rgba(227,176,75,0.03) 44%, rgba(0,0,0,0) 76%)",
                  }}
                />
                <h3 className="t-label text-text-tertiary">
                  {tier.name}
                </h3>
                <p className="mt-5 t-h3 text-white">
                  {tier.price}
                </p>
                <p className="mt-5 flex-1 t-body-sm text-text-secondary">
                  {tier.body}
                </p>
                <p className="mt-6 t-body-sm text-white/75">{tier.note}</p>
              </Reveal>
            </Parallax>
          ))}
        </ScrubList>

        <Reveal delay={280} className="mt-10">
          <p className="max-w-[62ch] t-body-sm text-text-tertiary">
            For reference, the platform most shops already run on publishes nothing. The going rate
            in this category is $245 to $500 per technician per month, $5,000 to $50,000 to
            implement, on a 12 to 36 month contract. We publish ours because you should be able to
            do the math before you talk to anyone.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
