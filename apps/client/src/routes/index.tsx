import { Link, createFileRoute } from "@tanstack/react-router";
import { cn } from "cn";
import type { CSSProperties, ReactNode } from "react";

import {
  CandidateFragment,
  DiscordFragment,
  DuplicateFragment,
  IntakeFragment,
  ReviewFragment,
  RolesFragment,
} from "@/components/site/fragments";
import { IntakeInstrument } from "@/components/site/instrument";
import { RolesList } from "@/components/site/roles-list";
import { buttonVariants } from "@/components/ui/button";
import { requestAccessUrl } from "@/lib/site";

export const Route = createFileRoute("/")({ component: Landing });

const heroSentence =
  "Triage turns incoming reports into reviewable ticket candidates, and a person reviews every one before anything is filed.";

const intro = [
  "Triage is a calm workspace for small and medium software teams. Reports arrive in one place, and a person turns each one into a reviewable candidate.",
  "Intake is typed directly into the workspace or imported from a connected Discord channel. Every new message becomes intake. Earlier history stays where it is.",
  "Candidates wait in a shared workspace with three roles. A reviewer reads each one, approves or rejects it, and Triage records the decision with its reviewer and time.",
  "Nothing is filed until a person has looked. AI only suggests possible duplicates, as evidence, and the reviewer decides.",
] as const;

const slipStages = [
  {
    heading: "On arrival",
    rows: [
      { text: "A report lands in the workspace", value: "seconds" },
      { text: "Text is kept as it was written", value: "as sent" },
    ],
  },
  {
    heading: "In the queue",
    rows: [
      { text: "A person creates the candidate", value: "one pass" },
      { text: "Likely duplicates surface", value: "with a score" },
    ],
  },
  {
    heading: "At the review",
    rows: [
      { text: "A reviewer reads the candidate", value: "one read" },
      { text: "The decision is recorded", value: "name and time" },
    ],
  },
] as const;

interface Cell {
  title: string;
  copy: string;
  Fragment: (props: { className?: string }) => ReactNode;
  place: "bottom" | "top";
  edge: "left" | "right";
}

const cells: Cell[] = [
  {
    title: "Typed intake",
    copy: "Write a report straight into the workspace. The text is kept as it was written, with its length and the time it landed.",
    Fragment: IntakeFragment,
    place: "bottom",
    edge: "left",
  },
  {
    title: "Discord intake",
    copy: "Connect a channel and every new message becomes intake. Earlier history stays in Discord, where it already lives.",
    Fragment: DiscordFragment,
    place: "top",
    edge: "right",
  },
  {
    title: "Ticket candidates",
    copy: "A candidate holds the report, its source and its status. It waits in one place for the person who reviews it.",
    Fragment: CandidateFragment,
    place: "bottom",
    edge: "left",
  },
  {
    title: "Duplicate suggestions",
    copy: "AI compares each candidate with the workspace's other candidates and shows likely matches, with the matched text and a score as evidence.",
    Fragment: DuplicateFragment,
    place: "top",
    edge: "right",
  },
  {
    title: "Human review",
    copy: "A reviewer approves or rejects each candidate. The decision is recorded inside Triage with its reviewer and time.",
    Fragment: ReviewFragment,
    place: "bottom",
    edge: "left",
  },
  {
    title: "Roles and workspaces",
    copy: "Shared workspaces with submitter, reviewer and admin roles. An admin invites people by link or code and manages what each role can do.",
    Fragment: RolesFragment,
    place: "top",
    edge: "right",
  },
];

const faqs = [
  {
    question: "Does Triage file tickets automatically?",
    answer:
      "No. A person turns intake into a candidate, and a reviewer approves or rejects it. Nothing reaches an issue tracker until a person has decided.",
  },
  {
    question: "What does the AI do?",
    answer:
      "It compares a new candidate with the workspace's existing candidates and shows likely duplicates, with the matched text and a score as evidence. The reviewer confirms or dismisses each one. The AI never creates candidates.",
  },
  {
    question: "Where do reports come from?",
    answer:
      "From typed intake or a connected Discord channel. Every new message in the channel becomes intake. Earlier history stays in Discord.",
  },
  {
    question: "What happens after approval?",
    answer:
      "The decision is recorded in Triage with its reviewer and time. Sending the issue to GitHub or Jira is planned for a later phase.",
  },
  {
    question: "Who can see a workspace?",
    answer:
      "Only the people an admin invites. Every member has a role: submitter, reviewer or admin. Admins manage invitations by link or code.",
  },
  {
    question: "Can one person use several workspaces?",
    answer:
      "Yes. A signed-in person may belong to multiple shared workspaces and chooses the active one.",
  },
  {
    question: "Is Triage for large teams?",
    answer:
      "It is built for small and medium software teams. The review stays human at every size, but the workspace is one shared place, not a fleet of tools.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Triage is in demonstration ahead of launch. Request access and we will reply with the current terms.",
  },
] as const;

function Landing() {
  return (
    <>
      {/* Hero: a deep neutral ground split by tone alone. The left
          half carries the words; the right half carries the intake
          instrument, the product's own control, live. */}
      <section
        className="grid bg-[var(--dark-background)] text-[var(--dark-foreground)] md:grid-cols-2"
        data-hero-ground
      >
        <div className="order-2 flex min-h-[58svh] flex-col justify-end px-5 pb-14 pt-12 sm:px-10 md:order-1 md:min-h-svh md:pb-20 md:pt-0">
          <h1 className="lines font-serif text-[clamp(1.625rem,2.1vw,2rem)] font-medium leading-[1.15] tracking-[-0.01em]">
            <span className="line">
              <span data-line style={{ "--i": 0 } as CSSProperties}>
                Reports in.
              </span>
            </span>
            <span className="line">
              <span data-line style={{ "--i": 1 } as CSSProperties}>
                Decisions out.
              </span>
            </span>
          </h1>
          <p
            data-rise
            style={{ "--i": 2 } as CSSProperties}
            className="mt-5 max-w-[44ch] text-[17px] leading-relaxed text-[var(--dark-muted-foreground)]"
          >
            {heroSentence}
          </p>
          <div
            data-rise
            style={{ "--i": 3 } as CSSProperties}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <a
              className={buttonVariants({
                className: "triage-press h-10 px-5",
                size: "lg",
              })}
              href={requestAccessUrl()}
            >
              Request access
            </a>
            <Link
              className="triage-press py-2 text-sm underline-offset-4 hover:underline"
              to="/sign-up"
            >
              Create an account
            </Link>
          </div>
        </div>
        <div className="order-1 flex min-h-[58svh] items-center justify-center bg-[var(--dark-muted)] px-5 py-12 sm:px-10 md:order-2 md:min-h-svh md:py-0">
          <div className="w-full max-w-[28rem]">
            <IntakeInstrument />
          </div>
        </div>
      </section>

      {/* Intro: a narrow reading column on untouched ground. */}
      <section className="py-24 sm:py-28 md:py-32">
        <div className="triage-column--narrow" data-reveal>
          <p className="font-medium text-foreground">{intro[0]}</p>
          {intro.slice(1, 3).map((paragraph) => (
            <p key={paragraph} className="mt-5 text-muted-foreground">
              {paragraph}
            </p>
          ))}
          <p className="mt-5 text-muted-foreground">
            {intro[3]}{" "}
            <Link
              className="triage-press font-medium text-foreground underline-offset-4 hover:underline"
              to="/features"
            >
              See the features
            </Link>
          </p>
        </div>
      </section>

      {/* The world around the product: reports sorted by hand. */}
      <section className="pb-24 sm:pb-28 md:pb-32">
        <figure className="triage-column" data-reveal>
          <img
            alt="Sticky notes sorted into groups on a wall at a strategy salon"
            className="found-photo w-full"
            decoding="async"
            height={3024}
            loading="lazy"
            src="/assets/sticky-notes-at-hong-kong-strategy-salon.jpg"
            width={4032}
          />
          <figcaption className="mt-3 text-sm text-muted-foreground">
            Sticky notes at a strategy salon
          </figcaption>
        </figure>
      </section>

      {/* How it works: the itinerary printed on a slip. */}
      <section className="bg-secondary py-24 sm:py-28 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5" data-reveal>
              <h2 className="font-serif text-[clamp(2.5rem,4.4vw,4.25rem)] font-medium leading-[1.05] tracking-[-0.02em]">
                From report to review
              </h2>
              <p className="mt-6 max-w-[30ch] text-base leading-relaxed text-muted-foreground">
                Every report takes the same short path. No step is hidden, and
                nothing is filed alone.
              </p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7" data-reveal>
              <div className="slip-edge bg-card p-8 sm:p-10">
                <ol>
                  {slipStages.map((stage, stageIndex) => (
                    <li key={stage.heading}>
                      <h3
                        className={cn(
                          "text-base font-semibold",
                          stageIndex > 0 && "mt-7",
                        )}
                      >
                        {stage.heading}
                      </h3>
                      <ul className="mt-4 space-y-3">
                        {stage.rows.map((row) => (
                          <li
                            className="flex items-baseline gap-3"
                            key={row.text}
                          >
                            <span className="text-base">{row.text}</span>
                            <span
                              aria-hidden="true"
                              className="flex-1 border-b-2 border-dotted border-border"
                            />
                            <span className="text-base tabular-nums">
                              {row.value}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>
                <div className="mt-8 flex h-11 items-center justify-between gap-3 bg-primary px-4 text-primary-foreground">
                  <span className="text-sm font-medium">
                    A decision with its reviewer and time
                  </span>
                  <span className="text-sm tabular-nums">minutes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features: staggered fragment cells in a checkerboard. */}
      <section className="py-24 sm:py-28 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <h2 className="text-[2rem] font-medium tracking-tight" data-reveal>
            What the workspace does
          </h2>
          <div className="mt-14 grid gap-1.5 lg:grid-cols-3 lg:gap-2">
            {cells.map((cell) => (
              <article
                className="flex flex-col overflow-hidden rounded-lg bg-secondary p-6 lg:h-[27.5rem]"
                data-reveal
                key={cell.title}
              >
                {cell.place === "top" && (
                  <div className="-mx-6 -mt-6 order-2 px-6 pt-6 lg:order-1">
                    <cell.Fragment
                      className={cn(
                        "w-full",
                        cell.edge === "left" ? "max-lg:-ml-6" : "max-lg:-mr-6",
                      )}
                    />
                  </div>
                )}
                <div
                  className={cn(
                    cell.place === "top"
                      ? "order-1 pt-6 lg:order-2"
                      : "order-1 flex-1 lg:order-1",
                  )}
                >
                  <h3 className="text-[17px] font-medium leading-snug">
                    {cell.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                    {cell.copy}
                  </p>
                </div>
                {cell.place === "bottom" && (
                  <div className="-mx-6 -mb-6 mt-6 order-2 px-6 pb-6 lg:order-2">
                    <cell.Fragment
                      className={cn(
                        "w-full",
                        cell.edge === "left" ? "max-lg:-ml-6" : "max-lg:-mr-6",
                      )}
                    />
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Roles: two-ended rows in one narrow column. */}
      <section className="py-24 sm:py-28 md:py-32">
        <div className="triage-column" data-reveal>
          <h2 className="text-2xl font-medium tracking-tight">Who does what</h2>
          <RolesList className="mt-8" />
        </div>
      </section>

      {/* FAQ: answers set as continuous reading text. */}
      <section className="py-24 sm:py-28 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <div className="grid gap-10 lg:grid-cols-12">
            <h2
              className="text-[1.75rem] font-medium tracking-tight lg:col-span-3"
              data-reveal
            >
              Good questions
            </h2>
            <div className="lg:col-span-9" data-reveal>
              <div className="[columns:1] gap-14 text-base leading-relaxed lg:[columns:2] lg:max-w-[42rem]">
                {faqs.map((faq) => (
                  <p className="mb-5 [break-inside:avoid]" key={faq.question}>
                    <span className="font-medium text-foreground">
                      {faq.question}
                    </span>{" "}
                    <span>{faq.answer}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA: a plain sentence and one action on empty ground. */}
      <section className="px-5 pb-[20svh] pt-[30svh] sm:px-10">
        <div className="triage-column" data-reveal>
          <p className="text-xl leading-relaxed">
            Tell us where to send the invite.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              className={buttonVariants({
                className: "triage-press h-10 px-5",
              })}
              href={requestAccessUrl()}
            >
              Request access
            </a>
            <Link
              className="triage-press py-2 text-sm underline-offset-4 hover:underline"
              to="/sign-up"
            >
              Create an account
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
