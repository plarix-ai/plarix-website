import Link from "next/link";

import { Magnetic } from "@/components/site/magnetic";
import { PageFrame } from "@/components/site/page-frame";
import { Reveal } from "@/components/site/reveal";
import { nav } from "@/content/site";

export default function NotFound() {
  return (
    <PageFrame>
      <div id="main" className="shell flex min-h-[62svh] flex-col justify-center py-24">
        <Reveal as="p" className="t-label text-text-tertiary">
          404
        </Reveal>
        <Reveal as="h1" clip delay={60} className="t-h1 mt-5 max-w-[16ch]">
          This one is not here.
        </Reveal>
        <Reveal as="p" delay={120} className="mt-7 measure-tight t-body-lg text-text-secondary">
          The page you were after has moved or never existed. Everything we do is one of these.
        </Reveal>
        <Reveal as="ul" delay={180} className="reveal-stagger mt-10 flex flex-wrap gap-x-8 gap-y-3">
          {[{ label: "Home", href: "/" }, ...nav].map((item, i) => (
            <li key={item.href} style={{ transitionDelay: `${220 + i * 50}ms` }}>
              <Link
                href={item.href}
                className="link-sweep press-sm t-body text-text-secondary transition-colors duration-200 hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </Reveal>
        <Reveal delay={320} className="mt-12">
          <Magnetic>
            <Link
              href="/count"
              className="solid-btn inline-flex w-fit rounded-full bg-white px-7 py-3 t-body-sm font-medium text-black hover:bg-white/90"
            >
              Get your count
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </PageFrame>
  );
}
