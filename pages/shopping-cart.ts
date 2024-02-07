import { Locator, Page } from '@playwright/test';
import { ShoppingCartButton } from './components/shopping-cart-button';
import { Checkout } from './checkout';

export class ShoppingCart {
  readonly page: Page;
  readonly shoppingCartButton: ShoppingCartButton;
  readonly inventoryItemName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartButton = new ShoppingCartButton(page);
    this.inventoryItemName = page.locator('.inventory_item_name');
  }
  async goToCheckout() {
    await this.page.locator('[data-test="checkout"]').click();
    return new Checkout(this.page);
  }
}
