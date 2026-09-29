---
title: Docker
description: Build the production image or run the complete application and MongoDB stack with Docker Compose.
---

# Docker

This starter kit includes a multi-stage `Dockerfile` that builds the client and server, then creates a
smaller production image that runs as the non-root `node` user. Environment files are
excluded from the image; provide secrets only at runtime.

## Build the image

From the repository root:

```sh
docker build -t mern-template .
```

Pushes, pull requests, and manual runs start `.github/workflows/docker.yaml`. It calls the reusable checks workflow for formatting, linting, unit tests, integration tests, and end-to-end tests. After all checks pass, Buildx builds the production image and caches layers. Runs on the default branch publish `ghcr.io/<owner>/<repository>` with `sha-<full-commit-sha>` and `latest` tags; pull requests and other branches only build. Publishing uses the built-in `GITHUB_TOKEN` with package write permission and needs no additional registry secret. GHCR stores the image; deploying it to a running host is a separate step.

Actions are pinned to commit SHAs. The Node base image and MongoDB and RustFS service images are pinned to manifest digests. Update these pins regularly to receive security fixes.

The image contains the compiled server and `apps/client/dist`. It expects a reachable
MongoDB instance plus the production settings from [Production build](/deployment/production-build).

## Publish to GHCR

Push the workflow changes to the repository's default branch. Once all checks pass,
the workflow publishes the image to GitHub Container Registry (GHCR). No additional
registry secrets are required; GitHub supplies `GITHUB_TOKEN` automatically.

The package is private on first publication. To allow anonymous pulls, open the
package's settings on GitHub and change its visibility to public. For private
packages, the deployment host must authenticate to GHCR with access to the package.

Publishing does not start or update the application on a server. Configure the
deployment host separately to pull the image, supply production settings, and run
the container.

## Run the complete stack

For a local stack, copy `.env.example` to `.env`. Set a generated `BETTER_AUTH_SECRET`, set `RESEND_API_KEY`, and set both `APP_URL` and `BETTER_AUTH_URL` to `http://localhost:3000`. For a public host, use its real HTTPS origin for both URLs and provide the secrets through the host. Then run:

```sh
pnpm docker:up
```

This runs `compose.yaml`: one app image, Express serving the SPA and API, and MongoDB
on an internal network with a persistent volume. The app is published on port 3000 by
default; change `APP_PORT` to use another host port. Stop `pnpm dev:ui` first if it is using
that port.

## Data and volumes

Stop the stack with:

```sh
pnpm docker:down
```

This preserves its `mongo-data` volume. `docker compose down --volumes` permanently
deletes the full-stack database. The local development database below uses a separate
Compose project and volume, so it does not share accounts or data with this stack.

## Local development database

Use `compose.db.yaml` when development runs on your machine but MongoDB runs in Docker:

```sh
pnpm db:up
pnpm db:down
```

It runs MongoDB 8.0 with a health check and exposes port 27017 only on loopback.

## What the template does not do

This is a single-host reference. It does not provision DNS, TLS, backups, or a managed
database. For production, use MongoDB Atlas instead of the Compose
database when you need managed backups and availability: set `MONGODB_URI` to the Atlas
SRV URI and do not expose a local MongoDB port. Put the app behind your provider's HTTPS
ingress or reverse proxy and inject secrets through the deployment platform.

## Next step

Use the [Security checklist](/reference/security-checklist) before exposing the stack to users.

## References

- [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [Docker Compose](https://docs.docker.com/compose/)
- [Security checklist](/reference/security-checklist)
