/**
 * Shared facts about the Triage marketing site.
 *
 * The contact destination is a placeholder: the team must replace
 * `contactEmail` with a monitored inbox before this ships.
 */
export const productName = "Triage";

export const contactEmail = "hello@triage.example";

export const contactSubject = "Triage enquiry";

/** One pair of page margins for the whole site. */
export const pageGutter = "px-6 lg:px-8";

export const pageWidth = "mx-auto w-full max-w-[1400px]";

export type NavLink = {
  label: string;
  to: string;
};

export const navLinks: NavLink[] = [
  { label: "Features", to: "/features" },
  { label: "Contact", to: "/contact" },
  { label: "Sign in", to: "/sign-in" },
];

export const navAction: NavLink = {
  label: "Start a workspace",
  to: "/sign-up",
};

/**
 * The workspace's existing candidates, used by the live demo on the landing
 * page to compute a duplicate suggestion. These are sample records.
 */
export type SampleCandidate = {
  id: string;
  title: string;
  body: string;
  channel: "Manual intake" | "Discord";
  submittedBy: string;
  receivedAt: string;
};

export const sampleCandidates: SampleCandidate[] = [
  {
    id: "cand-1042",
    title: "Promo code leaves the old basket total",
    body: "After a promo code is removed from the basket the total stays at the discounted amount until the page is reloaded. Seen on Chrome and Safari.",
    channel: "Manual intake",
    submittedBy: "Nadia Okonkwo",
    receivedAt: "09:41",
  },
  {
    id: "cand-1039",
    title: "CSV export drops the last row",
    body: "Exporting a filtered report to CSV leaves off the final row whenever more than fifty rows match the filter.",
    channel: "Discord",
    submittedBy: "Tomás Reyes",
    receivedAt: "08:12",
  },
  {
    id: "cand-1031",
    title: "Session expires during file upload",
    body: "Uploading a file larger than about forty megabytes fails with a 401 part way through, because the session cookie is not renewed mid request.",
    channel: "Discord",
    submittedBy: "Priya Raman",
    receivedAt: "Yesterday",
  },
];

export const stopWords = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "been",
  "but",
  "by",
  "for",
  "from",
  "has",
  "have",
  "in",
  "is",
  "it",
  "its",
  "of",
  "on",
  "or",
  "that",
  "the",
  "then",
  "there",
  "this",
  "to",
  "was",
  "were",
  "when",
  "with",
]);

function contentWords(value: string): Set<string> {
  return new Set(
    value
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((word) => word.length > 2 && !stopWords.has(word)),
  );
}

/**
 * A deliberately small, entirely local comparison: the share of the candidate's
 * words that also appear in the report. Triage compares with embeddings; this
 * is only here so the landing page demo responds to what a visitor types.
 */
export function duplicateScore(
  report: string,
  candidate: SampleCandidate,
): number {
  const reportWords = contentWords(report);
  if (reportWords.size === 0) return 0;
  const candidateWords = contentWords(`${candidate.title} ${candidate.body}`);
  let shared = 0;
  for (const word of reportWords) {
    if (candidateWords.has(word)) shared += 1;
  }
  return shared / reportWords.size;
}
