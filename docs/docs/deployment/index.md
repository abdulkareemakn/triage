---
title: Deployment
description: Choose how to run the complete React, Express, and MongoDB application.
---

# Deployment

This starter kit supports Railway for a hosted application and Docker Compose for a
single-host stack. Both use one Express process to serve the React app and API.
Railway is the recommended student deployment path: GitHub deploys the app, while
MongoDB and a private storage bucket live in the same Railway project.

<div class="grid cards" markdown>

- [**Railway**](/deployment/production)

  Deploy from GitHub using the Dockerfile. Define the app, MongoDB, and bucket with
  infrastructure as code. Sleeping services have cold starts and usage is metered.

- [**Docker & Compose**](/deployment/docker)

  Run the app and MongoDB on a host you manage. Configure HTTPS, production storage,
  backups, and deployment updates yourself.

- [**Production build**](/deployment/production-build)

  Build the client and server for another Node-compatible host with a reachable
  MongoDB database and an S3-compatible storage provider.

</div>

Before going public, set a unique `BETTER_AUTH_SECRET`, use matching HTTPS origins,
configure the database and storage, verify email delivery, and run the
[security checklist](/reference/security-checklist).

## References

- [Railway infrastructure as code](https://docs.railway.com/infrastructure-as-code)
- [Railway pricing](https://railway.com/pricing)
- [Docker Compose](https://docs.docker.com/compose/)
