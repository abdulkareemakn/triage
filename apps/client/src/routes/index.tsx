import { createFileRoute } from "@tanstack/react-router";

import {
  FAQ,
  LongcatHero,
  LongcatShowcase,
  LongcatStages,
} from "@/components/combined/longcat";
import { MimoFeatureParagraph } from "@/components/combined/mimo";
import { useRevealOnScroll } from "@/components/marketing/motion";

export const Route = createFileRoute("/")({
  component: CombinedPage,
  head: () => ({
    meta: [{ title: "Triage — Every report, reviewed." }],
  }),
});

function CombinedPage() {
  useRevealOnScroll();

  return (
    <>
      <LongcatHero />
      <LongcatShowcase />
      <LongcatStages />
      <MimoFeatureParagraph />
      <FAQ />
    </>
  );
}
