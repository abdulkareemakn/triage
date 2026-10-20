import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-border bg-background">
      <div className="mx-auto w-full max-w-7xl px-6 py-10 sm:px-10">
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <p className="font-medium text-foreground">Triage</p>
            <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
              A calm workspace where incoming software reports become reviewable
              ticket candidates.
            </p>
          </div>
          <nav
            aria-label="Footer navigation"
            className="flex flex-col gap-2 text-sm"
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
            <Link to="/sign-up" className="text-foreground hover:underline">
              Create account
            </Link>
          </nav>
          <p className="text-sm leading-6 text-muted-foreground sm:text-right">
            Sample candidate names, reports and review states on this site are
            illustrative.
            <br />
            Images credited on the landing page.
          </p>
        </div>
        <p className="mt-8 text-xs text-muted-foreground">
          Triage, 2026. Workspace and review data stays with your team.
        </p>
      </div>
    </footer>
  );
}
