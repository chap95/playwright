import { test, expect } from "@playwright/test";

test.beforeEach(async ({ context, page }) => {
  await context.route(`**/popup**`, (route) => {
    route.fulfill({
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify([
        {
          id: 1,
          type: "visit",
          title: "is dummy",
          mainText: "더미",
        },
      ]),
    });
  });
});

test.describe(" NOSEARCH - render popup ", () => {
  test("should render visit popup to clients who are new to our service", async ({
    page,
  }) => {
    await page.goto("https://www.nosearch.com/");
    const modal = page.locator(".nosearch-deal-main-drawer__wrapper");
    expect(await modal.count()).toBe(1);
  });

  test("should render visit popup at second page", async ({ page }) => {
    await page.goto("https://nosearch.com/contents/guide");
    const modal = page.locator(".nosearch-deal-main-drawer__wrapper");
    expect(await modal.count()).toBe(0);
    await page.click("text=가전백과");
    const secondModal = page.locator(".nosearch-deal-main-drawer__wrapper");
    expect(await secondModal.count()).toBe(1);
  });

  test("should not render visit popup to clients who clicked close popup button", async ({
    page,
  }) => {
    await page.goto("https://www.nosearch.com/");
    const closePopupButton = page.locator("text=다시 보지 않기");
    closePopupButton.click();
    await page.reload();
    const modal = page.locator(".nosearch-deal-main-drawer__wrapper");
    expect(await modal.count()).toBe(0);
  });
});
