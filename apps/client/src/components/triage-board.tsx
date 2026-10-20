import {
  IconCheck,
  IconX,
  IconArrowRight,
  IconCopy,
} from "@tabler/icons-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Stage = "intake" | "candidate" | "review" | "decision";

const sampleReport = {
  title: "Login button unresponsive on mobile",
  body: "The login button on the mobile site does not respond when tapped. This affects all mobile users trying to sign in. Reported by a customer via email.",
  source: "Discord #support",
  author: "jane.doe",
  timestamp: "2026-10-14 09:23",
};

const duplicateSuggestion = {
  title: "Mobile login not working",
  score: 0.87,
  matchedText:
    "The login button on mobile is not working. IconUsers cannot sign in on their phones.",
};

export function TriageBoard() {
  const [stage, setStage] = useState<Stage>("intake");

  const stages: { id: Stage; label: string }[] = [
    { id: "intake", label: "Intake" },
    { id: "candidate", label: "Candidate" },
    { id: "review", label: "Review" },
    { id: "decision", label: "Decision" },
  ];

  return (
    <div
      data-ui
      className="w-full max-w-md rounded-xl border border-border bg-card p-5 text-left shadow-sm"
    >
      {/* Stage indicator */}
      <div className="mb-4 flex items-center gap-1">
        {stages.map((s, i) => {
          const stageIndex = stages.findIndex((x) => x.id === stage);
          return (
            <div key={s.id} className="flex items-center gap-1">
              <div
                className={cn(
                  "size-2 rounded-full",
                  stage === s.id
                    ? "bg-primary"
                    : stageIndex > i
                      ? "bg-primary/40"
                      : "bg-border",
                )}
              />
              {i < stages.length - 1 && (
                <div
                  className={cn(
                    "h-px w-6",
                    stageIndex > i ? "bg-primary/40" : "bg-border",
                  )}
                />
              )}
            </div>
          );
        })}
        <span className="ml-2 text-xs font-medium text-muted-foreground">
          {stages.find((s) => s.id === stage)?.label}
        </span>
      </div>

      {/* Report card */}
      <div className="rounded-lg border border-border bg-background p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h4 className="text-sm font-medium leading-snug">
              {sampleReport.title}
            </h4>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              {sampleReport.body}
            </p>
          </div>
          <span className="shrink-0 rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            {sampleReport.source}
          </span>
        </div>

        <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
          <span>{sampleReport.author}</span>
          <span>{sampleReport.timestamp}</span>
        </div>

        {/* Duplicate suggestion */}
        {stage !== "intake" && (
          <div className="mt-3 rounded-md border border-border bg-muted/50 p-3">
            <div className="flex items-center text-[11px] font-medium text-muted-foreground">
              <IconCopy className="size-3" />
              <span>Duplicate suggestion</span>
              <span className="ml-auto rounded bg-accent px-1.5 py-0.5 text-[10px] font-semibold text-accent-foreground">
                {Math.round(duplicateSuggestion.score * 100)}% match
              </span>
            </div>
            <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
              &ldquo;{duplicateSuggestion.matchedText}&rdquo;
            </p>
          </div>
        )}

        {/* Review decision */}
        {stage === "review" && (
          <div className="mt-3 flex items-center">
            <Button
              variant="default"
              size="xs"
              onClick={() => setStage("decision")}
            >
              <IconCheck className="size-3" />
              Approve
            </Button>
            <Button
              variant="destructive"
              size="xs"
              onClick={() => setStage("decision")}
            >
              <IconX className="size-3" />
              Reject
            </Button>
          </div>
        )}

        {stage === "decision" && (
          <div className="mt-3 flex items-center rounded-md bg-accent p-3 text-xs">
            <IconCheck className="size-4 text-accent-foreground" />
            <span className="font-medium text-accent-foreground">
              Approved by reviewer@triage.app
            </span>
            <span className="ml-auto text-accent-foreground/70">
              2026-10-14 10:45
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center">
        {stage === "intake" && (
          <Button
            size="sm"

            onClick={() => setStage("candidate")}
          >
            Create candidate
            <IconArrowRight className="size-3" />
          </Button>
        )}
        {stage === "candidate" && (
          <Button
            size="sm"

            onClick={() => setStage("review")}
          >
            IconSend to review
            <IconArrowRight className="size-3" />
          </Button>
        )}
        {stage === "review" && (
          <span className="text-xs text-muted-foreground">
            A reviewer approves or rejects this candidate.
          </span>
        )}
        {stage === "decision" && (
          <Button variant="ghost" size="xs" onClick={() => setStage("intake")}>
            Reset
          </Button>
        )}
      </div>
    </div>
  );
}
