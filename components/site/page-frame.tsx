import type { ReactNode } from "react";

import { ColumnRules } from "./column-rules";
import { PageGlow } from "./page-glow";

/** The body every page other than the home page sits in. */
export function PageFrame({ children }: { children: ReactNode }) {
  return (
    <main className="page-in relative z-20 min-h-[60svh] bg-background">
      <PageGlow />
      <ColumnRules />
      {children}
    </main>
  );
}
