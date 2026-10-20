import { getRandomInt } from "./commonUtils";
import { urlPaths } from "../config/routes";
import { Computer } from "../models/computerTypes";
import { cartSelectors } from "../mapping/cartMapping";
import { productSelectors } from "../mapping/productMapping";
import { homePageSelectors } from "../mapping/homePageMapping";
import { expect, type Locator, type Page } from "@playwright/test";
import { computerDetails, giftCardDetails } from "../testData/productsData";
import { fillGiftCardDetails, selectComputerOptions } from "./productUtils";

export async function addRandomProductToCart(page: Page, startingCartQuantity: number = 0): Promise<string> {
    const currentCartQuantity = page.locator(cartSelectors.productQuantity);
    const productName = await pressAddToCartOnRandomProduct(page);
  
    const productDetails = page.locator(productSelectors.productDetails);
    const updatedCartQuantity = currentCartQuantity.filter({ hasText: `(${startingCartQuantity + 1})` });

    await expect(productDetails.or(updatedCartQuantity).first()).toBeVisible();
    if (await productDetails.isVisible()) {
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

    await expect(currentCartQuantity).toHaveText(`(${startingCartQuantity + 1})`);
    await expect(page.locator(homePageSelectors.header.notification.success)).toBeVisible();

    return productName;
}

export async function pressAddToCartOnRandomProduct(page: Page): Promise<string> {
    const products = page.locator(homePageSelectors.productItems);
    await expect(products.first()).toBeVisible();
    const productCount = await products.count();
    const randomProductIndex = getRandomInt(0, productCount - 1);
    const randomProduct = products.nth(randomProductIndex);
    const productName = await randomProduct.locator(homePageSelectors.productName).innerText();
    
    await randomProduct.getByRole("button", { name: "Add to cart", exact: true }).click();
    
    return productName;
}

export async function assertProductDetailsInCart(page: Page, productName: string) {
    await page.goto(urlPaths.cart);

    const product = page.locator(cartSelectors.cartItems).filter({
        has: page.getByRole("link", { name: productName, exact: true })
    });
    const attributes = product.locator(productSelectors.itemCommonSelectors.Attributes);
    const computer = computerDetails.find(item => item.name === productName);

    await expect(product.locator(productSelectors.itemCommonSelectors.Name)).toHaveText(productName);
    await expect(product.locator(productSelectors.itemCommonSelectors.Quantity)).toHaveValue("1");

    if (productName.toLowerCase().includes("gift card")) {
        await assertGiftCardDetailsInCart(attributes);
    }
    else if (computer) {
        await assertComputerOptionsInCart(attributes, computer);
    }
}

async function assertGiftCardDetailsInCart(attributes: Locator) {
    const { senderName, senderEmail, recipientName, recipientEmail } = giftCardDetails;

    await expect(attributes).toContainText(`From: ${senderName} <${senderEmail}>`);
    await expect(attributes).toContainText(`For: ${recipientName} <${recipientEmail}>`);
}

async function assertComputerOptionsInCart(attributes: Locator, computer: Computer) {
    const { processor, ram, hdd, os, software } = computer.options;

    await expect(attributes).toContainText(`Processor: ${processor}`);
    await expect(attributes).toContainText(`RAM: ${ram}`);
    await expect(attributes).toContainText(`HDD: ${hdd}`);
    if (os) {
        await expect(attributes).toContainText(`OS: ${os}`);
    }
    await expect(attributes).toContainText(`Software: ${software}`);
}
