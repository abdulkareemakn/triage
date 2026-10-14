import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  contactEmail,
  contactSubject,
  pageGutter,
  pageWidth,
} from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({ component: Contact });

type Fields = {
  name: string;
  email: string;
  company: string;
  message: string;
};

function Contact() {
  const [missing, setMissing] = useState<readonly (keyof Fields)[]>([]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const fields: Fields = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    const empty = (Object.keys(fields) as (keyof Fields)[]).filter(
      (key) => fields[key].length === 0,
    );
    if (empty.length > 0) {
      setMissing(empty);
      return;
    }
    setMissing([]);

    const subject = `${contactSubject} from ${fields.name}${
      fields.company ? ` at ${fields.company}` : ""
    }`;
    const body = [
      `Name: ${fields.name}`,
      `Email: ${fields.email}`,
      `Company: ${fields.company || "—"}`,
      "",
      fields.message,
    ].join("\n");

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  const invalid = (field: keyof Fields) =>
    missing.includes(field) ? true : undefined;

  return (
    <>
      <section
        className={cn(
          pageGutter,
          pageWidth,
          "pt-6 pb-12 sm:pt-10 lg:pt-16 lg:pb-16",
        )}
      >
        <h1 className="max-w-[16ch] text-[clamp(2.4rem,4.6vw,4rem)] leading-[1.03] font-medium tracking-[-0.035em] text-balance">
          Ask us anything about Triage
        </h1>
        <p className="mt-6 max-w-[46ch] text-lg leading-7 text-pretty text-muted-foreground">
          Tell us what your team is trying to sort and who ends up reading it.
          Your answers are written into an email draft with a subject we can
          answer, so there is nothing to retype and no form backend pretending
          to receive it.
        </p>
      </section>

      {/* The contact section redrawn to the coupon blueprint: one filled card
          in a strong flat colour, spanning most of the grid. */}
      <section
        aria-labelledby="contact-form-title"
        className={cn(pageGutter, pageWidth, "pb-24 lg:pb-32")}
      >
        <form
          onSubmit={handleSubmit}
          noValidate
          className="dark grid gap-8 rounded-lg bg-background px-6 py-10 text-foreground sm:px-10 lg:grid-cols-12 lg:px-14 lg:py-16"
        >
          <h2
            id="contact-form-title"
            className="text-[clamp(1.5rem,2.2vw,2rem)] font-medium tracking-[-0.02em] text-balance lg:col-span-4"
          >
            Write your enquiry
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-8 lg:gap-7">
            <div className="grid gap-2">
              <Label htmlFor="name">Your name</Label>
              <Input
                id="name"
                name="name"
                autoComplete="name"
                required
                aria-invalid={invalid("name")}
                placeholder="Nadia Okonkwo"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Your email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                aria-invalid={invalid("email")}
                placeholder="you@company.com"
              />
            </div>
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="company">Company or team</Label>
              <Input
                id="company"
                name="company"
                autoComplete="organization"
                required
                aria-invalid={invalid("company")}
                placeholder="Northwind"
              />
            </div>
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="message">
                What is arriving, and who reads it?
              </Label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                required
                aria-invalid={invalid("message")}
                placeholder="Support mail, Discord messages and a stand-up note all end up in the same place, and nobody is sure which of them is worth an issue."
              />
            </div>

            <p
              role={missing.length > 0 ? "alert" : undefined}
              aria-live="polite"
              className={cn(
                "text-sm leading-6 sm:col-span-2",
                missing.length > 0 ? "text-destructive" : "sr-only",
              )}
            >
              {missing.length > 0
                ? "Fill in every field so the draft has enough to answer with."
                : ""}
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:col-span-2">
              <Button type="submit" size="xl">
                Open the email draft
              </Button>
              <p className="text-sm text-muted-foreground">
                Nothing is sent from this page.
              </p>
            </div>
          </div>
        </form>
      </section>

      <section
        aria-labelledby="contact-details-title"
        className={cn(pageGutter, pageWidth, "pb-28 lg:pb-40")}
      >
        <h2
          id="contact-details-title"
          className="text-[clamp(1.5rem,2.2vw,2rem)] font-medium tracking-[-0.02em]"
        >
          Before you write
        </h2>
        <dl className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8">
          <div>
            <dt className="text-sm text-muted-foreground">Email</dt>
            <dd className="mt-2 text-base">
              <a
                href={`mailto:${contactEmail}?subject=${encodeURIComponent(contactSubject)}`}
                className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                {contactEmail}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Status</dt>
            <dd className="mt-2 text-base leading-7 text-pretty">
              A university project. The features listed on this site are the
              ones being built for the October demonstration.
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">
              Worth asking about
            </dt>
            <dd className="mt-2 text-base leading-7 text-pretty">
              Whether Triage fits a team that already has an issue tracker, and
              what the Discord intake needs set up first.
            </dd>
          </div>
        </dl>
      </section>
    </>
  );
}
