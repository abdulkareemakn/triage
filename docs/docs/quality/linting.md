---
title: Linting
description: Catch JavaScript and TypeScript correctness problems with Oxlint.
---

# Linting with Oxlint

This starter kit uses [Oxlint](https://oxc.rs/docs/guide/usage/linter) for JavaScript and TypeScript linting. The root `.oxlintrc.json` applies one rule set throughout the pnpm workspace.

## Run the linter

```sh
pnpm lint
```

Apply safe automatic fixes with:

```sh
pnpm lint:fix
```

`pnpm check` runs the linter and the Oxfmt formatting check together.

## Configuration

The root config treats correctness diagnostics as errors and enables Oxlint's native plugins for the technologies used by the repository:

```json title=".oxlintrc.json"
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": [
    "eslint",
    "typescript",
    "unicorn",
    "oxc",
    "import",
    "react",
    "jsx-a11y",
    "vitest",
    "node"
  ],
  "categories": {
    "correctness": "error"
  },
  "rules": {
    "react/react-in-jsx-scope": "off",
    "vitest/no-standalone-expect": "off",
    "vitest/require-mock-type-parameters": "off",
    "vitest/require-to-throw-message": "off"
  }
}
```

The React rule is disabled because this project uses the automatic JSX runtime. Three Vitest rules are disabled because they reject valid hooks, untyped mock inference, and intentional error-only assertions already used by the tests. The plugins are built into Oxlint, so they do not require separate npm packages.

Generated routes, generated documentation, and agent tooling are ignored. Keep lasting workspace policy in the root config instead of adding package-local files.

## Fix a diagnostic

1. Read the rule name and explanation.
2. Fix the code when the rule identifies a real issue.
3. Run `pnpm lint:fix` for safe mechanical fixes.
4. Run `pnpm check` again.

Do not disable a rule only to make the command green. If a rule conflicts with the repository's runtime or generated code, add the narrowest root override and record the reason.

To check one path while iterating, run:

```sh
pnpm exec oxlint apps/server/src
```

## References

- [Oxlint configuration](https://oxc.rs/docs/guide/usage/linter/config)
- [Oxlint built-in plugins](https://oxc.rs/docs/guide/usage/linter/plugins)
- [Oxlint automatic fixes](https://oxc.rs/docs/guide/usage/linter/automatic-fixes)
- [Oxlint editor setup](https://oxc.rs/docs/guide/usage/linter/editors)
