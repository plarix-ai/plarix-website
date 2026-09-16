"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/section-heading";

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

export function StatsSection() {
  return (
    <section className="relative w-full bg-slate-950 py-24 md:py-32 border-b border-slate-800/30">
      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-12 lg:px-16">
        <SectionHeading className="mb-14 text-4xl md:text-5xl max-w-2xl">
          The gap is real, and it is expensive.
        </SectionHeading>

        <div className="flex flex-col">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
              className={cn(
                "grid grid-cols-1 gap-2 py-8 sm:grid-cols-[minmax(0,240px)_1fr] sm:items-baseline sm:gap-10",
                index !== stats.length - 1 && "border-b border-slate-800/40"
              )}
            >
              <span
                className={cn(
                  "text-4xl md:text-5xl font-medium tracking-[-0.02em] tabular-nums",
                  stat.value.startsWith("$") ? "text-amber-500" : "text-white"
                )}
              >
                {stat.value}
              </span>
              <div className="flex flex-col gap-1.5">
                <span className="text-base font-medium text-white">
                  {stat.label}
                </span>
                <p className="text-sm text-slate-500 leading-relaxed max-w-md">
                  {stat.context}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
