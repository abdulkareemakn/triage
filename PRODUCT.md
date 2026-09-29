# Triage product

## Status and intent

Triage helps small and medium software teams turn incoming reports into ticket candidates that a person reviews. [The original proposal](project.typ) is a source of ideas, not an approved feature list. This file records confirmed scope as of 2026-09-29; detailed behavior belongs in OpenSpec changes and accepted specs.

## October 28, 2026 university demonstration

The required outcome is a frontend demonstration with a working basic backend. Build the first interface against realistic local fixtures, then connect small end-to-end slices. The central journey is manual text intake, manual ticket-candidate creation, and human review. MongoDB stores the submitted text, candidate, and review decision. Approval is recorded inside Triage with its reviewer and time; sending an issue to GitHub or Jira is later work.

A signed-in person may belong to multiple shared workspaces and chooses an active workspace. An admin invites people using a link or code and manages roles. The first role contract is:

| Role      | Permissions                                               |
| --------- | --------------------------------------------------------- |
| Submitter | Add intake and candidates; view their status.             |
| Reviewer  | View workspace submissions; approve or reject candidates. |
| Admin     | Both sets of actions; manage invitations and roles.       |

The October demonstration also includes:

- **Discord intake:** Import every new message from a selected channel after connection. Earlier history is outside this milestone. A bot running during the demonstration is sufficient. A Discord server can be created, but a developer application and bot have not yet been set up.
- **AI duplicate suggestions:** Use OpenRouter embeddings for semantic comparison with existing candidates in the same workspace. Show likely matches with the matched text and score as evidence. A reviewer confirms or dismisses each suggestion. AI extraction and automatic candidate creation are outside this milestone.
- **Discord notifications:** Post review decisions to a separately configured notification channel.

The inherited React, Express, MongoDB, and Better Auth setup is the starting point, not a finished Triage product. The landing page and some configuration still carry the starter identity.

The approved interface direction is a calm, professional workspace for software teams, with Plane and Kaneo as the main open-source references and Linear as a secondary reference. [DESIGN.md](DESIGN.md) records this direction; its current tokens still describe the inherited starter baseline.

## Scope still to settle

University requirements are still being negotiated. Before implementation, agree on exact acceptance criteria and capture behavior in OpenSpec. Technical choices still to settle include the OpenRouter embedding model and matching threshold, Discord bot setup and channel configuration, and how the bot is run during the demo. The design direction still needs concrete tokens and component guidance. The maintainer manages credentials; agents use `.env.example` for required setting names and never read or write `.env`.

The remaining proposal features are candidates for later phases, not October commitments: meeting/customer/support/Sentry source connectors, AI action-item extraction and generated candidate fields, semantic search, GitHub/Jira export, richer review actions, dashboards and filters, and broader notifications. See [ROADMAP.md](ROADMAP.md) for delivery order and dependencies.
