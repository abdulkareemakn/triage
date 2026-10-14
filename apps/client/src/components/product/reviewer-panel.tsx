import { IconCheck, IconClock, IconHash, IconX } from "@tabler/icons-react";
import { useState } from "react";

import { sampleCandidates } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The candidate as a reviewer sees it, shown whole like a plate in a manual,
 * with notes in both margins. The panel is a fixed height so each note can be
 * set level with the control it explains. All content here is sample data.
 */

type Part =
  | "text"
  | "source"
  | "evidence"
  | "suggestion"
  | "actions"
  | "decision";

export const reviewerNotes: {
  id: Part;
  side: "left" | "right";
  top: string;
  name: string;
  body: string;
}[] = [
  {
    id: "text",
    side: "left",
    top: "top-[44px]",
    name: "The report as written",
    body: "The submitted text is kept exactly as it arrived, with nothing rewritten before a reviewer sees it.",
  },
  {
    id: "source",
    side: "left",
    top: "top-[196px]",
    name: "Where it came from",
    body: "Manual intake or a Discord channel, with the time it was received and who sent it.",
  },
  {
    id: "evidence",
    side: "left",
    top: "top-[300px]",
    name: "Matched evidence",
    body: "A suggested duplicate always shows the candidate it matched and the score beside it.",
  },
  {
    id: "suggestion",
    side: "right",
    top: "top-[452px]",
    name: "Confirm or dismiss",
    body: "A reviewer settles every suggestion. Triage never merges two candidates on its own.",
  },
  {
    id: "actions",
    side: "right",
    top: "top-[532px]",
    name: "Approve or reject",
    body: "The two outcomes a reviewer can choose, and nothing else is required of them.",
  },
  {
    id: "decision",
    side: "right",
    top: "top-[608px]",
    name: "Recorded against the candidate",
    body: "The decision is stored with the reviewer's name and the moment they made it.",
  },
];

const matched = sampleCandidates[0];

export function ReviewerPanelPlate() {
  const [active, setActive] = useState<Part | null>(null);

  return (
    <div className="relative h-[720px]" onMouseLeave={() => setActive(null)}>
      <div
        data-ui
        className="absolute top-0 left-1/2 w-[380px] -translate-x-1/2 overflow-hidden rounded-lg border border-border bg-card text-card-foreground"
      >
        <header className="flex h-12 items-baseline justify-between bg-muted px-4">
          <p className="text-sm font-medium">cand-1042</p>
          <p className="text-xs text-muted-foreground tabular-nums">09:41</p>
        </header>

        <div
          className={cn(
            "h-[148px] px-4 py-3 transition-colors",
            active === "text" && "bg-accent text-accent-foreground",
          )}
        >
          <p className="text-[15px] leading-6 text-pretty">
            After a promo code is removed from the basket the total stays at the
            discounted amount until the page is reloaded.
          </p>
        </div>

        <dl
          className={cn(
            "flex h-[100px] flex-col justify-center gap-1 bg-muted px-4 text-sm transition-colors",
            active === "source" && "bg-accent text-accent-foreground",
          )}
        >
          <div className="flex gap-3">
            <dt className="text-muted-foreground">Channel</dt>
            <dd className="ml-auto">Manual intake</dd>
          </div>
          <div className="flex gap-3">
            <dt className="text-muted-foreground">Submitted by</dt>
            <dd className="ml-auto">Nadia Okonkwo</dd>
          </div>
        </dl>

        <div
          className={cn(
            "h-[152px] p-3 transition-colors",
            active === "evidence" && "bg-accent text-accent-foreground",
          )}
        >
          <div className="rounded-md border border-border bg-muted p-3">
            <p className="flex items-baseline justify-between gap-3 text-sm font-medium">
              Possible duplicate
              <span className="tabular-nums">0.82</span>
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              “{matched.title}”
            </p>
            <p className="mt-2 text-xs text-muted-foreground tabular-nums">
              {matched.id} · {matched.receivedAt}
            </p>
          </div>
        </div>

        <div
          className={cn(
            "flex h-[80px] items-center gap-2 bg-muted px-4 transition-colors",
            active === "suggestion" && "bg-accent text-accent-foreground",
          )}
        >
          <button
            type="button"
            className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <IconCheck size={16} aria-hidden="true" />
            Confirm
          </button>
          <button
            type="button"
            className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <IconX size={16} aria-hidden="true" />
            Dismiss
          </button>
        </div>

        <div
          className={cn(
            "flex h-[80px] items-center gap-2 px-4 transition-colors",
            active === "actions" && "bg-accent text-accent-foreground",
          )}
        >
          <span className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground">
            <IconCheck size={16} aria-hidden="true" />
            Approve
          </span>
          <span className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-destructive/10 px-3 text-sm font-medium text-destructive">
            <IconX size={16} aria-hidden="true" />
            Reject
          </span>
        </div>

        <div
          className={cn(
            "flex h-[112px] flex-col justify-center gap-2 px-4 text-sm transition-colors",
            active === "decision" && "bg-accent text-accent-foreground",
          )}
        >
          <p className="flex items-center gap-2 font-medium">
            <IconClock size={16} aria-hidden="true" />
            Approved by Priya Raman at 14:32
          </p>
          <p className="flex items-center gap-2 text-muted-foreground">
            <IconHash size={16} aria-hidden="true" />
            Posted to #triage-review
          </p>
        </div>
      </div>

      {reviewerNotes.map((note) => (
        <button
          key={note.id}
          type="button"
          className={cn(
            "absolute w-[22ch] cursor-default rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
            note.top,
            note.side === "left" ? "left-0 text-right" : "right-0 text-left",
          )}
          onMouseEnter={() => setActive(note.id)}
          onFocus={() => setActive(note.id)}
          onBlur={() => setActive(null)}
        >
          <span className="block text-lg font-medium">{note.name}</span>
          <span className="mt-1 block text-[15px] leading-6 text-pretty text-muted-foreground">
            {note.body}
          </span>
        </button>
      ))}
    </div>
  );
}
