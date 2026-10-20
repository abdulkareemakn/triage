import { IconMenu2 } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { to: "/features", label: "Features" },
  { to: "/contact", label: "Contact" },
] as const;

const linkClass =
  "text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground";

/**
 * The public site header: wordmark, a few plain links, one action. No
 * bar chrome beyond a tone step under it.
 */
export function SiteHeader() {
  return (
    <header className="bg-secondary">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-foreground"
          aria-label="Triage home"
        >
          Triage
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 sm:flex"
        >
          {links.map((link) => (
            <Link key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </Link>
          ))}
          <Link to="/sign-in" className={linkClass}>
            Sign in
          </Link>
          <Link to="/sign-up" className={buttonVariants({ size: "sm" })}>
            Create a workspace
          </Link>
        </nav>

        <div className="sm:hidden">
          <Sheet>
            <SheetTrigger aria-label="Open navigation">
              <span className="inline-flex size-11 items-center justify-center">
                <IconMenu2 size={20} stroke={2} aria-hidden="true" />
              </span>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col items-start gap-5 p-6">
                <SheetTitle>Triage</SheetTitle>
                <nav
                  aria-label="Mobile navigation"
                  className="flex flex-col items-start gap-4"
                >
                  {links.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="text-base underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    to="/sign-in"
                    className="text-base underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
                  >
                    Sign in
                  </Link>
                  <Link to="/sign-up" className={buttonVariants()}>
                    Create a workspace
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
