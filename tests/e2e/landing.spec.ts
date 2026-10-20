import { expect, test } from "@playwright/test";

test("introduces Triage and collects waitlist emails", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Triage — Every report, reviewed.");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "Triage turns incoming reports into ticket candidates your team reviews before they reach the tracker.",
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "/og-image.png",
  );
  await expect(page.getByRole("banner")).toBeVisible();
  await expect(page.getByRole("link", { name: "Triage home" })).toBeVisible();
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
    footer.getByRole("heading", { name: "From report to decision." }),
  ).toBeVisible();
  await footer
    .getByLabel("Email address")
    .fill(`footer-${Date.now()}@example.com`);
  await footer.getByRole("button", { name: "Join the waitlist" }).click();
  await expect(footer.getByRole("status")).toHaveText(
    "You're on the list. We'll be in touch.",
  );
});
