import { Page } from "playwright/test";
import { Computer, computerNames } from "../models/computerTypes";
import { productSelectors } from "../mapping/productMapping";
import { giftCardDetails } from "../testData/cartTestData";
import { clearCheckboxes, checkBoxByName } from "./commonUtils";

export async function fillGiftCardDetails(page: Page) {
    await page.locator(productSelectors.giftCard.recipient.nameInput).fill(giftCardDetails.recipientName);
    await page.locator(productSelectors.giftCard.recipient.emailInput).fill(giftCardDetails.recipientEmail);
    await page.locator(productSelectors.giftCard.sender.nameInput).fill(giftCardDetails.senderName);
    await page.locator(productSelectors.giftCard.sender.emailInput).fill(giftCardDetails.senderEmail);
}

export async function selectComputerOptions(page: Page, computer: Computer) {
    const { processor, ram, hdd, os, software } = computer.options;
    const fields = page.locator(productSelectors.computer.computerOptions);
    const checkboxes = fields.getByRole("checkbox");

    await fields.getByRole("radio", { name: hdd, exact: true }).check();
    switch (computer.name) {
        case computerNames.custom:
            await page.locator(productSelectors.computer.dropdown.processor).selectOption({ label: processor });
            await page.locator(productSelectors.computer.dropdown.ram).selectOption({ label: ram });
            await fields.getByRole("radio", { name: os, exact: true }).check();
            break;
        default:
            await fields.getByRole("radio", { name: processor, exact: true }).check();
            await fields.getByRole("radio", { name: ram, exact: true }).check();
            break;
    }

    await clearCheckboxes(checkboxes);
    await checkBoxByName(page, checkboxes, software);
}
