import { IconLoader2 } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AuthPage, FieldError } from "@/components/auth-page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/sign-up")({ component: SignUpPage });

const fieldProps = {
  className: "min-h-12",
  size: "lg",
  variant: "filled",
} as const;

export function SignUpPage() {
  return (
    <AuthPage
      footer={
        <>
          Already have an account?{" "}
          <Link
            className="rounded-lg underline underline-offset-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            to="/sign-in"
          >
            Sign in
          </Link>
        </>
      }
      intro="Create an account, then join or start a workspace. Invitations and roles are handled by an admin."
      title="Create your account"
    >
      <SignUpForm />
    </AuthPage>
  );
}

function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    const { error: signUpError } = await authClient.signUp.email({
      callbackURL: "/",
      email,
      name,
      password,
    });

    if (signUpError) {
      setPending(false);
      setError(
        signUpError.message ??
          "Could not create the account. Try a different email address.",
      );
      return;
    }

    // A full load so the session cookie is picked up by the whole app.
    window.location.assign("/");
  }

  return (
    <form className="mt-10 flex flex-col gap-5" noValidate onSubmit={onSubmit}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="sign-up-name">Name</Label>
        <Input
          autoComplete="name"
          {...fieldProps}
          id="sign-up-name"
          name="name"
          onChange={(event) => setName(event.target.value)}
          placeholder="Sam Rivera"
          required
          value={name}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="sign-up-email">Email</Label>
        <Input
          autoComplete="email"
          {...fieldProps}
          id="sign-up-email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
          type="email"
          value={email}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="sign-up-password">Password</Label>
        <Input
          autoComplete="new-password"
          {...fieldProps}
          id="sign-up-password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          required
          type="password"
          value={password}
        />
        <p className="text-small text-muted-foreground">
          At least eight characters.
        </p>
      </div>

      {error ? <FieldError>{error}</FieldError> : null}

      <Button disabled={pending} size="xl" type="submit">
        {pending ? (
          <IconLoader2 aria-hidden="true" className="size-5 animate-spin" />
        ) : null}
        {pending ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
