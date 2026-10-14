import { IconExclamationCircle } from "@tabler/icons-react";
import type { ReactNode } from "react";

/** The shared frame for the two authentication pages. */
export function AuthPage({
  children,
  footer,
  intro,
  title,
}: {
  children: ReactNode;
  footer: ReactNode;
  intro: string;
  title: string;
}) {
  return (
    <section className="px-5 py-16 sm:px-8 lg:px-16 lg:py-24 xl:px-20">
      <div className="mx-auto flex max-w-[26rem] flex-col">
        <h1 className="font-serif text-head text-balance">{title}</h1>
        <p className="mt-4 text-lead text-muted-foreground text-pretty">
          {intro}
        </p>
        {children}
        <div className="mt-8 text-body text-muted-foreground">{footer}</div>
      </div>
    </section>
  );
}

/** Errors are shown with an icon as well as the destructive colour. */
export function FieldError({ children }: { children: ReactNode }) {
  return (
    <p
      className="flex items-start gap-2 text-small text-destructive"
      role="alert"
    >
      <IconExclamationCircle
        aria-hidden="true"
        className="mt-0.5 size-4 shrink-0"
      />
      {children}
    </p>
  );
}
