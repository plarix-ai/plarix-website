"use client";

import { motion } from "framer-motion";
import { Wrench, Droplets, Zap } from "lucide-react";

const audiences = [
  {
    icon: <Wrench className="w-6 h-6 text-white/70" />,
    title: "HVAC contractors",
    description:
      "You are running 20–100 trucks, using ServiceTitan, Jobber, or FieldEdge, and someone on your team is already doing warranty claims by hand — or you are hiring for it. You know parts are being replaced under warranty every week, and you are not sure how many are actually getting filed.",
    concerns: ["$3M–$25M revenue", "20–100 employees", "Uses ServiceTitan, Jobber, or FieldEdge", "Someone already filing claims manually"],
  },
  {
    icon: <Droplets className="w-6 h-6 text-white/70" />,
    title: "Plumbing contractors",
    description:
      "Same profile as HVAC: mid-sized shop, running an FSM platform, dealing with manufacturer warranties on fixtures, water heaters, and pumps — and nobody has time to chase the portals.",
    concerns: ["$3M–$25M revenue", "20–100 employees", "Uses ServiceTitan, Jobber, or FieldEdge", "Warranty parts billed to customer instead of filed"],
  },
  {
    icon: <Zap className="w-6 h-6 text-white/70" />,
    title: "Also a fit: electrical & roofing",
    description:
      "Electrical and roofing contractors that carry manufacturer warranties on equipment and materials — panels, inverters, shingles, underlayment. If you have a parts warranty and a portal to file through, Plarix works the same way.",
    concerns: ["Manufacturer warranty on materials", "Multiple portals to manage", "Same manual filing bottleneck", "Also a fit if you meet the revenue range"],
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

export function WhoWeServeSection() {
  return (
    <section className="w-full bg-slate-950 py-24 md:py-32 border-b border-slate-800/30">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="flex flex-col gap-6 mb-16">
          <div className="flex items-center gap-3 px-4 py-2 border border-slate-800/50 w-fit">
            <div className="w-2.5 h-2.5 bg-white/30" />
            <span className="text-sm font-medium text-slate-500 tracking-wide">
              Who we serve
            </span>
          </div>
          <h2 className="text-balance text-4xl md:text-5xl font-normal tracking-tight text-white max-w-2xl">
            {"Built for independent home services contractors".split(" ").map((word, i) => (
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
            If you run an FSM platform and have manufacturer warranties you are not filing, Plarix is built for you.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {audiences.map((audience, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col gap-6 p-8 border border-slate-800/30 bg-slate-900/20 hover:bg-slate-900/40 transition-colors"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-white/[0.06] border border-white/10">
                {audience.icon}
              </div>
              <div>
                <h3 className="text-xl font-medium text-white mb-3">{audience.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{audience.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                {audience.concerns.map((concern, idx) => (
                  <span key={idx} className="px-3 py-1 text-xs text-white/70 bg-white/[0.05] border border-white/10">
                    {concern}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-10 text-center text-sm text-slate-500 max-w-lg mx-auto">
          Hiring for a warranty coordinator right now? Talk to us before you fill that role.
        </p>
      </div>
    </section>
  );
}