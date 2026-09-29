= Introduction

This proposal presents Triage, a web application for software teams. It covers the industry, main features, project motivation, and target clients.


= Project Specification

== Industry

Triage serves software development teams that need to collect, organize, and track engineering work. These teams use issue trackers such as Jira, GitHub Issues, and Linear to manage work after it has been identified.

Useful signals come from meetings, customer feedback, support channels, and production errors. A developer, project manager, or team lead must still decide what is actionable, whether it is a duplicate, and how important it is. This manual work can lead to missed, duplicated, or poorly prioritized issues.

== Features

Triage provides the following features for collecting, reviewing, and managing engineering work:

- #strong[Multi-source collection:] Imports meeting transcripts, customer feedback, support requests, and Sentry error reports.
- #strong[AI action-item extraction:] Finds bugs, feature requests, decisions, and action items in unstructured text.
- #strong[Duplicate detection:] Groups related reports so that the same problem does not create several tickets.
- #strong[Ticket candidates:] Creates a title, description, suggested priority, evidence, and confidence score for each candidate.
- #strong[Review queue:] Lets team members approve, edit, reject, merge, assign, or request clarification before a ticket is created.
- #strong[Semantic search:] Allows users to search meetings, feedback, errors, and previous candidates using simple natural-language questions.
- #strong[Issue tracker integration:] Sends approved tickets to GitHub Issues or Jira.
- #strong[Notifications:] Alerts the relevant team member when a high-priority candidate needs review.
- #strong[Dashboard and filters:] Shows candidate status, source, priority, assignee, and date in one place.
- #strong[User roles:] Limits administrative actions to authorized workspace members.

#figure(
  image("diagram.png", width: 100%),
  caption: [Triage workflow from incoming signals to approved issues.],
)

== Project Motivation

Software teams already have tools for managing tickets, but they still spend time finding work that should become a ticket. Important details may be hidden in meetings, customer messages, or production reports. As these sources grow, teams can miss issues or create duplicates.

Triage uses AI to understand the meaning and context of these signals and suggest structured work for review. It does not replace issue trackers or make final decisions. Its goal is to reduce repetitive triage work while keeping human oversight.

== Target Client


Triage is for small and medium software teams, startups, SaaS companies, and software houses. These clients often receive signals from many sources but do not have a dedicated person to review them all.

They may already use Jira or GitHub Issues, Sentry, and communication tools such as Discord. Triage works with these tools and gives developers, project managers, and team leads one place to review and route engineering work.
