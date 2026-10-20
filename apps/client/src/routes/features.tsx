import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

import { buttonVariants } from "@/components/ui/button";

export const Route = createFileRoute("/features")({ component: Features });

const groups = [
  {
    title: "Intake",
    items: [
      "Manual text intake: someone types or pastes a report.",
      "Discord intake: new messages from a selected channel after connection.",
      "Report stays linked to its source so later stages keep context.",
    ],
  },
  {
    title: "Candidate",
    items: [
      "Candidate creation with a title, summary and priority.",
      "AI duplicate suggestions with matched text and score.",
      "A reviewer confirms or dismisses each suggestion.",
    ],
  },
  {
    title: "Review",
    items: [
      "Human review before anything is tracked anywhere.",
      "Approval or rejection with reviewer and time recorded.",
      "Shared workspaces for submitter, reviewer and admin roles.",
    ],
  },
  {
    title: "Notifications",
    items: [
      "Discord notifications to a separate channel after review.",
      "Submitters can view their own status in the workspace.",
      "Admins manage invitations and role changes.",
    ],
  },
] as const;

function Features() {
  return (
    <main id="main" tabIndex={-1} className="bg-background">
      <section className="mx-auto max-w-3xl px-6 py-16 sm:px-10 lg:py-24">
        <h1 className="text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
          Features
        </h1>
        <p className="mt-5 text-lg leading-7 text-muted-foreground">
          Triage keeps incoming reports separate from tracked work. It adds
          review and duplicates as checks before anything becomes a ticket.
        </p>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {groups.map((group) => (
            <div key={group.title} className="rounded-lg bg-secondary p-6">
              <p className="text-lg font-medium text-foreground">
                {group.title}
              </p>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-muted-foreground">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <a
            className={buttonVariants()}
            href="mailto:hello@triage.example?subject=Triage%20access%20request"
          >
            Request access
          </a>
          <Link
            to="/contact"
            className="ml-4 text-sm font-medium text-foreground hover:underline"
          >
            Contact us
          </Link>
        </div>
      </section>
    </main>
  );
}
