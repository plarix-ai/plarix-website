"use client";

import { motion } from "framer-motion";
import { Table, BarChart3, Phone } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const deliverables = [
  {
    icon: <Table className="w-5 h-5 text-white/60" />,
    title: "The numbers, side by side",
    description: "Every engagement produces a running comparison of your warranty recovery before Plarix and after. This is what you take to your P&L review.",
  },
  {
    icon: <BarChart3 className="w-5 h-5 text-white/60" />,
    title: "Monthly recovery report",
    description: "Claims filed, claims paid, dollars recovered, staff hours freed. Reported on a schedule you set. One email. No login required.",
  },
  {
    icon: <Phone className="w-5 h-5 text-white/60" />,
    title: "Quarterly walkthrough call",
    description: "A plain-language call to review what came back, what is still pending, and what we recommend filing next. No deck, no upsell. Just the numbers.",
  },
];

const metrics = [
  { label: "Claims identified / month", baseline: "Measured", after: "Up" },
  { label: "Claims filed / month", baseline: "Measured", after: "Up" },
  { label: "Dollars recovered / month", baseline: "Measured", after: "Up" },
  { label: "Staff hours on claims", baseline: "Measured", after: "Down" },
];

export function DeliverablesSection() {
  return (
    <section className="w-full bg-slate-950 py-24 md:py-32 border-b border-slate-800/30">
      <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-16">
        <div className="flex flex-col gap-6 mb-16 max-w-xl">
          <SectionHeading className="text-4xl md:text-5xl">
            A number, not a narrative.
          </SectionHeading>

          <p className="text-slate-400 text-base leading-relaxed">
            Every Plarix engagement ends with a running before-and-after you can put in front of your accountant, your partner, or your budget review.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Value table */}
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800/40">
                <th className="pb-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Metric</th>
                <th className="pb-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Baseline</th>
                <th className="pb-3 text-xs font-medium text-slate-500 uppercase tracking-wider">After</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((row, idx) => (
                <tr key={idx} className="border-b border-slate-800/20 last:border-b-0">
                  <td className="py-4 text-sm text-white">{row.label}</td>
                  <td className="py-4 text-sm text-slate-500">{row.baseline}</td>
                  <td className="py-4 text-sm text-white font-medium">{row.after}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Deliverables */}
          <div className="flex flex-col">
            {deliverables.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
                className={
                  "flex gap-5 py-6" + (index !== deliverables.length - 1 ? " border-b border-slate-800/30" : "")
                }
              >
                <div className="mt-0.5 shrink-0">{item.icon}</div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-medium text-white">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
