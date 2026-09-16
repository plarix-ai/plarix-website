"use client";

import React from "react"
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Wrench, RefreshCw, Gift, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const workflowSteps = [
  {
    id: 1,
    title: "1. Count",
    description:
      "We look at your last 90 days of jobs and claims. Free. Takes about twenty minutes of your time, once.",
    icon: <Search className="w-5 h-5" />,
    visual: (
      <div className="flex h-full w-full items-center justify-center bg-slate-900/60 p-8">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="px-3 py-2 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-mono">Your Job Data</div>
            <span className="text-slate-600">&rarr;</span>
            <div className="px-3 py-2 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-mono">90-Day Count</div>
          </div>
          <div className="mt-4 flex flex-col items-center gap-2">
            <span className="text-3xl font-normal text-amber-500">$12,470</span>
            <span className="text-xs text-slate-500">unfiled warranty value found</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "2. Build",
    description:
      "If there's real money, we build the system that catches it — plugged into ServiceTitan, Jobber, FieldEdge, whatever you already run. You don't switch platforms.",
    icon: <Wrench className="w-5 h-5" />,
    visual: (
      <div className="flex h-full w-full items-center justify-center bg-slate-900/60 p-8">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="px-3 py-2 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-mono">Built</div>
            <span className="text-slate-600">&rarr;</span>
            <div className="px-3 py-2 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-mono">Plugged In</div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {["ServiceTitan", "Jobber", "FieldEdge", "Carrier", "Trane", "Lennox"].map((mfr) => (
              <div key={mfr} className="px-2 py-1 text-[10px] text-slate-400 border border-slate-800/30 text-center">{mfr}</div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "3. Run",
    description:
      "Flat monthly fee, billed like every other tool you already pay for. No twelve-month contract. Cancel anytime.",
    icon: <RefreshCw className="w-5 h-5" />,
    visual: (
      <div className="flex h-full w-full items-center justify-center bg-slate-900/60 p-8">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="px-3 py-2 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-mono">Filed</div>
            <span className="text-slate-600">&rarr;</span>
            <div className="px-3 py-2 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono">Money Back</div>
          </div>
          <div className="mt-4 flex flex-col items-center gap-1">
            <span className="text-2xl font-normal text-white">$9,840</span>
            <span className="text-xs text-slate-500">recovered this month</span>
            <span className="text-xs text-slate-600">34 claims, 3 manufacturers</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "4. Bonus",
    description:
      "After 90 days of proven numbers on your data, a small share of what we recover above your baseline. Bonus, not the paycheck.",
    icon: <Gift className="w-5 h-5" />,
    visual: (
      <div className="flex h-full w-full items-center justify-center bg-slate-900/60 p-8">
        <div className="flex flex-col items-center gap-4">
          <div className="px-3 py-2 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-mono">90 Days Proven</div>
          <div className="mt-2 flex flex-col items-center gap-1">
            <span className="text-2xl font-normal text-white">Baseline + share</span>
            <span className="text-xs text-slate-500">of verified recovery above it</span>
          </div>
        </div>
      </div>
    ),
  },
];

export function HowItWorksSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % workflowSteps.length);
    }, 8000);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(0);
            startTimer();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    startTimer();

    return () => {
      observer.disconnect();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  return (
    <section ref={sectionRef} id="how-it-works" className="w-full bg-slate-950 text-white py-24 flex flex-col items-center overflow-hidden border-b border-slate-800/30">
      <div className="max-w-7xl w-full px-6 md:px-12 lg:px-16 gap-12 flex flex-col">
        <div className="flex flex-col gap-4 max-w-[600px]">
          <div className="flex items-center gap-3 px-4 py-2 border border-slate-800/50 w-fit">
            <div className="w-2.5 h-2.5 bg-amber-500" />
            <span className="text-sm font-medium text-slate-500 tracking-wide">
              How it works
            </span>
          </div>
          <h2 className="text-balance text-4xl md:text-5xl font-normal leading-[1.1] tracking-tight text-white">
            {"Count, build, run, bonus".split(" ").map((word, i) => (
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
          <p className="text-balance text-slate-400 text-base leading-relaxed">
            No long implementation. No new platform for your team to learn. We count what is unfiled,
            build the system that catches it, and run it beside whatever you already use.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[400px]">
          <div className="relative aspect-[4/3] w-full overflow-hidden border border-slate-800/30">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                className="absolute inset-0"
              >
                {workflowSteps[activeIndex].visual}
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-3 left-3 right-3 h-0.5 flex gap-2 z-10">
              {workflowSteps.map((_, idx) => (
                <div key={idx} className="h-full flex-1 bg-white/10 overflow-hidden">
                  {activeIndex === idx && (
                    <motion.div
                      className="h-full bg-amber-500/80"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 8, ease: "linear" }}
                    />
                  )}
                  {idx < activeIndex && (
                    <div className="h-full w-full bg-amber-500/80" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {workflowSteps.map((step, index) => (
              <motion.button
                key={step.id}
                onClick={() => { setActiveIndex(index); startTimer(); }}
                className={cn(
                  "group relative w-full text-left p-6 transition-all duration-300 outline-none",
                  activeIndex === index
                    ? "bg-white/[0.03] border border-slate-800/60"
                    : "bg-transparent border border-transparent hover:bg-white/[0.01]"
                )}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "mt-1 p-2 transition-colors duration-300",
                    activeIndex === index ? "bg-amber-500 text-slate-950" : "bg-white/5 text-slate-600"
                  )}>
                    {step.icon}
                  </div>

                  <div className="flex-1 gap-1 flex flex-col">
                    <h3 className={cn(
                      "text-xl font-medium transition-colors duration-300",
                      activeIndex === index ? "text-white" : "text-slate-600"
                    )}>
                      {step.title}
                    </h3>

                    <p className={cn(
                      "text-slate-400 text-base leading-relaxed mt-1 transition-opacity duration-300",
                      activeIndex === index ? "opacity-100" : "opacity-0 select-none"
                    )}>
                      {step.description}
                    </p>
                  </div>

                  <div className={cn(
                    "mt-1.5 transition-all duration-300",
                    activeIndex === index ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                  )}>
                    <ChevronRight className="w-5 h-5 text-white/40" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="pt-12 flex justify-center border-t border-slate-800/20">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.dispatchEvent(new CustomEvent("open-consultation"))}
            className="px-8 py-4 bg-amber-500 text-slate-950 font-medium flex items-center gap-2 hover:bg-amber-400 transition-colors"
          >
            Get your free claim count
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
