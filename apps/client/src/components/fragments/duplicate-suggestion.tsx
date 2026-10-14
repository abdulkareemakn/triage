import { IconCopy } from "@tabler/icons-react";

import { SAMPLE_CANDIDATE } from "@/lib/sample-data";

/**
 * The duplicate suggestion as evidence: the matched candidate, the score, and
 * the text that actually matched. A reviewer confirms or dismisses it.
 */
export function DuplicateSuggestionFragment() {
  const { duplicate } = SAMPLE_CANDIDATE;

  return (
    <div
      data-ui
      className="w-full rounded-lg border border-border bg-card text-card-foreground"
    >
      <div className="px-4 py-3">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-small text-muted-foreground">
          <IconCopy aria-hidden="true" className="size-4 shrink-0" />
          <span>{duplicate.id}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">
            {duplicate.score.toFixed(2)} score
          </span>
        </p>
        <h3 className="mt-1 text-body leading-snug font-medium">
          {duplicate.title}
        </h3>
      </div>

      <div className="mx-4 mb-4 rounded-lg bg-accent p-3">
        <p className="text-small text-accent-foreground">Matched text</p>
        <blockquote className="mt-1 max-w-[48ch] text-small leading-relaxed text-accent-foreground">
          “{duplicate.matchedText}”
        </blockquote>
      </div>
    </div>
  );
}
