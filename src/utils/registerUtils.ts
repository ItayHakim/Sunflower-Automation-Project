import { Page } from "playwright/test";
import { registerSelectors } from "../mapping/registerMapping";
import { UserDetailsType } from "../models/registerTypes";
import { baseUrls } from "../config/routes";
import {basePage as test } from "../fixtures/basePage";
import { homePageSelectors } from "../mapping/homePageMapping";
import { registeredUserCookieName } from "../testData/registerTestData";

export async function fillRegisterDetails(page: Page, userDetails: UserDetailsType) {
  await page.locator(registerSelectors.maleGenderRadioButton).check();
  await page.locator(registerSelectors.firstNameInput).fill(userDetails.firstName);
  await page.locator(registerSelectors.lastNameInput).fill(userDetails.lastName);
  await page.locator(registerSelectors.emailInput).fill(userDetails.email);
  await page.locator(registerSelectors.passwordInput).fill(userDetails.password);
  await page.locator(registerSelectors.confirmPasswordInput).fill(userDetails.confirmPassword);
  await page.locator(registerSelectors.registerButton).click();
}

export async function assertRegisterDetails(page: Page, userDetails: UserDetailsType) {
  await test.expect(page.locator(homePageSelectors.header.userEmail)).toBeVisible();
  await test.expect(page.locator(homePageSelectors.header.userEmail)).toHaveText(userDetails.email);
  const cookies = await page.context().cookies(baseUrls.app);
  const authCookie = cookies.find(cookie => cookie.name === registeredUserCookieName);
  test.expect(authCookie).toBeDefined();
  test.expect(authCookie?.value).toBeTruthy(); 
}