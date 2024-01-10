import { Locator, Page } from '@playwright/test';

export class Login {
  username: Locator;
  password: Locator;
  loginButton: Locator;
  page: Page;

  constructor(page: Page) {
    this.username = page.locator('[data-test="username"]');
    this.password = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.page = page;
  }
  async goTo() {
    await this.page.goto('https://www.saucedemo.com/');
  }
}
