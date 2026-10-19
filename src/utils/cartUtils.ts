import { getRandomInt } from "./commonUtils";
import { expect, type Page } from "@playwright/test";
import { homePageSelectors } from "../mapping/homePageMapping";
import { cartSelectors } from "../mapping/cartMapping";
import { giftCardDetails } from "../testData/cartTestData";

export async function addRandomProductToCart(page: Page) {
  const products = page.locator(homePageSelectors.productItems);
  await expect(products.first()).toBeVisible();
  const productCount = await products.count();
  const randomProductIndex = getRandomInt(0, productCount - 1);
  const randomProduct = products.nth(randomProductIndex);

  const cartQuantity = page.locator(cartSelectors.cartQuantity);
  const startingCartQuantity = 0;
  await randomProduct.getByRole("button", { name: "Add to cart", exact: true }).click();

  const productDetails = page.locator(cartSelectors.productDetails);
  const updatedCartQuantity = cartQuantity.filter({ hasText: `(${startingCartQuantity + 1})` });
  await expect(productDetails.or(updatedCartQuantity).first()).toBeVisible();

  if (await productDetails.isVisible()) {
    await page.waitForLoadState("domcontentloaded");

    if (await page.locator(cartSelectors.recipientNameInput).isVisible()) {
      await fillGiftCardDetails(page);
    }
    else{
        await selectComputerOptions(page);
    }
    await page.locator(cartSelectors.addToCartButton).click();
  }

  await expect(cartQuantity).toHaveText(`(${startingCartQuantity + 1})`);
}


export async function fillGiftCardDetails(page: Page) {
  await page.locator(cartSelectors.recipientNameInput).fill(giftCardDetails.recipientName);
  await page.locator(cartSelectors.recipientEmailInput).fill(giftCardDetails.recipientEmail);
  await page.locator(cartSelectors.senderNameInput).fill(giftCardDetails.senderName);
  await page.locator(cartSelectors.senderEmailInput).fill(giftCardDetails.senderEmail);
}

export async function selectComputerOptions(page: Page) {
  const computerOptions = page.locator(cartSelectors.computerOptions);
  const optionsCount = await computerOptions.count();

  for (let i = 0; i < optionsCount; i++) {
    const option = computerOptions.nth(i);
    const radioButtons = option.locator(cartSelectors.optionRadioButton);
    const dropdown = option.locator(cartSelectors.optionDropdown);

    if (await radioButtons.count() > 0) {
      await radioButtons.first().check();
    }

    if (await dropdown.count() > 0) {
      await dropdown.selectOption({ index: 0 });
    }
  }
}
