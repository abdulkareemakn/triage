import { IconArrowRight } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import { Reveal, useRevealOnScroll } from "@/components/marketing/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({ component: Contact });

/**
 * PLACEHOLDER destination. The real mailbox must be decided before this
 * page is deployed; nothing is sent from a backend — the form only opens
 * the visitor's own email client with the message prefilled.
 */
const destination = "hello@triage.example";

type Status = "idle" | "opened";

function Contact() {
  useRevealOnScroll();
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = `Triage enquiry from ${name || "the website"}`;
    const body = [
      message,
      "",
      "---",
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
    ]
      .filter((line) => line !== null)
      .join("\n");

    window.location.href = `mailto:${destination}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setStatus("opened");
  };

  return (
    <>
      <section className="px-5 pt-16 pb-24 sm:px-8 md:pt-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-xl">
            <Reveal>
              <h1 className="text-[clamp(1.5rem,3.5vw,1.875rem)] leading-[1.2] font-medium tracking-tight">
                <span className="block text-muted-foreground">
                  Tell us what your team
                </span>
                <span className="block">is trying to triage.</span>
              </h1>
            </Reveal>

            <Reveal delay={90}>
              <form onSubmit={onSubmit} className="mt-10 grid gap-5">
                <div className="grid gap-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="company">Company (optional)</Label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="What arrives as reports today, and who reads them?"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button type="submit">
                    Open in email
                    <IconArrowRight size={16} stroke={2} aria-hidden="true" />
                  </Button>
                </div>
                <p className="text-[0.8125rem] leading-5 text-muted-foreground">
                  {status === "opened"
                    ? "Your email app should be open with the message filled in. If nothing happened, write to the address below."
                    : "This opens your email app with everything filled in. Nothing is sent from this page."}
                </p>
              </form>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <dl className="mt-20 grid max-w-xl gap-6 text-[0.875rem] leading-5 sm:grid-cols-3">
              <div>
                <dt className="text-muted-foreground">Email</dt>
                <dd className="mt-1">
                  <a
                    className="underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
                    href={`mailto:${destination}`}
                  >
                    {destination}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Project</dt>
                <dd className="mt-1">Triage, a university project</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Mailing list</dt>
                <dd className="mt-1">None yet</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* The other sorting yard: a rail marshalling yard, where "triage"
          names the sorting itself. */}
      <section className="px-5 pb-20 sm:px-8">
        <figure className="mx-auto max-w-6xl">
          <img
            src="/photos/denges-triage-yard.jpg"
            alt="a rail marshalling yard seen from above, with many branching tracks and a clock on a pole"
            width="2592"
            height="1944"
            loading="lazy"
            decoding="async"
            className="aspect-[21/9] w-full rounded-md object-cover"
          />
          <figcaption className="mt-3 text-xs leading-5 text-muted-foreground">
            A marshalling yard at Denges, where the sorting is called triage.
            MHM55, CC BY-SA 4.0, via Wikimedia Commons. A photograph of the
            world around the name, not of the product.
          </figcaption>
        </figure>
      </section>
    </>
  );
}
