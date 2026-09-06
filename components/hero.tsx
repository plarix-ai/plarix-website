"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { useState, useCallback } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

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
          <Image
            src="/images/plarix-logo-dark.png"
            alt="Plarix"
            width={400}
            height={100}
            className=""
            style={{ height: "76px", width: "auto", filter: "invert(1) brightness(2.5)" }}
            priority
          />
        </Link>

        <div className="hidden lg:flex items-center gap-8 text-sm text-white/60 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <a
            href="#problem"
            onClick={(e) => handleScrollClick(e, "#problem")}
            className="transition-colors hover:text-white whitespace-nowrap"
          >
            Problem
          </a>
          <a
            href="#approach"
            onClick={(e) => handleScrollClick(e, "#approach")}
            className="transition-colors hover:text-white whitespace-nowrap"
          >
            Solution
          </a>
          <a
            href="#features"
            onClick={(e) => handleScrollClick(e, "#features")}
            className="transition-colors hover:text-white whitespace-nowrap"
          >
            Features
          </a>
          <a
            href="#process"
            onClick={(e) => handleScrollClick(e, "#process")}
            className="transition-colors hover:text-white whitespace-nowrap"
          >
            Process
          </a>
          <a
            href="#faq"
            onClick={(e) => handleScrollClick(e, "#faq")}
            className="transition-colors hover:text-white whitespace-nowrap"
          >
            FAQ
          </a>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <button
            onClick={openForm}
            className="hidden text-sm font-medium text-white transition-colors hover:text-white/80 lg:block"
          >
            Get a Free Warranty Audit
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

      {mobileMenuOpen && (
        <div className="bg-slate-950/95 backdrop-blur-sm border-t border-slate-800/50 lg:hidden">
          <div className="flex flex-col px-6 py-6 gap-4">
            <a
              href="#problem"
              onClick={(e) => handleScrollClick(e, "#problem")}
              className="text-white/60 transition-colors hover:text-white py-2"
            >
              Problem
            </a>
            <a
              href="#approach"
              onClick={(e) => handleScrollClick(e, "#approach")}
              className="text-white/60 transition-colors hover:text-white py-2"
            >
              Solution
            </a>
            <a
              href="#features"
              onClick={(e) => handleScrollClick(e, "#features")}
              className="text-white/60 transition-colors hover:text-white py-2"
            >
              Features
            </a>
            <a
              href="#process"
              onClick={(e) => handleScrollClick(e, "#process")}
              className="text-white/60 transition-colors hover:text-white py-2"
            >
              Process
            </a>
            <a
              href="#faq"
              onClick={(e) => handleScrollClick(e, "#faq")}
              className="text-white/60 transition-colors hover:text-white py-2"
            >
              FAQ
            </a>
            <button
              onClick={openForm}
              className="mt-2 text-white font-medium py-2 border-t border-slate-800/50 text-left"
            >
              Get a Free Warranty Audit
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/space-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-slate-950/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950" />

      <div className="relative z-10 flex h-full flex-col justify-center items-center px-6 pt-14 text-center">
        <div className="flex items-center gap-3 px-4 py-2 border border-slate-800/50 mb-8">
          <div className="w-2.5 h-2.5 bg-amber-500" />
          <span className="text-sm font-medium text-slate-500 tracking-wide">
            Warranty Claims Automation for HVAC &amp; Plumbing
          </span>
        </div>

        <h1 className="max-w-4xl text-balance text-5xl font-normal tracking-tight text-white md:text-6xl lg:text-7xl">
          {"No FSM platform files a warranty claim. We built the one that does.".split(" ").map((word, i) => (
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
          We find and file the warranty claims your HVAC or plumbing shop is currently missing, and show you the dollar amount before you commit to anything.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="bg-amber-500 px-6 text-slate-950 hover:bg-amber-400 font-medium"
            onClick={() => window.dispatchEvent(new CustomEvent("open-consultation"))}
          >
            Get a Free Warranty Audit
          </Button>
        </div>

        <a
          href="#approach"
          onClick={(e) => {
            e.preventDefault()
            const el = document.querySelector("#approach")
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
          }}
          className="mt-6 text-sm text-slate-500 hover:text-slate-300 transition-colors"
        >
          See what we check for &darr;
        </a>

        <p className="mt-12 text-xs text-white/30 tracking-wide uppercase">
          Warranty claims, filed. Money, recovered.
        </p>
      </div>
    </section>
  )
}