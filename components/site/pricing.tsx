import { Reveal } from "./reveal";
import { pricing } from "@/content/site";

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 border-t border-hairline bg-ink-900">
      <div className="shell py-28 md:py-40">
        <div className="max-w-[46ch]">
          <Reveal as="h2" className="display text-[clamp(2rem,5.2vw,3.5rem)]">
            {pricing.heading}
          </Reveal>
          <Reveal as="p" delay={80} className="mt-7 text-lg leading-relaxed text-text-secondary md:text-xl">
            A warranty coordinator costs <span className="text-gold">$45,000 to $110,000</span> a
            year fully loaded, and needs a desk, training and a reason to stay. That is the number
            we ask you to hold us against.
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3">
          {pricing.tiers.map((tier, i) => (
            <Reveal
              key={tier.name}
              delay={i * 90}
              className={`flex flex-col rounded-2xl p-7 md:p-8 ${
                tier.featured
                  ? "bg-ink-600 shadow-[0_32px_70px_-30px_rgba(0,0,0,1)]"
                  : "bg-ink-700"
              }`}
            >
              <h3 className="text-[13px] uppercase tracking-[0.16em] text-text-tertiary">
                {tier.name}
              </h3>
              <p
                className="mt-5 text-2xl text-white md:text-[28px]"
                style={{ letterSpacing: "-0.02em" }}
              >
                {tier.price}
              </p>
              <p className="mt-5 flex-1 text-[15px] leading-relaxed text-text-secondary md:text-base">
                {tier.body}
              </p>
              <p className="mt-6 text-[14px] leading-relaxed text-white/75">{tier.note}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={280} className="mt-10">
          <p className="max-w-[62ch] text-[15px] leading-relaxed text-text-tertiary">
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
