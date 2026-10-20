import { Link } from "@tanstack/react-router";

import { buttonVariants } from "@/components/ui/button";

const primaryMailto =
  "mailto:hello@triage.example?subject=" +
  encodeURIComponent("Triage access request") +
  "&body=" +
  encodeURIComponent(
    "Hi Triage team,\n\nI would like to try Triage with my team.\n",
  );

export function SiteHeader() {
  return (
    <header className="border-b-2 border-border bg-background">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-10">
        <Link
          to="/"
          className="flex items-center gap-3 font-medium tracking-tight text-foreground"
          aria-label="Triage home"
        >
          <span
            aria-hidden="true"
            className="flex size-9 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground"
          >
            T
          </span>
          <span className="text-lg">Triage</span>
        </Link>
        <nav
          aria-label="Primary navigation"
          className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"
        >
          <Link to="/features" className="text-foreground hover:underline">
            Features
          </Link>
          <Link to="/contact" className="text-foreground hover:underline">
            Contact
          </Link>
          <Link to="/sign-in" className="text-foreground hover:underline">
            Sign in
          </Link>
          <a className={buttonVariants({ size: "sm" })} href={primaryMailto}>
            Request access
          </a>
        </nav>
      </div>
    </header>
  );
}
