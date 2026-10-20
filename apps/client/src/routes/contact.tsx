import { IconSend } from "@tabler/icons-react";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact from ${name || "website"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\n${message}`,
    );
    window.location.href = `mailto:hello@triage.app?subject=${subject}&body=${body}`;
  };

  return (
    <>
      {/* Hero */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-none px-6 sm:px-10 lg:px-16 xl:px-20">
          <h1 className="max-w-5xl text-[clamp(48px,5vw,80px)] leading-[1.0] font-semibold tracking-[-0.03em] text-balance">
            Contact
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-7 text-muted-foreground">
            Tell us about your team and how you handle incoming reports. We will
            email you back.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-none px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Get in touch
              </h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                Fill in the form and we will open your email client with a
                pre-filled message. IconSend it and we will get back to you.
              </p>
              <div className="mt-8 space-y-4 text-sm text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">Email:</span>{" "}
                  hello@triage.app
                </p>
                <p>
                  <span className="font-medium text-foreground">Response:</span>{" "}
                  Within two business days
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Name</Label>
                  <Input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-company">Company</Label>
                <Input
                  id="contact-company"
                  type="text"
                  placeholder="Your company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-message">Message</Label>
                <Textarea
                  id="contact-message"
                  placeholder="Tell us about your team and how you handle incoming reports."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  required
                />
              </div>
              <Button type="submit" size="lg" className="min-h-11">
                <IconSend className="mr-2 size-4" />
                IconSend message
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
