import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Reveal } from "./reveal";

export type Crumb = { label: string; href: string };

/**
 * The top of an inner page. Deliberately not a hero: the shader belongs to the
 * home page alone, and repeating it everywhere would spend it.
 */
export function PageHeader({
  eyebrowCrumbs,
  title,
  lede,
  children,
}: {
  eyebrowCrumbs?: Crumb[];
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="shell relative pb-14 pt-14 md:pb-20 md:pt-24">
      {eyebrowCrumbs?.length ? (
        <nav aria-label="Breadcrumb" className="mb-7">
          <ol className="flex flex-wrap items-center gap-1.5 t-caption text-text-tertiary">
            {eyebrowCrumbs.map((c, i) => (
              <li key={c.href} className="flex items-center gap-1.5">
                {i > 0 ? <ChevronRight size={13} aria-hidden="true" className="opacity-60" /> : null}
                <Link
                  href={c.href}
                  className="link-sweep transition-colors duration-200 hover:text-white"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

      <Reveal as="h1" className="t-h1 max-w-[17ch]">
        {title}
      </Reveal>

      {lede ? (
        <Reveal
          as="p"
          delay={90}
          className="mt-7 max-w-[58ch] text-lg leading-relaxed text-text-secondary md:mt-9 md:text-xl"
        >
          {lede}
        </Reveal>
      ) : null}

      {children ? (
        <Reveal delay={160} className="mt-9">
          {children}
        </Reveal>
      ) : null}
    </header>
  );
}
