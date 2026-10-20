import { Link } from "@tanstack/react-router";

/**
 * The footer is a designed close: the name returns large, a few links,
 * and the picture credits the archival photographs used on the pages.
 */
export function SiteFooter() {
  return (
    <footer className="bg-secondary">
      <div className="mx-auto max-w-6xl px-5 pt-12 pb-10 sm:px-8">
        <p
          className="text-5xl leading-none font-semibold tracking-tight sm:text-6xl"
          aria-hidden="true"
        >
          Triage
        </p>
        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <p className="max-w-sm text-sm leading-6 text-muted-foreground">
            Incoming reports become ticket candidates. A person decides what
            becomes work. A university project.
          </p>
          <nav
            aria-label="Footer navigation"
            className="flex flex-col items-start gap-2 text-sm"
          >
            <Link
              to="/features"
              className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
            >
              Features
            </Link>
            <Link
              to="/contact"
              className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
            >
              Contact
            </Link>
            <Link
              to="/sign-in"
              className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
            >
              Sign in
            </Link>
          </nav>
        </div>
        <p className="mt-10 text-xs leading-5 text-muted-foreground">
          Archival photographs: “General Post Office mail sorting room,
          Wellington c.1900s” by Archives New Zealand, CC BY-SA 2.0, via
          Wikimedia Commons · “Mail receiving sorting room, U.S” by Library of
          Congress, CC0, via rawpixel · “Denges-Triage-Bosse2” by MHM55, CC
          BY-SA 4.0, via Wikimedia Commons. Photographs show the world around
          the subject; they are not Triage’s own product.
        </p>
        <p className="mt-4 text-xs text-muted-foreground">© 2026 Triage</p>
      </div>
    </footer>
  );
}
