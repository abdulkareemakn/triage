<!-- intent-skills:start -->

## Skill Loading

Before substantial work, run `pnpm dlx @tanstack/intent@latest list` from the workspace root. Load a matching listed skill before editing and follow its `SKILL.md`. In a monorepo, prefer the skill for the package being changed.

<!-- intent-skills:end -->

This is Triage, a university project built on a pnpm-workspace MERN starter. Read [WORKFLOW.md](WORKFLOW.md) before starting a task. [PRODUCT.md](PRODUCT.md) records the agreed product direction and open decisions; [DESIGN.md](DESIGN.md) records the current client design baseline. `project.typ` is the original proposal, not an approved feature specification. Package-specific guidance lives in nested `AGENTS.md` files.

## Task workflow

- Use the Triage project in Kaneo. Create tasks in To Do, move the active task to In Progress, and move it to In Review when its PR opens. The maintainer approves and merges PRs; move a task to Done after merge and, for app changes, a successful Railway deployment check.
- Use one feature branch per Kaneo task. Use a separate worktree when work is concurrent or the current checkout has unfinished changes. Follow [WORKFLOW.md](WORKFLOW.md) for branch, review, and OpenSpec steps.
- Create an OpenSpec change for product behavior or architecture changes. Keep proposal artifacts and implementation on the task branch; archive and sync specs after review changes are resolved and before merge. Routine documentation, copy, formatting, and isolated bug fixes do not require a full OpenSpec proposal.
- Keep the first interface milestone fixture-backed, then implement small end-to-end slices. Do not treat proposal features or inherited starter UI as approved Triage scope.

## Changes and verification

- Keep changes small and follow existing patterns; check the affected package before adding dependencies or abstractions.
- After code changes, run `pnpm format`, then `pnpm check` and `pnpm typecheck` from the workspace root.
- Run the relevant tests for changed behavior: `pnpm test:unit`, `pnpm test:integration`, or both with `pnpm test`. Run tests for the affected package when possible; report any suite you could not run.
- Do not use browser automation, screenshots, or manual browser checks for verification. Visual verification is the user's job.
- For docs-only changes, skip application tests and run formatting/checks only when the edited files are in scope for those tools.

## Workspace rules

- Use pnpm; do not use npm or yarn.
- Never read or write `.env`; use `.env.example`. The user manages environment variables and secrets.
