import { useNavigate } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/sign-in")({ component: SignIn });

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    const result = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });
    setPending(false);
    if (result.error) {
      setError(result.error.message ?? "Could not sign in.");
      return;
    }
    navigate({ to: "/" });
  }

  return (
    <main id="main" tabIndex={-1} className="bg-background">
      <section className="mx-auto max-w-md px-6 py-16 sm:px-10">
        <h1 className="text-4xl leading-tight font-semibold tracking-tight">
          Sign in
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Sign in to your Triage workspace.
        </p>
        <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              disabled={pending}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              disabled={pending}
            />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button type="submit" size="lg" disabled={pending}>
            {pending ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        <p className="mt-6 text-sm text-muted-foreground">
          No account yet?{" "}
          <a href="/sign-up" className="text-foreground hover:underline">
            Create one
          </a>
        </p>
      </section>
    </main>
  );
}
