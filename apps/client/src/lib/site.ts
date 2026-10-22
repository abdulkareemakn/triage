/**
 * Mailto helpers for the marketing site. Triage has no contact form backend
 * yet: the contact page drafts a message through the visitor's own mail
 * client. The destination address is a placeholder until the maintainer
 * finalizes it.
 */

export const ACCESS_EMAIL = "hello@triage.example";

function mailto(recipient: string, subject: string, body: string) {
  const url = new URL(`mailto:${recipient}`);
  url.searchParams.set("subject", subject);
  url.searchParams.set("body", body);
  return url.toString();
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
