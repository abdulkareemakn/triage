import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { enableMotion } from "@/components/marketing/motion";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { NotFoundPage } from "@/pages/404";

if (typeof document !== "undefined") enableMotion();

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-6 focus:z-10 focus:rounded-md focus:bg-background focus:p-4 focus:outline-2"
        href="#main"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </div>
  ),
  // Unknown URLs render the 404 page here, in place of <Outlet />, so the
  // shared header and footer wrap the 404 too.
  notFoundComponent: NotFoundPage,
});
