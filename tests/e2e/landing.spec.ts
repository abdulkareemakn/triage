import { expect, test } from "@playwright/test";

test("introduces Triage and collects a waitlist email", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { level: 1, name: /Every report, reviewed/ }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Questions" })).toBeVisible();

  const email = page.getByLabel("Email address");
  await expect(email).toBeVisible();
  await email.fill(`waitlist-${Date.now()}@example.com`);
  await page.getByRole("button", { name: "Join the waitlist" }).click();

  await expect(page.getByRole("status")).toHaveText(
    "You're on the list. We'll be in touch.",
  );
});
