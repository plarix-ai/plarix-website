"use client";

import { motion } from "framer-motion";

export function FounderSection() {
  return (
    <section className="w-full bg-slate-950 py-20 border-b border-slate-800/30">
      <div className="mx-auto max-w-3xl px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center gap-4 border border-slate-800/30 bg-slate-900/20 p-10"
        >
          <div className="flex items-center gap-3 px-4 py-2 border border-slate-800/50 w-fit">
            <div className="w-2.5 h-2.5 bg-white/30" />
            <span className="text-sm font-medium text-slate-500 tracking-wide">
              From the founders
            </span>
          </div>
          <p className="text-base text-slate-400 leading-relaxed max-w-xl">
            In the founders&apos; own words — which shop, which conversation, which number made this
            worth building. Coming as we take on our first shops.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
