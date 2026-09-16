"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h2" | "h3";
}

export function SectionHeading({ children, className, as = "h2" }: SectionHeadingProps) {
  const Component = motion[as];
  return (
    <Component
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "text-balance font-medium tracking-[-0.025em] text-white",
        className
      )}
    >
      {children}
    </Component>
  );
}
