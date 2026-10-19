import {basePage as test ,expect} from "../fixtures/basePage";
import { baseUrls, urlPaths } from "../config/routes";
import { v4 as uuidv4 } from "uuid";

test.describe("register user tests", () => {
  test.use({pagePath: urlPaths.register});
    test("register a user with correct user details will create a new user", async ({
    page,
  }) => {
    await page.locator("#gender-male").check();
    await page.locator("#FirstName").fill("johnny");
    await page.locator("#LastName").fill("Test");
    await page.locator("#Email").fill(`johnny.test+${uuidv4()}@example.com`);
    await page.locator("#Password").fill("Test1234");
    await page.locator("#ConfirmPassword").fill("Test1234");
    await page.locator("#register-button").click();
    await page.locator(".result").waitFor();
    await test.expect(page.locator(".result")).toHaveText("Your registration completed");
    await page.locator(".register-continue-button").click();
    await test.expect(page).toHaveURL(baseUrls.app);
  })
})