"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { useState, useCallback } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { PlarixLogo } from "@/components/plarix-logo"

const NAV_LINKS = [
  { href: "#problem", label: "Problem" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
]

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

  return (
    <nav className="fixed top-0 left-0 z-[100] w-full bg-slate-950/25 backdrop-blur-md">
      <div className="relative mx-auto flex h-14 max-w-7xl items-center px-6">
        <Link href="/" className="absolute left-6 top-1/2 -translate-y-1/2 z-10">
          <PlarixLogo height={32} />
        </Link>

        <div className="hidden lg:flex items-center gap-8 text-sm text-white/60 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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
            className="hidden text-sm font-medium text-white transition-colors hover:text-white/80 lg:block"
          >
            Get your free claim count
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-slate-950/95 backdrop-blur-sm border-t border-slate-800/50 lg:hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleScrollClick(e, link.href)}
                  className="text-white/60 transition-colors hover:text-white py-2"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={openForm}
                className="mt-2 text-white font-medium py-2 border-t border-slate-800/50 text-left"
              >
                Get your free claim count
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 40%, #F2F1ED 0%, #9CA3AF 35%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950" />

      <div className="relative z-10 flex h-full flex-col justify-center items-center px-6 pt-14 text-center">
        <h1 className="max-w-4xl text-balance text-5xl font-medium tracking-tight text-white md:text-6xl lg:text-7xl">
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

        <p className="mt-6 max-w-2xl text-balance text-center text-sm leading-relaxed text-white/50 md:text-base">
          We go through your open and closed warranty claims: parts, labor, rebates, every manufacturer
          portal. We find what should&apos;ve been filed and wasn&apos;t. Free to check. If we don&apos;t
          find anything, you don&apos;t pay anything.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="bg-amber-500 px-6 text-slate-950 hover:bg-amber-400 font-medium"
            onClick={() => window.dispatchEvent(new CustomEvent("open-consultation"))}
          >
            Get your free claim count
          </Button>
        </div>

        <a
          href="#how-it-works"
          onClick={(e) => {
            e.preventDefault()
            const el = document.querySelector("#how-it-works")
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
          }}
          className="mt-6 text-sm text-slate-500 hover:text-slate-300 transition-colors"
        >
          See how it works &darr;
        </a>

        <p className="mt-12 text-xs text-white/30 tracking-wide uppercase">
          Warranty claims, filed. Money, recovered.
        </p>
      </div>
    </section>
  )
}
