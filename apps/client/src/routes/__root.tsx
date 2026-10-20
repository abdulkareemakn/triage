import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { enableMotion } from "@/components/marketing/motion";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { NotFoundPage } from "@/pages/404";

if (typeof document !== "undefined") enableMotion();

function RootLayout() {
  const { pathname } = useLocation();
  const isLanding = pathname === "/";

  return (
    <div className="min-h-svh overflow-x-clip bg-background text-foreground">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-6 focus:z-10 focus:rounded-md focus:bg-background focus:p-4 focus:outline-2"
        href="#main"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      {isLanding && <SiteFooter />}
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </div>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
});
