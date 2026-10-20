import type { Locator, Page } from "playwright/test";

export function getRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1)) + minCeiled;
}

export async function clearCheckboxes(checkboxes: any) {
    for (const checkbox of await checkboxes.all()) {
        await checkbox.uncheck();
    }
}

export async function checkBoxByName(page: Page, checkboxes: Locator, name: string) {
    await checkboxes.and(page.getByRole("checkbox", { name, exact: true })).check();
}
