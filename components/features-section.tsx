"use client";

import React from "react"
import { motion } from "framer-motion";
import { FileCheck, Send, RefreshCw, Receipt, Percent, BadgeDollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
  comingSoon?: boolean;
}

const DEFAULT_FEATURES: FeatureItem[] = [
  {
    id: "1",
    icon: <FileCheck className="w-5 h-5 text-white" />,
    title: "Warranty claim identification",
    description: "We scan your job history and flag every part and labor line that qualifies for a manufacturer warranty claim — including claims your team missed because the serial number was on a different screen.",
    items: ["Parts and labor both checked", "Works across Carrier, Trane, Lennox, Rheem, and more", "No manual lookup by your team", "Dollar value estimated before filing"],
  },
  {
    id: "2",
    icon: <Send className="w-5 h-5 text-white" />,
    title: "Manufacturer portal submission",
    description: "We submit claims directly to each manufacturer's portal in their exact format — correct fields, correct attachments, correct deadlines. No more 'submit and pray.'",
    items: ["Filed to the correct portal, every time", "All required docs attached automatically", "Deadline tracking per manufacturer", "Denial reasons surfaced and corrected"],
  },
  {
    id: "3",
    icon: <RefreshCw className="w-5 h-5 text-white" />,
    title: "Claim status tracking",
    description: "We track every submitted claim from filed to paid. You see what is pending, what was denied and why, and what landed back in your account — all in one place.",
    items: ["Status of every claim, updated automatically", "Denied claims flagged with reason", "Payments matched to claims", "Monthly recovery report"],
  },
  {
    id: "4",
    icon: <Receipt className="w-5 h-5 text-white" />,
    title: "Manufacturer rebate tracking",
    description: "We track manufacturer rebate programs against your purchases and flag what you qualify for but haven't claimed. Coming in a future release.",
    items: ["Rebate eligibility flagged from purchase data", "Form prep and submission handled", "Seasonal program deadlines tracked", "Matches rebates to qualifying installs"],
    comingSoon: true,
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
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 mb-16"
        >
          <div className="flex items-center gap-3 px-4 py-2 border border-slate-800/50 w-fit">
            <div className="w-2.5 h-2.5 bg-amber-500" />
            <span className="text-sm font-medium text-slate-500 tracking-wide">
              What we automate
            </span>
          </div>
          <h2 className="text-balance text-white text-4xl md:text-5xl lg:text-5xl font-normal leading-[1.1] max-w-[700px] tracking-tight">
            {"Every step from job data to money back".split(" ").map((word, i) => (
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
            Plarix automates the parts of warranty recovery that currently live in spreadsheets, sticky notes, and someone's memory.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {DEFAULT_FEATURES.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className="flex flex-col group p-8 border border-slate-800/30 bg-slate-900/20 hover:bg-slate-900/40 transition-colors relative"
            >
              {feature.comingSoon && (
                <span className="absolute top-3 right-4 px-2 py-0.5 text-[10px] text-amber-500/70 border border-amber-500/20 bg-amber-500/5 uppercase tracking-wider">
                  Coming next
                </span>
              )}
              <div className="mb-6">
                <div className="w-10 h-10 flex items-center justify-center bg-amber-500/10 border border-amber-500/20 transform transition-transform group-hover:scale-110 duration-300">
                  {feature.icon}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h4 className="text-white text-lg font-medium tracking-tight">
                  {feature.title}
                </h4>
                <p className="text-balance text-slate-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
                <ul className="mt-2 flex flex-col gap-2">
                  {feature.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-slate-400">
                      <div className="w-1 h-1 bg-amber-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}