---
title: Development
description: Build the application one connected concern at a time, from identity and data to routes, pages, and email.
---

# Build your app

Build in the same order your users experience the product. Start with the data your feature owns, then decide who can access it. Validate each request before an API route writes data. Add a client page once the server contract is clear.

Triage's confirmed first interface pass uses realistic local fixtures while API
contracts are defined, then connects small end-to-end slices. Follow the root
`WORKFLOW.md` and accepted OpenSpec changes for that sequence.

You do not need every page for every feature. A public read-only page, for example,
may only need a route and database query. Start with the smallest relevant path.

<div class="grid cards" markdown>

- [**Database**](/build/database)

  Add application models with Mongoose.

- [**Authentication**](/build/authentication)

  Configure Better Auth and protect data on the server.

- [**Validation**](/build/validation)

  Check untrusted request data before it reaches the database or another service.

- [**API routes**](/build/api-routes)

  Define a contract, implement an Express handler, and call it from the client.

- [**File uploads**](/build/file-uploads)

  Upload to private storage, confirm metadata, and request temporary downloads.

- [**Client pages**](/build/client-pages)

  Add typed TanStack Router pages and loaders.

- [**Emails**](/build/emails)

  Render React Email templates and send them with Resend.

- [**Middleware**](/build/middleware)

  Reuse authentication and authorization guards.

- [**404 page**](/build/not-found-page)

  Customize the screen shown for an unknown URL.

</div>

## Next step

Start with [Database](/build/database), then follow the widget example through Validation, API routes, and Client pages.

## References

- [Project structure](/installation/project-structure)
- [Development workflow](/installation/development-workflow)
