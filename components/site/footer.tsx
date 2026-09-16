import Link from "next/link";

import { Logo } from "./logo";
import { CONTACT_EMAIL, footerNav } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative z-20 border-t border-hairline bg-background">
      <div className="shell py-14 md:py-12">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[34ch]">
            <Logo scale={1.5} />
            <p className="mt-6 t-body-sm text-text-secondary">
              Operational AI for home services. We run the work your jobs leave behind, inside the
              systems you already have.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="link-sweep mt-6 inline-block t-body-sm text-white"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className="flex flex-wrap gap-12 sm:gap-20">
            {Object.entries(footerNav).map(([group, items]) => (
              <div key={group}>
                <h2 className="mb-4 t-label text-text-tertiary">
                  {group}
                </h2>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        prefetch={false}
                        className="link-sweep t-body-sm text-text-secondary transition-colors duration-200 hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-hairline pt-8 t-caption text-text-tertiary sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Plarix. All rights reserved.</p>
          <p>We automate paperwork, not people.</p>
        </div>
      </div>
    </footer>
  );
}
