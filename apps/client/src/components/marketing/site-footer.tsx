import { IconArrowUp } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

import { WaitlistForm } from "@/components/combined/waitlist-form";

const footerLinks = [
  { label: "How it works", to: "/", hash: "board" },
  { label: "Features", to: "/features", hash: undefined },
  { label: "Contact", to: "/contact", hash: undefined },
  { label: "Questions", to: "/", hash: "faq" },
] as const;

const linkClass =
  "text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground";

/**
 * The public close: a serif statement and a second waitlist entry, then
 * the project note and a low-contrast wordmark that runs off the page.
 */
export function SiteFooter() {
  return (
    <footer className="overflow-hidden border-t border-border bg-secondary">
      <div className="px-6 pt-20 pb-10 sm:px-10 sm:pt-28 lg:px-16 xl:px-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
          <h2 className="text-[clamp(40px,5.6vw,88px)] leading-[0.95] font-semibold tracking-[-0.03em] text-balance lg:col-span-7">
            From report to decision.
          </h2>
          <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <p className="max-w-[440px] text-base leading-7 text-muted-foreground">
              Triage is still being built. Leave an email and we&apos;ll write
              when there&apos;s something to try.
            </p>
            <div className="mt-8">
              <WaitlistForm variant="footer" />
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 border-t border-border pt-10 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
          <div className="max-w-xl text-[11px] leading-[1.6] text-muted-foreground">
            <p>
              Triage is a university project. Incoming reports become ticket
              candidates; a person decides what becomes work.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:items-end">
            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs"
            >
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  hash={link.hash}
                  className={linkClass}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
              <p>&copy; 2026 Triage</p>
              <a
                href="#top"
                aria-label="Back to top"
                className="inline-flex size-8 items-center justify-center rounded-md transition-colors hover:bg-background hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                <IconArrowUp size={16} stroke={2} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="select-none px-2">
        <p className="translate-y-[0.12em] text-center text-[clamp(72px,23vw,320px)] leading-[0.72] font-semibold tracking-[-0.055em] text-foreground/[0.14] [text-shadow:0_1px_0_var(--background)]">
          TRIAGE
        </p>
      </div>
    </footer>
  );
}
