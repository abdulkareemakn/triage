import { expect, test } from "@playwright/test";

test("introduces Triage and collects waitlist emails", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { level: 1, name: /Every report, reviewed/ }),
  ).toBeVisible();

  const hero = page.locator("#top");
  await hero.getByLabel("Email address").fill(`hero-${Date.now()}@example.com`);
  await hero.getByRole("button", { name: "Join the waitlist" }).click();
  await expect(hero.getByRole("status")).toHaveText(
    "You're on the list. We'll be in touch.",
  );

  const footer = page.locator("footer");
  await expect(
    footer.getByRole("heading", { name: "Your Triage awaits." }),
  ).toBeVisible();
  await footer
    .getByLabel("Email address")
    .fill(`footer-${Date.now()}@example.com`);
  await footer.getByRole("button", { name: "Join the waitlist" }).click();
  await expect(footer.getByRole("status")).toHaveText(
    "You're on the list. We'll be in touch.",
  );
});
