import { IconAlertCircle, IconLoader2 } from "@tabler/icons-react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/sign-up")({
  component: SignUp,
});

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError(null);
    const result = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: "/",
    });
    setPending(false);
    if (result.error)
      setError(result.error.message ?? "Account creation failed.");
  }

  return (
    <>
      <section className="py-24 sm:py-28 md:py-32">
        <div className="triage-column" data-reveal>
          <h1 className="font-serif text-[clamp(2.5rem,4.4vw,4.25rem)] font-medium leading-[1.05] tracking-[-0.02em]">
            Create your account
          </h1>
          <p className="mt-6 max-w-[44ch] text-[17px] leading-relaxed text-muted-foreground">
            One account, and every workspace you join.
          </p>

          <form className="mt-10" onSubmit={onSubmit}>
            <div className="grid max-w-md gap-5">
              <div className="grid gap-2">
                <Label htmlFor="signup-name">Name</Label>
                <Input
                  autoComplete="name"
                  id="signup-name"
                  onChange={(event) => setName(event.target.value)}
                  required
                  type="text"
                  value={name}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  autoComplete="email"
                  id="signup-email"
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  type="email"
                  value={email}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  autoComplete="new-password"
                  id="signup-password"
                  minLength={8}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  type="password"
                  value={password}
                />
                <p className="text-sm text-muted-foreground">
                  At least 8 characters.
                </p>
              </div>
              {error && (
                <p
                  className="flex items-start gap-2 rounded-lg bg-destructive/10 px-4 py-3 text-sm leading-relaxed text-destructive"
                  role="alert"
                >
                  <IconAlertCircle
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0"
                  />
                  {error}
                </p>
              )}
              <div>
                <Button size="lg" disabled={pending} type="submit">
                  {pending && (
                    <IconLoader2
                      aria-hidden="true"
                      className="size-4 animate-spin motion-reduce:animate-none"
                    />
                  )}
                  {pending ? "Creating account…" : "Create account"}
                </Button>
              </div>
            </div>
          </form>

          <p className="mt-8 text-sm text-muted-foreground">
            Have an account?{" "}
            <Link
              className="triage-press font-medium text-foreground underline-offset-4 hover:underline"
              to="/sign-in"
            >
              Sign in
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
