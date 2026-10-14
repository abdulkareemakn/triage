import {
  IconBrandDiscord,
  IconCircleCheck,
  IconUserCheck,
} from "@tabler/icons-react";

import { SAMPLE_NOTIFICATION } from "@/lib/sample-data";

/** A review decision posted back to Discord, in the notification channel. */
export function NotificationFragment() {
  const { candidateId, channel, decision, reviewer, title } =
    SAMPLE_NOTIFICATION;

  return (
    <div
      data-ui
      className="w-full rounded-lg border border-border bg-card text-card-foreground"
    >
      <div className="flex items-center gap-2 px-4 py-3">
        <IconBrandDiscord aria-hidden="true" className="size-4 shrink-0" />
        <p className="text-small text-muted-foreground">{channel}</p>
      </div>

      <div className="mx-3 mb-3 rounded-lg bg-secondary p-3">
        <p className="flex items-center gap-2 text-small font-medium">
          <IconCircleCheck aria-hidden="true" className="size-4 shrink-0" />
          {decision} {candidateId}
        </p>
        <p className="mt-1.5 text-small leading-relaxed">{title}</p>
        <p className="mt-2 flex items-center gap-1.5 text-small text-muted-foreground">
          <IconUserCheck aria-hidden="true" className="size-4" />
          {reviewer}
        </p>
      </div>
    </div>
  );
}
