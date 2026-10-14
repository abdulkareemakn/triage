import { IconMail } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ACCESS_EMAIL, contactUrl } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  component: Contact,
});

interface Fields {
  name: string;
  email: string;
  company: string;
  message: string;
}

const empty: Fields = { name: "", email: "", company: "", message: "" };

function Contact() {
  const [fields, setFields] = useState<Fields>(empty);
  const [drafted, setDrafted] = useState(false);

  function update(key: keyof Fields, value: string) {
    setFields((current) => ({ ...current, [key]: value }));
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    // No backend exists yet: this opens the visitor's own mail
    // client with the message drafted. Nothing is sent or stored
    // here.
    window.location.href = contactUrl(fields);
    setDrafted(true);
  }

  return (
    <>
      <section className="py-24 sm:py-28 md:py-32">
        <div className="triage-column" data-reveal>
          <h1 className="font-serif text-[clamp(2.5rem,4.4vw,4.25rem)] font-medium leading-[1.05] tracking-[-0.02em]">
            Contact us
          </h1>
          <p className="mt-6 max-w-[44ch] text-[17px] leading-relaxed text-muted-foreground">
            Tell us about your team and the reports you sort every week. A
            person reads every message.
          </p>
        </div>
      </section>

      <section className="pb-24 sm:pb-28 md:pb-32">
        <div className="triage-column" data-reveal>
          <form className="mt-2" onSubmit={onSubmit}>
            <div className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="contact-name">Name</Label>
                <Input
                  id="contact-name"
                  onChange={(event) => update("name", event.target.value)}
                  required
                  value={fields.name}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  onChange={(event) => update("email", event.target.value)}
                  required
                  type="email"
                  value={fields.email}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-company">
                  Company{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="contact-company"
                  onChange={(event) => update("company", event.target.value)}
                  value={fields.company}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-message">Message</Label>
                <Textarea
                  className="min-h-32"
                  id="contact-message"
                  onChange={(event) => update("message", event.target.value)}
                  required
                  value={fields.message}
                />
              </div>
              <div>
                <Button size="lg" type="submit">
                  Draft the email
                </Button>
              </div>
            </div>
          </form>

          {drafted && (
            <output className="mt-6 flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
              <IconMail aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              Your email app should now be open with the message drafted. If it
              did not open,{" "}
              <a
                className="triage-press font-medium text-foreground underline-offset-4 hover:underline"
                href={contactUrl(fields)}
              >
                open the draft again
              </a>
              .
            </output>
          )}

          <div className="mt-10 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              This opens your email app with the message drafted. Nothing is
              sent from this page, and nothing is stored here.
            </p>
            <p>
              Useful to include: the workspace name, how many people review, and
              where reports come from now.
            </p>
            <p>
              Prefer email directly?{" "}
              <a
                className="triage-press font-medium text-foreground underline-offset-4 hover:underline"
                href={`mailto:${ACCESS_EMAIL}`}
              >
                Write to us
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
