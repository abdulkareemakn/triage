import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

const delays = ["", "delay-100", "delay-200", "delay-300"] as const;

/** Rises into place once, the first time its section enters the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Without an observer (very old browsers, print) the content is simply shown.
  const [shown, setShown] = useState(
    () => typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
    if (shown) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [shown]);

  return (
    <div
      ref={ref}
      data-shown={shown ? "true" : "false"}
      className={cn("reveal", delays[delay] ?? "", className)}
    >
      {children}
    </div>
  );
}

/**
 * Each line of the hero headline rises from behind its own baseline on load.
 * The lines are authored, because there are never more than two of them.
 */
export function MaskedLines({
  lines,
  className,
}: {
  lines: string[];
  className?: string;
}) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShown(true), 80);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <span className={className}>
      {lines.map((line, index) => (
        <span
          className={cn("mask-line", index > 0 && "delay-[120ms]")}
          key={line}
          data-shown={shown ? "true" : "false"}
        >
          <span>{line}</span>
        </span>
      ))}
    </span>
  );
}
