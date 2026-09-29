# Triage roadmap

This roadmap separates the confirmed October 28, 2026 university demonstration from later proposal ideas. It is a dependency map, not a promise that every proposed feature will be built. The maintainer will confirm requirements before a later phase becomes implementation scope. Delivery rules are in [WORKFLOW.md](WORKFLOW.md); agreed product scope is in [PRODUCT.md](PRODUCT.md).

## October demonstration path

| Order                              | Outcome                                                                                                                                                                    | Dependency and review evidence                                                                                                        |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Define behavior and interface   | OpenSpec change(s) cover workspace access, intake/candidates/review, Discord, and duplicate suggestions. `DESIGN.md` is revised for Triage before broad interface work.    | Confirm acceptance criteria and design direction with the maintainer; review specs before implementation.                             |
| 2. Frontend first pass             | Navigation, active-workspace selection, intake, candidate creation, and review views work against realistic local fixtures.                                                | The maintainer can inspect the core journey and role-specific states.                                                                 |
| 3. Persistent core                 | Better Auth sessions protect workspace-scoped APIs; users can join via admin invite link/code. MongoDB stores intake, candidates, review decisions, and reviewer/time.     | Two users with different roles can demonstrate permitted and denied actions, and records survive reload.                              |
| 4. Discord source and notification | A bot imports new messages from the selected source channel while running; review decisions post to a separate notification channel.                                       | A new Discord message appears as intake; a review decision produces one channel notification. Bot/server/app setup is a prerequisite. |
| 5. AI duplicate review             | OpenRouter embeddings rank existing candidates in the same workspace; the interface presents matched text and score, and a reviewer confirms or dismisses each suggestion. | Similar candidates produce reviewable suggestions; cross-workspace candidates are excluded. OpenRouter access is a prerequisite.      |
| 6. Demonstration readiness         | Integrate the slices, run repository checks and relevant tests, review the UI with the maintainer, and confirm Railway deployment.                                         | A repeatable demonstration covers the full journey with the bot running.                                                              |

Work may be split into smaller Kaneo tasks and PRs. The order describes dependencies, not exact dates or a requirement to complete one whole row before starting the next. Agents keep Kaneo tasks in To Do until work starts, In Progress while working, In Review during PR review, and Done after merge and the required deployment check.

## Later proposal candidates

| Candidate phase              | Possible work                                                                                                  | Decision needed before scheduling                                         |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| More sources                 | Meeting transcripts, customer feedback, support requests, Sentry reports, and additional channel integrations. | Which source matters to the university assessment and actual users?       |
| AI candidate creation        | Extract action items and draft title, description, priority, evidence, and confidence.                         | What input types, model behavior, and human correction flow are required? |
| Broader review and discovery | Edit/merge/assign/clarify actions, dashboard filters, and semantic search.                                     | Which actions solve a validated review problem?                           |
| Tracker delivery             | Create issues in GitHub or Jira and reconcile status.                                                          | Which tracker, authorization flow, and failure handling are required?     |
| Operational maturity         | Notification rules, bot uptime, audit and retention policies.                                                  | What real use and deployment requirements exist beyond the demo?          |

These rows map the proposal without assigning implementation dates or treating its full feature list as approved. New scope should update `PRODUCT.md`, OpenSpec, and Kaneo together.
