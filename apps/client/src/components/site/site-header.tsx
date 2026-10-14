import { IconMenu } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { requestAccessUrl } from "@/lib/site";

import { BrandMark } from "./brand-mark";

const links = [
  { label: "Features", to: "/features" },
  { label: "Contact", to: "/contact" },
  { label: "Sign in", to: "/sign-in" },
] as const;

export function SiteHeader() {
  return (
    <header className="px-5 py-5 sm:px-10">
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-serif text-lg font-semibold tracking-tight"
        >
          <BrandMark className="size-5 text-primary" />
          <span>Triage</span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 text-sm md:flex"
        >
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="triage-press py-2 underline-offset-4 hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            className="triage-press inline-flex h-8 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground"
            href={requestAccessUrl()}
          >
            Request access
          </a>
          <Sheet>
            <SheetTrigger
              aria-label="Open menu"
              render={
                <Button className="md:hidden" size="icon-sm" variant="ghost" />
              }
            >
              <IconMenu aria-hidden="true" className="size-4" />
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Triage menu</SheetTitle>
                <SheetDescription>Pages on this site</SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col gap-1">
                {[...links, { label: "Create account", to: "/sign-up" }].map(
                  (link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="triage-press rounded-lg px-3 py-3 text-lg underline-offset-4 hover:underline"
                    >
                      {link.label}
                    </Link>
                  ),
                )}
                <a
                  className="triage-press mt-2 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground"
                  href={requestAccessUrl()}
                >
                  Request access
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
