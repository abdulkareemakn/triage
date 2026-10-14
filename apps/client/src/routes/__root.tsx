import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { useReveal } from "@/components/site/reveal";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { NotFoundPage } from "@/pages/404";

export const Route = createRootRoute({
  component: Root,
  // Unknown URLs render the 404 page here, in place of <Outlet />, so
  // anything shared by this root route (header, footer) wraps the 404 too.
  notFoundComponent: NotFoundPage,
});

function Root() {
  useReveal();

  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-6 focus:z-10 focus:rounded-md focus:bg-background focus:p-4 focus:outline-2"
        href="#main"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main className="flex-1" id="main">
        <Outlet />
      </main>
      <SiteFooter />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </div>
  );
}
