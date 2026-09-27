---
title: Development workflow
description: The commands you run while building, including dev servers, type checking, formatting, and tests.
---

# Development workflow

This starter kit gives each local service a fixed localhost port and keeps interactive tools in separate terminals. Return to this page while you work. The normal loop is simple: run the app,
make one focused change, check it, then run the smallest test that can prove it works.

## Environment variables

The root `.env` file holds settings that change between your computer, tests, and a
production host. Copy the safe template once:

=== "Windows PowerShell"

    ```powershell
    Copy-Item .env.example .env
    ```

=== "macOS / Linux"

    ```sh
    cp .env.example .env
    ```

Generate a value for `BETTER_AUTH_SECRET` and paste it into `.env`:

```sh
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64'))"
```

`MONGODB_URI` identifies the application database. `TEST_MONGODB_URI` is deliberately
separate because test runs create and remove temporary databases. `APP_URL` and
`BETTER_AUTH_URL` must be the same public origin in this starter. Do not put a secret,
database URL, or API key in a variable beginning with `VITE_`: Vite exposes those to
browser code.

!!! warning "Keep `.env` private"

    Commit `.env.example`, never `.env`. Production hosts should inject the same values
    through their secret settings instead of copying a development file.

### File storage

This starter kit uses RustFS, an Apache 2.0 S3-compatible server, for local file
uploads. Keep local development on RustFS; use separate R2/B2 buckets in production.
The existing S3 client already uses the path-style addressing RustFS needs.

#### Docker (recommended)

After copying `.env.example` to the root `.env`, run from the repository root:

```sh
pnpm db:up
```

This starts MongoDB and RustFS from `compose.db.yaml`. RustFS is pinned to `1.0.0`;
its API and console bind to host loopback ports `9000` and `9001`. Compose reads
`STORAGE_ACCESS_KEY_ID` and `STORAGE_SECRET_ACCESS_KEY` from the root `.env` using
variable substitution, just like the deployment Compose file. Existing checkouts
must copy the five local storage settings from `.env.example` into `.env` first.
Use only local credentials here.

If MongoDB already runs elsewhere, start only storage:

```sh
docker compose -f compose.db.yaml up -d --wait rustfs
```

The API runs on the host, so keep `STORAGE_ENDPOINT=http://localhost:9000`,
`STORAGE_REGION=us-east-1`, and `STORAGE_BUCKET=mern-local`. A Docker service name
would not resolve from the host or the browser receiving a presigned URL.
`pnpm db:down` stops both services but preserves their named volumes. Adding
`--volumes` deletes the local database and object storage data.

#### Create the local bucket once

RustFS does not create the application's bucket at startup. After either Docker
or Windows setup, open `http://localhost:9001`, sign in with the configured access
and secret keys, and use **Create Bucket** on the **Buckets** page to create
`mern-local` (or the exact `STORAGE_BUCKET` value). Keep the bucket private.
The RustFS 1.0.0 console supports this operation; see the
[official bucket creation guide](https://docs.rustfs.com/en/administration/data/bucket/creation).
The bucket and objects survive restarts in `rustfs-data` or the Windows data directory.

For browser uploads, set the bucket's CORS rule to allow `http://localhost:3000`,
methods `PUT` and `GET`, and header `Content-Type`. Alternatively, RustFS supports a server-wide
`RUSTFS_CORS_ALLOWED_ORIGINS=http://localhost:3000` setting; see the
[RustFS CORS guide](https://docs.rustfs.com/en/administration/cors).
Use the [file upload verification sequence](/build/file-uploads/#verify-and-troubleshoot)
to upload, confirm, and download a file. A healthy container alone does not prove
that the bucket exists or that object access works.

#### Windows without Docker or WSL2

Use one of these alternatives on Windows x86-64, with ports `9000` and `9001` free.
Both run a single-node development process, not a Windows service. Create a dedicated
empty data directory first, for example `C:\rustfs\data`.

=== "RustFS Launcher (GUI)"

    Download the Windows x86-64 installer from the official
    [Launcher releases](https://github.com/rustfs/launcher/releases), install it,
    and open RustFS Launcher. Choose an installer asset, not the source archive.

    Set **Data Path** to `C:\rustfs\data`, **Host** to `127.0.0.1`, and **API Port**
    to `9000`. Enable **Console Endpoint** (disabled by default in Launcher) and set
    **Console Port** to `9001`. Replace the supplied access and secret keys with
    your own non-default local values. Select **Launch RustFS** and wait for online status.

    Use **Stop RustFS** to stop it. Closing the window leaves it in the tray;
    choose **Quit** from the tray to stop and exit.

=== "Standalone binary (PowerShell)"

    Download the Windows x86-64 ZIP asset from the
    [RustFS 1.0.0 release](https://github.com/rustfs/rustfs/releases/tag/1.0.0).
    Choose `rustfs-windows-x86_64-v1.0.0.zip`, then extract it:

    ```powershell
    New-Item -ItemType Directory -Force -Path C:\rustfs\bin, C:\rustfs\data
    Expand-Archive -Path "$HOME\Downloads\rustfs-windows-x86_64-v1.0.0.zip" -DestinationPath C:\rustfs\bin -Force
    Set-Location C:\rustfs\bin
    .\rustfs.exe --help
    ```

    If the archive has a nested folder, change to the directory containing
    `rustfs.exe`. Replace the credential placeholders with your own local values:

    ```powershell
    $env:RUSTFS_ACCESS_KEY = "<your-local-access-key>"
    $env:RUSTFS_SECRET_KEY = "<your-local-secret-key>"
    .\rustfs.exe server `
        --address "127.0.0.1:9000" `
        --console-enable true `
        --console-address "127.0.0.1:9001" `
        "C:\rustfs\data"
    ```

    Keep this PowerShell session open. Press Ctrl+C to stop RustFS.

For either Windows option, set the app's root `.env` to
`STORAGE_ENDPOINT=http://localhost:9000`, `STORAGE_REGION=us-east-1`, and
`STORAGE_BUCKET=mern-local`. Set `STORAGE_ACCESS_KEY_ID` and
`STORAGE_SECRET_ACCESS_KEY` to the same credentials selected above. Restart the API,
then complete **Create the local bucket once** above. The commands and Launcher
fields follow the [official Windows guide](https://docs.rustfs.com/en/installation/windows);
check that guide when using a newer release.

#### Production storage and upload policy

Cloudflare R2 and Backblaze B2 remain the production providers. Create a private
bucket and a bucket-scoped credential that can read, write, and delete objects.
Inject these five settings through the production host's secret settings:

| Variable                    | Value                                                                                   |
| --------------------------- | --------------------------------------------------------------------------------------- |
| `STORAGE_ENDPOINT`          | The provider's S3 HTTP(S) origin, without a bucket path, query, or embedded credentials |
| `STORAGE_REGION`            | `auto` for R2; the bucket's region for B2                                               |
| `STORAGE_BUCKET`            | The private bucket name                                                                 |
| `STORAGE_ACCESS_KEY_ID`     | The storage access key ID; B2 uses an application key ID                                |
| `STORAGE_SECRET_ACCESS_KEY` | The corresponding secret access key; B2 uses the application key                        |

For R2, the usual endpoint is `https://<account-id>.r2.cloudflarestorage.com`.
For B2, use `https://s3.<region>.backblazeb2.com`. Replace the placeholders with the
values shown by the provider. Use HTTPS for hosted buckets.

When all five settings are absent, the API starts but authenticated upload requests
return `503`. If any is supplied, all five must be nonempty or startup fails.
Restart the API after changing configuration. Never prefix storage credentials with
`VITE_` or send them to clients.

The following policy settings already have defaults:

| Variable                     | Default                                           | Accepted values                                                                 |
| ---------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------- |
| `STORAGE_MAX_UPLOAD_BYTES`   | `26214400` (25 MiB)                               | Whole bytes from 1 to 5000000000                                                |
| `STORAGE_ALLOWED_MIME_TYPES` | `image/jpeg,image/png,image/webp,application/pdf` | Comma-separated MIME types with known extensions; no wildcards or empty entries |

The allowlist is trimmed and lowercased during configuration parsing. Requests must
use an exact resulting MIME type.

For browser uploads, configure the bucket's CORS rules to allow the application
origin, `PUT` and `GET`, and the `Content-Type` request header. CORS tells the browser
which cross-origin requests it can make; it does not make the bucket public. Use the
provider's [R2 CORS guide](https://developers.cloudflare.com/r2/buckets/cors/) or
[B2 CORS guide](https://www.backblaze.com/docs/cloud-storage-cross-origin-resource-sharing-rules)
for the provider-specific format.

Follow [File uploads](/build/file-uploads) to verify the configuration with a direct
PUT, confirmation, and private download. Receiving an upload URL alone does not
verify bucket access.

### Upload test database

The upload integration tests read the test database address from the process
environment, not from `.env`. Start a dedicated MongoDB server first, then run one
of these commands from the repository root in the terminal that will run tests.
These examples use the local MongoDB server; substitute a dedicated test server
address when needed.

=== "Windows PowerShell"

    ```powershell
    $env:TEST_MONGODB_URI = "mongodb://127.0.0.1:27017"
    ```

=== "macOS / Linux"

    ```sh
    export TEST_MONGODB_URI=mongodb://127.0.0.1:27017
    ```

The tests supply dummy storage settings and mock S3 network calls. Real bucket
credentials are not needed. See [File uploads: Verify and troubleshoot](/build/file-uploads/#verify-and-troubleshoot)
for the test commands and [Testing](/quality/testing/#mongodb) for MongoDB setup.

## Start the workspace

```sh
pnpm dev
pnpm dev:ui
```

Run these commands in separate terminals:

- `pnpm dev`: API on `http://localhost:3001`, MailDev inbox on `http://localhost:3003`, and SMTP on `localhost:3025`
- `pnpm dev:ui`: interactive Vite client on `http://localhost:3000`
- `pnpm dev:mail`: optional React Email preview on `http://localhost:3002`

Each command owns its terminal. Press Ctrl+C there to stop its processes; Vite's keyboard commands work in the `pnpm dev:ui` terminal.

## Type check while you work

```sh
pnpm typecheck
```

This generates TanStack Router route types and runs each package's typecheck
script.

## Format and lint

```sh
pnpm check
pnpm format
```

`pnpm check` reports lint and formatting problems. `pnpm format` writes
formatting changes and safe lint fixes. See [formatting](/quality/formatting),
[linting](/quality/linting), and the official [Oxfmt](https://oxc.rs/docs/guide/usage/formatter)
and [Oxlint](https://oxc.rs/docs/guide/usage/linter) documentation.

## Run the tests

```sh
pnpm test
pnpm test:e2e
```

`pnpm test` runs the Vitest unit suite followed by the API integration suite.
`pnpm test:e2e` runs the Playwright browser suite. Integration and E2E tests use
separate randomly named databases when persistence is required. See
[Commands](/reference/commands) and [Testing](/quality/testing) for the current test
commands and database setup.

## Build and run

```sh
pnpm build
pnpm start
```

`pnpm build` builds the client and server. `pnpm start` runs the compiled
server; use the Docker commands in [Deployment](/deployment) for the complete
production-style stack.

## Next step

Continue to [Project structure](/installation/project-structure) to locate the code each command affects.

## References

- [RustFS Docker installation](https://docs.rustfs.com/en/installation/container/docker)
- [RustFS Windows installation](https://docs.rustfs.com/en/installation/windows)
- [RustFS health endpoints](https://docs.rustfs.com/en/operations/status-check)

- [Node environment files](https://nodejs.org/api/environment_variables.html#env-files)
- [Vite environment variables](https://vite.dev/guide/env-and-mode)
- [Cloudflare R2 S3 client configuration](https://developers.cloudflare.com/r2/examples/aws/aws-sdk-js-v3/)
- [Cloudflare R2 CORS configuration](https://developers.cloudflare.com/r2/buckets/cors/)
- [Backblaze B2 S3-compatible API](https://www.backblaze.com/docs/cloud-storage-s3-compatible-api)
- [Backblaze B2 CORS rules](https://www.backblaze.com/docs/cloud-storage-cross-origin-resource-sharing-rules)

Related starter documentation:

- [File uploads](/build/file-uploads)
- [Commands](/reference/commands)
- [Testing](/quality/testing)
