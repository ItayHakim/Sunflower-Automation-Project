import {basePage as test } from "../fixtures/basePage";
import { baseUrls, urlPaths } from "../config/routes";
import { registerSelectors } from "../mapping/registerMapping";
import { userRegisterDetails } from "../testData/registerTestData";
import { fillRegisterDetails } from "../utils/registerUtils";

test.describe("register user tests", () => {
  test.use({pagePath: urlPaths.register});
    test("register a user with correct user details will create a new user", async ({
    page,
  }) => {
    await fillRegisterDetails(page, userRegisterDetails);
    await page.locator(registerSelectors.resultMessage).waitFor();
    await test.expect(page.locator(registerSelectors.resultMessage)).toHaveText("Your registration completed");
    await page.locator(registerSelectors.continueButton).click();
    await test.expect(page).toHaveURL(baseUrls.app);
  })
})