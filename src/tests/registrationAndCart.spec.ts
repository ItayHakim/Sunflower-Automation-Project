import { baseUrls, urlPaths } from "../config/routes";
import { basePage as test } from "../fixtures/basePage";
import { addRandomProductToCart, assertProductDetailsInCart } from "../utils/cartUtils";
import { registerSelectors } from "../mapping/registerMapping";
import { userRegisterDetails } from "../testData/registerData";
import { assertRegisterDetails, fillRegisterDetails } from "../utils/registerUtils";

test.describe("Registration and shopping cart", () => {
  test.use({ pagePath: urlPaths.register });
  test("new user can register and add a product to the cart", async ({
    page,
  }) => {

    await fillRegisterDetails(page, userRegisterDetails);
    await page.locator(registerSelectors.resultMessage).waitFor();
    await page.locator(registerSelectors.continueButton).click();
    await test.expect(page).toHaveURL(baseUrls.app);

    await assertRegisterDetails(page, userRegisterDetails);

    const productName = await addRandomProductToCart(page);
    await assertProductDetailsInCart(page, productName);
  })
})
