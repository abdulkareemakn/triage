---
title: Formatting
description: Format the workspace consistently with the root Oxfmt configuration.
---

# Formatting with Oxfmt

This starter kit uses [Oxfmt](https://oxc.rs/docs/guide/usage/formatter) to format source, tests, documentation, and configuration files. The root `.oxfmtrc.json` keeps every workspace package consistent.

## Format the workspace

Run this from the repository root:

```sh
pnpm format
```

This applies Oxlint's safe fixes, then writes Oxfmt changes and sorts imports. Review the resulting diff because the command can update several packages.

## Check without writing

```sh
pnpm check
```

This runs Oxlint and verifies Oxfmt output without changing files. Use it before committing and in continuous integration.

## Configuration

The root configuration uses Oxfmt defaults, enables import sorting, and excludes generated or tool-owned files:

```json title=".oxfmtrc.json"
{
  "$schema": "./node_modules/oxfmt/configuration_schema.json",
  "sortImports": true,
  "ignorePatterns": [
    ".agents/**",
    ".claude/**",
    "apps/client/src/routeTree.gen.ts",
    "docs/site/**"
  ]
}
```

Oxfmt also respects `.gitignore`, ignores dependency and version-control directories, and always ignores lockfiles. Do not hand-format `routeTree.gen.ts`, generated documentation, or `pnpm-lock.yaml`; their generators own those files.

## Editor setup

Install the recommended Oxc extension in VS Code or a compatible editor. The committed workspace settings use it for supported files, enable format-on-save, and apply explicit safe lint fixes on save.

Keep shared policy in the root configuration. Add an option only when the project needs a stable rule that differs from Oxfmt's default. After a global rule changes, run `pnpm format` and review the full diff.

## References

- [Oxfmt configuration](https://oxc.rs/docs/guide/usage/formatter/config)
- [Oxfmt ignore files](https://oxc.rs/docs/guide/usage/formatter/ignore-files)
- [Oxfmt editor setup](https://oxc.rs/docs/guide/usage/formatter/editors)
