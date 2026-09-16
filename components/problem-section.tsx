"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";

export function ProblemSection() {
  return (
    <section id="problem" className="relative w-full bg-slate-950 py-24 md:py-32 border-b border-slate-800/30">
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 md:px-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-16">
        <div className="flex flex-col gap-6">
          <SectionHeading className="text-4xl md:text-5xl lg:text-5xl leading-[1.08]">
            You&apos;re not losing money. You&apos;re just not collecting it.
          </SectionHeading>

          <p className="text-balance text-lg leading-relaxed text-slate-400 md:text-xl max-w-xl">
            Parts credits that expire before anyone files them. Labor claims bounced back for one
            missing field, and never resubmitted. Rebates nobody on staff has time to track. None of
            it&apos;s gone. All of it&apos;s sitting in a manufacturer portal, waiting on a form.
          </p>

          <p className="text-balance text-sm leading-relaxed text-slate-500 max-w-lg">
            Six major FSM platforms, 1,400+ reviews analyzed. Not one handles manufacturer warranty
            claim tracking: not ServiceTitan, not Jobber, not Housecall Pro. The process is entirely
            manual, entirely off-platform.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex flex-col justify-center border-l border-slate-800/60 pl-8"
        >
          <p className="text-xl italic leading-relaxed text-slate-300">
            &ldquo;We eat warranty labor all the time. It&apos;s just the cost of doing business
            at this point.&rdquo;
          </p>
          <span className="mt-4 text-sm not-italic text-slate-500">
            What shop owners tell us, before they see the number
          </span>
        </motion.div>
      </div>
    </section>
  );
}
