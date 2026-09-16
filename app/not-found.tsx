import Link from "next/link";

import { SiteNav } from "@/components/site/site-nav";
import { Footer } from "@/components/site/footer";

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main className="shell flex min-h-[60svh] flex-col justify-center py-24">
        <p className="text-[13px] text-text-tertiary">404</p>
        <h1 className="display mt-4 max-w-[16ch] text-[clamp(2.25rem,6vw,3.75rem)]">
          This one is not here.
        </h1>
        <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-text-secondary">
          The page you were after has moved or never existed. Everything we do is on the
          front page.
        </p>
        <Link
          href="/"
          className="solid-btn mt-9 inline-flex w-fit rounded-full bg-white px-7 py-3 text-[15px] font-medium text-black hover:bg-white/90"
        >
          Back to the site
        </Link>
      </main>
      <Footer />
    </>
  );
}
