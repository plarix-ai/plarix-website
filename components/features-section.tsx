"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/section-heading";

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
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 md:px-12 lg:grid-cols-[0.8fr_1fr] lg:gap-16 lg:px-16">
        <SectionHeading className="text-4xl md:text-5xl leading-[1.1] max-w-sm">
          What we catch
        </SectionHeading>

        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-1"
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
