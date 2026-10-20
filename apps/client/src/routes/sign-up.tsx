import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/sign-up")({
  component: SignUp,
  validateSearch: (
    search: Record<string, unknown>,
  ): { workspace?: string } => ({
    workspace:
      typeof search.workspace === "string" ? search.workspace : undefined,
  }),
});

function SignUp() {
  const navigate = useNavigate();
  const { workspace } = Route.useSearch();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setPending(true);
    const data = new FormData(event.currentTarget);
    const { error: signUpError } = await authClient.signUp.email({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      password: String(data.get("password") ?? ""),
      callbackURL: "/",
    });
    setPending(false);
    if (signUpError) {
      setError(signUpError.message ?? "Could not create the account.");
      return;
    }
    void navigate({ to: "/" });
  };

  return (
    <section className="mx-auto max-w-md px-5 py-16 sm:px-8 md:py-24">
      <h1 className="text-3xl font-semibold tracking-tight">
        Create your Triage workspace
      </h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {workspace
          ? `You are one step from naming “${workspace}”.`
          : "Name your workspace after the account is made, then invite your reviewers."}
      </p>

      <form onSubmit={onSubmit} className="mt-8 grid gap-5" noValidate>
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
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
          />
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-md bg-destructive/10 p-3 text-sm text-destructive"
          >
            {error}
          </p>
        )}

        <Button type="submit" disabled={pending}>
          {pending ? "Creating account…" : "Create account"}
        </Button>
      </form>

      <p className="mt-6 text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          to="/sign-in"
          className="font-medium text-foreground underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
        >
          Sign in
        </Link>
      </p>
    </section>
  );
}
