import { expect, test } from "@playwright/test";

test("introduces the course starter", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /Build something worth submitting/,
    }),
  ).toBeVisible();
  await expect(
    page.getByText("Launchpad", { exact: true }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "What's included" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { level: 4 })).toHaveText([
    "shadcn/ui & design-md",
    "MongoDB & Mongoose",
    "Better Auth",
    "Zod validation",
    "Resend & local email",
    "Object storage",
    "Reusable middleware",
    "Deno Deploy",
    "Docker & Compose",
    "Formatting & linting",
    "Unit, integration & end-to-end tests",
    "GitHub Actions",
  ]);
  await expect(
    page.getByRole("link", { name: "Documentation" }).first(),
  ).toHaveAttribute("href", "https://mern-app-starter.pages.dev/installation/");
});
