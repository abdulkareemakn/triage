import { Link, createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import {
  CandidateList,
  WorkspaceSwitcher,
} from "@/components/product/workspace-fragments";
import { AuthShell } from "@/components/site/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/sign-up")({ component: SignUp });

function SignUp() {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setError(null);
    setPending(true);
    const result = await authClient.signUp.email({
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
      callbackURL: "/",
    });
    setPending(false);
    if (result.error) {
      setError(result.error.message ?? "That account could not be created.");
      return;
    }
    window.location.assign("/");
  }

  return (
    <AuthShell
      title="Start a workspace"
      intro="One account, one workspace to begin with. You can invite people with a link or a code once you are in."
      below={
        <>
          Already have an account?{" "}
          <Link
            to="/sign-in"
            className="text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            Sign in
          </Link>
          .
        </>
      }
      aside={
        <div className="grid gap-6">
          <WorkspaceSwitcher />
          <CandidateList />
        </div>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="name">Your name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={error ? true : undefined}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Work email</Label>
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
            autoComplete="new-password"
            required
            minLength={8}
            aria-invalid={error ? true : undefined}
            aria-describedby="password-hint"
          />
          <p id="password-hint" className="text-sm text-muted-foreground">
            At least eight characters.
          </p>
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
          {pending ? "Creating your workspace…" : "Create workspace"}
        </Button>
      </form>
    </AuthShell>
  );
}
