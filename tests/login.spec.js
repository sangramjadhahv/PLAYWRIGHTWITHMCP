const { test, expect } = require('@playwright/test');
const { LoginPage, ShopPage } = require('./pages');

test('Login to rahulshettyacademy', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('rahulshettyacademy', 'learning');
  await expect(page).toHaveURL(/.*shop/);
  await page.pause(); // Keeps the browser open for inspection
});

test('Login and add first product to cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const shopPage = new ShopPage(page);
  await loginPage.goto();
  await loginPage.login('rahulshettyacademy', 'learning');
  await expect(page).toHaveURL(/.*shop/);
  await shopPage.addFirstProductToCart();
  await page.pause(); // Keeps the browser open for inspection
});

test('Login, add first product, and confirm cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const shopPage = new ShopPage(page);
  await loginPage.goto();
  await loginPage.login('rahulshettyacademy', 'learning');
  await expect(page).toHaveURL(/.*shop/);
  await shopPage.addFirstProductToCart();
  await shopPage.gotoCart();
  const cartItems = await shopPage.getCartItems();
  expect(cartItems.length).toBeGreaterThan(0);
  await page.pause(); // Keeps the browser open for inspection
});
