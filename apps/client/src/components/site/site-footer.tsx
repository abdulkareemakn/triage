import { Link } from "@tanstack/react-router";

import { privacyUrl, requestAccessUrl } from "@/lib/site";

const links = [
  { label: "Features", to: "/features" },
  { label: "Contact", to: "/contact" },
  { label: "Sign in", to: "/sign-in" },
  { label: "Create account", to: "/sign-up" },
] as const;

/**
 * The site's quiet close: one line with what this is, the pages, and the year,
 * then the credit line for the photographs the site uses.
 */
export function SiteFooter() {
  return (
    <footer className="px-5 pb-8 sm:px-10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <p className="text-sm text-muted-foreground">Triage sorts reports.</p>
        <nav
          aria-label="Footer"
          className="flex flex-wrap justify-center gap-x-6 text-sm"
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
        <div className="flex flex-wrap items-center justify-start gap-x-6 text-sm sm:justify-end">
          <span className="text-muted-foreground">
            © {new Date().getFullYear()}
          </span>
          <a
            className="triage-press py-2 underline-offset-4 hover:underline"
            href={privacyUrl()}
          >
            Privacy
          </a>
          <a
            className="triage-press py-2 underline-offset-4 hover:underline"
            href={requestAccessUrl()}
          >
            Request access
          </a>
        </div>
      </div>
      <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
        Pictures:{" "}
        <a
          className="triage-press underline-offset-4 hover:underline"
          href="https://commons.wikimedia.org/index.php?curid=81458428"
        >
          “Sticky notes at Hong Kong Strategy Salon”
        </a>{" "}
        by 無聊龍, CC0, via Wikimedia Commons;{" "}
        <a
          className="triage-press underline-offset-4 hover:underline"
          href="https://www.flickr.com/photos/115357548@N08/16520442071"
        >
          “Sticky Notes on a Whiteboard at a Climate Change Training for Joshua
          Tree Interpretive Rangers”
        </a>{" "}
        by Joshua Tree National Park, public domain, via Flickr.
      </p>
    </footer>
  );
}
