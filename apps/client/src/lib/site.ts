/**
 * Mailto helpers for the marketing site. Triage has no form backend yet:
 * the primary call to action drafts an email through the visitor's own
 * mail client. The destination address is a placeholder until the
 * maintainer finalizes it.
 */

export const ACCESS_EMAIL = "hello@triage.example";

function mailto(recipient: string, subject: string, body: string) {
  const url = new URL(`mailto:${recipient}`);
  url.searchParams.set("subject", subject);
  url.searchParams.set("body", body);
  return url.toString();
}

export function requestAccessUrl(): string {
  return mailto(
    ACCESS_EMAIL,
    "Request access to Triage",
    [
      "Hello Triage team,",
      "",
      "We would like access to Triage for our team.",
      "",
      "Team:",
      "People who review:",
      "Where reports come from:",
      "",
    ].join("\n"),
  );
}

export function privacyUrl(): string {
  return mailto(
    ACCESS_EMAIL,
    "Privacy",
    [
      "Hello Triage team,",
      "",
      "I would like to know how Triage handles personal data.",
      "",
    ].join("\n"),
  );
}

export interface ContactFields {
  name: string;
  email: string;
  company: string;
  message: string;
}

export function contactUrl(fields: ContactFields): string {
  const subject = `Triage contact from ${fields.name}`;
  const body = [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Company: ${fields.company || "Not given"}`,
    "",
    fields.message,
    "",
  ].join("\n");
  return mailto(ACCESS_EMAIL, subject, body);
}
