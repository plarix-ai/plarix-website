import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Reveal } from "./reveal";

export type Crumb = { label: string; href: string };

/**
 * The top of an inner page. Deliberately not a hero: the shader belongs to the home
 * page alone, and repeating it everywhere would spend it.
 *
 * Heading left, the line that qualifies it on the right, matching how sections are
 * set on the home page. Left aligned alone would leave half of every inner page
 * empty and make all of them look like the same template.
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
    <header className="shell relative pb-14 pt-12 md:pb-20 md:pt-20">
      {eyebrowCrumbs?.length ? (
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-1.5 t-caption text-text-tertiary">
            {eyebrowCrumbs.map((c, i) => (
              <li key={c.href} className="flex items-center gap-1.5">
                {i > 0 ? <ChevronRight size={13} aria-hidden="true" className="opacity-60" /> : null}
                {i === eyebrowCrumbs.length - 1 ? (
                  <span aria-current="page" className="text-text-secondary">
                    {c.label}
                  </span>
                ) : (
                  <Link
                    href={c.href}
                    className="link-sweep transition-colors duration-200 hover:text-white"
                  >
                    {c.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

      <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-20">
        <Reveal as="h1" className="t-h1 max-w-[15ch]">
          {title}
        </Reveal>

        {lede || children ? (
          <div className="lg:pb-2">
            {lede ? (
              <Reveal as="p" delay={90} className="max-w-[46ch] t-body-lg text-text-secondary">
                {lede}
              </Reveal>
            ) : null}
            {children ? (
              <Reveal delay={150} className={lede ? "mt-6" : undefined}>
                {children}
              </Reveal>
            ) : null}
          </div>
        ) : null}
      </div>
    </header>
  );
}
