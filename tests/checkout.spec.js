const { test, expect } = require('@playwright/test');
const { LoginPage, ShopPage, CheckoutPage } = require('./pages/checkoutPage');

test('Checkout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const shopPage = new ShopPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Navigate to login page and sign in
  await loginPage.goto();
  await loginPage.login('rahulshettyacademy', 'learning');

  // Verify successful signin (wait for shop page)
  await expect(page).toHaveURL(/.*shop/);

  // Add Blackberry item to cart and go to checkout
  await shopPage.addProductToCart('Blackberry');
  await shopPage.goToCart();
  await shopPage.checkout();

  // Enter delivery location and agree to terms
  await checkoutPage.enterCountry('Pune');
  await checkoutPage.agreeToTerms();

  // Purchase and assert success message
  await checkoutPage.purchase();
  const successText = await checkoutPage.getSuccessText();
  expect(successText).toContain('Success');
});
