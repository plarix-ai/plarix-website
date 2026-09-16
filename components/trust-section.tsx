"use client";

import { motion } from "framer-motion";
import { Ban, Users, Ear, TrendingUp, Database, Layers } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const promises = [
  {
    icon: <Ban className="w-5 h-5 text-white/50" />,
    text: "We will never lock you into a long contract.",
  },
  {
    icon: <Users className="w-5 h-5 text-white/50" />,
    text: "We will never touch your team's jobs. We automate paperwork, not people.",
  },
  {
    icon: <Ear className="w-5 h-5 text-white/50" />,
    text: "We will never record your technicians, score their calls, or put anything in the field that makes anyone feel watched.",
  },
  {
    icon: <TrendingUp className="w-5 h-5 text-white/50" />,
    text: "We will never promise a recovery number we haven't proven on your data specifically.",
  },
  {
    icon: <Database className="w-5 h-5 text-white/50" />,
    text: "We will never make you migrate your data, rebuild your pricebook, or retrain your team.",
  },
  {
    icon: <Layers className="w-5 h-5 text-white/50" />,
    text: "We will never become the platform. Whatever you already run, we sit beside it, not on top of it, not instead of it.",
  },
];

export function TrustSection() {
  return (
    <section className="w-full bg-slate-950 py-24 md:py-32 border-b border-slate-800/30">
      <div className="mx-auto max-w-4xl px-6 md:px-12 lg:px-16">
        <SectionHeading className="mb-14 text-4xl md:text-5xl">
          Promises, in writing.
        </SectionHeading>

        <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
          {promises.map((promise, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: (index % 2) * 0.06 }}
              className="flex gap-4"
            >
              <div className="mt-0.5 shrink-0">{promise.icon}</div>
              <p className="text-base text-white leading-relaxed">{promise.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
