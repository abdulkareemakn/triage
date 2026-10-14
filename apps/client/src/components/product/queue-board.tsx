import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * The workspace queue, set as a departure board: one band per submission, the
 * facts in columns, and a status block at the end. Clicking a row opens it.
 * Rows, names and times are sample content.
 */

type Status = "Approved" | "Rejected" | "Pending" | "Duplicate";

type QueueRow = {
  id: string;
  title: string;
  channel: "Manual intake" | "Discord";
  submittedBy: string;
  receivedAt: string;
  status: Status;
  detail: string;
};

const statusStyles: Record<Status, string> = {
  Approved: "bg-primary text-primary-foreground",
  Rejected: "bg-destructive text-destructive-foreground",
  Pending: "bg-secondary text-secondary-foreground",
  Duplicate: "bg-accent text-accent-foreground",
};

const queue: QueueRow[] = [
  {
    id: "cand-1042",
    title: "Promo code leaves the old basket total",
    channel: "Manual intake",
    submittedBy: "Nadia Okonkwo",
    receivedAt: "09:41",
    status: "Approved",
    detail:
      "Duplicate of cand-1036 confirmed by Priya Raman. Both reported the same stale total after a promo code is removed.",
  },
  {
    id: "cand-1039",
    title: "CSV export drops the last row",
    channel: "Discord",
    submittedBy: "Tomás Reyes",
    receivedAt: "08:12",
    status: "Duplicate",
    detail:
      "Matches cand-1029 at 0.79. A reviewer has not confirmed the suggestion yet.",
  },
  {
    id: "cand-1031",
    title: "Session expires during file upload",
    channel: "Discord",
    submittedBy: "Priya Raman",
    receivedAt: "Yesterday",
    status: "Approved",
    detail:
      "Rejected twice by the submitter before being rewritten as a single sentence.",
  },
  {
    id: "cand-1028",
    title: "Search returns nothing for accented names",
    channel: "Manual intake",
    submittedBy: "Hal Brenner",
    receivedAt: "Yesterday",
    status: "Pending",
    detail:
      "Sent in by hand after three people in the same afternoon hit it. No close candidate was found, so it is waiting for a reviewer rather than a decision.",
  },
  {
    id: "cand-1024",
    title: "Timezone shown wrong on the audit log",
    channel: "Manual intake",
    submittedBy: "Wen Li",
    receivedAt: "2 days ago",
    status: "Rejected",
    detail:
      "The audit log shows UTC by design. Rejected by Nadia Okonkwo with a note on the decision.",
  },
  {
    id: "cand-1019",
    title: "Invite links let anyone join twice",
    channel: "Discord",
    submittedBy: "Tomás Reyes",
    receivedAt: "2 days ago",
    status: "Duplicate",
    detail: "Matches cand-1012 at 0.74, raised from the same Discord message.",
  },
  {
    id: "cand-1015",
    title: "Attachment preview blank for PDFs over 5 MB",
    channel: "Manual intake",
    submittedBy: "Nadia Okonkwo",
    receivedAt: "3 days ago",
    status: "Pending",
    detail: "No duplicate suggestion was offered. Waiting for a reviewer.",
  },
  {
    id: "cand-1011",
    title: "Keyboard focus lost after closing the panel",
    channel: "Manual intake",
    submittedBy: "Hal Brenner",
    receivedAt: "4 days ago",
    status: "Approved",
    detail: "Approved by Priya Raman and posted to the notification channel.",
  },
  {
    id: "cand-1007",
    title: "Rate limit message shows no retry time",
    channel: "Discord",
    submittedBy: "Priya Raman",
    receivedAt: "4 days ago",
    status: "Rejected",
    detail: "The retry time is already returned in the response header.",
  },
];

export function QueueBoard() {
  const [open, setOpen] = useState(3);

  return (
    <div data-ui className="px-3">
      <div className="grid gap-1">
        {queue.map((row, index) => {
          const isOpen = index === open;
          return (
            <button
              key={row.id}
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(index)}
              className={cn(
                "flex w-full flex-col gap-2 rounded-md px-4 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                "sm:grid sm:grid-cols-[minmax(0,1fr)_8rem_9rem_6rem_7.5rem] sm:items-center sm:gap-4 sm:px-5",
                isOpen
                  ? "bg-accent text-accent-foreground"
                  : "bg-card text-card-foreground hover:bg-muted",
                isOpen ? "py-8" : "py-4",
              )}
            >
              <span className="min-w-0">
                <span
                  className={cn(
                    "block text-pretty",
                    isOpen
                      ? "text-xl font-medium tracking-tight sm:text-[28px] sm:leading-[1.15]"
                      : "text-lg font-medium tracking-tight sm:text-[22px]",
                  )}
                >
                  {row.title}
                </span>
              </span>

              <span className="hidden text-sm sm:block">{row.channel}</span>
              <span className="hidden truncate text-sm sm:block">
                {row.submittedBy}
              </span>
              <span className="hidden text-sm tabular-nums sm:block">
                {row.receivedAt}
              </span>
              <span
                className={cn(
                  "inline-flex w-fit items-center rounded-md px-3 py-1 text-sm font-medium",
                  statusStyles[row.status],
                )}
              >
                {row.status}
              </span>

              {isOpen ? (
                <span className="text-[17px] leading-6 sm:col-span-5">
                  {row.detail}
                  <span className="mt-2 block text-sm tabular-nums">
                    {row.id}
                  </span>
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
