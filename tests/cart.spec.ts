import { test, expect } from '@playwright/test';

test('should add product to a cart from inventory view', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html');
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('#shopping_cart_container').click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  await expect(page.locator('.inventory_item_name')).toHaveText(
    'Sauce Labs Backpack',
  );
});

test('should add product to a cart from single product page', async ({
  page,
}) => {
  await page.goto('https://www.saucedemo.com/inventory.html');
  await page.locator('#item_4_title_link').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('#shopping_cart_container').click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  await expect(page.locator('.inventory_item_name')).toHaveText(
    'Sauce Labs Backpack',
  );
});
