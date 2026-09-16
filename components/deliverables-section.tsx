"use client";

import { motion } from "framer-motion";
import { Table, BarChart3, Phone } from "lucide-react";

const deliverables = [
  {
    icon: <Table className="w-6 h-6 text-white/70" />,
    title: "The numbers, side by side",
    description: "Every engagement produces a running comparison of your warranty recovery before Plarix and after. This is what you take to your P&L review.",
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-white/70" />,
    title: "Monthly recovery report",
    description: "Claims filed, claims paid, dollars recovered, staff hours freed. Reported on a schedule you set. One email. No login required.",
  },
  {
    icon: <Phone className="w-6 h-6 text-white/70" />,
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function DeliverablesSection() {
  return (
    <section className="w-full bg-slate-950 py-24 md:py-32 border-b border-slate-800/30">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="flex flex-col gap-6 mb-16">
          <div className="flex items-center gap-3 px-4 py-2 border border-slate-800/50 w-fit">
            <div className="w-2.5 h-2.5 bg-white/30" />
            <span className="text-sm font-medium text-slate-500 tracking-wide">
              What you receive
            </span>
          </div>
          <h2 className="text-balance text-4xl md:text-5xl font-normal tracking-tight text-white">
            {"A number, not a narrative".split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ filter: "blur(10px)", opacity: 0 }}
                whileInView={{ filter: "blur(0px)", opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <p className="text-slate-400 text-base leading-relaxed max-w-xl">
            Every Plarix engagement ends with a running before-and-after you can put in front of your accountant, your partner, or your budget review.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Value table */}
          <div className="border border-slate-800/30 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-800/30">
                  <th className="px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Metric</th>
                  <th className="px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Baseline</th>
                  <th className="px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">After</th>
                </tr>
              </thead>
              <tbody>
                {metrics.map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-800/20 last:border-b-0">
                    <td className="px-6 py-4 text-sm text-white">{row.label}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{row.baseline}</td>
                    <td className="px-6 py-4 text-sm text-white font-medium">{row.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Deliverable cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-4"
          >
            {deliverables.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex gap-5 p-6 border border-slate-800/30 bg-slate-900/20 hover:bg-slate-900/40 transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-white/[0.06] border border-white/10 shrink-0">
                  {item.icon}
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-medium text-white">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}