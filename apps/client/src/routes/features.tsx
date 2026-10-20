import {
  IconMessage,
  IconCopy,
  IconShield,
  IconBell,
  IconUsers,
  IconArrowRight,
  IconCheck,
} from "@tabler/icons-react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { buttonVariants } from "@/components/ui/button";

export const Route = createFileRoute("/features")({ component: Features });

const features = [
  {
    icon: IconMessage,
    title: "Discord intake",
    description:
      "Connect a Discord channel and Triage imports every new message as intake. Your team's reports arrive where your team already talks.",
    details: [
      "Import every new message from a selected channel",
      "Earlier history is outside the first milestone",
      "A bot running during the demonstration is sufficient",
    ],
  },
  {
    icon: IconCopy,
    title: "AI duplicate suggestions",
    description:
      "Triage uses OpenRouter embeddings for semantic comparison with existing candidates in the same workspace. It shows likely matches with the matched text and score as evidence.",
    details: [
      "Semantic matching against existing candidates",
      "Matched text and score shown as evidence",
      "A reviewer confirms or dismisses each suggestion",
    ],
  },
  {
    icon: IconShield,
    title: "Human review",
    description:
      "A person approves or rejects every candidate. Nothing becomes a ticket without a human decision. The decision is recorded inside Triage with its reviewer and time.",
    details: [
      "Every candidate requires a human decision",
      "Approval is recorded with reviewer and time",
      "Rejection is recorded with reviewer and time",
    ],
  },
  {
    icon: IconBell,
    title: "Discord notifications",
    description:
      "Review decisions are posted back to a separately configured notification channel. Your team sees the outcome where the report came from.",
    details: [
      "Decisions posted to a notification channel",
      "Separate from the intake channel",
      "Configurable per workspace",
    ],
  },
  {
    icon: IconUsers,
    title: "Shared workspaces",
    description:
      "Teams work together with submitter, reviewer, and admin roles. Control who can intake, review, and manage the workspace.",
    details: [
      "Submitter adds intake and candidates",
      "Reviewer approves or rejects candidates",
      "Admin manages invitations and roles",
    ],
  },
];

function Features() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-none px-6 sm:px-10 lg:px-16 xl:px-20">
          <h1 className="max-w-5xl text-[clamp(48px,5vw,80px)] leading-[1.0] font-semibold tracking-[-0.03em] text-balance">
            Features
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-7 text-muted-foreground">
            Everything you need to turn incoming reports into reviewable ticket
            candidates.
          </p>
        </div>
      </section>

      {/* Feature list */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-none px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="space-y-16">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="grid gap-8 border-t border-border pt-12 lg:grid-cols-[1fr_2fr] lg:gap-16"
                >
                  <div>
                    <div className="flex size-12 items-center justify-center rounded-lg bg-accent">
                      <Icon className="size-6 text-accent-foreground" />
                    </div>
                    <h2 className="mt-4 text-2xl font-semibold tracking-tight">
                      {feature.title}
                    </h2>
                    <p className="mt-3 text-base leading-7 text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                  <div className="flex flex-col justify-center">
                    <ul className="space-y-3">
                      {feature.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-start gap-3 text-base leading-7"
                        >
                          <IconCheck className="mt-1 size-5 shrink-0 text-primary" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-24 sm:py-32">
        <div className="mx-auto max-w-none px-6 sm:px-10 lg:px-16 xl:px-20">
          <h2 className="text-[clamp(32px,4vw,56px)] leading-[1.1] font-semibold tracking-tight">
            Start reviewing your reports
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-7 text-muted-foreground">
            Create a workspace, invite your team, and turn incoming reports into
            reviewable ticket candidates.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link
              to="/sign-up"
              className={buttonVariants({ size: "lg", className: "min-h-11" })}
            >
              Sign up
              <IconArrowRight className="size-4" />
            </Link>
            <Link
              to="/contact"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "min-h-11",
              })}
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
