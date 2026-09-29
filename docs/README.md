# Triage developer guide

This directory preserves the MERN starter's development documentation as guidance for Triage. The guides explain the shipped foundation: local services, React and Express patterns, Better Auth, MongoDB, testing, and deployment. Some examples still use the starter's Launchpad name or example features; they are not Triage product requirements. Check commands and paths against this repository before using them.

For Triage decisions, read [`PRODUCT.md`](../PRODUCT.md), [`DESIGN.md`](../DESIGN.md), accepted OpenSpec specs, and [`WORKFLOW.md`](../WORKFLOW.md). The root `AGENTS.md` governs agent verification and environment-file handling even when an inherited page describes a different manual workflow.

The Markdown site uses [Zensical](https://zensical.org/). From this `docs/` directory:

```sh
zensical build --clean --strict
```

The site is kept in the repository for development reference. The Triage CI does not publish it.
