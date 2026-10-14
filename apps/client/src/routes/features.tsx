import { Link, createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

import {
  DecisionRecord,
  DiscordChannel,
  DiscordNotice,
  DuplicateSuggestion,
  IntakeRecord,
  sampleChannelMessages,
} from "@/components/product/fragments";
import {
  CandidateList,
  RolesPanel,
  WorkspaceSwitcher,
} from "@/components/product/workspace-fragments";
import { buttonVariants } from "@/components/ui/button";
import { pageGutter, pageWidth, sampleCandidates } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/features")({ component: Features });

type Capability = {
  name: string;
  statement: string;
  detail: string;
  fragment: ReactNode;
  /** Which half of the row the fragment sits in. Reversing it keeps the
      sequence from reading as a regular zigzag. */
  side: "left" | "right";
  key: string;
};

const capabilities: Capability[] = [
  {
    key: "intake",
    name: "Manual text intake",
    statement: "Paste a report. It is stored as it was written.",
    detail:
      "Anybody with the submitter role can add text by hand. The submission keeps its channel, its author and its arrival time, and nothing is rewritten before a reviewer reads it.",
    fragment: <IntakeRecord />,
    side: "right",
  },
  {
    key: "candidates",
    name: "Ticket candidates",
    statement: "A submission becomes a candidate, made by a person.",
    detail:
      "Creating a candidate is a deliberate act. Nothing enters the queue automatically, which is the difference between this and the places reports usually go to die.",
    fragment: <CandidateList />,
    side: "left",
  },
  {
    key: "review",
    name: "Human review",
    statement: "Approve or reject, and the decision is stored.",
    detail:
      "Approval is recorded inside Triage with the reviewer's name and the moment they made it. Sending the approved candidate on to GitHub or Jira is later work.",
    fragment: (
      <DecisionRecord
        decision="Approved"
        reviewer="Priya Raman"
        decidedAt="14:32"
        channel="#triage-review"
      />
    ),
    side: "right",
  },
  {
    key: "roles",
    name: "Submitter, reviewer, admin",
    statement: "Three roles, and no more.",
    detail:
      "Submitters add. Reviewers approve or reject. Admins do both and manage invitations. The split is small on purpose, because a queue nobody is accountable for is just a second inbox.",
    fragment: <RolesPanel />,
    side: "left",
  },
  {
    key: "workspaces",
    name: "Shared workspaces",
    statement: "One account, several workspaces, one active.",
    detail:
      "A person joins the workspaces they are invited to and picks the active one. Candidates, roles and duplicates are all scoped to that workspace.",
    fragment: <WorkspaceSwitcher />,
    side: "right",
  },
  {
    key: "discord-intake",
    name: "Discord intake",
    statement: "New messages in a channel become submissions.",
    detail:
      "Connect a channel and every new message after that connection is imported as an intake record. Earlier history stays where it is, and the message text is not rewritten on the way in.",
    fragment: <DiscordChannel messages={sampleChannelMessages} />,
    side: "left",
  },
  {
    key: "duplicates",
    name: "Duplicate suggestions",
    statement: "A likely match arrives with the text and the score.",
    detail:
      "Triage compares a new candidate with the candidates already in the same workspace and offers the closest one as evidence. A reviewer confirms or dismisses it; nothing is merged automatically.",
    fragment: (
      <DuplicateSuggestion score={0.82} candidate={sampleCandidates[0]} />
    ),
    side: "right",
  },
  {
    key: "discord-notify",
    name: "Discord review notifications",
    statement: "Decisions go back to a channel of their own.",
    detail:
      "A separate notification channel is configured from the one intake is taken from, so the team that sent the reports finds out what was decided without reading the workspace.",
    fragment: <DiscordNotice decision="Approved" />,
    side: "left",
  },
];

const notYet = [
  "Sending an approved candidate to GitHub or Jira",
  "AI extraction of fields, and candidates written by a machine",
  "Semantic search across the workspace",
  "Meeting, support, customer and Sentry source connectors",
  "Dashboards, filters, and review actions beyond approve and reject",
];

function Features() {
  return (
    <>
      <section
        className={cn(
          pageGutter,
          pageWidth,
          "pt-6 pb-16 sm:pt-10 lg:pt-20 lg:pb-28",
        )}
      >
        <h1 className="max-w-[16ch] text-[clamp(2.6rem,5.2vw,5rem)] leading-[1.02] font-medium tracking-[-0.035em] text-balance">
          What Triage does
        </h1>
        <p className="mt-6 max-w-[46ch] text-lg leading-7 text-pretty text-muted-foreground">
          Everything below is in the product, and every panel is drawn from it
          at true size. The records inside are sample content.
        </p>
      </section>

      <section
        aria-label="Capabilities"
        className={cn(pageGutter, pageWidth, "pb-24 lg:pb-40")}
      >
        <div className="grid gap-18 lg:gap-28">
          {capabilities.map((capability) => (
            <div
              key={capability.key}
              className="grid items-start gap-8 lg:grid-cols-12 lg:gap-6"
            >
              <div
                className={cn(
                  "lg:pt-2",
                  capability.side === "left"
                    ? "lg:col-start-9 lg:col-span-4"
                    : "lg:col-start-1 lg:col-span-5",
                )}
              >
                <h2 className="text-[clamp(1.5rem,2.2vw,2rem)] font-medium tracking-[-0.02em] text-balance">
                  {capability.name}
                </h2>
                <p className="mt-4 text-[clamp(1.1rem,1.5vw,1.3rem)] leading-[1.35] font-medium text-balance">
                  {capability.statement}
                </p>
                <p className="mt-4 max-w-[44ch] text-base leading-7 text-pretty text-muted-foreground">
                  {capability.detail}
                </p>
              </div>
              <div
                className={cn(
                  capability.side === "left"
                    ? "lg:col-start-1 lg:col-span-7"
                    : "lg:col-start-7 lg:col-span-6",
                )}
              >
                {capability.fragment}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="not-yet-title"
        className={cn(pageGutter, pageWidth, "pb-24 lg:pb-40")}
      >
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <h2
              id="not-yet-title"
              className="text-[clamp(1.5rem,2.2vw,2rem)] font-medium tracking-[-0.02em] text-balance"
            >
              Not built yet
            </h2>
            <p className="mt-4 max-w-[40ch] text-base leading-7 text-pretty text-muted-foreground">
              The line stops at the decision on purpose. These are the things
              the original proposal mentions and the October milestone does not
              include.
            </p>
          </div>
          <ul className="grid gap-4 lg:col-span-6 lg:col-start-7">
            {notYet.map((item) => (
              <li
                key={item}
                className="rounded-md bg-muted px-4 py-4 text-[17px] leading-6 text-pretty text-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="features-close"
        className={cn(pageGutter, pageWidth, "pb-24 lg:pb-40")}
      >
        <div className="max-w-[52ch]">
          <h2
            id="features-close"
            className="text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1] font-medium tracking-[-0.03em] text-balance"
          >
            Open a workspace and put one real report in it
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link to="/sign-up" className={cn(buttonVariants({ size: "xl" }))}>
              Start a workspace
            </Link>
            <Link
              to="/contact"
              className="inline-flex min-h-11 items-center text-base underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              Ask a question first
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
