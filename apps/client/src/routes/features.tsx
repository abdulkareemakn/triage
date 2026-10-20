import {
  IconBrandDiscord,
  IconChecks,
  IconGitMerge,
  IconUsers,
} from "@tabler/icons-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { type ReactNode } from "react";

import {
  CandidateFragment,
  DecisionFragment,
  IntakeFragment,
  QueueFragment,
} from "@/components/marketing/fragments";
import { Reveal, useRevealOnScroll } from "@/components/marketing/motion";
import { buttonVariants } from "@/components/ui/button";

export const Route = createFileRoute("/features")({ component: Features });

type Row = {
  title: string;
  text: string;
  fragment: ReactNode;
};

const rows: Row[] = [
  {
    title: "Manual text intake",
    text: "Paste or type the report exactly as it arrived. Triage keeps the submitted text untouched as the record everything else is built from.",
    fragment: <IntakeFragment />,
  },
  {
    title: "Ticket candidates",
    text: "From the submitted text, a person drafts a candidate with a title and an area. A candidate is a proposal, not a ticket. It earns the move.",
    fragment: <CandidateFragment showDuplicate={false} />,
  },
  {
    title: "Human review",
    text: "A reviewer approves or rejects each candidate. The decision is recorded inside Triage with the reviewer and the time it was made.",
    fragment: <DecisionFragment />,
  },
  {
    title: "The review queue",
    text: "One list per workspace, with the duplicate evidence attached where it exists. Reviewers work through it in the order they choose.",
    fragment: <QueueFragment />,
  },
];

const integrations = [
  {
    icon: <IconUsers size={20} stroke={2} aria-hidden="true" />,
    title: "Shared workspaces and roles",
    text: "One account can belong to several workspaces and chooses which is active. An admin invites people with a link or a code, and manages roles.",
  },
  {
    icon: <IconBrandDiscord size={20} stroke={2} aria-hidden="true" />,
    title: "Discord intake",
    text: "Connect a channel and every new message is imported after connecting. Earlier history stays outside the workspace; a bot running in the background is enough.",
  },
  {
    icon: <IconGitMerge size={20} stroke={2} aria-hidden="true" />,
    title: "AI duplicate suggestions",
    text: "New candidates are compared with existing ones in the same workspace using embeddings. Likely matches appear with the matched text and a score, and a reviewer confirms or dismisses each one.",
  },
  {
    icon: <IconChecks size={20} stroke={2} aria-hidden="true" />,
    title: "Discord review notifications",
    text: "Every review decision is posted to a channel your team already reads, so the outcome travels back to where the report came from.",
  },
] as const;

const staggerBuckets = [undefined, 80, 160, 240] as const;

const roleRows = [
  {
    role: "Submitter",
    permissions: "Add intake and candidates; view their status.",
  },
  {
    role: "Reviewer",
    permissions: "View workspace submissions; approve or reject candidates.",
  },
  {
    role: "Admin",
    permissions: "Both sets of actions; manage invitations and roles.",
  },
];

function Features() {
  useRevealOnScroll();

  return (
    <>
      <section className="px-5 pt-16 pb-10 sm:px-8 md:pt-24">
        <div className="mx-auto max-w-6xl">
          <h1 className="max-w-2xl text-[clamp(2rem,5vw,3rem)] leading-[1.1] font-semibold tracking-tight">
            What Triage does
          </h1>
          <p className="mt-6 max-w-xl text-base leading-6 text-muted-foreground sm:text-lg">
            The whole loop: a report arrives, a person drafts a candidate from
            it, another person decides whether it becomes work. Everything below
            is that loop, piece by piece.
          </p>
        </div>
      </section>

      {/* The loop, as rows: statement and the working fragment. */}
      <section aria-label="The triage loop" className="px-5 pb-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          {rows.map((row, index) => (
            <section
              key={row.title}
              aria-label={row.title}
              className="grid items-center gap-8 py-12 md:grid-cols-12 md:gap-12 md:py-16"
            >
              <Reveal
                delay={index % 2 === 0 ? undefined : 60}
                className="md:col-span-5"
              >
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  {row.title}
                </h2>
                <p className="mt-3 max-w-md text-base leading-6 text-muted-foreground">
                  {row.text}
                </p>
              </Reveal>
              <Reveal
                delay={index % 2 === 0 ? 90 : 30}
                className="md:col-span-7"
              >
                {/* Fragments vary in size so the column never becomes a
                    zigzag of equal blocks. */}
                <div
                  className={index % 2 === 0 ? "max-w-lg" : "ml-auto max-w-xl"}
                >
                  {row.fragment}
                </div>
              </Reveal>
            </section>
          ))}
        </div>
      </section>

      {/* Integrations: four statements, no cards. */}
      <section
        aria-labelledby="integrations-heading"
        className="bg-secondary px-5 py-20 sm:px-8 md:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2
              id="integrations-heading"
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              Around the loop
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {integrations.map((item, index) => (
              <Reveal key={item.title} delay={staggerBuckets[index]}>
                <div>
                  <h3 className="flex items-center gap-2.5 text-base font-semibold tracking-tight">
                    {item.icon}
                    {item.title}
                  </h3>
                  <p className="mt-2.5 max-w-md text-sm leading-6 text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Roles: a real table keeps its lines. */}
      <section
        aria-labelledby="roles-heading"
        className="px-5 py-20 sm:px-8 md:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2
              id="roles-heading"
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              Three roles, one contract
            </h2>
            <p className="mt-3 max-w-xl text-base leading-6 text-muted-foreground">
              The first version of Triage keeps permissions to three roles per
              workspace. This is the contract it ships with.
            </p>
          </Reveal>
          <Reveal delay={90}>
            <table className="mt-8 w-full max-w-3xl border-collapse text-left text-sm">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3 pr-6 font-semibold text-foreground"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="py-3 font-semibold text-foreground"
                  >
                    Permissions
                  </th>
                </tr>
              </thead>
              <tbody>
                {roleRows.map((row) => (
                  <tr key={row.role} className="role-row">
                    <th
                      scope="row"
                      className="py-3.5 pr-6 align-top font-medium text-foreground"
                    >
                      {row.role}
                    </th>
                    <td className="py-3.5 align-top text-muted-foreground">
                      {row.permissions}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      {/* Archival band: the world around the subject. */}
      <section className="px-5 pb-20 sm:px-8">
        <figure className="mx-auto max-w-6xl">
          <img
            src="/photos/mail-receiving-sorting-room.webp"
            alt="a large mail receiving room with sorting racks, carts and a clerk sorting letters at a table"
            width="1024"
            height="821"
            loading="lazy"
            decoding="async"
            className="aspect-[21/9] w-full rounded-md object-cover"
          />
          <figcaption className="mt-3 text-xs leading-5 text-muted-foreground">
            Mail receiving sorting room, U.S. Library of Congress, CC0, via
            rawpixel. An archival photograph of the world around the subject,
            not of Triage.
          </figcaption>
        </figure>
      </section>

      {/* Close. */}
      <section
        aria-labelledby="features-cta-heading"
        className="bg-accent px-5 py-20 text-accent-foreground sm:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2
              id="features-cta-heading"
              className="text-[clamp(2.25rem,5vw,3.5rem)] leading-[0.95] font-semibold tracking-tight"
            >
              Put the next report
              <br />
              through.
            </h2>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link to="/sign-up" className={buttonVariants()}>
                Create a workspace
              </Link>
              <Link
                to="/contact"
                className="text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
              >
                Ask us about it
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
