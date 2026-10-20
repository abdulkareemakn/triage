import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { NotFoundPage } from "@/pages/404";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-[100svh] bg-background text-foreground">
      <SiteHeader />
      <Outlet />
      <SiteFooter />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </div>
  ),
  // Unknown URLs render the 404 page here, in place of <Outlet />, so anything
  // shared by this root route (providers, nav, footer) wraps the 404 too.
  notFoundComponent: NotFoundPage,
});
