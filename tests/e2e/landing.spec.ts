import { expect, test } from "@playwright/test";

test("introduces Triage and the review queue", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { level: 1, name: "Every report, reviewed." }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "How a report becomes a ticket" }),
  ).toBeVisible();
  await expect(page.getByText("Review queue").first()).toBeVisible();

  // The primary action opens a written email; there is no form backend.
  await expect(
    page.getByRole("link", { name: /Request access/ }).first(),
  ).toHaveAttribute("href", /^mailto:/);

  await expect(
    page.getByRole("link", { name: "Features" }).first(),
  ).toHaveAttribute("href", "/features");
  await expect(
    page.getByRole("link", { name: "Contact" }).first(),
  ).toHaveAttribute("href", "/contact");
});

test("credits every photograph it uses", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByText(/Marine Field Telephone Switchboard Operator/).first(),
  ).toBeVisible();
  await expect(page.getByText(/CC BY-SA 4\.0/).first()).toBeVisible();
});
