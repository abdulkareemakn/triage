import { IconArrowRight } from "@tabler/icons-react";
import { useId, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "submitting" | "success" | "error";

/**
 * The landing page's only conversion: one email field and one action.
 * The API is idempotent, so a repeat submission reads as success.
 */
export function WaitlistForm() {
  const inputId = useId();
  const messageId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = email.trim();

    if (!value || value.length > 254 || !emailPattern.test(value)) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: value }),
      });

      if (!response.ok) {
        setStatus("error");
        setMessage(
          response.status === 400
            ? "Enter a valid email address."
            : "Something went wrong. Try again.",
        );
        return;
      }

      setStatus("success");
      setMessage("You're on the list. We'll be in touch.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Could not reach the server. Try again.");
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-md">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Label htmlFor={inputId} className="sr-only">
          Email address
        </Label>
        <Input
          id={inputId}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@yourteam.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error" || status === "success") {
              setStatus("idle");
              setMessage("");
            }
          }}
          aria-invalid={status === "error"}
          aria-describedby={message ? messageId : undefined}
          required
          disabled={status === "submitting"}
          className="h-11 min-w-0 flex-1 sm:min-w-64"
        />
        <Button
          type="submit"
          size="lg"
          className="min-h-11 w-full sm:w-auto"
          disabled={status === "submitting"}
          aria-busy={status === "submitting"}
        >
          {status === "submitting" ? "Joining…" : "Join the waitlist"}
          <IconArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
      <p
        id={messageId}
        role={status === "error" ? "alert" : "status"}
        aria-live={status === "error" ? undefined : "polite"}
        className={cn(
          "mt-2 min-h-5 text-sm",
          status === "error" ? "text-destructive" : "text-muted-foreground",
        )}
      >
        {message}
      </p>
    </form>
  );
}
