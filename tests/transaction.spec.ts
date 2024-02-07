import { test, expect } from '@playwright/test';
import { Inventory } from '../pages/inventory';
import { faker } from '@faker-js/faker';

let inventoryPage: Inventory;
const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const zipCode = faker.location.zipCode();

test.beforeEach(async ({ page }) => {
  inventoryPage = new Inventory(page);
});

test('should make a transaction', async ({}) => {
  const productName = 'Sauce Labs Backpack';
  await inventoryPage.goTo();
  await inventoryPage.addProductToCart(productName);
  const shoppingCart = await inventoryPage.openShoppingCart();
  const checkoutPage = await shoppingCart.goToCheckout();
  await checkoutPage.firstNameField.fill(firstName);
  await checkoutPage.lastNameField.fill(lastName);
  await checkoutPage.zipCodeField.fill(zipCode);
  await checkoutPage.continueButton.click();
  await checkoutPage.finishButton.click();
  await expect(checkoutPage.orderConfirmation).toBeVisible();
});
