import {
  IconCircleCheck,
  IconCircleX,
  IconHistory,
  IconUserCheck,
} from "@tabler/icons-react";

import { SAMPLE_DECISION_LOG } from "@/lib/sample-data";

/** The record of who decided what, and when. */
export function DecisionLogFragment() {
  return (
    <div
      data-ui
      className="w-full rounded-lg border border-border bg-card text-card-foreground"
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <p className="flex items-center gap-2 text-body font-medium">
          <IconHistory aria-hidden="true" className="size-4" />
          Decisions
        </p>
        <p className="text-small text-muted-foreground">This workspace</p>
      </div>

      <ul className="flex flex-col gap-2 px-3 pb-3">
        {SAMPLE_DECISION_LOG.map((entry) => {
          const Icon =
            entry.decision === "Approved" ? IconCircleCheck : IconCircleX;
          return (
            <li
              className="flex items-start gap-3 rounded-lg bg-secondary p-3"
              key={entry.id}
            >
              <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              <div className="min-w-0">
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-small text-muted-foreground">
                  <span className="tabular-nums">{entry.id}</span>
                  <span aria-hidden="true">·</span>
                  {entry.decision}
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{entry.time}</span>
                </p>
                <p className="mt-1 text-small leading-relaxed">{entry.title}</p>
                <p className="mt-1 flex items-center gap-1.5 text-small text-muted-foreground">
                  <IconUserCheck aria-hidden="true" className="size-4" />
                  {entry.reviewer}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
