import { createFileRoute } from "@tanstack/react-router";

import {
  CapabilityBands,
  CombinedClose,
  FAQ,
  LongcatHero,
  LongcatShowcase,
  LongcatStages,
} from "@/components/combined/longcat";
import {
  MimoContext,
  MimoFeatureParagraph,
  MimoFeatureRows,
  MimoIntegrations,
  MimoLoop,
  MimoReel,
  MimoRoles,
} from "@/components/combined/mimo";
import { useRevealOnScroll } from "@/components/marketing/motion";

export const Route = createFileRoute("/")({
  component: CombinedPage,
  head: () => ({
    meta: [{ title: "Triage — combined design" }],
  }),
});

function CombinedPage() {
  useRevealOnScroll();

  return (
    <>
      <LongcatHero />
      <MimoReel />
      <LongcatShowcase />
      <MimoLoop />
      <LongcatStages />
      <MimoFeatureParagraph />
      <CapabilityBands />
      <MimoFeatureRows />
      <MimoContext />
      <MimoIntegrations />
      <MimoRoles />
      <FAQ />
      <CombinedClose />
    </>
  );
}
