import { useLocation } from "@tanstack/react-router";
import { useEffect } from "react";

/**
 * Gives every [data-reveal] element its entrance once, as it enters the
 * viewport. Content stays visible when the observer is unavailable, and the
 * hidden state only ever applies under the .js gate set in index.html.
 */
export function useReveal() {
  const location = useLocation();

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (elements.length === 0) return undefined;

    if (!("IntersectionObserver" in window)) {
      for (const element of elements) element.classList.add("is-in");
      return undefined;
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
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, [location.pathname]);
}
