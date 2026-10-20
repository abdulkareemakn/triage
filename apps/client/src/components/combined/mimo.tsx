import { IconBrandDiscord, IconMessage } from "@tabler/icons-react";

import { Reveal } from "@/components/marketing/motion";

/* ------------------------ What Triage does, as prose ----------------------- */

export function MimoFeatureParagraph() {
  return (
    <section
      id="what"
      aria-label="What Triage does"
      className="bg-secondary px-5 py-20 sm:px-8 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="text-[clamp(1.375rem,2.6vw,2.25rem)] leading-[1.3] font-medium tracking-tight">
            Triage takes the reports{" "}
            <span className="word-slot" aria-hidden="true">
              <IconMessage size={18} stroke={2} />
            </span>{" "}
            your team already sends, in Discord{" "}
            <span className="word-slot" aria-hidden="true">
              <IconBrandDiscord size={18} stroke={2} />
            </span>
            , in a text box, and turns each one into a candidate{" "}
            <span className="word-slot" aria-hidden="true">
              <span className="tr-chip">Draft</span>
            </span>{" "}
            a person reviews, names the duplicates{" "}
            <span className="word-slot" aria-hidden="true">
              <span className="tr-chip">0.86</span>
            </span>{" "}
            it recognises, and answers back to the channel it came from.
          </p>
        </Reveal>
        <Reveal delay={120} className="mt-10 md:ml-[58%]">
          <p className="text-base leading-6 text-muted-foreground">
            The whole loop, written out.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
