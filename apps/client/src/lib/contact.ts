/**
 * The marketing site has no form backend. Every call to action on these pages
 * opens the visitor's mail client with the message already written, so nothing
 * is stored or sent on their behalf.
 */

/**
 * Where the request email is addressed.
 *
 * TODO(maintainer): this address has not been agreed yet. Replace it in this
 * one place before the site is published; every mailto link on the site is
 * built from it.
 */
export const CONTACT_EMAIL = "hello@triage.dev";

export type ContactDraft = {
  name: string;
  email: string;
  company: string;
  message: string;
};

function mailto(subject: string, body: string): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** The primary action across the site: ask for access, with the reason stated. */
export function buildRequestAccessMailto(
  workspace?: string,
  role?: string,
): string {
  const where = workspace?.trim();
  const what = role?.trim();
  return mailto(
    "Request access to Triage",
    [
      "I would like to try Triage with my team.",
      "",
      where ? `Workspace: ${where}` : "Workspace: ",
      what ? `I would join as: ${what}` : "I would join as: ",
      "Team size: ",
      "",
      "How reports reach us today: ",
      "",
      "— Sent from the Triage site",
    ].join("\n"),
  );
}

/** The contact form: the visitor's own words, addressed and ready to send. */
export function buildContactMailto(draft: ContactDraft): string {
  const name = draft.name.trim() || "A visitor";
  const company = draft.company.trim();
  return mailto(
    `Question from ${name}`,
    [
      draft.message.trim(),
      "",
      `— ${name}`,
      draft.email.trim() ? `Reply to: ${draft.email.trim()}` : null,
      company ? `Company: ${company}` : null,
      "— Sent from the Triage site",
    ]
      .filter((line): line is string => line !== null)
      .join("\n"),
  );
}
