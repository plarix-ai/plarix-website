"use client";

import { motion } from "framer-motion";
import { XCircle, Users, Eye, MessageCircle } from "lucide-react";

const blocks = [
  {
    icon: <XCircle className="w-5 h-5 text-amber-500" />,
    title: "No long contract, cancel anytime",
    description: "You are not locked into a 12-month agreement. If Plarix stops recovering money for you, you walk. No termination fee, no notice period games. We earn your business every month.",
  },
  {
    icon: <Users className="w-5 h-5 text-amber-500" />,
    title: "Nobody on your team loses their job",
    description: "Plarix automates the portal-login-and-upload part of warranty claims — not the people part. Your office staff stops doing data entry and starts doing things that actually need a human. We do not replace anyone.",
  },
  {
    icon: <Eye className="w-5 h-5 text-amber-500" />,
    title: "You see the number before you commit to anything",
    description: "The free warranty audit gives you a dollar figure: here is what you are owed and not filing. You decide whether it is worth pursuing. No upfront payment, no credit card required to see the number.",
  },
  {
    icon: <MessageCircle className="w-5 h-5 text-amber-500" />,
    title: "Built from conversations with shop owners, not a lab",
    description: "Every feature in Plarix came from sitting down with HVAC and plumbing contractors and asking: what part of this process actually hurts? The answer is never 'we need more dashboards.' It is usually 'I do not know what we are not filing.'",
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
            <div className="w-2.5 h-2.5 bg-amber-500" />
            <span className="text-sm font-medium text-slate-500 tracking-wide">
              Why Plarix
            </span>
          </div>
          <h2 className="text-balance text-4xl md:text-5xl font-normal tracking-tight text-white">
            {"Four things we will never do to a contractor".split(" ").map((word, i) => (
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
          {blocks.map((block, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex gap-6 p-8 border border-slate-800/30 bg-slate-900/20 hover:bg-slate-900/40 transition-colors"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-amber-500/10 border border-amber-500/20 shrink-0">
                {block.icon}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-medium text-white">{block.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{block.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}