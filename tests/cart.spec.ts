import { test, expect } from '@playwright/test';
import { Inventory } from '../pages/inventory';

let inventoryPage: Inventory;

test.beforeEach(async ({ page }) => {
  inventoryPage = new Inventory(page);
});

test('should add product to a cart from inventory view', async ({}) => {
  const productName = 'Sauce Labs Backpack';
  await inventoryPage.goTo();
  await inventoryPage.addProductToCart(productName);
  const shoppingCartPage = await inventoryPage.openShoppingCart();
  await expect(shoppingCartPage.shoppingCartButton.badge).toHaveText('1');
  await expect(shoppingCartPage.inventoryItemName).toHaveText(productName);
});

test('should add product to a cart from single product page', async ({}) => {
  const productName = 'Sauce Labs Backpack';
  await inventoryPage.goTo();
  const productDetails = await inventoryPage.openProductDetails(productName);
  await productDetails.addProductToCart();
  const shoppingCartPage = await productDetails.openShoppingCart();
  await expect(shoppingCartPage.shoppingCartButton.badge).toHaveText('1');
  await expect(shoppingCartPage.inventoryItemName).toHaveText(productName);
});
