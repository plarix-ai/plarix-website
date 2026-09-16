"use client";

import { motion } from "framer-motion";

export function FounderSection() {
  return (
    <section className="w-full bg-slate-950 py-20 border-b border-slate-800/30">
      <div className="mx-auto max-w-3xl px-6 md:px-12 lg:px-16">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center text-base text-slate-500 leading-relaxed italic"
        >
          In the founders&apos; own words: which shop, which conversation, which number made this
          worth building. Coming as we take on our first shops.
        </motion.p>
      </div>
    </section>
  );
}
