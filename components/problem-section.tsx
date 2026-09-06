"use client";

import { motion } from "framer-motion";
import { ClipboardList, Globe, DollarSign } from "lucide-react";

const problems = [
  {
    icon: <ClipboardList className="w-5 h-5 text-amber-500" />,
    title: "The manual process",
    description:
      "A warranty claim today touches your FSM, the manufacturer's portal, a parts invoice, and someone's memory. One technician fills out a form, an office person looks up the serial number, logs into Carrier or Trane or Lennox with a different password, uploads the paperwork, and hits submit. Then they wait. If the claim comes back denied, they start over. Most shops have nobody dedicated to this — it lives on whoever has time.",
  },
  {
    icon: <Globe className="w-5 h-5 text-amber-500" />,
    title: "The manufacturer portals",
    description:
      "Carrier, Trane, Lennox, Rheem — each has its own portal, its own login, its own rules for what counts as a valid claim. Deadlines vary. Required documents vary. A claim filed correctly to Carrier would get rejected by Lennox for a missing field. Contractors call it 'submit and pray' because there is no way to know if a claim will stick until the check shows up or doesn't.",
  },
  {
    icon: <DollarSign className="w-5 h-5 text-amber-500" />,
    title: "The money you're not filing",
    description:
      "Parts covered under warranty that were billed to the customer. Labor hours that the manufacturer would have paid, written off because nobody had time to chase them. Every shop owner we've talked to has a version of 'we eat the cost' — not because the claim is invalid, but because filing it costs more in staff time than anyone wants to spend. The money is owed. It just isn't getting claimed.",
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

export function ProblemSection() {
  return (
    <section id="problem" className="relative w-full bg-slate-950 py-24 md:py-32 border-b border-slate-800/30">
      <div className="pointer-events-none absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><filter id=%22noise%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 result=%22noise%22 /></filter><rect width=%22100%22 height=%22100%22 filter=%22url(%23noise)%22 fill=%22%23ffffff%22/></svg>'\")",
      }} />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center px-6 md:px-12 lg:px-16">
        <div className="flex flex-col items-center text-center gap-8 mb-16">
          <div className="flex items-center gap-3 px-4 py-2 border border-slate-800/50 w-fit">
            <div className="w-2.5 h-2.5 bg-amber-500" />
            <span className="text-sm font-medium text-slate-500 tracking-wide">
              The problem
            </span>
          </div>
          <h2 className="text-balance text-4xl font-normal tracking-tight text-white md:text-5xl lg:text-5xl">
            {"Zero field service platforms track warranty claims. Your shop is eating costs the manufacturer owes you.".split(" ").map((word, i) => (
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

          <p className="text-balance text-lg leading-relaxed text-slate-400 md:text-xl max-w-3xl">
            Six major FSM platforms, 1,400+ reviews analyzed. Not one handles manufacturer warranty claim tracking — not ServiceTitan, not Jobber, not Housecall Pro. The process is entirely manual, entirely off-platform, and costing shops real money every month.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
        >
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col gap-4 p-8 border border-slate-800/30 bg-slate-900/20"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-amber-500/10 border border-amber-500/20">
                {problem.icon}
              </div>
              <h3 className="text-xl font-medium text-white">{problem.title}</h3>
              <p className="text-base leading-relaxed text-slate-400">{problem.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}