import { getRandomInt } from "./commonUtils";
import { expect, type Page } from "@playwright/test";
import { homePageSelectors } from "../mapping/homePageMapping";

export async function addRandomProductToCart(page: Page) {
  const products = page.locator(homePageSelectors.productItems);
  await expect(products.first()).toBeVisible();
  const productCount = await products.count();
  const randomProductIndex = getRandomInt(0, productCount - 1);
  const randomProduct = products.nth(randomProductIndex);
  await randomProduct.getByRole("button", { name: "Add to cart", exact: true }).click();
}
