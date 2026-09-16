"use client";

import { motion } from "framer-motion";

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
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="flex flex-col items-center text-center gap-6 mb-16">
          <div className="flex items-center gap-3 px-4 py-2 border border-slate-800/50 w-fit">
            <div className="w-2.5 h-2.5 bg-white/30" />
            <span className="text-sm font-medium text-slate-500 tracking-wide">
              Pricing
            </span>
          </div>
          <h2 className="text-balance text-4xl md:text-5xl font-normal tracking-tight text-white max-w-2xl">
            Pricing, in public. Same as everything else you pay for.
          </h2>
          <p className="text-slate-400 text-base leading-relaxed max-w-xl">
            No contact form standing between you and the number. Exact figures land here once your
            diagnostic is done. This is the structure, not a guess.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="flex flex-col gap-3 p-8 border border-slate-800/30 bg-slate-900/20"
            >
              <span className="text-sm font-medium text-white uppercase tracking-wider">{tier.name}</span>
              <span className="text-2xl font-normal text-white tracking-tight">{tier.price}</span>
              <p className="text-sm text-slate-400 leading-relaxed">{tier.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
