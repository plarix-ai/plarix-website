"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { PlarixLogo } from "@/components/plarix-logo"

const NAV_LINKS = [
  { href: "/#problem", label: "Problem" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
]

export function NavbarSubpage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 z-[100] w-full bg-slate-950/25 backdrop-blur-md">
      <div className="relative mx-auto flex h-14 max-w-7xl items-center px-6">
        {/* Logo */}
        <Link href="/" className="absolute left-6 top-1/2 -translate-y-1/2 z-10">
          <PlarixLogo markSize={28} textClassName="text-base" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8 text-sm text-white/60 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-white whitespace-nowrap">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-4">
          <Link
            href="/#cta"
            className="hidden text-sm font-medium text-white transition-colors hover:text-white/80 lg:block"
          >
            Get your free claim count
          </Link>
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

      {/* Mobile menu */}
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
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white/60 transition-colors hover:text-white py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#cta"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 text-white font-medium py-2 border-t border-slate-800/50"
              >
                Get your free claim count
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
