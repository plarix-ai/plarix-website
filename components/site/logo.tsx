import Image from "next/image";
import Link from "next/link";

/** The full lockup. Deliberately large: it is the only brand mark on the page. */
export function Logo({ className = "h-10 md:h-[52px]" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Plarix, home" className="inline-flex shrink-0 items-center">
      <Image
        src="/brand/plarix-lockup.png"
        alt="Plarix"
        width={1372}
        height={353}
        priority
        sizes="(max-width: 768px) 170px, 230px"
        className={`${className} w-auto select-none`}
      />
    </Link>
  );
}

/** Mark only, for tight spots. */
export function LogoMark({ className = "h-8" }: { className?: string }) {
  return (
    <Image
      src="/brand/plarix-mark.png"
      alt=""
      aria-hidden="true"
      width={346}
      height={349}
      sizes="56px"
      className={`${className} w-auto select-none`}
    />
  );
}
