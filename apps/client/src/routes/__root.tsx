import { IconMenu } from "@tabler/icons-react";
import { createRootRoute, Outlet, Link } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NotFoundPage } from "@/pages/404";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-svh bg-background text-foreground">
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
      <SiteFooter />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </div>
  ),
  notFoundComponent: NotFoundPage,
});

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const linkClass =
    "inline-flex min-h-11 items-center text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground";

  return (
    <header className="mx-auto flex max-w-none flex-wrap items-center justify-between gap-x-8 gap-y-2 px-6 py-5 sm:px-10 lg:px-16 xl:px-20">
      <Link
        className="inline-flex items-center gap-3 font-medium tracking-tight"
        to="/"
      >
        <img
          src="/triage-logo.svg"
          alt=""
          width={32}
          height={32}
          className="size-8 shrink-0 text-foreground"
        />
        <span className="text-lg">Triage</span>
      </Link>

      <nav
        aria-label="Main navigation"
        className="hidden items-center gap-6 md:flex"
      >
        <Link className={linkClass} to="/features">
          Features
        </Link>
        <Link className={linkClass} to="/contact">
          Contact
        </Link>
        <Link className={linkClass} to="/sign-in">
          Sign in
        </Link>
        <Link
          className={buttonVariants({ size: "sm", className: "min-h-11" })}
          to="/sign-up"
        >
          Sign up
        </Link>
      </nav>

      <div className="flex items-center gap-4 md:hidden">
        <Link
          className={buttonVariants({ size: "sm", className: "min-h-11" })}
          to="/sign-up"
        >
          Sign up
        </Link>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <IconMenu className="size-5" />
              </Button>
            }
          />
          <SheetContent>
            <SheetHeader>
              <SheetTitle>IconMenu</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-4">
              <Link
                className="text-base font-medium"
                to="/features"
                onClick={() => setOpen(false)}
              >
                Features
              </Link>
              <Link
                className="text-base font-medium"
                to="/contact"
                onClick={() => setOpen(false)}
              >
                Contact
              </Link>
              <Link
                className="text-base font-medium"
                to="/sign-in"
                onClick={() => setOpen(false)}
              >
                Sign in
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function SiteFooter() {
  const linkClass =
    "inline-flex min-h-11 items-center text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground";

  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-none px-6 py-16 sm:px-10 lg:px-16 xl:px-20">
        {/* The mark, built large */}
        <div aria-hidden="true" className="flex items-end gap-1">
          {"Triage".split("").map((letter, i) => (
            <div
              key={i}
              className="flex items-end justify-center bg-primary-foreground [width:clamp(48px,8vw,96px)] [min-height:48px] [height:60%] sm:[height:80%] lg:[height:100%]"
            >
              <span className="translate-y-[-10%] font-serif text-[clamp(2rem,4vw,4rem)] font-semibold leading-none text-primary">
                {letter}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-start">
          <div>
            <p className="max-w-md text-sm leading-6 text-primary-foreground/80">
              A calm, professional workspace for small and medium software
              teams. Turn incoming reports into reviewable ticket candidates.
            </p>
          </div>
          <nav
            aria-label="Footer navigation"
            className="flex flex-col items-start gap-3 text-sm sm:items-end"
          >
            <Link className={linkClass} to="/features">
              Features
            </Link>
            <Link className={linkClass} to="/contact">
              Contact
            </Link>
            <Link className={linkClass} to="/sign-in">
              Sign in
            </Link>
            <Link className={linkClass} to="/sign-up">
              Sign up
            </Link>
          </nav>
        </div>

        <div className="mt-12 pt-6 text-sm">
          <p className="text-primary-foreground/70">
            © 2026 Triage. All rights reserved.
          </p>
          <p className="mt-4 max-w-3xl text-xs leading-5 text-primary-foreground/60">
            Pictures:{" "}
            <a
              href="https://commons.wikimedia.org/w/index.php?curid=40703267"
              className="underline underline-offset-2"
            >
              "Misty landscape (2686129997)"
            </a>{" "}
            by fourthandfifteen,{" "}
            <a
              href="https://creativecommons.org/licenses/by/2.0/"
              className="underline underline-offset-2"
            >
              CC BY 2.0
            </a>
            , via Wikimedia Commons;{" "}
            <a
              href="https://www.metmuseum.org/art/collection/search/45499"
              className="underline underline-offset-2"
            >
              "Misty Landscape"
            </a>{" "}
            by Kano School, early 19th century,{" "}
            <a
              href="https://creativecommons.org/publicdomain/zero/1.0/"
              className="underline underline-offset-2"
            >
              public domain (CC0)
            </a>
            , via The Metropolitan Museum of Art.
          </p>
        </div>
      </div>
    </footer>
  );
}
