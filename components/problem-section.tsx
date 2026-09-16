"use client";

import { motion } from "framer-motion";

export function ProblemSection() {
  return (
    <section id="problem" className="relative w-full bg-slate-950 py-24 md:py-32 border-b border-slate-800/30">
      <div className="pointer-events-none absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><filter id=%22noise%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 result=%22noise%22 /></filter><rect width=%22100%22 height=%22100%22 filter=%22url(%23noise)%22 fill=%22%23ffffff%22/></svg>'\")",
      }} />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center justify-center px-6 md:px-12 lg:px-16">
        <div className="flex flex-col items-center text-center gap-8">
          <div className="flex items-center gap-3 px-4 py-2 border border-slate-800/50 w-fit">
            <div className="w-2.5 h-2.5 bg-white/30" />
            <span className="text-sm font-medium text-slate-500 tracking-wide">
              The problem
            </span>
          </div>
          <h2 className="text-balance text-4xl font-normal tracking-tight text-white md:text-5xl lg:text-5xl">
            {"You're not losing money. You're just not collecting it.".split(" ").map((word, i) => (
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

          <p className="text-balance text-lg leading-relaxed text-slate-400 md:text-xl max-w-2xl">
            Parts credits that expire before anyone files them. Labor claims bounced back for one
            missing field, and never resubmitted. Rebates nobody on staff has time to track. None of
            it&apos;s gone. All of it&apos;s sitting in a manufacturer portal, waiting on a form.
          </p>

          <p className="text-balance text-sm leading-relaxed text-slate-500 max-w-xl">
            Six major FSM platforms, 1,400+ reviews analyzed. Not one handles manufacturer warranty
            claim tracking: not ServiceTitan, not Jobber, not Housecall Pro. The process is entirely
            manual, entirely off-platform.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-4 flex gap-4 border-l-2 border-white/15 pl-6 text-left max-w-xl"
          >
            <p className="text-base italic leading-relaxed text-slate-300">
              &ldquo;We eat warranty labor all the time. It&apos;s just the cost of doing business
              at this point.&rdquo;
              <span className="block mt-2 not-italic text-sm text-slate-500">
                What shop owners tell us, before they see the number
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
