import { Page } from '@playwright/test';
import { ShoppingCartButton } from './components/shopping-cart-button';
import { ShoppingCart } from './shopping-cart';

export class ProductDetails {
  readonly page: Page;
  readonly shoppingCartButton: ShoppingCartButton;
  private readonly productName: string;

  constructor(page: Page, productName: string) {
    this.page = page;
    this.shoppingCartButton = new ShoppingCartButton(page);
    this.productName = productName;
  }

  async addProductToCart() {
    const product = this.productName.replaceAll(' ', '-').toLowerCase();
    await this.page.locator(`[data-test="add-to-cart-${product}"]`).click();
  }

  async openShoppingCart() {
    await this.shoppingCartButton.button.click();
    return new ShoppingCart(this.page);
  }
}
