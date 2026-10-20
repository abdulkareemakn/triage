---
title: Commands
description: Every script in the root package.json, what it runs, and when to use it.
---

# Commands

All commands run from the repository root unless noted.

## Root scripts

These are the root scripts currently provided by `package.json`.

| Command                               | Purpose                                        |
| ------------------------------------- | ---------------------------------------------- |
| `pnpm dev`                            | Start the API and MailDev inbox/SMTP server    |
| `pnpm dev:ui`                         | Start the interactive Vite client on port 3000 |
| `pnpm dev:mail`                       | Start the React Email preview on port 3002     |
| `pnpm build`                          | Build the client and compile the server        |
| `pnpm start`                          | Run the compiled server                        |
| `pnpm typecheck`                      | Generate route types and check all packages    |
| `pnpm check`                          | Check formatting and lint rules                |
| `pnpm format`                         | Apply formatting and safe lint fixes           |
| `pnpm db:up` / `pnpm db:down`         | Start or stop local MongoDB and RustFS         |
| `pnpm docker:up` / `pnpm docker:down` | Build/start or stop the complete stack         |

## Per-package scripts

Package-level commands are useful when working on one workspace:

```sh
pnpm --filter @mern/client generate-routes
```

## References

- [Development workflow](/installation/development-workflow)
