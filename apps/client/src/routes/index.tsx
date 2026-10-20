import {
  IconArrowRight,
  IconCheck,
  IconMessage,
  IconCopy,
  IconShield,
  IconUsers,
  IconBell,
} from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { TriageBoard } from "@/components/triage-board";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <>
      <Hero />
      <Showcase />
      <HowItWorks />
      <Features />
      <FAQ />
      <CTA />
    </>
  );
}

/* ---------------------------------- Hero ---------------------------------- */

function Hero() {
  return (
    <section className="relative min-h-svh overflow-hidden">
      {/* Giant circle motif */}
      <div
        aria-hidden="true"
        className="absolute top-[20vh] right-[-20vh] size-[120vh] rounded-full bg-accent"
      />

      <div className="relative z-10 flex min-h-svh items-center">
        <div className="mx-auto w-full max-w-none px-6 sm:px-10 lg:px-16 xl:px-20">
          <h1 className="max-w-5xl text-[clamp(64px,6.4vw,100px)] leading-[0.95] font-semibold tracking-[-0.03em] text-balance">
            Every report,
            <br />
            reviewed.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-7 text-muted-foreground">
            A calm workspace that turns incoming reports into reviewable ticket
            candidates.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a
              href="mailto:hello@triage.app?subject=Contact%20from%20website"
              className={buttonVariants({ size: "lg", className: "min-h-11" })}
            >
              Contact us
              <IconArrowRight className="size-4" />
            </a>
            <a
              href="#how-it-works"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "min-h-11",
              })}
            >
              See how it works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Showcase -------------------------------- */

function Showcase() {
  const [activeStage, setActiveStage] = useState(0);
  const stages = [
    { name: "Intake", label: "Intake" },
    { name: "Candidate", label: "Candidate" },
    { name: "Review", label: "Review" },
    { name: "Decision", label: "Decision" },
  ];

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-none px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
          {/* Stage list */}
          <div className="order-2 lg:order-1">
            <p className="text-[clamp(28px,2.9vw,44px)] leading-[1.15] font-medium tracking-tight text-muted-foreground">
              How a report
              <br />
              becomes a candidate
            </p>
            <div className="mt-8 flex flex-col">
              {stages.map((stage, i) => (
                <button
                  key={stage.name}
                  onClick={() => setActiveStage(i)}
                  className={cn(
                    "text-left text-[clamp(28px,2.9vw,44px)] leading-[1.15] font-medium tracking-tight transition-colors",
                    activeStage === i
                      ? "text-foreground"
                      : "text-muted-foreground/40 hover:text-muted-foreground/70",
                  )}
                >
                  {stage.label}
                </button>
              ))}
            </div>
          </div>

          {/* Disc with triage board */}
          <div className="order-1 lg:order-2">
            <div className="relative flex items-center justify-center">
              <div
                aria-hidden="true"
                className="absolute size-[64vh] rounded-full bg-accent"
              />
              <div className="relative z-10 w-full max-w-md">
                <TriageBoard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- How it works ------------------------------ */

function HowItWorks() {
  const fields = [
    {
      bg: "bg-background",
      text: "text-foreground",
      clause: "First it lands here.",
      description: "A report arrives from Discord, email, or manual intake.",
      card: <IntakeCard />,
    },
    {
      bg: "bg-accent",
      text: "text-accent-foreground",
      clause: "Then someone takes it.",
      description: "A submitter creates a ticket candidate from the report.",
      card: <CandidateCard />,
    },
    {
      bg: "bg-primary",
      text: "text-primary-foreground",
      clause: "A person reviews it.",
      description: "A reviewer examines the candidate and its evidence.",
      card: <ReviewCard />,
    },
    {
      bg: "bg-foreground",
      text: "text-background",
      clause: "Then it is decided.",
      description:
        "The reviewer approves or rejects. The decision is recorded.",
      card: <DecisionCard />,
    },
  ];

  return (
    <section id="how-it-works" className="scroll-mt-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4">
        {fields.map((field) => (
          <div
            key={field.clause}
            className={cn(
              "flex min-h-[84svh] flex-col justify-between p-8",
              field.bg,
              field.text,
            )}
          >
            <div className="text-[clamp(22px,2vw,32px)] leading-[1.2] font-semibold tracking-tight">
              {field.clause}
            </div>
            <div className="my-8 flex flex-1 items-center justify-center">
              {field.card}
            </div>
            <p className="text-sm leading-6 opacity-70">{field.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function IntakeCard() {
  return (
    <div
      data-ui
      className="w-full max-w-[260px] rounded-lg border border-border bg-card p-4 text-left shadow-sm"
    >
      <div className="text-xs font-medium text-muted-foreground">Report</div>
      <div className="mt-1 text-sm font-medium">Login button unresponsive</div>
      <div className="mt-1 text-xs text-muted-foreground">
        From Discord #support
      </div>
    </div>
  );
}

function CandidateCard() {
  return (
    <div
      data-ui
      className="w-full max-w-[260px] rounded-lg border border-border bg-card p-4 text-left shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div className="text-xs font-medium text-muted-foreground">
          Candidate
        </div>
        <div className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          Open
        </div>
      </div>
      <div className="mt-1 text-sm font-medium">Fix login button on mobile</div>
      <div className="mt-2 flex items-center text-xs text-muted-foreground">
        <IconUsers className="size-3" />
        <span>Assigned to reviewer@triage.app</span>
      </div>
    </div>
  );
}

function ReviewCard() {
  return (
    <div
      data-ui
      className="w-full max-w-[260px] rounded-lg border border-border bg-card p-4 text-left shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div className="text-xs font-medium text-muted-foreground">Review</div>
        <div className="rounded bg-accent px-1.5 py-0.5 text-[10px] font-medium text-accent-foreground">
          In review
        </div>
      </div>
      <div className="mt-1 text-sm font-medium">Fix login button on mobile</div>
      <div className="mt-2 space-y-1">
        <div className="flex items-center text-xs text-muted-foreground">
          <IconCheck className="size-3 text-primary" />
          <span>Reproduced on iOS</span>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <IconCheck className="size-3 text-primary" />
          <span>Root cause identified</span>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <div className="size-3 rounded-sm border border-border" />
          <span>Fix pending</span>
        </div>
      </div>
    </div>
  );
}

function DecisionCard() {
  return (
    <div
      data-ui
      className="w-full max-w-[260px] rounded-lg border border-border bg-card p-4 text-left shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div className="text-xs font-medium text-muted-foreground">
          Decision
        </div>
        <div className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
          Approved
        </div>
      </div>
      <div className="mt-1 text-sm font-medium">Fix login button on mobile</div>
      <div className="mt-2 flex items-center text-xs text-muted-foreground">
        <IconCheck className="size-3 text-primary" />
        <span>Approved by reviewer@triage.app</span>
      </div>
      <div className="mt-1 text-xs text-muted-foreground">2026-10-14 10:45</div>
    </div>
  );
}

/* -------------------------------- Features -------------------------------- */

function Features() {
  const features = [
    {
      icon: IconMessage,
      sentence: "New messages from your Discord channels become intake.",
      consequence: "Connect a channel and Triage imports every new message.",
      color: "bg-accent text-accent-foreground",
    },
    {
      icon: IconCopy,
      sentence: "Triage suggests likely duplicates with evidence.",
      consequence: "Semantic matching shows the matched text and score.",
      color: "bg-primary text-primary-foreground",
    },
    {
      icon: IconShield,
      sentence: "A person approves or rejects every candidate.",
      consequence: "Nothing becomes a ticket without a human decision.",
      color: "bg-foreground text-background",
    },
    {
      icon: IconBell,
      sentence: "Review decisions are posted back to Discord.",
      consequence: "Your team sees the outcome where the report came from.",
      color: "bg-accent text-accent-foreground",
    },
    {
      icon: IconUsers,
      sentence:
        "Teams work together with submitter, reviewer, and admin roles.",
      consequence: "Control who can intake, review, and manage the workspace.",
      color: "bg-primary text-primary-foreground",
    },
  ];

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-none px-6 sm:px-10 lg:px-16 xl:px-20">
        <h2 className="text-[clamp(28px,2.9vw,44px)] leading-[1.15] font-medium tracking-tight">
          What Triage does
        </h2>
      </div>
      <div className="mt-12">
        {features.map((feature, i) => (
          <FeatureBand key={i} feature={feature} defaultOn={i < 2} />
        ))}
      </div>
    </section>
  );
}

function FeatureBand({
  feature,
  defaultOn,
}: {
  feature: {
    icon: React.ComponentType<{ className?: string }>;
    sentence: string;
    consequence: string;
    color: string;
  };
  defaultOn: boolean;
}) {
  const [on, setOn] = useState(defaultOn);
  const Icon = feature.icon;

  return (
    <div
      className={cn(
        "border-t border-border transition-colors",
        on ? feature.color : "bg-background text-muted-foreground",
      )}
    >
      <div className="mx-auto flex max-w-none items-center gap-6 px-6 py-8 sm:px-10 sm:py-10 lg:px-16 xl:px-20">
        <Icon className="size-6 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="text-[clamp(30px,3.6vw,60px)] leading-[1.1] font-medium tracking-tight">
            {feature.sentence}
          </p>
          {on && (
            <p className="mt-2 text-sm leading-6 opacity-70">
              {feature.consequence}
            </p>
          )}
        </div>
        <button
          role="switch"
          aria-checked={on}
          aria-label={feature.sentence}
          onClick={() => setOn(!on)}
          className={cn(
            "relative h-8 w-14 shrink-0 rounded-full border transition-colors",
            on ? "border-transparent bg-current/20" : "border-border bg-muted",
          )}
        >
          <span
            className={cn(
              "absolute top-1/2 left-1 size-6 -translate-y-1/2 rounded-full transition-transform",
              on
                ? "translate-x-6 bg-current"
                : "translate-x-0 bg-muted-foreground",
            )}
          />
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------- FAQ ----------------------------------- */

function FAQ() {
  const [openFaq, setOpenFaq] = useState<string[]>([]);
  const faqs = [
    {
      q: "What is Triage?",
      a: "Triage is a calm, professional workspace for small and medium software teams. It turns incoming reports into reviewable ticket candidates that a person approves or rejects.",
    },
    {
      q: "How does Discord intake work?",
      a: "Connect a Discord channel and Triage imports every new message as intake. Earlier history is outside the first milestone. A bot running during the demonstration is sufficient.",
    },
    {
      q: "How does AI duplicate suggestion work?",
      a: "Triage uses OpenRouter embeddings for semantic comparison with existing candidates in the same workspace. It shows likely matches with the matched text and score as evidence. A reviewer confirms or dismisses each suggestion.",
    },
    {
      q: "What are the roles in a workspace?",
      a: "There are three roles: Submitter adds intake and candidates and views their status. Reviewer views workspace submissions and approves or rejects candidates. Admin has both sets of actions and manages invitations and roles.",
    },
    {
      q: "How does human review work?",
      a: "A reviewer examines each candidate, its evidence, and any duplicate suggestions. They approve or reject the candidate. The decision is recorded inside Triage with its reviewer and time.",
    },
    {
      q: "Is Triage free?",
      a: "Triage is a university project. Pricing has not been determined yet.",
    },
  ];

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-none px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="text-[clamp(28px,2.9vw,44px)] leading-[1.15] font-medium tracking-tight">
              Questions
            </h2>
          </div>
          <Accordion
            value={openFaq}
            onValueChange={(v) => setOpenFaq(v as string[])}
          >
            {faqs.map((faq) => (
              <AccordionItem key={faq.q} value={faq.q}>
                <AccordionTrigger className="text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- CTA ----------------------------------- */

function CTA() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Sign up for Triage");
    const body = encodeURIComponent(`Email: ${email}`);
    window.location.href = `mailto:hello@triage.app?subject=${subject}&body=${body}`;
  };

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-none px-6 sm:px-10 lg:px-16 xl:px-20">
        <p className="text-[clamp(40px,6vw,96px)] leading-[1.05] font-semibold tracking-[-0.03em]">
          Turn your reports into
          <br />
          reviewable candidates.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Label htmlFor="cta-email" className="sr-only">
            Email
          </Label>
          <Input
            id="cta-email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" size="lg" className="min-h-12">
            Sign up
          </Button>
        </form>
        <p className="mt-4 text-sm text-muted-foreground">
          We will email you to set up your workspace.
        </p>
      </div>
    </section>
  );
}
