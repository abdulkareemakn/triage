import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

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
      <RemovalMarker label="The loop in motion">
        <MimoReel />
      </RemovalMarker>
      <LongcatShowcase />
      <RemovalMarker label="From report to decision">
        <MimoLoop />
      </RemovalMarker>
      <LongcatStages />
      <MimoFeatureParagraph />
      <RemovalMarker label="What Triage does (bands)">
        <CapabilityBands />
      </RemovalMarker>
      <RemovalMarker label="The loop, piece by piece">
        <MimoFeatureRows />
      </RemovalMarker>
      <RemovalMarker label="Where it sits">
        <MimoContext />
      </RemovalMarker>
      <RemovalMarker label="Around the loop">
        <MimoIntegrations />
      </RemovalMarker>
      <RemovalMarker label="Three roles">
        <MimoRoles />
      </RemovalMarker>
      <FAQ />
      <CombinedClose />
      <RemovalPreviewLegend />
    </>
  );
}

/**
 * Temporary review aid: outlines a section and keeps a visible X badge in
 * view while it is on screen. Nothing is deleted until the preview is
 * confirmed.
 */
function RemovalMarker({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="relative outline-2 outline-dashed outline-destructive outline-offset-[-3px]">
      <div className="pointer-events-none sticky top-3 z-50 flex justify-end px-4">
        <span className="rounded-full bg-destructive px-3 py-1 text-xs font-semibold text-white shadow-lg">
          ✕ {label} — marked for removal
        </span>
      </div>
      {children}
    </div>
  );
}

function RemovalPreviewLegend() {
  return (
    <div className="fixed right-4 bottom-4 z-[100] max-w-[18rem] rounded-lg border-2 border-dashed border-destructive bg-background/95 p-3 text-xs shadow-xl backdrop-blur">
      <p className="font-semibold text-destructive">Removal preview</p>
      <p className="mt-1 leading-5 text-muted-foreground">
        Red dashed sections are marked for removal. Nothing has been deleted
        yet.
      </p>
    </div>
  );
}
