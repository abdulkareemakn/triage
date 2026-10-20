import { IconMenu2 } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const sectionLinks = [
  { href: "#board", label: "How it works" },
  { href: "#faq", label: "Questions" },
] as const;

const navLinkClass =
  "inline-flex items-center py-2 text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground";

const mobileLinkClass =
  "text-2xl font-medium tracking-[-0.02em] text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground";

/**
 * The public site header: a quiet wordmark, plain section links, and the
 * same waitlist action used on the landing page.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-border/70 bg-background">
      <div className="flex h-16 items-center justify-between gap-6 px-6 sm:px-10 lg:px-16 xl:px-20">
        <Link
          to="/"
          aria-label="Triage home"
          className="rounded-sm text-xl font-semibold tracking-[-0.03em] text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
        >
          Triage
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 md:flex"
        >
          {sectionLinks.map((link) => (
            <a key={link.href} href={link.href} className={navLinkClass}>
              {link.label}
            </a>
          ))}
          <a
            href="#waitlist"
            className={buttonVariants({ size: "lg", className: "min-h-10" })}
          >
            Join the waitlist
          </a>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <div className="hidden sm:block">
            <a
              href="#waitlist"
              className={buttonVariants({ size: "lg", className: "min-h-10" })}
            >
              Join the waitlist
            </a>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger aria-label="Open navigation">
              <span className="inline-flex size-11 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted">
                <IconMenu2 size={20} stroke={2} aria-hidden="true" />
              </span>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex h-full flex-col p-6">
                <SheetTitle>Triage</SheetTitle>
                <nav
                  aria-label="Mobile navigation"
                  className="mt-10 flex flex-col items-start gap-6"
                >
                  {sectionLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={mobileLinkClass}
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
                <a
                  href="#waitlist"
                  onClick={() => setOpen(false)}
                  className={buttonVariants({
                    size: "lg",
                    className: "mt-auto min-h-11 w-full",
                  })}
                >
                  Join the waitlist
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
