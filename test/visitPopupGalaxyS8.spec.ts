import { test, expect, devices } from "@playwright/test";
const galaxyS8 = devices["Galaxy S8"];

test.use({
  ...galaxyS8,
  baseURL: "https://nosearch.com",
});

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
test.describe(" NOSEARCH - visit popup ", () => {
  test.describe(
    "should render visit popup to clients who are new to our service",
    () => {
      test("home", async ({ page }) => {
        await page.goto("/");
        const nosearchDealPopupWrapper = page.locator(
          ".nosearch-deal-main-drawer__wrapper"
        );
        expect(await nosearchDealPopupWrapper.count()).toBe(1);
      });

      test("encyclopedia detail", async ({ page }) => {
        await page.goto("/contents/encyclopedia/season/air_conditioner/366");
        const nosearchDealPopupWrapper = page.locator(
          ".nosearch-deal-main-drawer__wrapper"
        );
        expect(await nosearchDealPopupWrapper.count()).toBe(1);
      });
    }
  );

  test("should render visit popup at second page", async ({ page }) => {
    await page.goto("/recommendation/pick/living/cordless_vacuum_cleaner");
    let nosearchDealPopupWrapper = page.locator(
      ".nosearch-deal-main-drawer__wrapper"
    );
    expect(await nosearchDealPopupWrapper.count()).toBe(0);
    await page.click(".pick-product", { timeout: 5000 });
    await page
      .locator(".nosearch-deal-main-drawer__wrapper")
      .waitFor({ timeout: 5000 });
    nosearchDealPopupWrapper = page.locator(
      ".nosearch-deal-main-drawer__wrapper"
    );

    expect(await nosearchDealPopupWrapper.count()).toBe(1);
  });

  test("should not render visit popup to clients who clicked close popup button", async ({
    page,
  }) => {
    await page.goto("https://www.nosearch.com/");
    await page.locator("text=닫기").click({
      timeout: 5000,
    });
    await page.reload();
    const nosearchDealPopupWrapper = page.locator(
      ".nosearch-deal-main-drawer__wrapper"
    );
    expect(await nosearchDealPopupWrapper.count()).toBe(0);
  });

  test("should not render visit popup to clients who clicked persistance close button", async ({
    page,
  }) => {
    await page.goto("https://www.nosearch.com/");
    await page.locator("text=다시 보지 않기").click({
      timeout: 5000,
    });
    await page.reload();
    const nosearchDealPopupWrapper = page.locator(
      ".nosearch-deal-main-drawer__wrapper"
    );
    expect(await nosearchDealPopupWrapper.count()).toBe(0);
  });
});
