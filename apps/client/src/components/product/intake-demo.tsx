import { IconCheck, IconX } from "@tabler/icons-react";
import { useId, useState } from "react";

import {
  DecisionRecord,
  DuplicateSuggestion,
  IntakeRecord,
} from "@/components/product/fragments";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  duplicateScore,
  sampleCandidates,
  type SampleCandidate,
} from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The live thing: the visitor writes a report, it becomes a ticket candidate,
 * the closest existing candidate is offered as evidence, and a person decides.
 * It opens on a finished, believable record so the hero reads as a product
 * rather than as an empty form.
 */

const sampleReport =
  "Checkout keeps showing the old basket total after a promo code is removed. Three of us hit it this morning on Chrome and Safari.";

const decidedSample = {
  candidate: sampleCandidates[0],
  score: 0.82,
  decision: "Approved" as const,
  reviewer: "Priya Raman",
  decidedAt: "14:32",
};

type Match = { candidate: SampleCandidate; score: number };

function bestMatch(report: string): Match | null {
  const ranked = sampleCandidates
    .map((candidate) => ({
      candidate,
      score: duplicateScore(report, candidate),
    }))
    .sort((a, b) => b.score - a.score);
  const top = ranked[0];
  return top && top.score >= 0.2 ? top : null;
}

function currentTime(): string {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

export function IntakeDemo() {
  const reportId = useId();
  const [text, setText] = useState(sampleReport);
  const [stage, setStage] = useState<"decided" | "candidate" | "decision">(
    "decided",
  );
  const [match, setMatch] = useState<Match | null>({
    candidate: decidedSample.candidate,
    score: decidedSample.score,
  });
  const [decision, setDecision] = useState<"Approved" | "Rejected" | null>(
    decidedSample.decision,
  );
  const [reviewer, setReviewer] = useState(decidedSample.reviewer);
  const [decidedAt, setDecidedAt] = useState(decidedSample.decidedAt);

  function createCandidate() {
    setMatch(bestMatch(text));
    setDecision(null);
    setStage("candidate");
  }

  function decide(next: "Approved" | "Rejected") {
    setDecision(next);
    setReviewer("you");
    setDecidedAt(currentTime());
    setStage("decision");
  }

  function reset() {
    setText(sampleReport);
    setStage("decided");
    setMatch({
      candidate: decidedSample.candidate,
      score: decidedSample.score,
    });
    setDecision(decidedSample.decision);
    setReviewer(decidedSample.reviewer);
    setDecidedAt(decidedSample.decidedAt);
  }

  return (
    <div
      data-ui
      className="w-full max-w-[620px] rounded-lg border border-border bg-card text-card-foreground"
    >
      {stage === "decided" ? (
        <div className="rounded-lg">
          <DecisionHeader meta={decidedSample.candidate.receivedAt} />
          <div className="grid gap-4 px-4 py-4 sm:px-5 sm:py-5">
            <p className="text-[15px] leading-6 text-pretty">{sampleReport}</p>
            <DuplicateSuggestion
              score={decidedSample.score}
              candidate={decidedSample.candidate}
            />
            <DecisionRecord
              decision={decidedSample.decision}
              reviewer={decidedSample.reviewer}
              decidedAt={decidedSample.decidedAt}
              channel="#triage-review"
            />
          </div>
        </div>
      ) : (
        <>
          <DecisionHeader meta="09:41" />
          <div className="grid gap-4 px-4 py-4 sm:px-5 sm:py-5">
            <IntakeRecord text={text} submittedBy="you" receivedAt="09:41" />
            {match ? (
              <DuplicateSuggestion
                score={match.score}
                candidate={match.candidate}
              />
            ) : (
              <p className="rounded-md border border-border bg-muted px-4 py-3 text-sm leading-6">
                Nothing in this workspace looks close to that report, so there
                is no duplicate to dismiss.
              </p>
            )}
            {stage === "candidate" ? (
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  size="lg"
                  onClick={() => decide("Approved")}
                >
                  <IconCheck size={16} aria-hidden="true" />
                  Approve candidate
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  onClick={() => decide("Rejected")}
                >
                  <IconX size={16} aria-hidden="true" />
                  Reject
                </Button>
              </div>
            ) : (
              decision && (
                <DecisionRecord
                  decision={decision}
                  reviewer={reviewer}
                  decidedAt={decidedAt}
                  channel="#triage-review"
                />
              )
            )}
          </div>
        </>
      )}

      <div className="rounded-b-lg bg-muted px-4 py-4 sm:px-5 sm:py-5">
        <label htmlFor={reportId} className="text-sm font-medium">
          Write a report of your own
        </label>
        <Textarea
          id={reportId}
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={4}
          className="mt-2 min-h-28"
          placeholder="Paste a bug, a question, or something a customer sent."
        />
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Button
            type="button"
            size="lg"
            onClick={createCandidate}
            disabled={text.trim().length === 0}
          >
            Create candidate
          </Button>
          <button
            type="button"
            onClick={reset}
            className={cn(
              "inline-flex min-h-10 items-center text-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
              "text-muted-foreground",
            )}
          >
            Show the decided example again
          </button>
        </div>
        <p className="mt-3 text-xs leading-5 text-muted-foreground">
          This demo compares your text with three sample candidates by shared
          words. Triage compares with embeddings instead, and a reviewer
          confirms or dismisses every suggestion.
        </p>
      </div>
    </div>
  );
}

function DecisionHeader({ meta }: { meta: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 rounded-t-lg bg-muted px-4 py-3 sm:px-5">
      <p className="text-sm font-medium">Candidate cand-1047</p>
      <p className="text-xs text-muted-foreground tabular-nums">{meta}</p>
    </div>
  );
}
