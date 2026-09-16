"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const CATCHES = [
  "Manufacturer warranty parts claims",
  "Labor reimbursement claims",
  "Rebate and incentive deadlines",
  "Claims rejected once and never resubmitted",
  "Every manufacturer's portal, tracked in one place. You don't juggle logins",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

interface FeaturesSectionProps {
  className?: string;
}

export function FeaturesSection({ className }: FeaturesSectionProps) {
  return (
    <section
      id="features"
      className={cn(
        "w-full bg-slate-950 py-24 border-b border-slate-800/30",
        className
      )}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-6 mb-16"
        >
          <div className="flex items-center gap-3 px-4 py-2 border border-slate-800/50 w-fit">
            <div className="w-2.5 h-2.5 bg-white/30" />
            <span className="text-sm font-medium text-slate-500 tracking-wide">
              What we catch
            </span>
          </div>
          <h2 className="text-balance text-white text-4xl md:text-5xl font-normal leading-[1.1] max-w-2xl tracking-tight">
            What we catch
          </h2>
        </motion.div>

        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-1 max-w-xl mx-auto"
        >
          {CATCHES.map((item) => (
            <motion.li
              key={item}
              variants={itemVariants}
              className="flex items-center gap-4 py-5 border-b border-slate-800/30 last:border-b-0"
            >
              <Check className="w-5 h-5 text-white/50 shrink-0" />
              <span className="text-lg text-white">{item}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
