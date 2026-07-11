class CheckoutPage {
  // Step One: information form
  firstNameInput() {
    return cy.get('#first-name');
  }

  lastNameInput() {
    return cy.get('#last-name');
  }

  postalCodeInput() {
    return cy.get('#postal-code');
  }

  continueButton() {
    return cy.get('#continue');
  }

  fillInfo(firstName, lastName, postalCode) {
    this.firstNameInput().type(firstName);
    this.lastNameInput().type(lastName);
    this.postalCodeInput().type(postalCode);
    this.continueButton().click();
  }

  // Step Two: overview
  finishButton() {
    return cy.get('#finish');
  }

  finishCheckout() {
    this.finishButton().click();
  }

  // Complete
  completeHeader() {
    return cy.get('.complete-header');
  }
}

module.exports = new CheckoutPage();
