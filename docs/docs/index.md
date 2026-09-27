---
title: Launchpad
description: A complete starter kit for the MERN stack, with guides for setup, building, and deployment.
sidebar:
  label: Introduction
  order: 0
---

# Launchpad

A complete starter kit for the MERN stack. Launchpad connects a React client,
Express API, MongoDB database, authentication, email, and file storage foundations
in one repository, with guides for setup, development, and deployment.

See the [tech stack reference](/reference/tech-stack) for the complete technology list.

Read this site in order if this is your first full-stack app. It starts with getting
the project running, then covers the decisions that shape its interface, followed by
the parts users depend on most: accounts, data, and safe API input.

<div class="grid cards" markdown>

- [**Start here**](/installation/prerequisites)

  Install the workspace and run the client, server, and database together.

- [**Design and UI**](/build/design-system)

  Choose a visual direction before generating components or writing screens.

- [**Build your app**](/build)

  Build authentication, data, routes, UI, validation, and email features.

- [**Code quality**](/quality)

  Formatting, linting, tests, and documentation for the whole workspace.

- [**Deployment**](/deployment)

  Deno Deploy with MongoDB Atlas, Docker Compose, and production builds.

- [**Reference**](/reference)

  Commands, API endpoints, the security checklist, and starter references.

</div>

## What is included

- pnpm workspace with `apps/client`, `apps/server`, and `packages/shared`
- React 19 + Vite 8 + TanStack Router (file-based routes)
- Express 5 with async-aware error handling and Better Auth sessions
- MongoDB through Mongoose, plus Better Auth's MongoDB adapter
- React Email templates, Resend delivery, and Tailwind CSS v4
- Oxfmt formatting, Oxlint linting, and Node-based tests

## How to use these docs

Newcomers should read Start here, Design and UI, then Build your app. Contributors can
use Code quality as their finishing checklist; operators can start with Deployment.

## References

- [React](https://react.dev/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/docs/)
