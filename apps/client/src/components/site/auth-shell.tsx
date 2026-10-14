import type { ReactNode } from "react";

import { pageGutter, pageWidth } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The two-column composition shared by the sign-in and sign-up pages: the form
 * on the page's text axis, and one true-size piece of Triage on a dark field.
 */
export function AuthShell({
  title,
  intro,
  children,
  aside,
  below,
}: {
  title: string;
  intro: string;
  children: ReactNode;
  aside: ReactNode;
  below: ReactNode;
}) {
  return (
    <div className={cn(pageGutter, pageWidth, "pb-16 lg:pb-24")}>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-[30rem]">
          <h1 className="text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-medium tracking-[-0.035em] text-balance">
            {title}
          </h1>
          <p className="mt-5 text-base leading-7 text-pretty text-muted-foreground">
            {intro}
          </p>
          <div className="mt-10">{children}</div>
          <div className="mt-8 text-sm text-muted-foreground">{below}</div>
        </div>
        <div className="dark overflow-hidden rounded-lg bg-background px-6 py-10 text-foreground sm:px-8 sm:py-14">
          {aside}
        </div>
      </div>
    </div>
  );
}
