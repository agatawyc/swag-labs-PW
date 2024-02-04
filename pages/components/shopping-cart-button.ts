import { Locator, Page } from '@playwright/test';

export class ShoppingCartButton {
  page: Page;
  badge: Locator;
  button: Locator;

  constructor(page: Page) {
    this.page = page;
    this.badge = page.locator('.shopping_cart_badge');
    this.button = page.locator('#shopping_cart_container');
  }
}
