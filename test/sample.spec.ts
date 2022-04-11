import { test, expect } from "@playwright/test";

test("sample", async ({ page }) => {
  await page.goto("https://nosearch.com/");
  const modalButtons = page.locator(".footer-label");
  modalButtons.first().click();
});
