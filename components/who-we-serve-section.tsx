"use client";

import { motion } from "framer-motion";
import { Wrench, Droplets, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/section-heading";

const audiences = [
  {
    icon: <Wrench className="w-5 h-5 text-white/60" />,
    title: "HVAC contractors",
    description:
      "You are running 20–100 trucks, using ServiceTitan, Jobber, or FieldEdge, and someone on your team is already doing warranty claims by hand, or you are hiring for it. You know parts are being replaced under warranty every week, and you are not sure how many are actually getting filed.",
    concerns: ["$3M–$25M revenue", "20–100 employees", "ServiceTitan, Jobber, or FieldEdge", "Someone already filing claims manually"],
  },
  {
    icon: <Droplets className="w-5 h-5 text-white/60" />,
    title: "Plumbing contractors",
    description:
      "Same profile as HVAC: mid-sized shop, running an FSM platform, dealing with manufacturer warranties on fixtures, water heaters, and pumps. Nobody has time to chase the portals.",
    concerns: ["$3M–$25M revenue", "20–100 employees", "ServiceTitan, Jobber, or FieldEdge", "Warranty parts billed to customer instead of filed"],
  },
  {
    icon: <Zap className="w-5 h-5 text-white/60" />,
    title: "Also a fit: electrical & roofing",
    description:
      "Electrical and roofing contractors that carry manufacturer warranties on equipment and materials: panels, inverters, shingles, underlayment. If you have a parts warranty and a portal to file through, Plarix works the same way.",
    concerns: ["Manufacturer warranty on materials", "Multiple portals to manage", "Same manual filing bottleneck", "Also a fit if you meet the revenue range"],
  },
];

export function WhoWeServeSection() {
  return (
    <section className="w-full bg-slate-950 py-24 md:py-32 border-b border-slate-800/30">
      <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-16">
        <div className="flex flex-col gap-6 mb-16 max-w-xl">
          <SectionHeading className="text-4xl md:text-5xl">
            Built for independent home services contractors.
          </SectionHeading>
          <p className="text-slate-400 text-base leading-relaxed">
            If you run an FSM platform and have manufacturer warranties you are not filing, Plarix is built for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
          {audiences.map((audience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
              className={cn(
                "flex flex-col gap-4 py-8 md:py-2",
                index > 0 && "md:border-l md:border-slate-800/50 md:pl-8",
                "border-t border-slate-800/40 md:border-t-0 pt-8 md:pt-0"
              )}
            >
              <div className="flex items-center gap-3">
                {audience.icon}
                <h3 className="text-lg font-medium text-white">{audience.title}</h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{audience.description}</p>
              <p className="mt-auto pt-4 text-xs text-slate-500 leading-relaxed">
                {audience.concerns.join(" · ")}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="mt-14 text-sm text-slate-500 max-w-lg">
          Hiring for a warranty coordinator right now? Talk to us before you fill that role.
        </p>
      </div>
    </section>
  );
}
