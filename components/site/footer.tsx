import Link from "next/link";

import { Logo } from "./logo";
import { Magnetic } from "./magnetic";
import { Reveal } from "./reveal";
import { Parallax, ScrubList, SectionRule } from "./scroll-motion";
import { at } from "@/lib/scrub";
import { CONTACT_EMAIL, footerNav } from "@/content/site";

export function Footer() {
  const groups = Object.entries(footerNav);

  return (
    <footer className="relative z-20 border-t border-hairline bg-background">
      <SectionRule />
      <div className="shell py-14 md:py-12">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <Parallax distance={10} className="max-w-[34ch]">
            <Reveal>
              <Logo scale={1.5} />
            </Reveal>
            <Reveal as="p" delay={80} className="mt-6 t-body-sm text-text-secondary">
              Operational AI for home services. We run the work your jobs leave behind, inside the
              systems you already have.
            </Reveal>
            <Reveal delay={150} className="mt-6">
              <Magnetic max={4}>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="link-sweep press-sm inline-block t-body-sm text-white"
                >
                  {CONTACT_EMAIL}
                </a>
              </Magnetic>
            </Reveal>
          </Parallax>

          {/*
            The three columns light in turn as the foot of the page arrives,
            each keyed to its own position rather than to a timer, so the
            footer assembles in the order it is read like everything above it.
          */}
          <ScrubList count={groups.length} className="flex flex-wrap gap-12 sm:gap-20" to={0.72}>
            {groups.map(([group, items], gi) => (
              <div key={group} className="scrub-item" style={at(gi, groups.length)}>
                <Reveal as="h2" clip delay={gi * 60} className="mb-4 t-label text-text-tertiary">
                  {group}
                </Reveal>
                <ul className="space-y-3">
                  {items.map((item, ii) => (
                    <Reveal as="li" key={item.href} delay={gi * 60 + ii * 35}>
                      <Link
                        href={item.href}
                        prefetch={false}
                        className="link-sweep press-sm t-body-sm text-text-secondary transition-colors duration-200 hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </Reveal>
                  ))}
                </ul>
              </div>
            ))}
          </ScrubList>
        </div>

        <Reveal className="relative mt-16 flex flex-col gap-3 border-t border-hairline pt-8 t-caption text-text-tertiary sm:flex-row sm:items-center sm:justify-between">
          <SectionRule tone="rgba(255,255,255,0.22)" />
          <p>&copy; {new Date().getFullYear()} Plarix. All rights reserved.</p>
          <p>We automate paperwork, not people.</p>
        </Reveal>
      </div>
    </footer>
  );
}
