import { test } from "@playwright/test";
import { baseUrls } from "../config/routes";

type BasePageFixtures = {
  pagePath: string;
};

export const basePage = test.extend<BasePageFixtures>({
  pagePath: [baseUrls.app, { option: true }],

  page: async ({ page, pagePath }, use) => {
    await page.goto(pagePath);
    await use(page);
  },
});

export { expect } from "@playwright/test";
