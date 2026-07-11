class CartPage {
  isLoaded() {
    return cy.url().should('include', '/cart.html');
  }

  cartItems() {
    return cy.get('.cart_item');
  }

  checkoutButton() {
    return cy.get('#checkout');
  }

  startCheckout() {
    this.checkoutButton().click();
  }
}

module.exports = new CartPage();
