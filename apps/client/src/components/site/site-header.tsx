import { Link } from "@tanstack/react-router";

import { buttonVariants } from "@/components/ui/button";
import {
  navAction,
  navLinks,
  pageGutter,
  pageWidth,
  productName,
} from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header
      className={cn(
        "bg-background",
        pageGutter,
        pageWidth,
        "pt-6 pb-10 sm:pt-8 sm:pb-14",
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <Link
          to="/"
          className="text-lg font-medium tracking-tight underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          {productName}
        </Link>
        <nav
          aria-label="Main"
          className="flex flex-wrap items-center gap-x-6 gap-y-3"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="inline-flex min-h-12 items-center text-base underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              {link.label}
            </Link>
          ))}
          <Link to={navAction.to} className={buttonVariants({ size: "xl" })}>
            {navAction.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}
