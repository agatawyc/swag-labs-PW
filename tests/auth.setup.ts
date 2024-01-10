import { test as setup, expect } from '@playwright/test';
import { Login } from '../pages/login';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  let loginPage = new Login(page);
  await loginPage.goTo();
  await loginPage.username.fill('standard_user');
  await loginPage.password.fill('secret_sauce');
  await loginPage.loginButton.click();
  await page.waitForURL('https://www.saucedemo.com/inventory.html');
  await page.context().storageState({ path: authFile });
});
