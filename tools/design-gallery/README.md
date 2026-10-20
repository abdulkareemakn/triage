# Triage design wall

A local comparison wall for the six model-built marketing fronts
(`cat-jam`, `ling-flash`, `longcat`, `mimo-flash`, `space-bunny`, `step-5`).

The goal is to choose a composition and a set of components, then consolidate
the result into `apps/client`. The wall does not modify the six sources.

## Run

From the repository root:

```sh
pnpm design-wall
```

Open the printed URL, normally <http://127.0.0.1:4100>.

Stop the wall and all six model servers with `Ctrl+C`.

## Ports

| Port | Model / service |
| ---- | --------------- |
| 4100 | Design wall     |
| 4101 | Cat Jam         |
| 4102 | Ling Flash      |
| 4103 | Longcat         |
| 4104 | Mimo Flash      |
| 4105 | Space Bunny     |
| 4106 | Step 5          |
| 4107 | Combined        |

## What you can do

- Switch between the models. Longcat and Mimo Flash are the finalists, and
  **Combined** is the first single-page merge of the two. Step 5, Cat Jam, Ling
  Flash, and Space Bunny are dropped and hidden by default; use **Show dropped**
  to bring them back.
- Switch routes: landing, features, contact, sign in, sign up.
- Compare real responsive viewports: desktop, laptop, tablet, mobile.
- Open a model full-screen.
- Use **Compare** for a six-up wall of landing pages.
- Check named components in the inspector to build a shortlist.
- Leave per-model notes, mark one model as the **base**, and copy the shortlist
  as JSON for the implementation handoff.
- Clear all picks from the left rail.

## Why iframes

Each model is a complete Vite app with its own `:root` tokens, font faces, and
global CSS. Mounting them in one React tree would make them collide and would
hide real differences. Each model runs on its own origin and is embedded in an
iframe, so what you see is the app as built.

## Source layout

By default the wall looks for the worktrees at `../triage-wt`. Override with:

```sh
TRIAGE_MODELS_ROOT=/path/to/worktrees pnpm design-wall
```

Each worktree is expected to have `apps/client/node_modules/.bin/vite` already
installed.

Vite logs are written to `/tmp/opencode/design-wall-<model>.log`.

## Scope

The six fronts are marketing explorations, not the finished product workspace.
The product shell, intake queue, candidate detail, and review screens still need
to be built in `apps/client` from the selected pieces.

## Preserved snapshots

The worktree work is committed on the `model/*` branches in this repository and
tagged `design-wall/<model>`. The wall itself lives on the `chore/design-wall`
branch.
