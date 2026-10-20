import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { buttonVariants } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: Home });

const features = [
  {
    title: "Manual text intake",
    description:
      "A report arrives as text. Someone types or pastes it, and the words stay with the source.",
  },
  {
    title: "Candidate creation",
    description:
      "A reviewer drafts a ticket candidate with a clear title, summary and priority.",
  },
  {
    title: "Human review",
    description:
      "Nothing is created in the tracker until a person approves or rejects the candidate.",
  },
  {
    title: "Shared workspaces",
    description:
      "Several teams keep their reports and candidates in one workspace with clear roles.",
  },
  {
    title: "Submitter, reviewer, admin",
    description:
      "Submitters add intake. Reviewers decide. Admins manage invitations and roles.",
  },
  {
    title: "Discord intake",
    description:
      "New messages from a selected channel arrive as intake after the bot is connected.",
  },
  {
    title: "AI duplicate suggestions",
    description:
      "Likely matches appear with the matched text and score. A reviewer confirms or dismisses.",
  },
  {
    title: "Discord notifications",
    description:
      "Review decisions post to a separate notification channel once configured.",
  },
] as const;

function buildCandidate(report: string, source: string) {
  const words = report.trim().split(/\s+/).filter(Boolean);
  const titleWords = words.slice(0, 7);
  const title =
    titleWords.length > 0
      ? titleWords.join(" ").replace(/[.,;:!?]+$/g, "")
      : "Untitled report";
  return {
    title,
    source,
    status: "Candidate",
    priority: words.length > 24 ? "High" : words.length > 12 ? "Medium" : "Low",
  };
}

function TriageConsole({
  report,
  setReport,
  source,
  setSource,
}: {
  report: string;
  setReport: (value: string) => void;
  source: string;
  setSource: (value: string) => void;
}) {
  const candidate = buildCandidate(report, source);
  return (
    <div
      data-ui
      className="flex h-full min-h-0 flex-col gap-4 rounded-xl border-2 border-border bg-card p-5"
    >
      <div className="flex items-center justify-between gap-3 border-b-2 border-border pb-3">
        <p className="text-sm font-medium text-foreground">Triage inbox</p>
        <p className="text-xs text-muted-foreground">Sample workspace</p>
      </div>
      <div className="grid gap-2">
        <label htmlFor="source" className="text-sm font-medium text-foreground">
          Source
        </label>
        <select
          id="source"
          value={source}
          onChange={(event) => setSource(event.target.value)}
          className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
        >
          <option value="Manual">Manual report</option>
          <option value="Discord">Discord message</option>
          <option value="Imported system">Imported system</option>
        </select>
      </div>
      <div className="grid gap-2">
        <label htmlFor="report" className="text-sm font-medium text-foreground">
          Incoming report
        </label>
        <textarea
          id="report"
          value={report}
          onChange={(event) => setReport(event.target.value)}
          rows={5}
          className="rounded-lg border border-input bg-background px-3 py-2 text-sm"
          placeholder="Describe what went wrong, who noticed it and when."
        />
      </div>
      <div className="rounded-lg bg-secondary p-4">
        <p className="text-xs text-muted-foreground">Candidate preview</p>
        <p className="mt-1 text-base font-medium text-foreground">
          {candidate.title}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Source: {candidate.source} · Priority: {candidate.priority} · Status:{" "}
          {candidate.status}
        </p>
      </div>
      <div className="rounded-lg border-2 border-border bg-background p-4">
        <p className="text-sm font-medium text-foreground">
          Duplicate suggestion
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          "Two-factor bypass in checkout flow" matched at 0.87.
        </p>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            className="rounded-lg bg-secondary px-3 py-2 text-sm text-secondary-foreground"
          >
            Dismiss
          </button>
          <button
            type="button"
            className="rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground"
          >
            Mark duplicate
          </button>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [report, setReport] = useState(
    "Checkout lets a user skip the two-factor prompt by replaying an older session cookie.",
  );
  const [source, setSource] = useState("Manual");
  const [workspace, setWorkspace] = useState("Acme platform team");
  const mailto =
    "mailto:hello@triage.example?subject=" +
    encodeURIComponent("Triage workspace request") +
    "&body=" +
    encodeURIComponent(
      "Hi Triage team,\n\nI would like to open a workspace called " +
        workspace +
        ".\n\n" +
        report +
        "\n",
    );

  return (
    <main id="main" tabIndex={-1} className="bg-background">
      <section
        className="border-b-2 border-border lg:grid lg:grid-cols-2 lg:gap-3 lg:p-3"
        aria-labelledby="landing-title"
      >
        <div className="hidden lg:sticky lg:top-3 lg:flex lg:h-[calc(100svh-1.5rem)] lg:items-stretch">
          <div className="w-full">
            <TriageConsole
              report={report}
              setReport={setReport}
              source={source}
              setSource={setSource}
            />
          </div>
        </div>
        <div className="mx-auto max-w-xl px-6 py-16 sm:px-10 lg:px-12 lg:py-20">
          <h1
            id="landing-title"
            className="text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            Triage sorts incoming reports into reviewable ticket candidates.
          </h1>
          <p className="mt-6 text-lg leading-7 text-muted-foreground">
            A calm workspace for small and medium software teams. Someone
            captures a report, a candidate appears, and a reviewer decides
            before anything is tracked.
          </p>
          <div className="mt-6 grid gap-2 lg:hidden">
            <TriageConsole
              report={report}
              setReport={setReport}
              source={source}
              setSource={setSource}
            />
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a className={buttonVariants({ size: "lg" })} href={mailto}>
              Request a workspace
            </a>
            <Link
              to="/features"
              className="text-sm font-medium text-foreground hover:underline"
            >
              Explore features
            </Link>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            No automatic tracking. Every candidate is reviewed by a person
            before it becomes a ticket.
          </p>
        </div>
      </section>

      <section
        className="mx-auto max-w-3xl px-6 py-16 sm:px-10 lg:py-24"
        aria-labelledby="how-title"
      >
        <h2
          id="how-title"
          className="text-3xl leading-tight font-semibold tracking-tight"
        >
          How Triage keeps work honest.
        </h2>
        <div className="mt-8 space-y-10 text-base leading-7 text-foreground">
          <div>
            <p>
              <span className="font-semibold">
                Incoming reports arrive first.
              </span>{" "}
              They can be typed by a person or pulled from a Discord channel
              after the integration is connected.
            </p>
            <img
              src="/assets/zimbra-wikipedia-inbox.png"
              width={3360}
              height={1780}
              alt="A screenshot of an email inbox, similar to where reports may arrive."
              loading="lazy"
              decoding="async"
              className="mt-4 w-full rounded-lg"
            />
          </div>
          <div>
            <p>
              <span className="font-semibold">
                A candidate is drafted next.
              </span>{" "}
              The report becomes a title, summary and priority that a reviewer
              can read without losing the original words.
            </p>
            <img
              src="/assets/old-kardex-file-cabinet.jpg"
              width={3780}
              height={2516}
              alt="An old card-file cabinet, evoking sorted records."
              loading="lazy"
              decoding="async"
              className="mt-4 w-full rounded-lg"
            />
          </div>
          <div>
            <p>
              <span className="font-semibold">Review happens in the open.</span>{" "}
              Approve, reject or ask for more context. The decision stays with
              its reviewer and time.
            </p>
            <img
              src="/assets/software-bug-displayed-on-two-screens-at.jpg"
              width={4032}
              height={3024}
              alt="A software defect shown on two screens, the kind of report Triage collects."
              loading="lazy"
              decoding="async"
              className="mt-4 w-full rounded-lg"
            />
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16" aria-labelledby="features-title">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <h2
            id="features-title"
            className="text-3xl leading-tight font-semibold tracking-tight"
          >
            What ships in the first Triage release.
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-lg bg-background p-6">
                <p className="text-lg font-medium text-foreground">
                  {feature.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="mx-auto max-w-3xl px-6 py-16 sm:px-10 lg:py-24"
        aria-labelledby="faq-title"
      >
        <h2
          id="faq-title"
          className="text-3xl leading-tight font-semibold tracking-tight"
        >
          Frequently asked
        </h2>
        <div className="mt-6 columns-1 text-base leading-7 text-foreground sm:columns-2 sm:gap-14">
          <p className="mb-4 break-inside-avoid">
            <span className="font-semibold">
              Does Triage create tickets automatically?
            </span>{" "}
            No. AI suggests likely duplicates, and a person approves or rejects
            every candidate.
          </p>
          <p className="mb-4 break-inside-avoid">
            <span className="font-semibold">Can a team use Discord?</span> Yes,
            after a bot is connected to a channel. New messages become intake.
          </p>
          <p className="mb-4 break-inside-avoid">
            <span className="font-semibold">Who can review?</span> Reviewers and
            admins. Submitters can view their own status.
          </p>
          <p className="mb-4 break-inside-avoid">
            <span className="font-semibold">Is the duplicate score final?</span>{" "}
            No, scores are evidence. A reviewer confirms or dismisses each one.
          </p>
          <p className="mb-4 break-inside-avoid">
            <span className="font-semibold">Is there a public API?</span> Not in
            the first release. Export to trackers is future work.
          </p>
          <p className="mb-4 break-inside-avoid">
            <span className="font-semibold">Where does the data live?</span> In
            MongoDB for the running workspace.
          </p>
        </div>
      </section>

      <section className="bg-accent py-20" aria-labelledby="closing-title">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-10 lg:grid-cols-2">
          <div className="flex flex-col justify-end">
            <h2
              id="closing-title"
              className="text-5xl leading-none font-semibold tracking-tight text-accent-foreground lg:text-7xl"
            >
              Open your first workspace.
            </h2>
            <p className="mt-4 max-w-md text-base leading-7 text-accent-foreground">
              Start with a workspace name. Triage carries your first report and
              candidate on the same screen.
            </p>
          </div>
          <div
            data-ui
            className="rounded-xl border-2 border-border bg-card p-6"
          >
            <label
              htmlFor="workspace"
              className="text-sm font-medium text-foreground"
            >
              Workspace name
            </label>
            <input
              id="workspace"
              value={workspace}
              onChange={(event) => setWorkspace(event.target.value)}
              className="mt-2 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
            />
            <a className={buttonVariants({ size: "lg" })} href={mailto}>
              Open workspace
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12 sm:px-10">
        <h2 className="text-lg font-medium text-foreground">Image credits</h2>
        <p className="mt-3 text-xs leading-6 text-muted-foreground">
          Triage tents outside of Enköping hospital by Joakim Emanuelson, CC
          BY-SA 4.0, via Wikimedia Commons. Old kardex file cabinet by Pete
          Birkinshaw from Manchester, UK, CC BY 2.0, via Wikimedia Commons.
          Software bug displayed on two screens at La Croix de Berny station in
          France by Bretwa, CC BY-SA 4.0, via Wikimedia Commons. Zimbra
          Wikipedia inbox by Zimbra Inc, CC BY 4.0, via Wikimedia Commons. These
          photographs show the subject's world and are not the Triage product.
        </p>
        <img
          src="/assets/triage-tents-outside-of-enkoping-hospital.jpg"
          width={3417}
          height={2110}
          alt="Triage tents outside a hospital seen while sorting patients."
          loading="lazy"
          decoding="async"
          className="mt-4 w-full rounded-lg"
        />
      </section>
    </main>
  );
}
