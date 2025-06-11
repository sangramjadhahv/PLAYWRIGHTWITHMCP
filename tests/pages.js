class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.usernameInput = '#username';
    this.passwordInput = '#password';
    this.signInButton = '#signInBtn';
  }

  async goto() {
    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.signInButton);
  }
}

class ShopPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.addButton = '.card-footer button.btn-info';
    this.cartButton = 'a.nav-link.btn.btn-primary';
    this.cartItems = 'h4.media-heading a';
  }

  async addFirstProductToCart() {
    await this.page.click(this.addButton);
  }

  async gotoCart() {
    await this.page.click(this.cartButton);
  }

  async getCartItems() {
    return await this.page.locator(this.cartItems).allTextContents();
  }
}

module.exports = { LoginPage, ShopPage };
