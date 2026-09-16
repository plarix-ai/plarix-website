"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const stats = [
  {
    value: "$45K–$110K",
    label: "Cost of a warranty coordinator",
    context: "Annual salary for a full-time warranty administrator in HVAC/plumbing, sourced from active job postings on Indeed and ZipRecruiter."
  },
  {
    value: "0",
    label: "Platforms that file claims",
    context: "Of the six major FSM platforms (ServiceTitan, Jobber, Housecall Pro, FieldEdge, Workiz, Service Fusion), none handle manufacturer warranty claim submission or tracking."
  },
  {
    value: "$14.7B",
    label: "HVAC market, fragmented",
    context: "U.S. HVAC services market size (Grand View Research, 2024), served by 130,000+ independent contractors. No single player owns the warranty recovery layer."
  },
  {
    value: "2",
    label: "Numbers we report",
    context: "Every Plarix engagement ends with two numbers: dollars recovered and claims filed. No dashboards that nobody reads."
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

export function StatsSection() {
  return (
    <section className="relative w-full bg-slate-950 py-24 md:py-32 border-b border-slate-800/30">
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="flex flex-col items-center text-center gap-8 mb-16">
          <div className="flex items-center gap-3 px-4 py-2 border border-slate-800/50 w-fit">
            <div className="w-2.5 h-2.5 bg-white/30" />
            <span className="text-sm font-medium text-slate-500 tracking-wide">
              The reality
            </span>
          </div>
          <h2 className="text-balance text-4xl md:text-5xl font-normal tracking-tight text-white">
            {"The gap is real, and it is expensive".split(" ").map((word, i) => (
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
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center text-center gap-3 p-8 border border-slate-800/30 bg-slate-900/20"
            >
              <span
                className={cn(
                  "text-4xl md:text-5xl font-normal tracking-tight tabular-nums",
                  stat.value.startsWith("$") ? "text-amber-500" : "text-white"
                )}
              >
                {stat.value}
              </span>
              <span className="text-sm font-medium text-white uppercase tracking-wider">
                {stat.label}
              </span>
              <p className="text-xs text-slate-500 leading-relaxed italic">
                {stat.context}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}