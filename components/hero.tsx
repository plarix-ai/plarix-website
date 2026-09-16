"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { useState, useCallback, useEffect } from "react"
import { Menu, X, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { PlarixLogo } from "@/components/plarix-logo"

const NAV_LINKS = [
  { href: "#problem", label: "Problem" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
]

const INTEGRATIONS = ["ServiceTitan", "Jobber", "FieldEdge", "Housecall Pro"]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleScrollClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault()
      setMobileMenuOpen(false)
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    },
    [],
  )

  const openForm = useCallback(() => {
    setMobileMenuOpen(false)
    window.dispatchEvent(new CustomEvent("open-consultation"))
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <nav className="fixed top-0 left-0 z-[100] w-full">
      <div className="relative mx-auto flex h-20 max-w-7xl items-center px-6 md:px-10">
        <Link href="/" className="z-10">
          <PlarixLogo height={30} />
        </Link>

        <div className="hidden lg:flex items-center gap-9 text-[15px] text-white/60 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleScrollClick(e, link.href)}
              className="transition-colors hover:text-white whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-4">
          <button
            onClick={openForm}
            className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-medium text-slate-950 transition-colors hover:bg-white/90 lg:block"
          >
            Get your free claim count
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.06] text-white backdrop-blur-md lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[90] bg-slate-950/98 backdrop-blur-xl lg:hidden"
          >
            <div className="flex h-full flex-col justify-center px-8">
              <p className="mb-6 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
                Menu
              </p>
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.06 + i * 0.05, ease: "easeOut" }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleScrollClick(e, link.href)}
                      className="flex items-center justify-between border-b border-white/10 py-4 text-3xl font-medium text-white"
                    >
                      {link.label}
                      <ArrowRight className="h-5 w-5 text-white/30" />
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.3, ease: "easeOut" }}
                className="mt-8"
              >
                <button
                  onClick={openForm}
                  className="w-full rounded-full bg-white px-6 py-3.5 text-base font-medium text-slate-950"
                >
                  Get your free claim count
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export function Hero() {
  return (
    <section className="hero-stage relative flex min-h-[100dvh] w-full flex-col overflow-hidden bg-slate-950">
      {/* Ambient background: the brand mark itself, screen-blended so its black plate disappears */}
      <div
        className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "min(1400px, 160vw)",
          height: "min(1400px, 160vw)",
          mixBlendMode: "screen",
          opacity: 0.22,
          animation: "ambient-drift 22s ease-in-out infinite",
        }}
      >
        <Image
          src="/images/plarix-new-logo.png"
          alt=""
          fill
          className="object-contain blur-3xl"
          priority
        />
      </div>

      {/* Top/bottom fade to ground the stage */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
      {/* Side vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_45%,transparent_0%,rgba(2,6,23,0.5)_100%)]" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <h1
          className="max-w-4xl text-balance font-medium text-white"
          style={{
            fontSize: "clamp(2.5rem, 5vw + 1rem, 5.5rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
          }}
        >
          {"The money was never lost. It was just never collected.".split(" ").map((word, i) => (
            <motion.span
              key={`hero-word-${word}-${i}`}
              initial={{ filter: "blur(10px)", opacity: 0 }}
              whileInView={{ filter: "blur(0px)", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <p className="mt-7 max-w-2xl text-balance text-center text-base leading-relaxed text-white/50 md:text-lg">
          We go through your open and closed warranty claims: parts, labor, rebates, every manufacturer
          portal. We find what should&apos;ve been filed and wasn&apos;t. Free to check. If we don&apos;t
          find anything, you don&apos;t pay anything.
        </p>

        <div className="mt-9 flex flex-col items-center gap-5 sm:flex-row">
          <Button
            size="lg"
            className="rounded-full bg-white px-7 text-base text-slate-950 hover:bg-white/90 font-medium"
            onClick={() => window.dispatchEvent(new CustomEvent("open-consultation"))}
          >
            Get your free claim count
          </Button>

          <a
            href="#how-it-works"
            onClick={(e) => {
              e.preventDefault()
              const el = document.querySelector("#how-it-works")
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
            }}
            className="text-base font-medium text-white/80 hover:text-white transition-colors"
          >
            See how it works
          </a>
        </div>
      </div>

      {/* Real integrations, not fabricated customer logos */}
      <div className="relative z-10 mb-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 md:mb-14">
        {INTEGRATIONS.map((name) => (
          <span key={name} className="text-sm font-medium tracking-wide text-white/35">
            {name}
          </span>
        ))}
      </div>
    </section>
  )
}
