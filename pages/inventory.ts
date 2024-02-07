import { Page, expect } from '@playwright/test';
import { ShoppingCartButton } from './components/shopping-cart-button';
import { ProductDetails } from './product-details';
import { ShoppingCart } from './shopping-cart';

export class Inventory {
  readonly page: Page;
  readonly shoppingCartButton: ShoppingCartButton;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartButton = new ShoppingCartButton(page);
  }

  async goTo() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  async addProductToCart(productName: string) {
    productName = productName.replaceAll(' ', '-').toLowerCase();
    await this.page.locator(`[data-test="add-to-cart-${productName}"]`).click();
  }

  async openProductDetails(productName: string) {
    await this.page
      .locator('.inventory_item_name', { hasText: productName })
      .click();
    const productDetails = new ProductDetails(this.page, productName);
    await expect(productDetails.shoppingCartButton.button).toBeVisible();
    return productDetails;
  }

  async openShoppingCart() {
    await this.shoppingCartButton.button.click();
    return new ShoppingCart(this.page);
  }
}
