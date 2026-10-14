import {
  IconArticle,
  IconBrandDiscord,
  IconClock,
  IconUsers,
} from "@tabler/icons-react";

import { SAMPLE_CANDIDATE, SAMPLE_WORKSPACE } from "@/lib/sample-data";

/** A ticket candidate: the report as it was written, beside the ticket it may become. */
export function CandidateCardFragment() {
  return (
    <div
      data-ui
      className="w-full rounded-lg border border-border bg-card text-card-foreground"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
        <p className="text-small text-muted-foreground">
          Candidate <span className="tabular-nums">{SAMPLE_CANDIDATE.id}</span>
        </p>
        <p className="rounded-lg bg-accent px-2 py-1 text-small text-accent-foreground">
          Awaiting review
        </p>
      </div>

      <div className="px-4 pb-4">
        <h3 className="text-body leading-snug font-medium">
          {SAMPLE_CANDIDATE.title}
        </h3>
        <p className="mt-2 max-w-[44ch] text-small leading-relaxed">
          {SAMPLE_CANDIDATE.body}
        </p>

        <dl className="mt-4 flex flex-col gap-2 text-small text-muted-foreground">
          <div className="flex items-center gap-2">
            <dt className="sr-only">Source</dt>
            <IconBrandDiscord aria-hidden="true" className="size-4" />
            <dd>Discord #bug-reports</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="sr-only">Reported by</dt>
            <IconUsers aria-hidden="true" className="size-4" />
            <dd>{SAMPLE_CANDIDATE.reporter}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="sr-only">Received</dt>
            <IconClock aria-hidden="true" className="size-4" />
            <dd>{SAMPLE_CANDIDATE.received}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="sr-only">Workspace</dt>
            <IconArticle aria-hidden="true" className="size-4" />
            <dd>{SAMPLE_WORKSPACE}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
