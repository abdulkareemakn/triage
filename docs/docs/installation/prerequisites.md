---
title: Prerequisites
description: Install Git, Node.js 24+, pnpm 11.3.0, and Docker before starting the workspace.
---

# Prerequisites

This starter kit needs Git, Node.js 24 or newer, pnpm 11.3.0, and Docker with Compose.
Docker runs the local MongoDB and RustFS services. A GitHub account is only needed if
you plan to publish the repository or deploy the documentation site.

## Git and Node.js

Node.js 24+ is required.

=== "Windows"

    ```powershell
    winget install --id Git.Git
    winget install -e --id OpenJS.NodeJS
    ```

=== "macOS"

    ```sh
    brew install git node
    ```

=== "Ubuntu / Debian / Mint"

    ```sh
    sudo apt install git
    ```

    Install Node.js 24 or newer from the [official Node.js downloads](https://nodejs.org/en/download) and verify `node --version`. The distribution package may be older than the required version.

    ```sh
    node --version
    ```

=== "Fedora / RHEL"

    ```sh
    sudo dnf install git
    ```

    Install Node.js 24 or newer from the [official Node.js downloads](https://nodejs.org/en/download) and verify `node --version`. The distribution package may be older than the required version.

    ```sh
    node --version
    ```

Official install instructions: [Git](https://git-scm.com/downloads) · [Node.js](https://nodejs.org/en/download)

## pnpm

The repository pins pnpm 11.3.0 in the root `package.json`.

```sh
npm install --global pnpm@11.3.0
```

Verify each with:

```sh
git --version
node --version
npm --version
pnpm --version
```

Official install instructions: [pnpm](https://pnpm.io/installation)

## Docker

Install Docker Desktop on Windows or macOS. On Linux, install Docker Engine and the
Compose plugin. Start Docker, then verify Compose is available:

```sh
docker compose version
```

## An editor

Use any editor with TypeScript support. The repository includes shared settings in
`.vscode/`; Oxfmt and Oxlint handle formatting and linting from the workspace root.

## Next steps

Continue to [Installation](/installation/installation).

## References

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download)
- [Docker installation](https://docs.docker.com/get-started/get-docker/)
