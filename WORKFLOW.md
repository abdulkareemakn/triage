# Triage development workflow

This is the working agreement for agents and contributors. The maintainer confirmed the process below on 2026-09-29. Product scope is still being defined.

## Sources of truth

| File or system       | Role                                                                                           |
| -------------------- | ---------------------------------------------------------------------------------------------- |
| `PRODUCT.md`         | Agreed product vision, scope, and unresolved product decisions.                                |
| `openspec/specs/`    | Accepted behavior. Changes under `openspec/changes/` record proposed deltas and their history. |
| `DESIGN.md`          | Current client design system; its inherited baseline is not a final Triage identity.           |
| `project.typ`        | Original university proposal, for reference only.                                              |
| `docs/`              | Inherited starter development guides; verify examples against current Triage code.             |
| Kaneo Triage project | Work items and delivery status.                                                                |

When these disagree, stop and resolve the decision with the maintainer before implementing product behavior. Record the result in the relevant source of truth. Keep starter documentation as technical guidance, but do not treat its Launchpad features as Triage requirements.

## Repository map

| Path                               | Current responsibility                                                                                             |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `apps/client`                      | React, Vite, TanStack Router, Tailwind, and Base UI shadcn components. Read its `AGENTS.md` before interface work. |
| `apps/server`                      | Express API, Better Auth, MongoDB, uploads, and production static serving.                                         |
| `packages/shared`                  | Browser-safe API types.                                                                                            |
| `packages/emails`, `packages/mail` | Email templates and local mail service.                                                                            |
| `.railway/railway.ts`              | Railway infrastructure definition; the web service currently tracks `main`.                                        |
| `.github/workflows`                | PR checks and Docker image build.                                                                                  |
| `docs/docs`                        | Local setup, build patterns, testing, deployment, and reference guides inherited from the starter.                 |

The current client landing page and several configuration names still come from the starter. Replace them only as part of approved Triage work.

Use the inherited guides by topic: [development workflow](docs/docs/installation/development-workflow.md), [project structure](docs/docs/installation/project-structure.md), [design and UI](docs/docs/build/design-system.md), [API routes](docs/docs/build/api-routes.md), [testing](docs/docs/quality/testing.md), and [Railway deployment](docs/docs/deployment/production.md). Read the relevant page before changing that area. The guide's Launchpad examples and browser-verification instructions do not override this workflow or the root `AGENTS.md`.

## From task to PR

1. **Define the task.** Create a Kaneo task in the Triage project's **To Do** column with an outcome, acceptance criteria, and relevant product or OpenSpec links. Do not convert unconfirmed proposal items into implementation tasks as though their scope were settled. Keep tasks small enough to review in one PR.
2. **Start work.** Move the task to **In Progress**. Create one branch for that task from current `main`, naming it for the task and purpose (for example, `feat/tri-12-review-queue`). Use a separate Git worktree when another task is active or the current checkout has unfinished work. Preserve unrelated local changes.
3. **Specify behavior.** For product behavior or architecture changes, use OpenSpec: explore unclear requirements, propose a change, review its proposal, delta specs, design, and tasks, then apply it. The OpenSpec root is in this repository. Its Codex skills are in `.agents/skills/`. Routine docs, copy, formatting, and isolated bug fixes can go directly from the Kaneo task to implementation. If a supposedly isolated fix changes a contract, specify that change.
4. **Build in slices.** The first interface milestone may use realistic local fixtures while API contracts are defined. Follow it with small end-to-end slices that connect the interface, shared types, API, and persistence where needed. Keep fixtures out of production data paths.
5. **Verify.** Run `pnpm format`, then `pnpm check` and `pnpm typecheck` from the workspace root after code changes. Run the relevant unit or integration tests: `pnpm test:unit`, `pnpm test:integration`, or both with `pnpm test`. For design-system changes, run `pnpm design:lint`. For docs-only changes, run formatting and checks only when those files are in scope; skip application tests. Report any check that could not run. Agents do not use browser automation, screenshots, or manual browser checks; the maintainer handles visual review. PR CI runs Playwright end-to-end tests.
6. **Review the spec.** For an OpenSpec change, run `openspec validate <change>` and compare every requirement, scenario, and task with the implementation and its checks. `validate` checks artifact structure; it does not prove behavior. The installed core profile does not include the optional verify skill, so perform this review explicitly. Resolve gaps before review is complete.
7. **Open the PR.** Use `.github/PULL_REQUEST_TEMPLATE.md` and link the Kaneo task and OpenSpec change if applicable. Describe visible behavior, verification, any Railway or configuration impact, and what needs visual review. Move the Kaneo task to **In Review** when the PR opens. If review calls for substantive changes, move it back to **In Progress**, update the active OpenSpec change if behavior changed, recheck, and return it to **In Review**.
8. **Finish review.** After review changes are resolved, archive the OpenSpec change and sync accepted specs on the same branch before merge. Keep the resulting archive and main spec updates in the PR so they are reviewed. The maintainer gives final approval and merges into `main`.
9. **Confirm delivery.** Check that the merged PR's checks passed. For application changes, confirm the corresponding Railway deployment succeeded. Then move the Kaneo task to **Done**. If deployment fails, keep it in review and address the failure.

## Local commands and boundaries

- Use `pnpm` for workspace commands. Read root `package.json` and the affected package scripts before running them. `pnpm dev` starts the server and local mail service; `pnpm dev:ui` starts the client. `pnpm db:up` starts local MongoDB and object storage.
- Do not read or write `.env`. Use `.env.example` to understand required settings; the maintainer manages secrets and environment variables.
- Do not add a dependency or abstraction before checking the affected package and existing patterns.
- Railway configuration changes need a reviewed plan before applying them. Do not infer a successful deployment from a merge or command exit alone; inspect the deployment status.
