class InventoryPage {
  isLoaded() {
    return cy.url().should('include', '/inventory.html');
  }

  inventoryItems() {
    return cy.get('.inventory_item');
  }

  addToCartByName(productName) {
    cy.contains('.inventory_item', productName)
      .find('button')
      .contains('Add to cart')
      .click();
  }

  cartBadge() {
    return cy.get('.shopping_cart_badge');
  }

  cartLink() {
    return cy.get('.shopping_cart_link');
  }

  goToCart() {
    this.cartLink().click();
  }

  openMenu() {
    cy.get('#react-burger-menu-btn').click();
  }

  logout() {
    this.openMenu();
    cy.get('#logout_sidebar_link').should('be.visible').click();
  }
}

module.exports = new InventoryPage();
