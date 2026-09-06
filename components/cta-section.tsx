"use client";

import React, { useEffect } from "react"

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, TrendingUp } from "lucide-react";

export function CtaSection() {
  const [formOpen, setFormOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const handler = () => setFormOpen(true);
    window.addEventListener("open-consultation", handler);
    return () => window.removeEventListener("open-consultation", handler);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      company: formData.get("company") as string,
      email: formData.get("email") as string,
      fsm: formData.get("fsm") as string,
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setFormOpen(false);
          setSubmitted(false);
        }, 3000);
      } else {
        const subject = encodeURIComponent("Plarix Free Warranty Audit Request");
        const body = encodeURIComponent(
          `First Name: ${data.firstName}\nLast Name: ${data.lastName}\nCompany: ${data.company}\nEmail: ${data.email}\nFSM Platform: ${data.fsm || "N/A"}`
        );
        window.location.href = `mailto:hello@plarix.dev?subject=${subject}&body=${body}`;
      }
    } catch {
      const subject = encodeURIComponent("Plarix Free Warranty Audit Request");
      const body = encodeURIComponent(
        `First Name: ${data.firstName}\nLast Name: ${data.lastName}\nCompany: ${data.company}\nEmail: ${data.email}\nFSM Platform: ${data.fsm || "N/A"}`
      );
      window.location.href = `mailto:hello@plarix.dev?subject=${subject}&body=${body}`;
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="cta" className="relative w-full overflow-hidden bg-slate-100">
      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-14 md:py-20 flex justify-center">
        <div className="max-w-2xl flex flex-col items-center text-center gap-6">
          <div className="w-16 h-16 flex items-center justify-center bg-amber-500/15 border border-amber-500/30">
            <TrendingUp className="w-8 h-8 text-amber-600" />
          </div>

          <h2 className="text-balance text-4xl font-normal tracking-tight text-slate-950 md:text-5xl lg:text-6xl">
            {"There is money sitting in your job history that the manufacturer owes you".split(" ").map((word, i) => (
              <motion.span
                key={`cta-${i}`}
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

          <p className="text-balance max-w-xl text-base leading-relaxed text-slate-500 md:text-lg">
            Let us find it. The audit is free, the number is real, and there is no obligation to continue. No sales pressure. Just an honest look at what you are not filing.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center w-full">
            <Button
              size="lg"
              className="bg-slate-950 px-8 text-white hover:bg-slate-800 font-medium"
              onClick={() => setFormOpen(true)}
            >
              Get a Free Warranty Audit
            </Button>
          </div>
        </div>
      </div>

      {/* Form Panel */}
      <AnimatePresence>
        {formOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
              onClick={() => setFormOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-0 z-[201] flex items-center justify-center px-4 py-8 overflow-y-auto"
            >
              <div className="relative w-full max-w-md bg-slate-950/90 backdrop-blur-xl border border-slate-800/50 p-8 my-auto">
                <button
                  onClick={() => setFormOpen(false)}
                  className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                  aria-label="Close form"
                >
                  <X className="w-5 h-5" />
                </button>

                {submitted ? (
                  <div className="flex flex-col items-center gap-4 py-8">
                    <div className="w-12 h-12 flex items-center justify-center bg-amber-500/15 border border-amber-500/30">
                      <TrendingUp className="w-6 h-6 text-amber-500" />
                    </div>
                    <p className="text-white text-lg font-medium">
                      Request received.
                    </p>
                    <p className="text-slate-400 text-sm text-center">
                      We will reach out to schedule your free warranty audit.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-10 h-10 flex items-center justify-center bg-amber-500/15 border border-amber-500/30 shrink-0 mt-0.5">
                        <TrendingUp className="w-5 h-5 text-amber-500" />
                      </div>
                      <div>
                        <h3 className="text-white text-lg font-medium">
                          Get a Free Warranty Audit
                        </h3>
                        <p className="text-slate-500 text-sm mt-1">
                          Tell us what FSM you use and we will show you what is sitting unfiled.
                        </p>
                      </div>
                    </div>

                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4 mt-6"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-slate-400">
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            required
                            placeholder="John"
                            className="bg-slate-900 border border-slate-800 text-white text-sm px-3 py-2.5 placeholder:text-slate-600 focus:outline-none focus:border-slate-600 transition-colors"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-slate-400">
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            required
                            placeholder="Doe"
                            className="bg-slate-900 border border-slate-800 text-white text-sm px-3 py-2.5 placeholder:text-slate-600 focus:outline-none focus:border-slate-600 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-slate-400">
                          Company
                        </label>
                        <input
                          type="text"
                          name="company"
                          required
                          placeholder="ABC Heating & Cooling"
                          className="bg-slate-900 border border-slate-800 text-white text-sm px-3 py-2.5 placeholder:text-slate-600 focus:outline-none focus:border-slate-600 transition-colors"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-slate-400">
                          Work Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="john@abcheating.com"
                          className="bg-slate-900 border border-slate-800 text-white text-sm px-3 py-2.5 placeholder:text-slate-600 focus:outline-none focus:border-slate-600 transition-colors"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-slate-400">
                          Which FSM platform do you use?
                        </label>
                        <input
                          type="text"
                          name="fsm"
                          placeholder="e.g. ServiceTitan, Jobber, FieldEdge"
                          className="bg-slate-900 border border-slate-800 text-white text-sm px-3 py-2.5 placeholder:text-slate-600 focus:outline-none focus:border-slate-600 transition-colors"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={submitting}
                        className="mt-2 w-full bg-amber-500 text-slate-950 hover:bg-amber-400 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submitting ? "Submitting..." : "Request Free Audit"}
                      </Button>

                      <p className="text-xs text-slate-500 text-center">
                        No spam. We respond to every request.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}