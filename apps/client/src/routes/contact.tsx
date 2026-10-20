import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({ component: Contact });

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  function openMailto() {
    const subject =
      "Triage contact request" + (company ? " from " + company : "");
    const body =
      "Name: " +
      name +
      "\nEmail: " +
      email +
      "\nCompany: " +
      company +
      "\n\nMessage:\n" +
      message;
    const href =
      "mailto:hello@triage.example?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);
    window.location.href = href;
  }

  return (
    <main id="main" tabIndex={-1} className="bg-background">
      <section className="mx-auto max-w-xl px-6 py-16 sm:px-10">
        <h1 className="text-4xl leading-tight font-semibold tracking-tight">
          Contact Triage
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Send a message by opening an email draft in your own client. No form
          backend is used, so the message is yours to send.
        </p>
        <form
          className="mt-8 grid gap-5"
          onSubmit={(event) => {
            event.preventDefault();
            openMailto();
          }}
        >
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              rows={6}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              required
            />
          </div>
          <Button type="submit" size="lg">
            Open email draft
          </Button>
        </form>
        <p className="mt-6 text-xs text-muted-foreground">
          Recipient address must be finalized before launch. Drafts currently
          target hello@triage.example.
        </p>
      </section>
    </main>
  );
}
