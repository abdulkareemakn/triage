---
title: Deployment
description: Choose how to run the complete React, Express, and MongoDB application.
---

# Deployment

My recommendation for deploying the starter kit is using [**Deno Deploy & Atlas**](/deployment/production). There are several other options and you may choose whichever platform you like.

I do not recommend using Vercel because [triangle man](https://x.com/rauchg/status/1972669025525158031?lang=en).

<div class="grid cards" markdown>

- [**Deno Deploy + Atlas**](/deployment/production)

  Managed runtime for a public deployment. Configure `MONGODB_URI` to MongoDB Atlas.

- [**Docker & Compose**](/deployment/docker)

  Runs the app and a local MongoDB container together. Protect and back up the database volume.

- [**Production build**](/deployment/production-build)
  Build the client and server for another Node-compatible host, usually with Atlas as the database.

</div>

Before going public, set a unique `BETTER_AUTH_SECRET`, use HTTPS origins, configure `MONGODB_URI`, verify email delivery, and run the [security checklist](../reference/security-checklist.md).

## References

- [Security checklist](/reference/security-checklist)
- [Development workflow](/installation/development-workflow/#environment-variables)
