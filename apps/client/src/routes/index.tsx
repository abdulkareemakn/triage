import { IconBrandDiscord, IconMessage } from "@tabler/icons-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  CandidateFragment,
  DecisionFragment,
  IntakeFragment,
  WorkspaceDialogFragment,
  type ReelStep,
} from "@/components/marketing/fragments";
import {
  MaskedLine,
  Reveal,
  useRevealOnScroll,
} from "@/components/marketing/motion";
import { buttonVariants } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: Home });

const steps: { id: ReelStep; label: string }[] = [
  { id: "report", label: "Report" },
  { id: "candidate", label: "Candidate" },
  { id: "decision", label: "Decision" },
];

const fragments: Record<ReelStep, ReactNode> = {
  report: <IntakeFragment />,
  candidate: <CandidateFragment />,
  decision: <DecisionFragment />,
};

const columns = [
  {
    runIn: "Who it is for.",
    text: "Small and medium software teams with more incoming reports than the person triaging them can hold in their head. One reviewer per workspace is enough to start.",
  },
  {
    runIn: "What a workspace holds.",
    text: "The submitted text exactly as it arrived, the ticket candidates drafted from it, and every review decision with the reviewer and the time it was made.",
  },
  {
    runIn: "Where reports come from.",
    text: "Typed into Triage by hand, or imported from a connected Discord channel. Every new message after connecting comes in; older history stays where it was.",
  },
  {
    runIn: "How to start.",
    text: "Name a workspace, invite people with a link or a code, and put the next report through. Roles are submitter, reviewer, and admin.",
  },
] as const;

const staggerBuckets = [undefined, 80, 160, 240] as const;

function Home() {
  useRevealOnScroll();
  const heroRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);

  // The pinned run is the scrollable distance of the sticky hero. Zero
  // on narrow screens, where the reel is stepped by the buttons only.
  const pinnedRun = useCallback(() => {
    const el = heroRef.current;
    if (!el) return 0;
    const total = el.offsetHeight - window.innerHeight;
    return total > 100 ? total : 0;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = heroRef.current;
      const total = pinnedRun();
      if (!el || !total) return;
      const progress = Math.min(
        Math.max(-el.getBoundingClientRect().top / total, 0),
        1,
      );
      setStep(Math.min(2, Math.round(progress * 2)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pinnedRun]);

  const goToStep = (index: number) => {
    const el = heroRef.current;
    const total = pinnedRun();
    if (el && total) {
      const top = window.scrollY + el.getBoundingClientRect().top;
      window.scrollTo({
        top: top + (index / 2) * total,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    } else {
      setStep(index);
    }
  };

  return (
    <>
      {/* Hero: the sentence split by a frame. The two halves hold their
          place while a reel of working product fragments passes between
          them, stepped by scroll or by the buttons. */}
      <section
        ref={heroRef}
        aria-label="A report lands, a person decides"
        className="relative md:h-[280svh]"
      >
        <div className="relative flex flex-col gap-10 px-5 py-12 sm:px-8 md:sticky md:top-0 md:h-svh md:justify-center md:gap-0 md:py-0">
          <h1 className="flex flex-col md:w-full md:flex-row md:items-baseline md:justify-between">
            <span className="block text-[clamp(2.25rem,8vw,3.5rem)] leading-[1.05] font-medium tracking-tight md:w-[28vw]">
              <MaskedLine>A report lands.</MaskedLine>
            </span>
            <span className="block text-right text-[clamp(2.25rem,8vw,3.5rem)] leading-[1.05] font-medium tracking-tight md:w-[28vw]">
              <MaskedLine delay={110}>A person decides.</MaskedLine>
            </span>
          </h1>

          {/* The frame: a slice of the product, centred between the
              halves of the sentence, holding the reel. */}
          <div className="mx-auto w-full max-w-md md:absolute md:top-1/2 md:left-1/2 md:w-[35vw] md:max-w-none md:-translate-x-1/2 md:-translate-y-1/2">
            <div className="relative overflow-hidden rounded-md bg-card md:aspect-video">
              {/* The neighbouring frames show as slivers at the edges. */}
              <div
                aria-hidden="true"
                className="relative h-10 overflow-hidden bg-card opacity-60 md:h-15"
              >
                <div className="absolute inset-x-0 bottom-0">
                  {step > 0 ? fragments[steps[step - 1].id] : null}
                </div>
              </div>
              <div className="relative p-3 sm:p-4">
                <div aria-live="polite">{fragments[steps[step].id]}</div>
              </div>
              <div
                aria-hidden="true"
                className="relative h-10 overflow-hidden bg-card opacity-60 md:h-15"
              >
                <div className="absolute inset-x-0 top-0">
                  {step < 2 ? fragments[steps[step + 1].id] : null}
                </div>
              </div>
            </div>

            {/* The live control: step the reel with a thumb. */}
            <fieldset className="mt-4 border-none p-0">
              <legend className="sr-only">Step through the triage flow</legend>
              <div className="flex items-center justify-center gap-2">
                {steps.map((s, index) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={step === index}
                    onClick={() => goToStep(index)}
                    className="min-h-11 rounded-md border border-border bg-card px-4 text-sm font-medium transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          {/* On narrow screen these sit under the frame; on a wide
              screen they anchor to the bottom-left corner. */}
          <div className="md:absolute md:bottom-10 md:left-8 md:max-w-sm">
            <p className="text-base leading-6 text-muted-foreground sm:text-lg md:text-base">
              Triage turns the reports arriving in your channels into ticket
              candidates, and gives a reviewer the final word before anything
              becomes work.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link to="/sign-up" className={buttonVariants()}>
                Create a workspace
              </Link>
              <Link
                to="/features"
                className="text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
              >
                See what it does
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works: call and response column. */}
      <section
        aria-labelledby="how-heading"
        className="px-5 py-20 sm:px-8 md:py-28"
      >
        <div className="mx-auto max-w-2xl md:ml-[25%]">
          <Reveal>
            <h2
              id="how-heading"
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              From report to decision
            </h2>
          </Reveal>

          <ol className="mt-14 list-none space-y-16 md:space-y-20">
            <li>
              <Reveal>
                <p className="text-lg leading-7 font-medium">
                  First, the report comes in.
                </p>
                <div className="mt-4 rounded-md bg-muted p-5">
                  <p className="text-sm leading-6">
                    “Checkout page freezes after applying a discount code —
                    happens on Safari, two customers so far today.”
                  </p>
                </div>
              </Reveal>
              <Reveal delay={90} className="mt-6 md:ml-14">
                <IntakeFragment compact />
              </Reveal>
            </li>

            <li>
              <Reveal>
                <p className="text-lg leading-7 font-medium">
                  Then a candidate takes shape.
                </p>
                <div className="mt-4 rounded-md bg-muted p-5">
                  <p className="text-sm leading-6">
                    Title: “Discount code freezes checkout on Safari” · Area:
                    Checkout
                  </p>
                </div>
              </Reveal>
              <Reveal delay={90} className="mt-6 md:ml-14">
                <CandidateFragment />
              </Reveal>
            </li>

            <li>
              <Reveal>
                <p className="text-lg leading-7 font-medium">
                  Then a person decides.
                </p>
              </Reveal>
              {/* The final response breaks out of the column. */}
              <Reveal delay={90} className="mt-6 md:-ml-14 md:w-[130%]">
                <DecisionFragment />
              </Reveal>
              <Reveal delay={180} className="mt-6">
                <p className="text-sm leading-6 text-muted-foreground">
                  The approval is recorded inside Triage with its reviewer and
                  time, and the decision is posted back to the Discord channel
                  your team already reads.
                </p>
              </Reveal>
            </li>
          </ol>
        </div>
      </section>

      {/* Features: one paragraph with picture words. Each slot is a real
          piece of the product's world dropped into the sentence. */}
      <section
        aria-label="What Triage does"
        className="bg-secondary px-5 py-20 sm:px-8 md:py-28"
      >
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-[clamp(1.375rem,2.6vw,2.25rem)] leading-[1.3] font-medium tracking-tight">
              Triage takes the reports{" "}
              <span className="word-slot" aria-hidden="true">
                <IconMessage size={18} stroke={2} />
              </span>{" "}
              your team already sends, in Discord{" "}
              <span className="word-slot" aria-hidden="true">
                <IconBrandDiscord size={18} stroke={2} />
              </span>
              , in a text box, and turns each one into a candidate{" "}
              <span className="word-slot" aria-hidden="true">
                <span className="tr-chip">Draft</span>
              </span>{" "}
              a person reviews, names the duplicates{" "}
              <span className="word-slot" aria-hidden="true">
                <span className="tr-chip">0.86</span>
              </span>{" "}
              it recognises, and answers back to the channel it came from.
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-10 md:ml-[58%]">
            <p className="text-base leading-6 text-muted-foreground">
              The whole loop, written out.
            </p>
            <Link
              to="/features"
              className={`${buttonVariants({ variant: "outline" })} mt-4`}
            >
              See every feature
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Intro: a lead line over four columns, beside the sorting room. */}
      <section
        aria-label="About Triage"
        className="px-5 py-20 sm:px-8 md:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="max-w-3xl text-[clamp(1.375rem,2.4vw,2rem)] leading-[1.25]">
              Reports arrive as messages. Work starts as tickets. Triage is the
              desk between the two, where a person decides what becomes work and
              what does not.
            </p>
          </Reveal>

          <figure className="mt-12">
            <img
              src="/photos/wellington-sorting-room.jpg"
              alt="clerks sorting letters into racks and mail bags in a large hall"
              width="3067"
              height="2310"
              loading="lazy"
              decoding="async"
              className="drift aspect-[21/9] w-full rounded-md object-cover"
            />
            <figcaption className="mt-3 text-xs leading-5 text-muted-foreground">
              Sorting incoming things is an old job. General Post Office mail
              sorting room, Wellington, c.1900s. Archives New Zealand, CC BY-SA
              2.0, via Wikimedia Commons.
            </figcaption>
          </figure>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {columns.map((column, index) => (
              <Reveal key={column.runIn} delay={staggerBuckets[index]}>
                <p className="text-sm leading-6 text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {column.runIn}{" "}
                  </span>
                  {column.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA: the first step of the product, already open. */}
      <section
        aria-labelledby="cta-heading"
        className="bg-accent px-5 py-20 text-accent-foreground sm:px-8 md:py-0"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:min-h-[84svh] md:grid-cols-2">
          <div>
            <Reveal>
              <h2
                id="cta-heading"
                className="text-[clamp(2.75rem,6vw,5rem)] leading-[0.95] font-semibold tracking-tight"
              >
                Start with
                <br />
                one report.
              </h2>
              <p className="mt-6 max-w-sm text-base leading-6">
                Name a workspace, invite your reviewers, and put the next report
                through. Nothing is filed until a person approves it.
              </p>
            </Reveal>
          </div>
          <Reveal delay={120} className="md:justify-self-end">
            <div className="w-full max-w-sm">
              <WorkspaceDialogFragment />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
