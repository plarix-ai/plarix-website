import Link from "next/link";

import { Logo } from "./logo";
import { CONTACT_EMAIL, nav } from "@/content/site";

const legal = [
  { label: "Privacy", href: "/privacy" },
  { label: "FAQ", href: "/#faq" },
];

export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="shell py-16 md:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[34ch]">
            <Logo className="h-11 md:h-14" />
            <p className="mt-6 text-[15px] leading-relaxed text-text-secondary">
              Operational AI for home services. We run the work your jobs leave behind, inside the
              systems you already have.
            </p>
          </div>

          <div className="flex flex-wrap gap-12 sm:gap-20">
            <div>
              <h2 className="mb-4 text-[12px] uppercase tracking-[0.16em] text-text-tertiary">
                Site
              </h2>
              <ul className="space-y-3">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[15px] text-text-secondary transition-colors duration-200 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-[12px] uppercase tracking-[0.16em] text-text-tertiary">
                Company
              </h2>
              <ul className="space-y-3">
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-[15px] text-text-secondary transition-colors duration-200 hover:text-white"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </li>
                {legal.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[15px] text-text-secondary transition-colors duration-200 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-hairline pt-8 text-[13px] text-text-tertiary sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Plarix. All rights reserved.</p>
          <p>We automate paperwork, not people.</p>
        </div>
      </div>
    </footer>
  );
}
