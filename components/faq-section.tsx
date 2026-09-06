"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: "1",
    question: "Does this replace ServiceTitan?",
    answer:
      "No. Plarix works alongside your FSM — ServiceTitan, Jobber, FieldEdge, whatever you run. We pull job data from it, identify claims, and file them. Your team keeps using the same platform they already know.",
  },
  {
    id: "2",
    question: "What if we do not know how much we are losing?",
    answer:
      "That is exactly what the free audit is for. We pull your job history and tell you: this many claims qualify, this is the estimated dollar value. You find out the number before you spend a dollar with us.",
  },
  {
    id: "3",
    question: "Will this replace my office manager?",
    answer:
      "No. Your office manager currently spends hours logging into manufacturer portals, filling out forms, and chasing denials. Plarix handles that part. They get those hours back — to dispatch, handle customer calls, or do anything that actually needs a person.",
  },
  {
    id: "4",
    question: "What data do you need access to?",
    answer:
      "Your job data from your FSM: job records, parts used, labor logged, serial numbers when available. We do not need access to your financials, your bank accounts, or your customer data beyond what is on the work order itself.",
  },
  {
    id: "5",
    question: "What happens if you do not find anything?",
    answer:
      "Then we tell you, and you pay nothing. The audit is free either way. If there are no unfiled claims in your job history, we will tell you that directly and you move on. We would rather tell you the truth than sell you something you do not need.",
  },
  {
    id: "6",
    question: "How do you get paid?",
    answer:
      "We take a percentage of the dollars we recover for you. If we do not recover anything, you do not pay anything. This means our incentives are aligned: we only succeed when money actually lands back in your account.",
  },
  {
    id: "7",
    question: "How long until we see money coming back?",
    answer:
      "It depends on the manufacturer. Some pay within 30 days of a clean claim submission. Others take 60–90 days. We start filing as soon as the audit is complete, and we track every claim through to payment so you know exactly where each one stands.",
  },
];

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
              <div className="w-2.5 h-2.5 bg-amber-500" />
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
              <a href="mailto:hello@plarix.dev" className="text-amber-500 hover:text-amber-400 transition-colors">
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
                      transition={{ duration: 0.3, ease: "easeInOut" }}
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