import {
  IconBrandDiscord,
  IconChecks,
  IconGitMerge,
  IconMessage,
  IconUsers,
} from "@tabler/icons-react";
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
  QueueFragment,
  type ReelStep,
} from "@/components/marketing/fragments";
import { MaskedLine, Reveal } from "@/components/marketing/motion";
import { buttonVariants } from "@/components/ui/button";

const reelSteps: { id: ReelStep; label: string }[] = [
  { id: "report", label: "Report" },
  { id: "candidate", label: "Candidate" },
  { id: "decision", label: "Decision" },
];

const reelFragments: Record<ReelStep, ReactNode> = {
  report: <IntakeFragment />,
  candidate: <CandidateFragment />,
  decision: <DecisionFragment />,
};

const staggerBuckets = [undefined, 80, 160, 240] as const;

/* -------------------------- The loop, in motion --------------------------- */

export function MimoReel() {
  const heroRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);

  const pinnedRun = useCallback(() => {
    const element = heroRef.current;
    if (!element) return 0;
    const total = element.offsetHeight - window.innerHeight;
    return total > 100 ? total : 0;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const element = heroRef.current;
      const total = pinnedRun();
      if (!element || !total) return;
      const progress = Math.min(
        Math.max(-element.getBoundingClientRect().top / total, 0),
        1,
      );
      setStep(Math.min(2, Math.round(progress * 2)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pinnedRun]);

  const goToStep = (index: number) => {
    const element = heroRef.current;
    const total = pinnedRun();
    if (element && total) {
      const top = window.scrollY + element.getBoundingClientRect().top;
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
    <section
      ref={heroRef}
      id="reel"
      aria-label="A report lands, a person decides"
      className="relative md:h-[280svh]"
    >
      <div className="relative flex flex-col gap-10 px-5 py-12 sm:px-8 md:sticky md:top-0 md:h-svh md:justify-center md:gap-0 md:py-0">
        <h2 className="flex flex-col md:w-full md:flex-row md:items-baseline md:justify-between">
          <span className="block text-[clamp(2.25rem,8vw,3.5rem)] leading-[1.05] font-medium tracking-tight md:w-[28vw]">
            <MaskedLine>A report lands.</MaskedLine>
          </span>
          <span className="block text-right text-[clamp(2.25rem,8vw,3.5rem)] leading-[1.05] font-medium tracking-tight md:w-[28vw]">
            <MaskedLine delay={110}>A person decides.</MaskedLine>
          </span>
        </h2>

        <div className="mx-auto w-full max-w-md md:absolute md:top-1/2 md:left-1/2 md:w-[35vw] md:max-w-none md:-translate-x-1/2 md:-translate-y-1/2">
          <div className="relative overflow-hidden rounded-md bg-card md:aspect-video">
            <div
              aria-hidden="true"
              inert
              className="relative h-10 overflow-hidden bg-card opacity-60 md:h-15"
            >
              <div className="absolute inset-x-0 bottom-0">
                {step > 0 ? reelFragments[reelSteps[step - 1].id] : null}
              </div>
            </div>
            <div className="relative p-3 sm:p-4">
              <div aria-live="polite">{reelFragments[reelSteps[step].id]}</div>
            </div>
            <div
              aria-hidden="true"
              inert
              className="relative h-10 overflow-hidden bg-card opacity-60 md:h-15"
            >
              <div className="absolute inset-x-0 top-0">
                {step < 2 ? reelFragments[reelSteps[step + 1].id] : null}
              </div>
            </div>
          </div>

          <fieldset className="mt-4 border-none p-0">
            <legend className="sr-only">Step through the triage flow</legend>
            <div className="flex items-center justify-center gap-2">
              {reelSteps.map((reelStep, index) => (
                <button
                  key={reelStep.id}
                  type="button"
                  aria-pressed={step === index}
                  onClick={() => goToStep(index)}
                  className="min-h-11 rounded-md border border-border bg-card px-4 text-sm font-medium transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground"
                >
                  {reelStep.label}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="md:absolute md:bottom-10 md:left-8 md:max-w-sm">
          <p className="text-base leading-6 text-muted-foreground sm:text-lg md:text-base">
            Triage turns the reports arriving in your channels into ticket
            candidates, and gives a reviewer the final word before anything
            becomes work.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a href="#start" className={buttonVariants()}>
              Create a workspace
            </a>
            <a
              href="#loop"
              className="text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
            >
              See what it does
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------ From report to decision ------------------------- */

export function MimoLoop() {
  return (
    <section
      id="loop"
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
  );
}

/* ------------------------ What Triage does, as prose ----------------------- */

export function MimoFeatureParagraph() {
  return (
    <section
      id="what"
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
          <a
            href="#feature-rows"
            className={`${buttonVariants({ variant: "outline" })} mt-4`}
          >
            See every feature
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------- The loop, piece by piece --------------------------- */

type FeatureRow = {
  title: string;
  text: string;
  fragment: ReactNode;
};

const featureRows: FeatureRow[] = [
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

export function MimoFeatureRows() {
  return (
    <section
      id="feature-rows"
      aria-label="The triage loop"
      className="px-5 pt-4 pb-16 sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            The loop, piece by piece
          </h2>
          <p className="mt-3 max-w-xl text-base leading-6 text-muted-foreground">
            The same four moves, with the product at true interface size.
          </p>
        </Reveal>

        {featureRows.map((row, index) => (
          <section
            key={row.title}
            aria-label={row.title}
            className="grid items-center gap-8 py-12 md:grid-cols-12 md:gap-12 md:py-16"
          >
            <Reveal
              delay={index % 2 === 0 ? undefined : 60}
              className="md:col-span-5"
            >
              <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                {row.title}
              </h3>
              <p className="mt-3 max-w-md text-base leading-6 text-muted-foreground">
                {row.text}
              </p>
            </Reveal>
            <Reveal delay={index % 2 === 0 ? 90 : 30} className="md:col-span-7">
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
  );
}

/* ------------------------------ Where it sits ----------------------------- */

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

export function MimoContext() {
  return (
    <section
      id="context"
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
  );
}

/* ----------------------------- Around the loop ---------------------------- */

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

export function MimoIntegrations() {
  return (
    <section
      id="integrations"
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
  );
}

/* ---------------------------- Three roles, one contract ------------------- */

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

export function MimoRoles() {
  return (
    <section
      id="roles"
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
                <th scope="col" className="py-3 font-semibold text-foreground">
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
  );
}
