import { createFileRoute } from "@tanstack/react-router";

import { buttonVariants } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: Home });

const repository = "https://github.com/abdulkareemakn/mern-app-starter";
const docs = "https://mern-app-starter.pages.dev";
const setupGuide = `${docs}/installation/`;
const productName = "Launchpad";
const externalLogos: Record<string, string> = {
  react: "https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/react.svg",
  bucket: "https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/backblaze.svg",
  "better-auth":
    "https://raw.githubusercontent.com/better-auth/better-auth/v1.7.5/docs/public/branding/svg/better-auth-mark-bg-light.svg",
  oxc: "https://cdn.jsdelivr.net/gh/oxc-project/oxc-assets@main/icon-flat-light.svg",
  vitest: "https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/vitest.svg",
};
const linkStyle =
  "inline-flex min-h-11 items-center underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground";
const primaryAction = buttonVariants({
  size: "lg",
  className:
    "min-h-11 px-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground motion-reduce:transition-none motion-reduce:active:translate-y-0",
});

const chapters = [
  {
    title: "Build the application",
    description: "The foundations for your first feature.",
    start: 1,
    features: [
      {
        title: "shadcn/ui & design-md",
        description:
          "Base UI components, Tailwind styling, and a documented design system for shaping your interface.",
        logo: "react",
      },
      {
        title: "MongoDB & Mongoose",
        description:
          "A shared MongoDB connection, Mongoose model conventions, local database setup, and shared API and client types.",
        logo: "mongodb",
      },
      {
        title: "Better Auth",
        description:
          "Email and password authentication, database-backed sessions and rate limiting, plus protected API routes.",
        logo: "better-auth",
      },
      {
        title: "Zod validation",
        description:
          "Reusable schemas validate app configuration, request bodies, query parameters, and route parameters.",
        logo: "zod",
      },
    ],
  },
  {
    title: "Connect your services",
    description: "Email, files, and the work behind the scenes.",
    start: 5,
    features: [
      {
        title: "Resend & local email",
        description:
          "Send production email with Resend, capture local messages in MailDev, and preview templates with React Email.",
        logo: "resend",
      },
      {
        title: "Object storage",
        description:
          "Private S3-compatible uploads with signed URLs, ownership checks, upload confirmation, and private downloads.",
        logo: "bucket",
      },
      {
        title: "Reusable middleware",
        description:
          "Shared Express middleware handles session checks, request validation, and consistent API errors.",
        logo: "express",
      },
    ],
  },
  {
    title: "Ship and maintain",
    description: "A path from your laptop to deployment.",
    start: 8,
    features: [
      {
        title: "Deno Deploy",
        description:
          "Build and runtime configuration deploys the React client and Express API together.",
        logo: "deno",
      },
      {
        title: "Docker & Compose",
        description:
          "Compose files provide local MongoDB and storage services, plus a production app and database stack.",
        logo: "docker",
      },
      {
        title: "Formatting & linting",
        description:
          "Shared Oxfmt and Oxlint configuration keeps code formatted and catches common issues across the workspace.",
        logo: "oxc",
      },
      {
        title: "Unit, integration & end-to-end tests",
        description:
          "Vitest unit and API integration tests, Playwright end-to-end tests, and MongoDB-backed CI workflows.",
        logo: "vitest",
      },
      {
        title: "GitHub Actions",
        description:
          "Automated workflows run tests, build the Docker image, and publish the documentation site.",
        logo: "githubactions",
      },
    ],
  },
] as const;

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-6 focus:z-10 focus:rounded-md focus:bg-background focus:p-4 focus:outline-2"
        href="#main"
      >
        Skip to content
      </a>
      <header className="mx-auto flex max-w-none flex-wrap items-center justify-between gap-x-8 gap-y-2 border-b px-6 py-5 sm:px-10 lg:px-16 xl:px-20">
        <a className={`${linkStyle} gap-3 font-medium tracking-tight`} href="/">
          <img
            src="/launchpad.svg"
            alt=""
            width="32"
            height="32"
            className="size-8 shrink-0 dark:invert"
          />
          <span>{productName}</span>
          <span className="font-normal text-muted-foreground">
            MERN starter
          </span>
        </a>
        <nav
          aria-label="Main navigation"
          className="flex flex-wrap gap-x-6 text-sm"
        >
          <a
            className={`${linkStyle} min-w-11 justify-center`}
            href={repository}
            aria-label="GitHub"
          >
            <img
              src="https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/github.svg"
              alt=""
              aria-hidden="true"
              className="size-5"
            />
          </a>
        </nav>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="mx-auto max-w-none px-6 pt-12 pb-16 sm:px-10 sm:pt-16 sm:pb-20 lg:px-16 xl:px-20">
          <h1 className="max-w-5xl text-4xl leading-[1.12] font-medium tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl">
            Build something worth submitting.
            <span className="mt-1 block text-muted-foreground">
              Everything you need to get started.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Launchpad gives you a production grade MERN stack foundation with
            the setup, services, and decisions documented. Spend your time
            building your product instead of setting up services.
          </p>
          <p className="mt-5 text-sm text-muted-foreground">
            MongoDB · Express · React · Node.js
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a className={primaryAction} href={setupGuide}>
              Documentation
            </a>
            <a className={`${linkStyle} text-sm font-medium`} href={repository}>
              View source
            </a>
          </div>
        </section>

        <section
          id="included"
          aria-labelledby="included-title"
          className="mx-auto max-w-none scroll-mt-6 px-6 sm:px-10 lg:px-16 xl:px-20"
        >
          <div className="border-t pt-8">
            <h2
              id="included-title"
              className="text-2xl font-medium tracking-tight sm:text-3xl"
            >
              What's included
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
              A practical starting point, from interface to deployment. Each
              guide shows you where to begin and what to configure.
            </p>
          </div>
          {chapters.map((chapter) => (
            <section
              key={chapter.title}
              aria-labelledby={`chapter-${chapter.start}`}
              className="grid gap-8 py-10 sm:py-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16"
            >
              <div>
                <h3
                  id={`chapter-${chapter.start}`}
                  className="text-lg font-medium tracking-tight"
                >
                  {chapter.title}
                </h3>
                <p className="mt-2 max-w-60 text-sm leading-6 text-muted-foreground">
                  {chapter.description}
                </p>
              </div>
              <ol className="divide-y divide-border border-y border-border">
                {chapter.features.map(({ title, description, logo }, index) => (
                  <li
                    key={title}
                    className="grid gap-3 py-5 md:grid-cols-[minmax(15rem,0.9fr)_minmax(0,1.5fr)] md:items-center md:gap-8 lg:gap-12"
                  >
                    <div className="grid min-w-0 grid-cols-[1.5rem_3rem_minmax(0,1fr)] items-center gap-3 sm:grid-cols-[2rem_3.5rem_minmax(0,1fr)] sm:gap-4">
                      <span
                        aria-hidden="true"
                        className="font-mono text-xs text-muted-foreground"
                      >
                        {String(chapter.start + index).padStart(2, "0")}
                      </span>
                      <div className="flex size-12 items-center justify-center rounded-lg bg-muted p-3 sm:size-14">
                        {logo ? (
                          <img
                            src={externalLogos[logo] ?? `/brands/${logo}.svg`}
                            alt=""
                            aria-hidden="true"
                            className="size-full object-contain"
                          />
                        ) : null}
                      </div>
                      <h4 className="min-w-0 text-base leading-snug font-medium tracking-tight sm:text-lg">
                        {title}
                      </h4>
                    </div>
                    <p className="text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                      {description}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto grid max-w-none gap-8 px-6 py-10 sm:px-10 lg:px-16 xl:px-20">
          <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-start">
            <div>
              <a
                className={`${linkStyle} gap-3 font-medium tracking-tight`}
                href="/"
                aria-label={`${productName} home`}
              >
                <img src="/launchpad.svg" alt="" className="size-9" />
                <span className="text-lg">{productName}</span>
              </a>
              <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                A complete starter kit for the MERN stack.
              </p>
            </div>
            <nav
              aria-label="Footer navigation"
              className="flex flex-col items-start gap-3 text-sm sm:items-end"
            >
              <a className={linkStyle} href={docs}>
                Documentation
              </a>
              <a className={linkStyle} href={repository}>
                GitHub
              </a>
            </nav>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t pt-5 text-sm">
            <p className="text-muted-foreground">© 2026 Abdul Kareem</p>
            <a className={linkStyle} href={`${repository}/blob/main/LICENSE`}>
              MIT License
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
