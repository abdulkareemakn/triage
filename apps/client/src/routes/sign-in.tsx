import { IconLoader2 } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AuthPage, FieldError } from "@/components/auth-page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/sign-in")({ component: SignInPage });

const fieldProps = {
  className: "min-h-12",
  size: "lg",
  variant: "filled",
} as const;

export function SignInPage() {
  return (
    <AuthPage
      footer={
        <>
          No account yet?{" "}
          <Link
            className="rounded-lg underline underline-offset-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            to="/sign-up"
          >
            Create one
          </Link>
        </>
      }
      intro="Sign in to the workspace you were invited to. Your role decides what you can do once you are in."
      title="Welcome back"
    >
      <SignInForm />
    </AuthPage>
  );
}

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    const { error: signInError } = await authClient.signIn.email({
      callbackURL: "/",
      email,
      password,
    });

    if (signInError) {
      setPending(false);
      setError(
        signInError.message ??
          "Could not sign in. Check the email and password.",
      );
      return;
    }

    // A full load so the session cookie is picked up by the whole app.
    window.location.assign("/");
  }

  return (
    <form className="mt-10 flex flex-col gap-5" noValidate onSubmit={onSubmit}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="sign-in-email">Email</Label>
        <Input
          autoComplete="email"
          {...fieldProps}
          id="sign-in-email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
          type="email"
          value={email}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="sign-in-password">Password</Label>
        <Input
          autoComplete="current-password"
          {...fieldProps}
          id="sign-in-password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          required
          type="password"
          value={password}
        />
      </div>

      {error ? <FieldError>{error}</FieldError> : null}

      <Button disabled={pending} size="xl" type="submit">
        {pending ? (
          <IconLoader2 aria-hidden="true" className="size-5 animate-spin" />
        ) : null}
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
