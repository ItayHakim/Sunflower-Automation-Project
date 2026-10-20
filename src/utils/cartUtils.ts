import { checkBoxByName, clearCheckboxes, getRandomInt } from "./commonUtils";
import { expect, type Page } from "@playwright/test";
import { homePageSelectors } from "../mapping/homePageMapping";
import { cartSelectors } from "../mapping/cartMapping";
import { computerDetails, giftCardDetails } from "../testData/cartTestData";
import { Computer } from "../models/computerTypes";

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
        const productName = await page.locator(cartSelectors.itemName).innerText();
        await page.waitForLoadState("domcontentloaded");

        if (productName.toLowerCase().includes("gift card")) {
            await fillGiftCardDetails(page);
        }
        else {
            const computer = computerDetails.find(item => item.name === productName);
            if (!computer) {
                throw new Error(`Unknown computer: ${productName}`);
            }
            await selectComputerOptions(page, computer);
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



export async function selectComputerOptions(page: Page, computer: Computer) {
    const { processor, ram, hdd, os, software } = computer.options;
    const fields = page.locator(cartSelectors.computerOptions);
    const checkboxes = fields.getByRole("checkbox");

    await fields.getByRole("radio", { name: hdd, exact: true }).check();
    switch (computer.name) {
        case "Build your own computer":
            await page.locator(cartSelectors.processorDropdown).selectOption({ label: processor });
            await page.locator(cartSelectors.ramDropdown).selectOption({ label: ram });
            await fields.getByRole("radio", { name: os, exact: true }).check();
            break;
        default:
            await fields.getByRole("radio", { name: processor, exact: true }).check();
            await fields.getByRole("radio", { name: ram, exact: true }).check();
            break;
    }

    await clearCheckboxes(page, checkboxes);
    await checkBoxByName(page, checkboxes, software);
}
