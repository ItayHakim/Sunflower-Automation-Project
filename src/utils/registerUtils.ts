import { Page } from "playwright/test";
import { registerSelectors } from "../mapping/registerMapping";
import { UserDetailsType } from "../models/registerTypes";

export async function fillRegisterDetails(page:Page, userDetails:UserDetailsType) {
    await page.locator(registerSelectors.maleGenderRadioButton).check();
    await page.locator(registerSelectors.firstNameInput).fill(userDetails.firstName);
    await page.locator(registerSelectors.lastNameInput).fill(userDetails.lastName);
    await page.locator(registerSelectors.emailInput).fill(userDetails.email);
    await page.locator(registerSelectors.passwordInput).fill(userDetails.password);
    await page.locator(registerSelectors.confirmPasswordInput).fill(userDetails.confirmPassword);
    await page.locator(registerSelectors.registerButton).click();
  }