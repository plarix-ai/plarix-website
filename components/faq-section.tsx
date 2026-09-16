"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { faqs } from "@/lib/faq-data";

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleQuestion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      className="w-full bg-slate-950 py-24 md:py-32 border-b border-slate-800/30"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 px-4 py-2 border border-slate-800/50 w-fit">
              <div className="w-2.5 h-2.5 bg-white/30" />
              <span className="text-sm font-medium text-slate-500 tracking-wide">
                FAQ
              </span>
            </div>

            <h2 className="text-balance text-4xl md:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.1]">
              {"Questions we hear from shop owners".split(" ").map((word, i) => (
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

            <p className="text-balance text-base md:text-lg text-slate-400 leading-relaxed max-w-md">
              Straight answers about how Plarix finds, files, and tracks warranty claims — and what it costs.
            </p>

            <p className="text-sm text-slate-500">
              Do not see your question?{" "}
              <a href="mailto:hello@plarix.dev" className="text-white hover:text-slate-300 underline underline-offset-4 transition-colors">
                Ask us directly.
              </a>
            </p>
          </div>

          <div className="flex flex-col">
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className={cn(
                  "border-t border-slate-800/40",
                  index === faqs.length - 1 && "border-b"
                )}
              >
                <button
                  onClick={() => toggleQuestion(faq.id)}
                  className="w-full py-5 flex items-center justify-between gap-4 text-left group"
                >
                  <span className="text-base md:text-lg font-normal text-white group-hover:text-slate-300 transition-colors">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openId === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-slate-500" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 pr-12">
                        <p className="text-base leading-relaxed text-slate-400">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
