import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { SiteShell } from "@/components/site/site-shell";
import { NotFoundPage } from "@/pages/404";

export const Route = createRootRoute({
  component: () => (
    <SiteShell>
      <Outlet />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </SiteShell>
  ),
  // Unknown URLs render the 404 page here, in place of <Outlet />, so anything
  // shared by this root route (providers, nav, footer) wraps the 404 too.
  notFoundComponent: NotFoundPage,
});
