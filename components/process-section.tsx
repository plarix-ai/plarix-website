"use client";

import { motion } from "framer-motion";
import { ScanSearch, Cog, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: <ScanSearch className="w-5 h-5" />,
    title: "Free warranty audit",
    timeline: "You see the number before you commit",
    items: [
      "We pull your job data from your FSM",
      "We identify every unfiled warranty claim",
      "We give you a dollar figure: this is what you are missing",
      "No obligation, no contract, no payment info required",
    ],
  },
  {
    icon: <Cog className="w-5 h-5" />,
    title: "We file the claims",
    timeline: "Your team does nothing",
    items: [
      "We prepare and submit claims to each manufacturer",
      "We handle the portal logins, formats, and deadlines",
      "We resubmit denials with corrected information",
      "You get a status update — that is the only thing you need to look at",
    ],
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: "You get paid, we report",
    timeline: "Dollars recovered, month over month",
    items: [
      "Every recovered dollar tracked and reported",
      "Monthly summary: claims filed, claims paid, dollars back",
      "Cancellable anytime, no long-term lock-in",
      "We only make money when you recover money",
    ],
  },
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

export function ProcessSection() {
  return (
    <section id="process" className="relative w-full bg-slate-950 py-24 md:py-32 border-b border-slate-800/30 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="flex flex-col gap-6 mb-16">
          <div className="flex items-center gap-3 px-4 py-2 border border-slate-800/50 w-fit">
            <div className="w-2.5 h-2.5 bg-amber-500" />
            <span className="text-sm font-medium text-slate-500 tracking-wide">
              How it works
            </span>
          </div>
          <h2 className="text-balance text-4xl md:text-5xl font-normal tracking-tight text-white max-w-xl">
            {"Audit, file, recover".split(" ").map((word, i) => (
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
          <p className="text-slate-400 text-base leading-relaxed max-w-lg">
            No long implementation. No new platform for your team to learn. We find what is unfiled, file it, and report the money back.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col gap-4 p-8 border border-slate-800/30 bg-slate-900/20 relative"
            >
              <span className="text-xs text-slate-600 font-mono tracking-wider">
                STEP {String(index + 1).padStart(2, "0")}
              </span>

              <div className="w-10 h-10 flex items-center justify-center bg-amber-500/10 border border-amber-500/20 text-amber-500">
                {step.icon}
              </div>

              <div>
                <h3 className="text-lg font-medium text-white">{step.title}</h3>
                <span className="text-sm text-amber-500/70">{step.timeline}</span>
              </div>

              <ul className="flex flex-col gap-2 mt-2">
                {step.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-400">
                    <div className="w-1 h-1 bg-slate-600 shrink-0 mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}