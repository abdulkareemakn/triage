import {
  IconArrowRight,
  IconCheck,
  IconCopy,
  IconUsers,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";

import { WaitlistForm } from "@/components/combined/waitlist-form";
import { MaskedLine } from "@/components/marketing/motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Stage = "intake" | "candidate" | "review" | "decision";

const stageDefinitions: { id: Stage; label: string }[] = [
  { id: "intake", label: "Intake" },
  { id: "candidate", label: "Candidate" },
  { id: "review", label: "Review" },
  { id: "decision", label: "Decision" },
];

/* ------------------------------- Opening hero ------------------------------ */

export function LongcatHero() {
  return (
    <section
      id="top"
      className="relative min-h-[calc(100svh-4rem)] overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute top-[20vh] right-[-20vh] size-[120vh] rounded-full bg-accent"
      />

      <div className="relative z-10 flex min-h-[calc(100svh-4rem)] items-center">
        <div className="mx-auto w-full max-w-none px-6 sm:px-10 lg:px-16 xl:px-20">
          <h1 className="max-w-5xl text-[clamp(64px,6.4vw,100px)] leading-[1.2] font-semibold tracking-[-0.03em] text-balance">
            <MaskedLine>Every report,</MaskedLine>
            <MaskedLine delay={110}>reviewed.</MaskedLine>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-7 text-muted-foreground">
            Triage turns the reports arriving in your channels into ticket
            candidates, and gives a reviewer the final word before anything
            becomes work.
          </p>
          <div id="waitlist" className="mt-8 scroll-mt-24">
            <WaitlistForm />
            <div className="mt-5">
              <a
                href="#reel"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "min-h-11",
                })}
              >
                See the loop
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- The working board ---------------------------- */

export function LongcatShowcase() {
  const [activeStage, setActiveStage] = useState<Stage>("intake");

  return (
    <section id="board" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-none px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
          <div className="order-2 lg:order-1">
            <p className="text-[clamp(28px,2.9vw,44px)] leading-[1.15] font-medium tracking-tight text-muted-foreground">
              How a report
              <br />
              becomes a candidate
            </p>
            <div className="mt-8 flex flex-col">
              {stageDefinitions.map((stage) => (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setActiveStage(stage.id)}
                  aria-pressed={activeStage === stage.id}
                  className={cn(
                    "text-left text-[clamp(28px,2.9vw,44px)] leading-[1.15] font-medium tracking-tight transition-colors",
                    activeStage === stage.id
                      ? "text-foreground"
                      : "text-muted-foreground/40 hover:text-muted-foreground/70",
                  )}
                >
                  {stage.label}
                </button>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative flex items-center justify-center">
              <div
                aria-hidden="true"
                className="absolute size-[64vh] rounded-full bg-accent"
              />
              <div className="relative z-10 w-full max-w-md">
                <TriageBoard
                  stage={activeStage}
                  onStageChange={setActiveStage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const sampleReport = {
  title: "Login button unresponsive on mobile",
  body: "The login button on the mobile site does not respond when tapped. This affects all mobile users trying to sign in. Reported by a customer via email.",
  source: "Discord #support",
  author: "jane.doe",
  timestamp: "2026-10-14 09:23",
};

const duplicateSuggestion = {
  title: "Mobile login not working",
  score: 0.87,
  matchedText:
    "The login button on mobile is not working. Users cannot sign in on their phones.",
};

function TriageBoard({
  stage,
  onStageChange,
}: {
  stage: Stage;
  onStageChange: (stage: Stage) => void;
}) {
  const stageIndex = stageDefinitions.findIndex((entry) => entry.id === stage);
  const [outcome, setOutcome] = useState<"approved" | "rejected" | null>(null);

  return (
    <div
      data-ui=""
      className="w-full max-w-md rounded-xl border border-border bg-card p-5 text-left shadow-sm"
    >
      <div className="mb-4 flex items-center gap-1">
        {stageDefinitions.map((entry, index) => (
          <div key={entry.id} className="flex items-center gap-1">
            <div
              className={cn(
                "size-2 rounded-full",
                stage === entry.id
                  ? "bg-primary"
                  : stageIndex > index
                    ? "bg-primary/40"
                    : "bg-border",
              )}
            />
            {index < stageDefinitions.length - 1 && (
              <div
                className={cn(
                  "h-px w-6",
                  stageIndex > index ? "bg-primary/40" : "bg-border",
                )}
              />
            )}
          </div>
        ))}
        <span className="ml-2 text-xs font-medium text-muted-foreground">
          {stageDefinitions.find((entry) => entry.id === stage)?.label}
        </span>
      </div>

      <div className="rounded-lg border border-border bg-background p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h4 className="text-sm font-medium leading-snug">
              {sampleReport.title}
            </h4>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              {sampleReport.body}
            </p>
          </div>
          <span className="shrink-0 rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            {sampleReport.source}
          </span>
        </div>

        <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
          <span>{sampleReport.author}</span>
          <span>{sampleReport.timestamp}</span>
        </div>

        {stage !== "intake" && (
          <div className="mt-3 rounded-md border border-border bg-muted/50 p-3">
            <div className="flex items-center text-[11px] font-medium text-muted-foreground">
              <IconCopy className="size-3" />
              <span>Duplicate suggestion</span>
              <span className="ml-auto rounded bg-accent px-1.5 py-0.5 text-[10px] font-semibold text-accent-foreground">
                {Math.round(duplicateSuggestion.score * 100)}% match
              </span>
            </div>
            <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
              &ldquo;{duplicateSuggestion.matchedText}&rdquo;
            </p>
          </div>
        )}

        {stage === "review" && (
          <div className="mt-3 flex items-center gap-2">
            <Button
              variant="default"
              size="xs"
              onClick={() => {
                setOutcome("approved");
                onStageChange("decision");
              }}
            >
              <IconCheck className="size-3" />
              Approve
            </Button>
            <Button
              variant="destructive"
              size="xs"
              onClick={() => {
                setOutcome("rejected");
                onStageChange("decision");
              }}
            >
              <IconX className="size-3" />
              Reject
            </Button>
          </div>
        )}

        {stage === "decision" && (
          <div
            className={cn(
              "mt-3 flex items-center rounded-md p-3 text-xs",
              outcome === "rejected"
                ? "bg-destructive/10 text-destructive"
                : "bg-accent text-accent-foreground",
            )}
          >
            {outcome === "rejected" ? (
              <IconX className="size-4" />
            ) : (
              <IconCheck className="size-4" />
            )}
            <span className="font-medium">
              {outcome === "rejected"
                ? "Rejected by reviewer@triage.app"
                : outcome === "approved"
                  ? "Approved by reviewer@triage.app"
                  : "Decision recorded"}
            </span>
            <span className="ml-auto opacity-70">2026-10-14 10:45</span>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center">
        {stage === "intake" && (
          <Button size="sm" onClick={() => onStageChange("candidate")}>
            Create candidate
            <IconArrowRight className="size-3" />
          </Button>
        )}
        {stage === "candidate" && (
          <Button size="sm" onClick={() => onStageChange("review")}>
            Send to review
            <IconArrowRight className="size-3" />
          </Button>
        )}
        {stage === "review" && (
          <span className="text-xs text-muted-foreground">
            A reviewer approves or rejects this candidate.
          </span>
        )}
        {stage === "decision" && (
          <Button
            variant="ghost"
            size="xs"
            onClick={() => {
              setOutcome(null);
              onStageChange("intake");
            }}
          >
            Reset
          </Button>
        )}
      </div>
    </div>
  );
}

/* ---------------------- Four stages, four grounds ------------------------- */

export function LongcatStages() {
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
    <section id="stages" className="scroll-mt-6">
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
      data-ui=""
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
      data-ui=""
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
      data-ui=""
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
      data-ui=""
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

/* ---------------------------------- FAQ ----------------------------------- */

export function FAQ() {
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
    <section id="faq" className="py-24 sm:py-32">
      <div className="mx-auto max-w-none px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="text-[clamp(28px,2.9vw,44px)] leading-[1.15] font-medium tracking-tight">
              Questions
            </h2>
          </div>
          <Accordion
            value={openFaq}
            onValueChange={(value) => setOpenFaq(value as string[])}
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
