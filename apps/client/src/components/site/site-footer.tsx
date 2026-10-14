import { Link } from "@tanstack/react-router";

import { pageGutter, pageWidth, productName } from "@/lib/site";
import { cn } from "@/lib/utils";

const footerLinks = [
  { label: "Features", to: "/features" },
  { label: "Contact", to: "/contact" },
  { label: "Sign in", to: "/sign-in" },
  { label: "Start a workspace", to: "/sign-up" },
];

export function SiteFooter() {
  return (
    <footer className={cn(pageGutter, pageWidth, "pb-10 sm:pb-12")}>
      <div className="grid gap-6 text-[15px] sm:grid-cols-[1fr_auto_1fr] sm:items-baseline sm:gap-8">
        <p className="text-muted-foreground">A queue for incoming reports.</p>
        <nav
          aria-label="Footer"
          className="flex flex-wrap gap-x-6 gap-y-2 sm:justify-center"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-muted-foreground sm:text-right">
          © {new Date().getFullYear()} {productName}
        </p>
      </div>
    </footer>
  );
}
