import Image from "next/image"
import { cn } from "@/lib/utils"

interface PlarixLogoProps {
  className?: string
  markSize?: number
  textClassName?: string
}

export function PlarixLogo({ className, markSize = 32, textClassName }: PlarixLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/images/plarix-mark.svg"
        alt=""
        width={markSize}
        height={markSize}
        priority
      />
      <span
        className={cn(
          "font-sans font-semibold uppercase tracking-[0.2em] text-white",
          textClassName
        )}
      >
        Plarix
      </span>
    </span>
  )
}
