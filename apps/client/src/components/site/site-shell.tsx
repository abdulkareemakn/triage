import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

/**
 * The shared public chrome for the marketing and authentication pages.
 * `__root.tsx` renders this around every route, so the 404 page is wrapped
 * by it as well.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-6 focus:z-20 focus:rounded-lg focus:bg-card focus:px-4 focus:py-3 focus:outline-2 focus:outline-offset-2 focus:outline-ring"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
