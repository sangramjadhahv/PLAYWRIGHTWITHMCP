const { test, expect } = require('@playwright/test');

test('Checkout', async ({ page }) => {
  // Navigate to login page
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  // Sign in
  await page.fill('#username', 'rahulshettyacademy');
  await page.fill("input[type='password']", 'learning');
  await page.click('#signInBtn');

  // Verify successful signin (wait for shop page)
  await expect(page).toHaveURL(/.*shop/);

  // Add Blackberry item to cart
  const cards = await page.$$('.card.h-100');
  for (const card of cards) {
    const title = await card.$eval('h4 a', el => el.textContent);
    if (title.includes('Blackberry')) {
      await card.click('text=Add');
      break;
    }
  }

  // Go to checkout
  await page.click('a.nav-link.btn.btn-primary'); // Cart button
  await page.click('button.btn.btn-success'); // Checkout button

  // Enter delivery location
  await page.fill('#country', 'Pune');
  await page.waitForSelector('.suggestions');
  await page.click('.suggestions ul li >> text=Pune');

  // Agree to terms and purchase
  await page.check("label[for='checkbox2']");
  await page.click('input[type="submit"]');

  // Assert success message
  const successText = await page.locator('.alert-success').textContent();
  expect(successText).toContain('Success');
});
