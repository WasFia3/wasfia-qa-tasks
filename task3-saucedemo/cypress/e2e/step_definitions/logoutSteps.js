const { When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const inventoryPage = require('../../pages/InventoryPage');

When('I log out', () => {
  inventoryPage.logout();
});

Then('I should be redirected to the login page', () => {
  cy.url().should('eq', Cypress.config().baseUrl + '/');
  cy.get('#login-button').should('be.visible');
});
