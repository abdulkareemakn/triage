This is Triage, a university project built on a pnpm-workspace MERN starter. Read [WORKFLOW.md](WORKFLOW.md) before starting a task. [PRODUCT.md](PRODUCT.md) records the agreed product direction and open decisions; [DESIGN.md](DESIGN.md) records the current client design baseline. The inherited [developer guides](docs/README.md) explain the starter's technical patterns; verify them against current code. `project.typ` is the original proposal, not an approved feature specification. Package-specific guidance lives in nested `AGENTS.md` files.

## Task workflow

- When a user requests work without an issue number, search Kaneo for a matching existing issue before creating a task. If one matches, tell the user, “This is similar to TRI-xx; I’m working on it,” and continue using that task and its branch. Do not create a duplicate task.
- Use the Triage project in Kaneo. Create tasks in To Do, move the active task to In Progress, move it to In Review for local review, and move it to Done after the verified branch merges into local `main`. Use labels `fix`, `feature`, `refactor`, `chore` appropriately on all tasks. The maintainer decides when to push `main` and trigger a Railway deployment.
- Use one local branch per Kaneo task. The agent chooses whether to use a separate worktree, especially for larger or concurrent work; the developer may explicitly choose either approach for a task. Follow [WORKFLOW.md](WORKFLOW.md) for branch, review, and OpenSpec steps.
- Create an OpenSpec change for product behavior or architecture changes. A planning-only task may merge the complete active change without code or archive; implementation then uses a separate Kaneo task and branch. Archive and sync specs after implementation review changes are resolved and before its local merge. Routine documentation, copy, formatting, and isolated bug fixes do not require a full OpenSpec proposal.
- Keep the first interface milestone fixture-backed, then implement small end-to-end slices. Do not treat proposal features or inherited starter UI as approved Triage scope.

## Changes and verification

- Keep changes small and follow existing patterns; check the affected package before adding dependencies or abstractions.
- After code changes, run `pnpm format`, then `pnpm check` and `pnpm typecheck` from the workspace root.
- This repository does not include an automated test suite. Verify behavior through the workspace checks and report any check you could not run.
- Do not use browser automation, screenshots, or manual browser checks for verification. Visual verification is the user's job.
- For docs-only changes, run formatting/checks only when the edited files are in scope for those tools.
