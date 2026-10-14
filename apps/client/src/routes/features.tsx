import { createFileRoute } from "@tanstack/react-router";
import { cn } from "cn";

import {
  CandidateFragment,
  DiscordFragment,
  DuplicateFragment,
  IntakeFragment,
  ReviewFragment,
  RolesFragment,
} from "@/components/site/fragments";
import { RolesList } from "@/components/site/roles-list";
import { buttonVariants } from "@/components/ui/button";
import { requestAccessUrl } from "@/lib/site";

export const Route = createFileRoute("/features")({
  component: Features,
});

const capabilities = [
  {
    title: "Typed intake",
    copy: "Reports start as plain text. A submitter writes what happened, and the workspace keeps every word exactly as written, with the time it landed. Nothing is summarised or rewritten before a human sees it.",
    Fragment: IntakeFragment,
  },
  {
    title: "Discord intake",
    copy: "Connect a Discord channel and every new message becomes intake. Reports that already live in a team's channel arrive without copy and paste, and earlier history stays in Discord.",
    Fragment: DiscordFragment,
  },
  {
    title: "Ticket candidates",
    copy: "A candidate gathers the report, its source and its status into one reviewable object. It waits in the shared workspace, visible to everyone who can review it, until a person acts.",
    Fragment: CandidateFragment,
  },
  {
    title: "Duplicate suggestions",
    copy: "Before a reviewer reads a new candidate, AI compares it with the workspace's existing candidates. Likely matches appear with the matched text and a score, so the evidence is visible. The reviewer confirms or dismisses each one.",
    Fragment: DuplicateFragment,
  },
  {
    title: "Human review",
    copy: "Reviewing is the job, not an afterthought. A reviewer reads the candidate, checks any duplicate evidence, and approves or rejects it. Triage records the decision with the reviewer's name and the time.",
    Fragment: ReviewFragment,
  },
  {
    title: "Roles and workspaces",
    copy: "One workspace holds the queue; roles hold the people. Submitters add intake and candidates, reviewers approve or reject, and admins manage invitations and roles. A person can belong to several workspaces and chooses the active one.",
    Fragment: RolesFragment,
  },
] as const;

const faqs = [
  {
    question: "Does the duplicate check replace the reviewer?",
    answer:
      "No. It reads the workspace and brings back likely matches. The evidence sits next to the candidate, and a person confirms or dismisses every suggestion.",
  },
  {
    question: "How does Discord intake work?",
    answer:
      "An admin connects a server and channel. From then on, every new message in that channel becomes intake in the workspace. Messages written before the connection stay in Discord.",
  },
  {
    question: "Can a reviewer also submit?",
    answer:
      "Roles are separate. A reviewer approves or rejects; a submitter adds intake and candidates. An admin holds both sets of actions and manages who holds which role.",
  },
  {
    question: "Where is the decision stored?",
    answer:
      "Inside Triage, with the reviewer and the time. Export to GitHub or Jira is later work; the decision itself is already recorded.",
  },
  {
    question: "What happens to a rejected candidate?",
    answer:
      "The reviewer records the decision either way. What the team does next is its own process; Triage keeps the record.",
  },
  {
    question: "Is the data on this site real?",
    answer:
      "No. Every report, candidate, name and score is sample content, marked as sample where it appears.",
  },
] as const;

function Features() {
  return (
    <>
      <section className="py-24 sm:py-28 md:py-32">
        <div className="triage-column" data-reveal>
          <h1 className="font-serif text-[clamp(2.5rem,4.4vw,4.25rem)] font-medium leading-[1.05] tracking-[-0.02em]">
            The full workspace
          </h1>
          <p className="mt-6 max-w-[44ch] text-[17px] leading-relaxed text-muted-foreground">
            Six capabilities around one queue, with a person at the centre of
            every decision.
          </p>
        </div>
      </section>

      <section className="pb-24 sm:pb-28 md:pb-32">
        <figure className="triage-column" data-reveal>
          <img
            alt="Sticky notes grouped on a whiteboard during a training session"
            className="found-photo w-full"
            decoding="async"
            height={682}
            loading="lazy"
            src="/assets/sticky-notes-on-a-whiteboard-at-a.jpg"
            width={1024}
          />
          <figcaption className="mt-3 text-sm text-muted-foreground">
            Sticky notes on a whiteboard
          </figcaption>
        </figure>
      </section>

      <section className="py-24 sm:py-28 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <div className="grid gap-20 sm:gap-24">
            {capabilities.map((capability, index) => (
              <div
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20"
                data-reveal
                key={capability.title}
              >
                <div className={cn(index % 2 === 1 && "lg:order-2")}>
                  <h2 className="text-[17px] font-medium leading-snug">
                    {capability.title}
                  </h2>
                  <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-muted-foreground">
                    {capability.copy}
                  </p>
                </div>
                <div className={cn(index % 2 === 1 && "lg:order-1")}>
                  <capability.Fragment className="w-full max-w-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24 sm:py-28 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <div className="triage-column" data-reveal>
            <h2 className="font-serif text-[2rem] font-medium tracking-tight">
              The review, close up
            </h2>
            <p className="mt-5 max-w-[44ch] text-base leading-relaxed text-muted-foreground">
              This is the reviewer's morning: one candidate, its evidence, and a
              decision. Everything on this page is sample content from a
              demonstration workspace.
            </p>
            <div className="mt-10">
              <ReviewFragment className="w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-28 md:py-32">
        <div className="triage-column" data-reveal>
          <h2 className="text-2xl font-medium tracking-tight">
            What each role does
          </h2>
          <RolesList className="mt-8" />
        </div>
      </section>

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

      <section className="px-5 pb-[20svh] pt-[30svh] sm:px-10">
        <div className="triage-column" data-reveal>
          <p className="text-xl leading-relaxed">
            Bring your next report here.
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
          </div>
        </div>
      </section>
    </>
  );
}
