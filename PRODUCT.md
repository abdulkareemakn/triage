# Triage product

## Status

The product definition is in progress. `project.typ` is the university proposal, not an approved list of features or acceptance criteria. Approved behavior will live in `openspec/specs/`; proposed changes will be reviewed before implementation.

## Proposal to evaluate

The proposal describes a tool for software teams to turn incoming signals into reviewed issue candidates. It suggests collecting text and error reports, extracting potential work with AI, grouping duplicates, reviewing candidates, searching sources, and sending approved issues to external trackers. The audience, first user journey, initial sources, AI approach, integrations, roles, and release scope still need decisions.

## Current foundation

- React client with Vite and TanStack Router. Its landing page is still the inherited starter page.
- Express API with MongoDB, Better Auth, health and current-user endpoints, and authenticated uploads.
- Shared TypeScript API types, email preview and local mail development service.
- Docker and Railway deployment files. The Railway web service currently builds from `main`.

These are existing capabilities, not commitments to use every starter feature in Triage.

## Next definition step

Agree on the first useful Triage workflow and its acceptance criteria. The first interface milestone may use realistic fixtures, followed by small end-to-end slices. Add each approved capability to OpenSpec and then map it to Kaneo tasks. Keep delivery rules in [WORKFLOW.md](WORKFLOW.md) and interface rules in [DESIGN.md](DESIGN.md).
