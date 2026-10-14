import {
  IconArrowNarrowRight,
  IconBrandDiscord,
  IconMenu2,
} from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { buildRequestAccessMailto } from "@/lib/contact";

const linkClass =
  "inline-flex min-h-11 items-center rounded-lg px-3 text-body text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

const activeLinkClass =
  "inline-flex min-h-11 items-center rounded-lg px-3 text-body text-foreground";

function SiteNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <Link
        activeProps={{ className: activeLinkClass }}
        className={linkClass}
        onClick={onNavigate}
        to="/features"
      >
        Features
      </Link>
      <Link
        className={linkClass}
        hash="how-it-works"
        onClick={onNavigate}
        to="/"
      >
        How it works
      </Link>
      <Link
        activeProps={{ className: activeLinkClass }}
        className={linkClass}
        onClick={onNavigate}
        to="/contact"
      >
        Contact
      </Link>
      <Link className={linkClass} onClick={onNavigate} to="/sign-in">
        Sign in
      </Link>
    </>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="px-5 sm:px-8 lg:px-16 xl:px-20">
      <div className="mx-auto flex max-w-[92rem] items-center justify-between gap-4 py-4 sm:py-5">
        <Link
          className="inline-flex min-h-11 items-center font-serif text-lg font-semibold tracking-tight"
          to="/"
        >
          Triage
        </Link>

        <nav aria-label="Site" className="hidden items-center gap-1 md:flex">
          <SiteNav />
        </nav>

        <div className="flex items-center gap-2">
          <a
            className={buttonVariants({ className: "min-h-11", size: "xl" })}
            href={buildRequestAccessMailto()}
          >
            Request access
            <IconArrowNarrowRight aria-hidden="true" className="size-5" />
          </a>

          <Sheet onOpenChange={setMenuOpen} open={menuOpen}>
            <SheetTrigger
              render={
                <Button
                  aria-label="Open menu"
                  className="min-h-11 md:hidden"
                  size="icon-lg"
                  variant="outline"
                />
              }
            >
              <IconMenu2 aria-hidden="true" className="size-5" />
            </SheetTrigger>
            <SheetContent className="w-3/4 sm:max-w-sm" side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav
                aria-label="Site"
                className="flex flex-col items-stretch gap-1 px-4"
              >
                <SiteNav onNavigate={closeMenu} />
                <Link className={linkClass} onClick={closeMenu} to="/sign-up">
                  Create an account
                </Link>
              </nav>
              <p className="mt-2 flex items-center gap-2 px-4 text-small text-muted-foreground">
                <IconBrandDiscord
                  aria-hidden="true"
                  className="size-4 shrink-0"
                />
                Discord intake and review notifications are built in.
              </p>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
