import {
  IconArrowRight,
  IconCheck,
  IconPlayerSkipForward,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";

/**
 * The page's one live thing: Triage's own function, performed here.
 * A visitor types or loads a report, creates a candidate, and runs the
 * duplicate check against sample candidates in a sample workspace. The
 * reviewer then confirms or dismisses the match, which is the product's
 * central act. The overlap score is a client-side stand-in for the
 * OpenRouter embeddings slice and is marked as sample content.
 * The readout prints values read from the page itself: the real ground
 * colour of the hero and the real size of the headline.
 */

const SAMPLES = [
  "Signing in with Safari fails on the settings page since Tuesday. Error 500 appears right after the password is entered.",
  "The CSV export loses the final two columns when a report has more than forty rows.",
  "The mobile app crashes when opening a workspace with more than two hundred candidates.",
];

const CANDIDATES = [
  {
    title: "Sign-in fails on Safari",
    text: "Since Tuesday, signing in with Safari fails on the settings page. Error 500 appears after entering the password.",
  },
  {
    title: "CSV export drops columns",
    text: "The CSV export drops the last two columns when a report has more than forty rows.",
  },
  {
    title: "Invite emails arrive late",
    text: "New invite emails arrive about an hour late, and some land in spam.",
  },
] as const;

const MATCH_THRESHOLD = 25;

const STOPWORDS = new Set([
  "about",
  "after",
  "again",
  "also",
  "and",
  "are",
  "before",
  "been",
  "being",
  "because",
  "between",
  "can",
  "during",
  "does",
  "done",
  "each",
  "every",
  "for",
  "from",
  "has",
  "have",
  "how",
  "in",
  "into",
  "is",
  "its",
  "just",
  "last",
  "like",
  "many",
  "most",
  "more",
  "much",
  "next",
  "only",
  "onto",
  "our",
  "out",
  "over",
  "per",
  "right",
  "same",
  "some",
  "such",
  "than",
  "that",
  "the",
  "their",
  "them",
  "then",
  "there",
  "these",
  "they",
  "this",
  "those",
  "through",
  "to",
  "too",
  "under",
  "until",
  "upon",
  "via",
  "was",
  "way",
  "what",
  "when",
  "where",
  "which",
  "while",
  "who",
  "why",
  "will",
  "with",
  "within",
  "without",
  "your",
]);

function tokens(text: string): Set<string> {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOPWORDS.has(word));
  return new Set(words);
}

/** Jaccard overlap of the meaningful words, as an honest stand-in for
 * the embeddings similarity the product will use. */
function overlap(a: string, b: string): number {
  const left = tokens(a);
  const right = tokens(b);
  if (left.size === 0 || right.size === 0) return 0;
  let shared = 0;
  for (const token of left) {
    if (right.has(token)) shared += 1;
  }
  return Math.round((shared / (left.size + right.size - shared)) * 100);
}

function excerpt(text: string, length = 140): string {
  return text.length > length ? `${text.slice(0, length - 1)}…` : text;
}

function titleFrom(report: string): string {
  const words = report
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 6)
    .join(" ");
  return words || "Untitled candidate";
}

interface Match {
  index: number;
  score: number;
}

export function IntakeInstrument() {
  const [text, setText] = useState<string>(SAMPLES[0]);
  const [candidate, setCandidate] = useState<{
    report: string;
    title: string;
  } | null>(null);
  const [verdict, setVerdict] = useState<"none" | "confirmed" | "dismissed">(
    "none",
  );
  const [readout, setReadout] = useState("");

  const report = candidate?.report ?? text;

  const best: Match = useMemo(() => {
    let top: Match = { index: -1, score: 0 };
    CANDIDATES.forEach((existing, index) => {
      const score = overlap(report, existing.text);
      if (score > top.score) top = { index, score };
    });
    return top.score >= MATCH_THRESHOLD ? top : { index: -1, score: 0 };
  }, [report]);

  const readPage = () => {
    const ground = document.querySelector<HTMLElement>("[data-hero-ground]");
    const headline = document.querySelector<HTMLElement>("h1");
    const groundValue = ground
      ? getComputedStyle(ground).backgroundColor
      : "unknown";
    const headlineValue = headline
      ? getComputedStyle(headline).fontSize
      : "unknown";
    setReadout(
      `ground ${groundValue} · headline ${headlineValue} · report ${report.length} characters`,
    );
  };

  useEffect(() => {
    readPage();
    // Runs once on mount; the values it reads do not change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function loadNextSample() {
    const next = (SAMPLES.indexOf(text) + 1) % SAMPLES.length;
    setText(SAMPLES[next]);
    setCandidate(null);
    setVerdict("none");
  }

  function createCandidate() {
    setCandidate({ report: text, title: titleFrom(text) });
    setVerdict("none");
    window.setTimeout(readPage, 0);
  }

  function startOver() {
    setCandidate(null);
    setVerdict("none");
    window.setTimeout(readPage, 0);
  }

  return (
    <div data-ui="instrument" className="fx-card w-full p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium">Intake</p>
        <span className="fx-chip">Sample workspace</span>
      </div>

      {candidate === null ? (
        <>
          <textarea
            aria-label="Report text"
            className="fx-field mt-4 w-full resize-none p-3"
            onChange={(event) => setText(event.target.value)}
            rows={4}
            value={text}
          />
          <div className="mt-3 flex items-center justify-between gap-3">
            <button
              className="fx-btn fx-btn--quiet"
              onClick={loadNextSample}
              type="button"
            >
              <IconPlayerSkipForward aria-hidden="true" className="size-4" />
              Try another sample
            </button>
            <span className="fx-readout fx-soft tabular-nums">
              {text.length} characters
            </span>
          </div>
          <button
            className="fx-btn fx-btn--primary mt-4 w-full"
            onClick={createCandidate}
            type="button"
          >
            Create candidate
            <IconArrowRight aria-hidden="true" className="size-4" />
          </button>
        </>
      ) : (
        <article className="mt-4">
          <label className="fx-readout fx-soft" htmlFor="candidate-title">
            Candidate title
          </label>
          <input
            className="fx-field mt-1 w-full p-2.5 text-sm"
            id="candidate-title"
            onChange={(event) =>
              setCandidate({ ...candidate, title: event.target.value })
            }
            type="text"
            value={candidate.title}
          />
          <p className="fx-small fx-soft mt-3 leading-relaxed">
            {excerpt(candidate.report)}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="fx-readout fx-soft tabular-nums">
              {candidate.report.length} characters
            </span>
            <span className="fx-soft" aria-hidden="true">
              ·
            </span>
            <span className="fx-readout fx-soft">Typed intake</span>
            <span className="fx-soft" aria-hidden="true">
              ·
            </span>
            <span className="fx-chip fx-chip--on">Awaiting review</span>
          </div>

          {best.index >= 0 ? (
            <div className="mt-4">
              <p className="fx-readout font-medium">Possible duplicate</p>
              <div className="mt-2 flex items-baseline justify-between gap-3">
                <p className="truncate text-sm">
                  {CANDIDATES[best.index].title}
                </p>
                <span className="fx-readout tabular-nums">
                  {best.score}% match
                </span>
              </div>
              <div aria-hidden="true" className="fx-bar mt-2">
                <span
                  style={
                    {
                      "--match-width": `${best.score}%`,
                    } as CSSProperties
                  }
                />
              </div>
              <p className="fx-readout fx-soft mt-2 line-clamp-2 leading-relaxed">
                {excerpt(CANDIDATES[best.index].text, 110)}
              </p>
              {verdict === "none" ? (
                <div className="mt-3 flex gap-2">
                  <button
                    className="fx-btn fx-btn--primary"
                    onClick={() => setVerdict("confirmed")}
                    type="button"
                  >
                    <IconCheck aria-hidden="true" className="size-4" />
                    Confirm
                  </button>
                  <button
                    className="fx-btn fx-btn--quiet"
                    onClick={() => setVerdict("dismissed")}
                    type="button"
                  >
                    <IconX aria-hidden="true" className="size-4" />
                    Dismiss
                  </button>
                </div>
              ) : (
                <p className="fx-readout mt-3">
                  {verdict === "confirmed"
                    ? "You confirmed the match. The decision is recorded with your name and time."
                    : "You dismissed the suggestion. The candidate stays as it is."}
                </p>
              )}
            </div>
          ) : (
            <p className="fx-readout fx-soft mt-4">
              No likely duplicates in this workspace.
            </p>
          )}

          <button
            className="fx-btn fx-btn--quiet mt-4"
            onClick={startOver}
            type="button"
          >
            Start over
          </button>
        </article>
      )}

      <p className="fx-rule fx-readout fx-soft mt-4 pt-3 tabular-nums">
        {readout}
      </p>
    </div>
  );
}
