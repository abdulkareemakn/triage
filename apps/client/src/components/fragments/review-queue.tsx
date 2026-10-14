import {
  IconBrandDiscord,
  IconCircleCheck,
  IconCircleX,
  IconClock,
  IconCopy,
  IconHistory,
  IconUserCheck,
} from "@tabler/icons-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { SAMPLE_CANDIDATE, SAMPLE_WAITING_COUNT } from "@/lib/sample-data";

type Decision = "approved" | "rejected";
type DuplicateState = "pending" | "confirmed" | "dismissed";

function now(): string {
  return new Date().toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * The live thing on the landing page: a real slice of the review queue. The
 * visitor reads a sample candidate, judges the duplicate suggestion, and
 * records a decision with their name and the time, exactly as a reviewer
 * would. Sample content throughout.
 */
export function ReviewQueueFragment() {
  const [decision, setDecision] = useState<Decision | null>(null);
  const [recordedAt, setRecordedAt] = useState<string | null>(null);
  const [duplicate, setDuplicate] = useState<DuplicateState>("pending");

  const waiting = SAMPLE_WAITING_COUNT - (decision ? 1 : 0);

  function record(next: Decision) {
    setDecision(next);
    setRecordedAt(now());
  }

  function startOver() {
    setDecision(null);
    setRecordedAt(null);
    setDuplicate("pending");
  }

  return (
    <div
      data-ui
      className="w-full max-w-[34rem] rounded-lg border border-border bg-card text-card-foreground"
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
        <p className="text-body font-medium">Review queue</p>
        <p className="flex items-center gap-1.5 text-small text-muted-foreground">
          <IconClock aria-hidden="true" className="size-4" />
          <span className="tabular-nums">{waiting}</span> waiting
        </p>
      </div>

      <div className="px-4 pb-4 sm:px-5">
        <div className="rounded-lg bg-secondary p-3 sm:p-4">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-small text-muted-foreground">
            <IconBrandDiscord aria-hidden="true" className="size-4 shrink-0" />
            {SAMPLE_CANDIDATE.received}
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{SAMPLE_CANDIDATE.id}</span>
          </p>
          <h3 className="mt-2 text-body leading-snug font-medium">
            {SAMPLE_CANDIDATE.title}
          </h3>
          <p className="mt-2 max-w-[42ch] text-small leading-relaxed">
            {SAMPLE_CANDIDATE.body}
          </p>
          <p className="mt-3 text-small text-muted-foreground">
            Reported by {SAMPLE_CANDIDATE.reporter} in #bug-reports
          </p>
        </div>

        <div className="mt-3 rounded-lg bg-accent p-3 sm:p-4">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-small text-accent-foreground">
            <IconCopy aria-hidden="true" className="size-4 shrink-0" />
            Possible duplicate
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">
              {SAMPLE_CANDIDATE.duplicate.id}
            </span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">
              {SAMPLE_CANDIDATE.duplicate.score.toFixed(2)} score
            </span>
          </p>
          <blockquote className="mt-2 max-w-[46ch] text-small leading-relaxed text-accent-foreground">
            “{SAMPLE_CANDIDATE.duplicate.matchedText}”
          </blockquote>

          {duplicate === "pending" ? (
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                onClick={() => setDuplicate("confirmed")}
                size="sm"
                variant="secondary"
              >
                Same issue
              </Button>
              <Button
                onClick={() => setDuplicate("dismissed")}
                size="sm"
                variant="secondary"
              >
                Different
              </Button>
            </div>
          ) : (
            <p className="mt-3 flex items-center gap-2 text-small text-accent-foreground">
              {duplicate === "confirmed" ? (
                <IconCircleCheck aria-hidden="true" className="size-4" />
              ) : (
                <IconCircleX aria-hidden="true" className="size-4" />
              )}
              {duplicate === "confirmed"
                ? `Confirmed as a duplicate of ${SAMPLE_CANDIDATE.duplicate.id}.`
                : "Dismissed. This report is new."}
            </p>
          )}
        </div>

        {decision === null ? (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Button
              className="min-h-10"
              onClick={() => record("approved")}
              size="lg"
            >
              <IconCircleCheck aria-hidden="true" className="size-4" />
              Approve candidate
            </Button>
            <Button
              className="min-h-10"
              onClick={() => record("rejected")}
              size="lg"
              variant="secondary"
            >
              <IconCircleX aria-hidden="true" className="size-4" />
              Reject
            </Button>
          </div>
        ) : (
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg bg-secondary p-3">
            <p className="flex items-center gap-2 text-small">
              <IconHistory aria-hidden="true" className="size-4" />
              {decision === "approved" ? "Approved" : "Rejected"} by you at
              <span className="tabular-nums">{recordedAt}</span>
            </p>
            <Button
              className="min-h-9"
              onClick={startOver}
              size="sm"
              variant="ghost"
            >
              Review again
            </Button>
          </div>
        )}

        <p className="mt-3 flex items-center gap-2 text-small text-muted-foreground">
          <IconUserCheck aria-hidden="true" className="size-4" />
          The decision is stored with the reviewer and the time.
        </p>
      </div>
    </div>
  );
}
