import { Link, createFileRoute } from "@tanstack/react-router";

import {
  DecisionRecord,
  DiscordChannel,
  DuplicateSuggestion,
  IntakeRecord,
  sampleChannelMessages,
} from "@/components/product/fragments";
import { IntakeDemo } from "@/components/product/intake-demo";
import { QueueBoard } from "@/components/product/queue-board";
import {
  ReviewerPanelPlate,
  reviewerNotes,
} from "@/components/product/reviewer-panel";
import { buttonVariants } from "@/components/ui/button";
import {
  contactEmail,
  contactSubject,
  pageGutter,
  pageWidth,
  sampleCandidates,
} from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

const introColumns = [
  {
    lead: "Who it is for.",
    body: "Small and medium software teams who already have a backlog and a chat full of things that might belong in it. One account can join several workspaces, and each person picks the one they are working in before they begin.",
  },
  {
    lead: "What it does.",
    body: "A person pastes a report, or receives one from a connected Discord channel. Triage stores the text, makes a ticket candidate from it, and puts that candidate in front of a reviewer.",
  },
  {
    lead: "Where it stops.",
    body: "Triage ends at the decision. Sending an approved candidate to GitHub or Jira is later work, and the product is deliberately narrow: it owns the moment a report becomes a ticket, and nothing after it.",
  },
  {
    lead: "How to reach us.",
    body: "Use the contact page. Your name, email, company and message are written into an email draft with a subject we can answer, so nothing has to be retyped. If Triage is the wrong shape for your team, say so.",
  },
];

const moves = [
  {
    lead: "First, paste the report.",
    body: "It is stored exactly as it was written, with the channel it came from and the time it arrived.",
    content: <IntakeRecord />,
  },
  {
    lead: "Then read the candidate.",
    body: "Triage compares the new candidate with the candidates already in this workspace and offers the closest one as evidence.",
    content: (
      <DuplicateSuggestion score={0.82} candidate={sampleCandidates[0]} />
    ),
  },
  {
    lead: "Finally, approve it.",
    body: "The decision is written against the candidate with your name and the moment, and posted to the workspace’s notification channel.",
    content: (
      <DecisionRecord
        decision="Approved"
        reviewer="Priya Raman"
        decidedAt="14:32"
        channel="#triage-review"
      />
    ),
  },
];

function Home() {
  return (
    <>
      {/* Hero: a short headline in the upper left, the working fragment on a
          flat stage that bleeds off the right and bottom edges. */}
      <section className={cn("relative isolate", pageGutter, pageWidth)}>
        <div className="triage-reveal max-w-[46rem] pt-6 pb-14 sm:pt-10 lg:pt-24 lg:pb-56">
          <h1 className="text-[clamp(2.6rem,5.2vw,5rem)] leading-[1.02] font-medium tracking-[-0.035em] text-balance">
            Every report gets a person
          </h1>
          <p className="mt-6 max-w-[40ch] text-lg leading-7 text-pretty text-muted-foreground">
            Triage turns your team’s incoming reports into ticket candidates. A
            reviewer approves or rejects each one before it reaches the backlog.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link to="/sign-up" className={buttonVariants({ size: "xl" })}>
              Start a workspace
            </Link>
            <Link
              to="/features"
              className="inline-flex min-h-11 items-center text-base underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              See the whole pipeline
            </Link>
          </div>
        </div>

        <div className="relative -mx-6 h-[560px] overflow-hidden sm:-mx-0 lg:h-[640px]">
          <div className="absolute inset-y-0 right-0 left-0 bg-primary px-6 pt-10 pb-40 text-primary-foreground [clip-path:polygon(72px_0,100%_0,100%_100%,0_100%,0_72px)] lg:left-[38%] lg:px-14 lg:pt-14">
            <IntakeDemo />
          </div>
        </div>
      </section>

      {/* Intro: a lead paragraph, then four plain columns. */}
      <section
        aria-labelledby="intro-lead"
        className={cn(
          pageGutter,
          pageWidth,
          "pt-8 pb-24 sm:pt-12 lg:pt-32 lg:pb-40",
        )}
      >
        <p
          id="intro-lead"
          className="triage-reveal max-w-[46ch] text-[clamp(1.4rem,2.2vw,2rem)] leading-[1.25] text-pretty sm:max-w-[60ch]"
        >
          Every software team collects reports: a bug in a screenshot, a
          question in a channel at midnight, a customer’s complaint forwarded
          unread. Triage is where those reports are read, and decided.
        </p>
        <div className="triage-reveal mt-12 grid gap-8 sm:grid-cols-2 lg:mt-18 lg:grid-cols-4 lg:gap-6">
          {introColumns.map((column) => (
            <p
              key={column.lead}
              className="max-w-[42ch] text-[15px] leading-[1.45] text-pretty text-muted-foreground"
            >
              <strong className="font-medium text-foreground">
                {column.lead}
              </strong>{" "}
              {column.body}
            </p>
          ))}
        </div>
      </section>

      {/* Found photograph: the object Triage's world inherited from. */}
      <figure
        className={cn("triage-reveal", pageGutter, pageWidth, "pb-24 lg:pb-36")}
      >
        <div className="overflow-hidden rounded-lg bg-card p-3 sm:p-6">
          <img
            src="/media/teletype-model-15.jpg"
            width={2000}
            height={1495}
            loading="lazy"
            decoding="async"
            alt="A Teletype Model 15 telegraph printer photographed from the front on a white ground."
            className="w-full"
          />
        </div>
        <figcaption className="mt-4 max-w-[52ch] text-[13px] leading-5 text-muted-foreground">
          A Teletype Model 15 printed arriving messages in order, one line at a
          time. Photograph: Nick Crotty, Museums Victoria, CC BY 4.0.
        </figcaption>
      </figure>

      {/* How it works: what you give, and what comes back. */}
      <section
        aria-labelledby="pipeline-title"
        className={cn(pageGutter, pageWidth, "pb-24 lg:pb-40")}
      >
        <h2
          id="pipeline-title"
          className="max-w-[20ch] text-[clamp(1.6rem,2.4vw,2.25rem)] font-medium tracking-[-0.02em] text-balance"
        >
          From text to decision
        </h2>
        <div className="triage-reveal mt-14 flex flex-col gap-22 lg:mt-20 lg:w-[560px] lg:gap-24">
          {moves.map((move) => (
            <div key={move.lead}>
              <p className="text-xl font-medium tracking-tight text-pretty">
                {move.lead}
              </p>
              <p className="mt-3 max-w-[46ch] text-base leading-7 text-pretty text-muted-foreground">
                {move.body}
              </p>
              <div className="mt-4">{move.content}</div>
            </div>
          ))}
        </div>

        <div className="mt-24 max-w-[40rem]">
          <DiscordChannel messages={sampleChannelMessages} />
        </div>
      </section>

      {/* The queue, on a dark field, under a found photograph of the record
          this product inherits its shape from. */}
      <section
        aria-labelledby="queue-title"
        className="dark bg-background text-foreground pb-24 lg:pb-40"
      >
        <div className={cn(pageGutter, pageWidth, "pt-20 lg:pt-28")}>
          <h2
            id="queue-title"
            className="triage-reveal max-w-[18ch] text-[clamp(1.6rem,2.4vw,2.25rem)] font-medium tracking-[-0.02em] text-balance"
          >
            The queue, in full
          </h2>
          <p className="triage-reveal mt-4 max-w-[52ch] text-base leading-7 text-pretty text-muted-foreground">
            Every submission in a workspace, in the order it arrived, with the
            channel it came from, who sent it, and what a reviewer decided.
            Names, times and reports below are sample records.
          </p>
        </div>

        <figure className="triage-reveal mt-12 lg:mt-16">
          <img
            src="/media/punch-card.jpg"
            width={2406}
            height={1160}
            loading="lazy"
            decoding="async"
            alt="An 80-column punched card, its fixed columns of printed digits broken by rectangular holes punched where a field held a value."
            className="w-full"
          />
          <figcaption
            className={cn(
              pageGutter,
              pageWidth,
              "mx-auto mt-4 max-w-[56ch] text-[13px] leading-5 text-muted-foreground",
            )}
          >
            Every fixed field a system sorts records into began as a hole in a
            card like this one. Photograph: “Punched card” by Mutatis mutandis,
            CC BY 2.5, via Wikimedia Commons.
          </figcaption>
        </figure>

        <div className="triage-reveal mt-12 lg:mt-16">
          <QueueBoard />
        </div>
      </section>

      {/* What a reviewer sees, shown whole with notes in both margins. */}
      <section
        aria-labelledby="reviewer-title"
        className={cn(pageGutter, pageWidth, "pt-24 lg:pt-40")}
      >
        <div className="triage-reveal lg:grid lg:grid-cols-12 lg:gap-6">
          <h2
            id="reviewer-title"
            className="text-[clamp(1.6rem,2.4vw,2.25rem)] font-medium tracking-[-0.02em] text-balance lg:col-span-4 lg:col-start-1 lg:text-[clamp(1.75rem,2.6vw,2.5rem)] lg:text-right"
          >
            What a reviewer sees
          </h2>
          <div className="mt-4 max-w-[52ch] lg:col-span-4 lg:col-start-1 lg:mt-0 lg:self-start lg:text-right">
            <p className="text-base leading-7 text-pretty text-muted-foreground">
              One candidate, opened on its own. The report is stored as it was
              written, a suggested duplicate arrives with the text it matched
              and the score beside it, and the decision is recorded with a name
              and a time. Everything here is sample content.
            </p>
          </div>
          <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
            <ReviewerPanelPlate />
          </div>
        </div>

        {/* The plate's margin notes become a plain list once there is no margin
            left to put them in. */}
        <dl className="triage-reveal mt-10 grid gap-7 lg:hidden">
          {reviewerNotes.map((note) => (
            <div key={note.name}>
              <dt className="text-lg font-medium">{note.name}</dt>
              <dd className="mt-1 text-[15px] leading-6 text-pretty text-muted-foreground">
                {note.body}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Close: one prompt, one field, and what happens next. */}
      <section
        aria-labelledby="close-title"
        className={cn(pageGutter, pageWidth, "pt-32 pb-32 lg:pt-56 lg:pb-48")}
      >
        <div className="triage-reveal max-w-[520px]">
          <p className="text-[clamp(1.4rem,2vw,1.75rem)] leading-[1.25] font-medium text-balance text-muted-foreground">
            Tell us what your team is trying to sort,
            <br />
            <span className="text-foreground">
              and we will tell you plainly whether Triage fits it.
            </span>
          </p>

          <CloseField />

          <p className="mt-4 text-[13px] leading-5 text-muted-foreground">
            Your message opens as an email draft, already addressed and already
            written. Nothing is sent to a server from this page.
          </p>

          <dl className="mt-18 grid gap-6 text-sm lg:mt-16">
            <div>
              <dt className="text-muted-foreground">Email</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${contactEmail}?subject=${encodeURIComponent(contactSubject)}`}
                  className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  {contactEmail}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Status</dt>
              <dd className="mt-1">
                A university project. The features on this site are the ones
                being built for the October demonstration.
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Not yet</dt>
              <dd className="mt-1">
                No GitHub or Jira export. Nothing leaves a workspace without a
                reviewer approving it first.
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}

function CloseField() {
  return (
    <form
      className="mt-7"
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const message = new FormData(form).get("message");
        const subject = encodeURIComponent(`${contactSubject}`);
        const body = encodeURIComponent(String(message ?? ""));
        window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
      }}
    >
      <label htmlFor="close-message" className="sr-only">
        What your team is trying to sort
      </label>
      <textarea
        id="close-message"
        name="message"
        rows={3}
        required
        placeholder="What is arriving, and who ends up reading it?"
        className="min-h-24 w-full resize-y rounded-lg border border-border bg-card px-4 py-3 text-base leading-7 outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      />
      <button
        type="submit"
        className={cn(buttonVariants({ size: "xl", className: "mt-3" }))}
      >
        Open the email draft
      </button>
    </form>
  );
}
