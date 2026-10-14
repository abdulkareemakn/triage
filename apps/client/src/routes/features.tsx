import { IconArrowNarrowRight } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

import { CandidateCardFragment } from "@/components/fragments/candidate-card";
import { DecisionLogFragment } from "@/components/fragments/decision-log";
import { DuplicateSuggestionFragment } from "@/components/fragments/duplicate-suggestion";
import { IntakeListFragment } from "@/components/fragments/intake-list";
import { NotificationFragment } from "@/components/fragments/notification";
import { ReviewQueueFragment } from "@/components/fragments/review-queue";
import { RoleListFragment } from "@/components/fragments/role-list";
import { Reveal } from "@/components/reveal";
import { buildRequestAccessMailto } from "@/lib/contact";

export const Route = createFileRoute("/features")({ component: FeaturesPage });

const capabilities = [
  {
    title: "Manual intake",
    body: "Paste a report, a forwarded email or a log excerpt into the workspace. The text is stored verbatim and stamped with who pasted it and when, so nothing is lost between the reporter and the reviewer.",
    fragment: <CandidateCardFragment />,
  },
  {
    title: "Discord intake",
    body: "Connect a channel and every new message in it is imported as intake automatically, with its author and the time it was posted. The bot watches the channel from the moment it is connected; earlier history is left where it is.",
    fragment: <IntakeListFragment />,
  },
  {
    title: "Ticket candidates",
    body: "Each report can be turned into a candidate: the original text, the source, the reporter, the workspace and a status. A candidate sits in the queue until a person decides, and nothing is sent outward from Triage at this stage.",
    fragment: <ReviewQueueFragment />,
  },
  {
    title: "Duplicate suggestions",
    body: "When a candidate is created, the candidates already in that workspace are compared with it. Each suggestion shows the candidate it matched, a score, and the text that actually matched, so the reviewer judges evidence rather than a label.",
    fragment: <DuplicateSuggestionFragment />,
  },
  {
    title: "Review and record",
    body: "A reviewer approves or rejects a candidate from the queue. The decision is recorded against the candidate with the reviewer's name and the time it happened, and it stays with the candidate afterwards.",
    fragment: <DecisionLogFragment />,
  },
  {
    title: "Review notifications",
    body: "Decisions can be posted to a Discord channel of their own, kept separate from the intake channel, so the people waiting for an answer hear it where they already are.",
    fragment: <NotificationFragment />,
  },
  {
    title: "Workspaces and roles",
    body: "One workspace per team. A submitter adds intake and candidates, a reviewer decides, and an admin does both plus invitations and roles. Everyone in a workspace sees the same queue.",
    fragment: <RoleListFragment />,
  },
];

export function FeaturesPage() {
  return (
    <>
      <section className="px-5 pt-10 pb-4 sm:px-8 lg:px-16 lg:pt-16 xl:px-20">
        <div className="mx-auto max-w-[92rem]">
          <h1 className="max-w-[18ch] font-serif text-display text-balance">
            Every step, at real size
          </h1>
          <p className="mt-6 max-w-[52ch] text-lead text-foreground text-pretty">
            Seven capabilities, each shown as the part of the product you would
            actually use, with sample workspace content inside every fragment.
          </p>
        </div>
      </section>

      <section className="mt-16 px-5 sm:px-8 lg:mt-24 lg:px-16 xl:px-20">
        <div className="mx-auto flex max-w-[92rem] flex-col gap-20 sm:gap-28">
          {capabilities.map((capability, index) => (
            <Reveal
              className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16"
              key={capability.title}
            >
              <div className={index % 2 === 1 ? "lg:order-last" : undefined}>
                <h2 className="font-serif text-head text-balance">
                  {capability.title}
                </h2>
                <p className="mt-4 max-w-[46ch] text-body text-muted-foreground text-pretty">
                  {capability.body}
                </p>
              </div>
              <div>{capability.fragment}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-20 px-5 sm:mt-28 sm:px-8 lg:px-16 xl:px-20">
        <div className="mx-auto flex max-w-[92rem] flex-col gap-6 rounded-lg bg-secondary p-8 sm:p-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-serif text-head text-balance">
              See it with your own reports
            </h2>
            <p className="mt-3 max-w-[48ch] text-body text-muted-foreground text-pretty">
              Tell us how reports reach your team and we will set up a workspace
              with your own intake.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a
              className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-primary px-5 text-lead text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              href={buildRequestAccessMailto()}
            >
              Request access
              <IconArrowNarrowRight aria-hidden="true" className="size-5" />
            </a>
            <Link
              className="inline-flex min-h-12 items-center rounded-lg text-body underline underline-offset-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              to="/contact"
            >
              Ask a question
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
