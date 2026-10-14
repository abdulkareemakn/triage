import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { NotFoundPage } from "@/pages/404";

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-6 focus:z-10 focus:rounded-lg focus:bg-card focus:px-4 focus:py-2"
        href="#main"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main className="flex-1" id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <SiteFooter />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </div>
  ),
  // Unknown URLs render the 404 page here, in place of <Outlet />, so anything
  // shared by this root route (nav, footer) wraps the 404 too.
  notFoundComponent: NotFoundPage,
});
