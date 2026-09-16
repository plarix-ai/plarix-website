"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/section-heading";

const tiers = [
  {
    name: "Diagnostic",
    price: "Free",
    description: "We count what's there before you pay anything.",
  },
  {
    name: "Build",
    price: "One-time",
    description: "Scoped to what the diagnostic finds. Priced after we know your number.",
  },
  {
    name: "Run",
    price: "Flat monthly",
    description: "Billed like ServiceTitan or QuickBooks. No twelve-month contract. Cancel anytime.",
  },
  {
    name: "Outcome bonus",
    price: "Optional",
    description: "A small share of verified recovery above your baseline, only after 90 days of proven numbers on your data.",
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="w-full bg-slate-950 py-24 md:py-32 border-b border-slate-800/30">
      <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-16">
        <div className="flex flex-col gap-6 mb-16 max-w-2xl">
          <SectionHeading className="text-4xl md:text-5xl">
            Pricing, in public. Same as everything else you pay for.
          </SectionHeading>
          <p className="text-slate-400 text-base leading-relaxed">
            No contact form standing between you and the number. Exact figures land here once your
            diagnostic is done. This is the structure, not a guess.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
              className={cn(
                "flex flex-col gap-3 py-6 lg:py-2",
                index > 0 && "lg:border-l lg:border-slate-800/50 lg:pl-8",
                index > 0 && "lg:mt-0",
                "border-t border-slate-800/40 lg:border-t-0 pt-6 lg:pt-0"
              )}
            >
              <span className="text-xs font-medium text-slate-500 uppercase tracking-[0.15em]">
                {String(index + 1).padStart(2, "0")} · {tier.name}
              </span>
              <span className="text-2xl font-medium text-white tracking-[-0.02em]">{tier.price}</span>
              <p className="text-sm text-slate-400 leading-relaxed">{tier.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
