import { useEffect, type ReactNode } from "react";

/**
 * Marks <html> with .js-motion so the entrance styles in styles.css only
 * hide elements when a script is actually running to bring them back.
 * Call once from the root route.
 */
export function enableMotion() {
  document.documentElement.classList.add("js-motion");
}

/** Reveal delay buckets, defined as classes in styles.css. */
const delayClasses = {
  30: "reveal-d30",
  60: "reveal-d60",
  80: "reveal-d80",
  90: "reveal-d90",
  110: "reveal-d110",
  120: "reveal-d120",
  150: "reveal-d150",
  160: "reveal-d160",
  180: "reveal-d180",
  220: "reveal-d220",
  240: "reveal-d240",
} as const;

export type RevealDelay = keyof typeof delayClasses;

export function delayClass(delay: RevealDelay) {
  return delayClasses[delay];
}

/**
 * A block that rises into place once it scrolls into view (staggered by
 * its delay bucket). Without the .js-motion class it renders in its
 * final state.
 */
export function Reveal({
  children,
  delay,
  className,
}: {
  children: ReactNode;
  delay?: RevealDelay;
  className?: string;
}) {
  return (
    <div
      data-reveal=""
      className={delay ? `${delayClass(delay)} ${className ?? ""}` : className}
    >
      {children}
    </div>
  );
}

/**
 * One authored headline line that rises from behind its own baseline.
 * Wrap each authored line of a display headline in one of these.
 */
export function MaskedLine({
  children,
  delay,
}: {
  children: ReactNode;
  delay?: RevealDelay;
}) {
  return (
    <span data-reveal-line="" className={delay ? delayClass(delay) : undefined}>
      <span>{children}</span>
    </span>
  );
}

/**
 * Observes every [data-reveal] and [data-reveal-line] element once and
 * adds .is-in as it enters the viewport. Elements already on screen at
 * mount reveal immediately. If IntersectionObserver is unavailable every
 * target is shown at once, so content is never stuck hidden.
 */
export function useRevealOnScroll() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      "[data-reveal], [data-reveal-line]",
    );
    if (!("IntersectionObserver" in window)) {
      for (const el of targets) el.classList.add("is-in");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    for (const el of targets) observer.observe(el);
    return () => observer.disconnect();
  }, []);
}
