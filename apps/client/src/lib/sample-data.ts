/**
 * Sample workspace content for the public marketing site.
 *
 * Nothing here exists yet: it is sample data chosen so the interface fragments
 * on the site can be read at their real size and density. Replace or clear it
 * once a real workspace can be shown. Triage has no customers, so no real
 * workspace, team, person or report appears anywhere on the site.
 */

export const SAMPLE_WORKSPACE = "Acme Payments";
export const SAMPLE_CHANNEL = "#bug-reports";
export const SAMPLE_DECISION_CHANNEL = "#triage-decisions";
export const SAMPLE_WAITING_COUNT = 3;

export const SAMPLE_CANDIDATE = {
  id: "CAND-0142",
  title: "SSO login loops back to the sign-in screen on Safari 18",
  reporter: "m.okafor",
  received: "Today 09:41",
  body: "Since Friday, signing in with Google on Safari 18 sends us back to the sign-in screen after the consent step. Chrome and Firefox are fine. We are on macOS 15.3, and two of us have reproduced it.",
  duplicate: {
    id: "CAND-0138",
    title: "SSO redirect loop on Safari",
    score: 0.91,
    matchedText:
      "signing in with Google on Safari sends us back to the sign-in screen",
  },
} as const;

export const SAMPLE_INTAKE_ROWS = [
  {
    id: "INT-3118",
    source: "Discord",
    channel: "#bug-reports",
    reporter: "m.okafor",
    preview: "Signing in with Google on Safari 18 sends us back…",
    time: "09:41",
  },
  {
    id: "INT-3117",
    source: "Pasted",
    channel: "Workspace intake",
    reporter: "a.lindqvist",
    preview: "Exports hang past 5,000 rows and never finish…",
    time: "09:12",
  },
  {
    id: "INT-3116",
    source: "Discord",
    channel: "#support-requests",
    reporter: "j.adeyemi",
    preview: "Invoice PDF shows the wrong billing address…",
    time: "08:55",
  },
] as const;

export const SAMPLE_DECISION_LOG = [
  {
    id: "CAND-0141",
    decision: "Approved" as const,
    title: "Exports hang past 5,000 rows",
    reviewer: "a.lindqvist",
    time: "09:58",
  },
  {
    id: "CAND-0140",
    decision: "Rejected" as const,
    title: "Typo in the onboarding headline",
    reviewer: "a.lindqvist",
    time: "Yesterday 17:20",
  },
] as const;

export const SAMPLE_NOTIFICATION = {
  channel: SAMPLE_DECISION_CHANNEL,
  decision: "Approved" as const,
  candidateId: "CAND-0141",
  title: "Exports hang past 5,000 rows",
  reviewer: "a.lindqvist",
} as const;

export type SampleRole = {
  role: string;
  summary: string;
  permission: string;
};

/**
 * The first role contract. Copied in substance from PRODUCT.md; the wording of
 * the permission column is the site's own.
 */
export const SAMPLE_ROLES: SampleRole[] = [
  {
    role: "Submitter",
    summary: "Adds intake and candidates, and follows their status.",
    permission: "Add intake and candidates. View their status.",
  },
  {
    role: "Reviewer",
    summary: "Reads everything that arrives in the workspace and decides.",
    permission: "View workspace submissions. Approve or reject candidates.",
  },
  {
    role: "Admin",
    summary: "Both sets of actions, plus who may join and what they may do.",
    permission: "Both sets of actions. Manage invitations and roles.",
  },
];
