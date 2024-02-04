import { test, expect } from '@playwright/test';
import { Inventory } from '../pages/inventory';
import { ShoppingCart } from '../pages/shopping-cart';

test('should add product to a cart from inventory view', async ({ page }) => {
  let inventoryPage = new Inventory(page);
  await inventoryPage.goTo();
  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.shoppingCartButton.button.click();
  let shoppingCartPage = new ShoppingCart(page);
  await expect(shoppingCartPage.shoppingCartButton.badge).toHaveText('1');
  await expect(shoppingCartPage.inventoryItemName).toHaveText(
    'Sauce Labs Backpack',
  );
});

test('should add product to a cart from single product page', async ({
  page,
}) => {
  let inventoryPage = new Inventory(page);
  await inventoryPage.goTo();
  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await page.locator('#item_4_title_link').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('#shopping_cart_container').click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  await expect(page.locator('.inventory_item_name')).toHaveText(
    'Sauce Labs Backpack',
  );
});
