import { Link, createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import { DecisionRecord, DiscordNotice } from "@/components/product/fragments";
import { AuthShell } from "@/components/site/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/sign-in")({ component: SignIn });

function SignIn() {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setError(null);
    setPending(true);
    const result = await authClient.signIn.email({
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
      callbackURL: "/",
    });
    setPending(false);
    if (result.error) {
      setError(result.error.message ?? "That did not match an account.");
      return;
    }
    window.location.assign("/");
  }

  return (
    <AuthShell
      title="Sign in"
      intro="Sign in to the workspace you are reviewing for. Your active workspace is the one whose queue opens first."
      below={
        <>
          No account yet?{" "}
          <Link
            to="/sign-up"
            className="text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            Start a workspace
          </Link>
          .
        </>
      }
      aside={
        <div className="grid gap-6">
          <DecisionRecord
            decision="Approved"
            reviewer="Priya Raman"
            decidedAt="14:32"
            channel="#triage-review"
          />
          <DiscordNotice decision="Approved" />
        </div>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={error ? true : undefined}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            aria-invalid={error ? true : undefined}
          />
        </div>

        <p
          role={error ? "alert" : undefined}
          aria-live="polite"
          className={cn(
            "text-sm leading-6",
            error ? "text-destructive" : "sr-only",
          )}
        >
          {error ?? ""}
        </p>

        <Button type="submit" size="xl" disabled={pending} className="w-full">
          {pending ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </AuthShell>
  );
}
