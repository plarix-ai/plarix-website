import Image from "next/image"
import { cn } from "@/lib/utils"

interface PlarixLogoProps {
  className?: string
  height?: number
}

export function PlarixLogo({ className, height = 28 }: PlarixLogoProps) {
  return (
    <Image
      src="/images/plarix-new-logo-with-name-no-bg.png"
      alt="Plarix"
      width={height * 2}
      height={height}
      style={{ height, width: "auto" }}
      className={className}
      priority
    />
  )
}
