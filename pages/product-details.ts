import { Locator, Page } from '@playwright/test';
import { ShoppingCartButton } from './components/shopping-cart-button';

export class ProductDetails {
  page: Page;
  shoppingCartButton: ShoppingCartButton;
  private productName: string;

  constructor(page: Page, productName: string) {
    this.page = page;
    this.shoppingCartButton = new ShoppingCartButton(page);
    this.productName = productName;
  }

  async addProductToCart() {
    const product = this.productName.replaceAll(' ', '-').toLowerCase();
    await this.page.locator(`[data-test="add-to-cart-${product}"]`).click();
  }
}
