import {
  IconBrandDiscord,
  IconClipboard,
  IconInbox,
} from "@tabler/icons-react";

import { SAMPLE_INTAKE_ROWS } from "@/lib/sample-data";

const sourceIcon = {
  Discord: IconBrandDiscord,
  Pasted: IconClipboard,
} as const;

/** The intake list: every report that arrived, with where it came from. */
export function IntakeListFragment() {
  return (
    <div
      data-ui
      className="w-full rounded-lg border border-border bg-card text-card-foreground"
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <p className="flex items-center gap-2 text-body font-medium">
          <IconInbox aria-hidden="true" className="size-4" />
          Intake
        </p>
        <p className="text-small text-muted-foreground">
          <span className="tabular-nums">{SAMPLE_INTAKE_ROWS.length}</span>{" "}
          today
        </p>
      </div>

      <ul className="flex flex-col gap-2 px-3 pb-3">
        {SAMPLE_INTAKE_ROWS.map((row, index) => {
          const SourceIcon = sourceIcon[row.source];
          return (
            <li
              className="flex items-start gap-3 rounded-lg bg-secondary p-3"
              key={row.id}
            >
              <SourceIcon
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0"
              />
              <div className="min-w-0">
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-small text-muted-foreground">
                  <span className="tabular-nums">{row.id}</span>
                  <span aria-hidden="true">·</span>
                  {row.channel}
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{row.time}</span>
                </p>
                <p className="mt-1 text-small leading-relaxed">{row.preview}</p>
              </div>
              {index === 0 ? (
                <p className="ml-auto shrink-0 rounded-lg bg-accent px-2 py-1 text-small text-accent-foreground">
                  Candidate made
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
