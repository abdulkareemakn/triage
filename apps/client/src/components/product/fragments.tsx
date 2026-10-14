import {
  IconBell,
  IconCheck,
  IconClock,
  IconHash,
  IconMessageCircle,
  IconUsers,
  IconX,
} from "@tabler/icons-react";
import type { ReactNode } from "react";

import type { SampleCandidate } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * True-size pieces of Triage's own interface, built in HTML rather than
 * screenshotted. Each root carries `data-ui` so the product's own borders and
 * spacing are read as interface, not as page furniture.
 */

function Panel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      data-ui
      className={cn(
        "w-full rounded-lg border border-border bg-card text-card-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}

function PanelHead({ title, meta }: { title: string; meta: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 bg-muted px-4 py-3 rounded-t-lg">
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-muted-foreground tabular-nums">{meta}</p>
    </div>
  );
}

function MetaRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-baseline gap-3 text-sm">
      <span className="text-muted-foreground">{icon}</span>
      <span className="text-muted-foreground">{label}</span>
      <span className="ml-auto text-right">{value}</span>
    </div>
  );
}

const reportText =
  "Checkout keeps showing the old basket total after a promo code is removed. Three of us hit it this morning on Chrome and Safari.";

export function IntakeRecord({
  text = reportText,
  submittedBy = "Nadia Okonkwo",
  receivedAt = "09:41",
  channel = "Manual intake",
}: {
  text?: string;
  submittedBy?: string;
  receivedAt?: string;
  channel?: string;
}) {
  return (
    <Panel>
      <PanelHead title="Intake" meta={receivedAt} />
      <div className="px-4 py-4">
        <p className="text-[15px] leading-6 text-pretty">{text}</p>
        <dl className="mt-4 grid gap-2 text-sm">
          <MetaRow
            icon={<IconMessageCircle size={16} aria-hidden="true" />}
            label="Channel"
            value={channel}
          />
          <MetaRow
            icon={<IconUsers size={16} aria-hidden="true" />}
            label="Submitted by"
            value={submittedBy}
          />
          <MetaRow
            icon={<IconClock size={16} aria-hidden="true" />}
            label="Stored"
            value="as submitted"
          />
        </dl>
      </div>
    </Panel>
  );
}

export function DuplicateSuggestion({
  score,
  candidate,
  onConfirm,
  onDismiss,
}: {
  score: number;
  candidate: SampleCandidate;
  onConfirm?: () => void;
  onDismiss?: () => void;
}) {
  return (
    <div className="rounded-md border border-border bg-muted p-4">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-sm font-medium">Possible duplicate</p>
        <p className="text-sm tabular-nums">{score.toFixed(2)}</p>
      </div>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        “{candidate.title}. {candidate.body}”
      </p>
      <p className="mt-2 text-xs text-muted-foreground tabular-nums">
        {candidate.id} · {candidate.submittedBy} · {candidate.receivedAt}
      </p>
      {onConfirm || onDismiss ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {onConfirm ? (
            <button
              type="button"
              onClick={onConfirm}
              className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <IconCheck size={16} aria-hidden="true" />
              Confirm duplicate
            </button>
          ) : null}
          {onDismiss ? (
            <button
              type="button"
              onClick={onDismiss}
              className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <IconX size={16} aria-hidden="true" />
              Dismiss
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function DecisionRecord({
  decision,
  reviewer,
  decidedAt,
  channel,
}: {
  decision: "Approved" | "Rejected";
  reviewer: string;
  decidedAt: string;
  channel: string;
}) {
  const approved = decision === "Approved";
  return (
    <Panel>
      <PanelHead title="Decision" meta={decidedAt} />
      <div className="px-4 py-4">
        <p
          className={cn(
            "inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium",
            approved
              ? "bg-primary text-primary-foreground"
              : "bg-destructive/10 text-destructive",
          )}
        >
          {approved ? (
            <IconCheck size={16} aria-hidden="true" />
          ) : (
            <IconX size={16} aria-hidden="true" />
          )}
          {decision}
        </p>
        <p className="mt-3 text-sm">
          Decided by {reviewer} at {decidedAt}, and recorded against this
          candidate.
        </p>
        <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <IconHash size={16} aria-hidden="true" />
          Posted to {channel} in Discord
        </p>
      </div>
    </Panel>
  );
}

export type ChannelMessage = {
  author: string;
  time: string;
  text: string;
};

export function DiscordChannel({ messages }: { messages: ChannelMessage[] }) {
  return (
    <Panel>
      <PanelHead title="#incoming-reports" meta="Discord" />
      <ul className="grid gap-4 px-4 py-4">
        {messages.map((message) => (
          <li
            key={message.author}
            className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3"
          >
            <span
              aria-hidden="true"
              className="flex size-8 items-center justify-center rounded-lg bg-muted text-xs font-medium"
            >
              {message.author.slice(0, 1)}
            </span>
            <p className="text-sm leading-6">
              <span className="font-medium">{message.author}</span>{" "}
              <span className="text-muted-foreground tabular-nums">
                {message.time}
              </span>
              <br />
              {message.text}
            </p>
          </li>
        ))}
      </ul>
      <p className="rounded-b-lg bg-muted px-4 py-3 text-xs text-muted-foreground">
        Each new message becomes an intake record. Earlier history is not
        imported.
      </p>
    </Panel>
  );
}

export function DiscordNotice({ decision }: { decision: string }) {
  return (
    <Panel>
      <PanelHead title="#triage-review" meta="Discord" />
      <div className="px-4 py-4">
        <p className="flex items-center gap-2 text-sm font-medium">
          <IconBell size={16} aria-hidden="true" />
          Triage
        </p>
        <p className="mt-2 text-sm leading-6">
          {decision} by Priya Raman at 14:32. Candidate cand-1042 is now in the
          queue as approved.
        </p>
      </div>
    </Panel>
  );
}

export const sampleChannelMessages: ChannelMessage[] = [
  {
    author: "Nadia",
    time: "09:38",
    text: "Can we get the basket total to refresh when a promo code is removed? Seeing the old number until a hard reload.",
  },
  {
    author: "Tomás",
    time: "08:09",
    text: "Export to CSV is dropping the last row again whenever the filter returns more than about fifty rows.",
  },
];
