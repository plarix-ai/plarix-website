"use client";

import { motion } from "framer-motion";
import { Ban, Users, Ear, TrendingUp, Database, Layers } from "lucide-react";

const promises = [
  {
    icon: <Ban className="w-5 h-5 text-white/70" />,
    text: "We will never lock you into a long contract.",
  },
  {
    icon: <Users className="w-5 h-5 text-white/70" />,
    text: "We will never touch your team's jobs. We automate paperwork, not people.",
  },
  {
    icon: <Ear className="w-5 h-5 text-white/70" />,
    text: "We will never record your technicians, score their calls, or put anything in the field that makes anyone feel watched.",
  },
  {
    icon: <TrendingUp className="w-5 h-5 text-white/70" />,
    text: "We will never promise a recovery number we haven't proven on your data specifically.",
  },
  {
    icon: <Database className="w-5 h-5 text-white/70" />,
    text: "We will never make you migrate your data, rebuild your pricebook, or retrain your team.",
  },
  {
    icon: <Layers className="w-5 h-5 text-white/70" />,
    text: "We will never become the platform. Whatever you already run, we sit beside it — not on top of it, not instead of it.",
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

export function TrustSection() {
  return (
    <section className="w-full bg-slate-950 py-24 md:py-32 border-b border-slate-800/30">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="flex flex-col gap-6 mb-16 items-center text-center">
          <div className="flex items-center gap-3 px-4 py-2 border border-slate-800/50 w-fit">
            <div className="w-2.5 h-2.5 bg-white/30" />
            <span className="text-sm font-medium text-slate-500 tracking-wide">
              Promises
            </span>
          </div>
          <h2 className="text-balance text-4xl md:text-5xl font-normal tracking-tight text-white">
            {"Promises, in writing".split(" ").map((word, i) => (
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
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {promises.map((promise, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex gap-6 p-8 border border-slate-800/30 bg-slate-900/20 hover:bg-slate-900/40 transition-colors"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-white/[0.06] border border-white/10 shrink-0">
                {promise.icon}
              </div>
              <p className="text-base text-white leading-relaxed">{promise.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
