import {
  IconArrowNarrowRight,
  IconBrandDiscord,
  IconMinus,
  IconPlus,
} from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

import { CreditedPhoto } from "@/components/credited-photo";
import { CandidateCardFragment } from "@/components/fragments/candidate-card";
import { DecisionLogFragment } from "@/components/fragments/decision-log";
import { DuplicateSuggestionFragment } from "@/components/fragments/duplicate-suggestion";
import { IntakeListFragment } from "@/components/fragments/intake-list";
import { NotificationFragment } from "@/components/fragments/notification";
import { ReviewQueueFragment } from "@/components/fragments/review-queue";
import { RoleListFragment } from "@/components/fragments/role-list";
import { WorkspaceDialogFragment } from "@/components/fragments/workspace-dialog";
import { MaskedLines, Reveal } from "@/components/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { buildRequestAccessMailto } from "@/lib/contact";
import { MEDIA_CREDITS } from "@/lib/media-credits";
import { SAMPLE_ROLES } from "@/lib/sample-data";

export const Route = createFileRoute("/")({ component: LandingPage });

const [switchboardCredit, exchangeCredit, cardIndexCredit] = MEDIA_CREDITS;

const mailtoHref = buildRequestAccessMailto();

const primaryButtonClass = buttonVariants({
  className:
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
  size: "xl",
});

const stages = [
  {
    runIn: "A report lands.",
    body: "Someone pastes it in, or it arrives as the next message in a Discord channel you connected. Either way it reaches the same intake list, with its source and the time it arrived.",
    evidence: <IntakeListFragment />,
  },
  {
    runIn: "Triage writes the candidate.",
    body: "The text is kept exactly as it was written. Beside it a candidate is created, carrying the source, the reporter and the workspace it belongs to. Nothing is sent anywhere yet.",
    evidence: <CandidateCardFragment />,
  },
  {
    runIn: "You are shown what looks like a duplicate.",
    body: "Existing candidates in the same workspace are compared with the new one. Likely matches appear with the text they matched and a score, so you can judge the evidence yourself.",
    evidence: <DuplicateSuggestionFragment />,
  },
  {
    runIn: "You decide, and it is recorded.",
    body: "Approve or reject. The decision, your name and the time are stored inside Triage, and a reviewer can post it to a Discord channel of its own.",
    evidence: <DecisionLogFragment />,
  },
];

const capabilities = [
  {
    title: "Discord intake",
    body: "Connect a channel and every new message is imported as intake, with its author and the time it was posted. History from before the connection stays where it is.",
    fragment: <IntakeListFragment />,
  },
  {
    title: "Manual text intake",
    body: "Paste a report, a forwarded email or a log excerpt. The text is stored verbatim, so the reviewer reads what the reporter actually wrote.",
    fragment: <CandidateCardFragment />,
  },
  {
    title: "Duplicate suggestions",
    body: "A new candidate is compared with the ones already in the workspace. Each suggestion shows the candidate it matched, the score, and the matched text as evidence.",
    fragment: <DuplicateSuggestionFragment />,
  },
  {
    title: "Review and record",
    body: "Approve or reject from the queue. The decision is recorded against the candidate with the reviewer and the time, so the history stays inside Triage.",
    fragment: <DecisionLogFragment />,
  },
  {
    title: "Review notifications",
    body: "Post decisions to a Discord channel you choose, separately from the intake channel, so the people waiting hear the outcome where they already are.",
    fragment: <NotificationFragment />,
  },
  {
    title: "Workspaces and roles",
    body: "One workspace per team, with submitter, reviewer and admin roles. An admin decides who joins and what they may do.",
    fragment: <RoleListFragment />,
  },
];

const questions = [
  {
    question: "Do we need a Discord server to start?",
    answer:
      "No. Reports can be pasted in by hand from the first day, and a channel can be connected whenever the team is ready. Nothing in the review queue depends on it.",
  },
  {
    question: "What exactly is a ticket candidate?",
    answer:
      "The report as it arrived, plus the fields a reviewer needs, held in Triage until someone decides. It is not a ticket anywhere else yet, and nothing is sent outward by Triage at this stage.",
  },
  {
    question: "How are duplicate suggestions found?",
    answer:
      "A new candidate is compared with the existing candidates in the same workspace. Each suggestion shows the candidate it matched, a score, and the text that matched, so the reviewer judges the evidence rather than a label.",
  },
  {
    question: "Who can approve a candidate?",
    answer:
      "Anyone holding the reviewer role in that workspace. The approval is stored with the reviewer's name and the time it happened.",
  },
  {
    question: "Can a submitter approve their own report?",
    answer:
      "No. Submitters add intake and candidates and follow their status. Approving and rejecting belong to the reviewer role, which keeps the person who wrote the report out of the decision.",
  },
  {
    question: "What happens to the messages we import from Discord?",
    answer:
      "Every new message in the connected channel is imported as intake. Earlier history is not imported, so a channel can be connected part-way through a project without pulling in the past.",
  },
  {
    question: "Where are decisions announced?",
    answer:
      "In a Discord channel you choose, kept separate from the intake channel, so the reports arriving and the decisions leaving are never mixed together.",
  },
];

function SectionHeading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2 className={`font-serif text-head text-balance ${className}`}>
      {children}
    </h2>
  );
}

function Faq() {
  const [open, setOpen] = useState<string[]>([]);

  return (
    <div className="mx-auto grid max-w-[92rem] gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
      <h2 className="font-serif text-head text-balance lg:sticky lg:top-10 lg:self-start">
        Questions teams ask
      </h2>

      <div className="flex flex-col gap-2">
        <Accordion onValueChange={setOpen} value={open}>
          {questions.map((entry) => {
            const expanded = open.includes(entry.question);
            return (
              <AccordionItem
                key={entry.question}
                value={entry.question}
                variant="tile"
              >
                <AccordionTrigger
                  className="**:data-[slot=accordion-trigger-icon]:hidden"
                  icon={
                    expanded ? (
                      <IconMinus
                        aria-hidden="true"
                        className="size-4 shrink-0"
                      />
                    ) : (
                      <IconPlus
                        aria-hidden="true"
                        className="size-4 shrink-0"
                      />
                    )
                  }
                >
                  {entry.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="max-w-[56ch] pb-1 text-primary-foreground/90 text-pretty">
                    {entry.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}

export function LandingPage() {
  return (
    <>
      <section className="px-5 pt-10 pb-4 sm:px-8 lg:px-16 lg:pt-16 xl:px-20">
        <div className="mx-auto grid max-w-[92rem] gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-16">
          <div className="lg:pt-10">
            <h1 className="font-serif text-display text-balance">
              <MaskedLines lines={["Every report,", "reviewed."]} />
            </h1>
            <p className="mt-6 max-w-[38ch] text-lead text-foreground text-pretty">
              Reports arrive from Discord or by hand. Triage turns each one into
              a ticket candidate and waits for a person to decide.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
              <a
                className={`inline-flex items-center gap-2 rounded-lg ${primaryButtonClass}`}
                href={mailtoHref}
              >
                Request access
                <IconArrowNarrowRight aria-hidden="true" className="size-5" />
              </a>
              <Link
                className="inline-flex min-h-12 items-center gap-2 rounded-lg text-body underline underline-offset-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                hash="how-it-works"
                to="/"
              >
                See how it works
              </Link>
            </div>
            <p className="mt-8 flex items-center gap-2 text-small text-muted-foreground">
              <IconBrandDiscord aria-hidden="true" className="size-4" />
              Discord intake and review notifications are built in.
            </p>
          </div>

          <Reveal className="lg:pt-4">
            <ReviewQueueFragment />
          </Reveal>
        </div>
      </section>

      <section className="mt-20 sm:mt-28">
        <CreditedPhoto
          alt="A marine field telephone operator at a jack field, plugging a cord into the switchboard, circa 1942"
          className="px-5 sm:px-8 lg:px-16 xl:px-20"
          credit={switchboardCredit}
          eager
          height={800}
          imageClassName="drift mx-auto h-[38svh] w-full max-w-[92rem] rounded-lg object-cover"
          src="/media/switchboard-operator-1942.jpg"
          width={1920}
        />
        <div className="px-5 pt-6 sm:px-8 lg:px-16 xl:px-20">
          <p className="mx-auto max-w-[46rem] text-lead text-foreground text-pretty">
            Before software, one person held every incoming message and decided
            where it went. That is the whole job, and Triage is the desk it
            happens at.
          </p>
        </div>
      </section>

      <section
        className="mt-24 scroll-mt-6 px-5 sm:mt-32 sm:px-8 lg:px-16 xl:px-20"
        id="how-it-works"
      >
        <div className="mx-auto max-w-[92rem] lg:pl-[26%]">
          <div className="max-w-[38rem]">
            <SectionHeading>How a report becomes a ticket</SectionHeading>

            <div className="mt-12 flex flex-col gap-14 sm:mt-14">
              {stages.map((stage) => (
                <Reveal key={stage.runIn}>
                  <p className="max-w-[54ch] text-body text-muted-foreground text-pretty">
                    <span className="font-medium text-foreground">
                      {stage.runIn}
                    </span>{" "}
                    {stage.body}
                  </p>
                  <div className="mt-6">{stage.evidence}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-24 px-5 sm:mt-32 sm:px-8 lg:px-16 xl:px-20">
        <div className="mx-auto max-w-[92rem]">
          <SectionHeading>What it does</SectionHeading>

          <div className="mt-10 grid gap-3 sm:gap-4 lg:grid-cols-3">
            {capabilities.map((capability, index) => (
              <Reveal
                className="flex min-h-[26rem] flex-col justify-between gap-6 rounded-lg bg-secondary p-5 sm:p-6"
                key={capability.title}
              >
                <div>
                  <h3 className="text-body leading-snug font-medium">
                    {capability.title}
                  </h3>
                  <p className="mt-2 max-w-[34ch] text-small leading-relaxed text-muted-foreground">
                    {capability.body}
                  </p>
                </div>
                <div
                  className={
                    index === 1 || index === 3 || index === 5
                      ? "w-full lg:order-first"
                      : "w-full"
                  }
                >
                  {capability.fragment}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-24 px-5 sm:mt-32 sm:px-8 lg:px-16 xl:px-20">
        <div className="mx-auto grid max-w-[92rem] gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <SectionHeading>Who can do what</SectionHeading>
            <p className="mt-4 max-w-[46ch] text-lead text-foreground text-pretty">
              Three roles in a shared workspace, each with the actions it may
              take and nothing else.
            </p>

            <ul className="mt-10 flex flex-col gap-8">
              {SAMPLE_ROLES.map((entry) => (
                <li className="max-w-[42rem]" key={entry.role}>
                  <h3 className="font-serif text-lead font-semibold">
                    {entry.role}
                  </h3>
                  <p className="mt-1.5 max-w-[48ch] text-body text-muted-foreground text-pretty">
                    {entry.summary}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-8">
            <CreditedPhoto
              alt="A 1940s telephone exchange: a wooden cabinet of labelled keys for night extension, hold and ring"
              className="w-full"
              credit={exchangeCredit}
              height={1050}
              imageClassName="h-auto w-full rounded-lg object-cover"
              src="/media/telephone-exchange-1940s.jpg"
              width={1400}
            />
            <CreditedPhoto
              alt="A library card index: rows of wooden drawers with brass labels, one left open"
              className="w-full"
              credit={cardIndexCredit}
              height={900}
              imageClassName="h-auto w-full rounded-lg object-cover"
              src="/media/card-index-drawers.jpg"
              width={1200}
            />
          </div>
        </div>
      </section>

      <section className="mt-24 px-5 sm:mt-32 sm:px-8 lg:px-16 xl:px-20">
        <Faq />
      </section>

      <section className="mt-24 sm:mt-32">
        <div className="bg-primary px-5 py-20 text-primary-foreground sm:px-8 lg:px-16 lg:py-28 xl:px-20">
          <div className="mx-auto grid max-w-[92rem] gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-end lg:gap-16">
            <div>
              <h2 className="font-serif text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.03em] text-balance">
                Start with one channel
              </h2>
              <p className="mt-6 max-w-[38ch] text-lead text-primary-foreground/90 text-pretty">
                Name a workspace, choose the role you would join with, and the
                request email is written for you. There is no form on this page
                and nothing is stored.
              </p>
            </div>

            <Reveal className="lg:justify-self-end">
              <WorkspaceDialogFragment />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
