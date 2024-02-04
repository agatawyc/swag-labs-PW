import { test, expect } from '@playwright/test';
import { Inventory } from '../pages/inventory';
import { ShoppingCart } from '../pages/shopping-cart';
import { ProductDetails } from '../pages/product-details';

test('should add product to a cart from inventory view', async ({ page }) => {
  const productName = 'Sauce Labs Backpack';
  let inventoryPage = new Inventory(page);
  await inventoryPage.goTo();
  await inventoryPage.addProductToCart(productName);
  await inventoryPage.shoppingCartButton.button.click();
  let shoppingCartPage = new ShoppingCart(page);
  await expect(shoppingCartPage.shoppingCartButton.badge).toHaveText('1');
  await expect(shoppingCartPage.inventoryItemName).toHaveText(productName);
});

test('should add product to a cart from single product page', async ({
  page,
}) => {
  const productName = 'Sauce Labs Backpack';
  let inventoryPage = new Inventory(page);
  await inventoryPage.goTo();
  await inventoryPage.openProductDetails(productName);
  let productDetails = new ProductDetails(page, productName);
  await productDetails.addProductToCart();
  await productDetails.shoppingCartButton.button.click();
  let shoppingCartPage = new ShoppingCart(page);
  await expect(shoppingCartPage.shoppingCartButton.badge).toHaveText('1');
  await expect(shoppingCartPage.inventoryItemName).toHaveText(productName);
});
