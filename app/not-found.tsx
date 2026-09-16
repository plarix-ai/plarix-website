import Link from "next/link";

import { PageFrame } from "@/components/site/page-frame";
import { nav } from "@/content/site";

export default function NotFound() {
  return (
    <PageFrame>
      <div id="main" className="shell flex min-h-[62svh] flex-col justify-center py-24">
        <p className="t-label text-text-tertiary">404</p>
        <h1 className="t-h1 mt-5 max-w-[16ch]">This one is not here.</h1>
        <p className="mt-7 measure-tight t-body-lg text-text-secondary">
          The page you were after has moved or never existed. Everything we do is one of these.
        </p>
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          {[{ label: "Home", href: "/" }, ...nav].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="link-sweep t-body text-text-secondary transition-colors duration-200 hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/count"
          className="solid-btn mt-12 inline-flex w-fit rounded-full bg-white px-7 py-3 t-body-sm font-medium text-black hover:bg-white/90"
        >
          Get your count
        </Link>
      </div>
    </PageFrame>
  );
}
