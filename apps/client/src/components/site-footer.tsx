import { IconArrowNarrowRight } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

import { buttonVariants } from "@/components/ui/button";
import { buildRequestAccessMailto } from "@/lib/contact";
import { MEDIA_CREDITS, creditLine } from "@/lib/media-credits";

const pages = [
  { label: "Features", to: "/features" },
  { label: "How it works", to: "/" },
  { label: "Contact", to: "/contact" },
  { label: "Sign in", to: "/sign-in" },
] as const;

export function SiteFooter() {
  return (
    <footer className="px-5 pb-10 sm:px-8 lg:px-16 xl:px-20">
      <div className="mx-auto max-w-[92rem] pt-16 sm:pt-24">
        <p className="font-serif text-display leading-none tracking-[-0.04em]">
          Triage
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <p className="max-w-[38rem] text-lead text-foreground text-pretty">
            Incoming reports become ticket candidates that a person reviews.
            Discord intake, duplicate suggestions and recorded decisions, in one
            calm workspace.
          </p>
          <a
            className={buttonVariants({ size: "xl" })}
            href={buildRequestAccessMailto()}
          >
            Request access
            <IconArrowNarrowRight aria-hidden="true" className="size-5" />
          </a>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="Footer" className="flex flex-col gap-2 text-body">
            {pages.map((page) => (
              <Link
                className="inline-flex min-h-11 items-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                key={page.label}
                to={page.to}
              >
                {page.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-4 text-small text-muted-foreground">
            <p className="max-w-[34rem]">
              Triage is in active development. The workspace, messages and
              figures shown on this site are sample content.
            </p>
            <div className="flex flex-col gap-2">
              <p className="text-foreground">Photographs</p>
              <ul className="flex flex-col gap-2">
                {MEDIA_CREDITS.map((credit) => (
                  <li key={credit.title}>
                    {creditLine(credit)}.{" "}
                    <a
                      className="underline underline-offset-4 hover:text-foreground"
                      href={credit.source}
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      Source
                    </a>{" "}
                    <a
                      className="underline underline-offset-4 hover:text-foreground"
                      href={credit.licenceUrl}
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      Licence
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
