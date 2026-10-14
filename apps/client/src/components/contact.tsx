import { IconArrowNarrowRight, IconSend } from "@tabler/icons-react";
import { useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT_EMAIL, buildContactMailto } from "@/lib/contact";

const fieldProps = {
  className: "min-h-12",
  size: "lg",
  variant: "filled",
} as const;

/**
 * The contact form. It builds an email in the visitor's own mail client with
 * what they typed already in it; nothing is posted anywhere and nothing is
 * stored by this page.
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  return (
    <form
      className="mt-10 flex max-w-[38rem] flex-col gap-6"
      onSubmit={(event) => {
        event.preventDefault();
        window.location.href = buildContactMailto({
          company,
          email,
          message,
          name,
        });
      }}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-name">Your name</Label>
          <Input
            autoComplete="name"
            {...fieldProps}
            id="contact-name"
            name="name"
            onChange={(event) => setName(event.target.value)}
            placeholder="Sam Rivera"
            required
            value={name}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            autoComplete="email"
            {...fieldProps}
            id="contact-email"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="sam@example.com"
            required
            type="email"
            value={email}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-company">Company or team</Label>
        <Input
          autoComplete="organization"
          {...fieldProps}
          id="contact-company"
          name="company"
          onChange={(event) => setCompany(event.target.value)}
          placeholder="Acme Payments"
          value={company}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-message">How do reports reach you?</Label>
        <Textarea
          {...fieldProps}
          id="contact-message"
          name="message"
          onChange={(event) => setMessage(event.target.value)}
          placeholder="We get them in a Discord channel and a shared inbox, and twice a week someone gathers them into a spreadsheet."
          required
          rows={5}
          value={message}
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <Button size="xl" type="submit">
          Write the email
          <IconSend aria-hidden="true" className="size-5" />
        </Button>
        <p className="text-small text-muted-foreground">
          Opens your mail app with the message written. Nothing is stored and
          nothing is sent on your behalf.
        </p>
      </div>
    </form>
  );
}

export function ContactIntro() {
  return (
    <div className="flex flex-col gap-6">
      <a
        className={buttonVariants({
          className:
            "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
          size: "xl",
        })}
        href={`mailto:${CONTACT_EMAIL}`}
      >
        Email us instead
        <IconArrowNarrowRight aria-hidden="true" className="size-5" />
      </a>
      <dl className="flex flex-col gap-5 text-small">
        <div>
          <dt className="text-muted-foreground">Email</dt>
          <dd className="mt-1 text-body">{CONTACT_EMAIL}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">What happens next</dt>
          <dd className="mt-1 max-w-[42ch] text-body text-muted-foreground">
            A person reads the message and replies from the same address. There
            is no ticket system on this side.
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Where reports arrive</dt>
          <dd className="mt-1 max-w-[42ch] text-body text-muted-foreground">
            A Discord channel, a shared inbox, a support form, or pasted by
            hand. Triage is set up to match whichever you already use.
          </dd>
        </div>
      </dl>
    </div>
  );
}
