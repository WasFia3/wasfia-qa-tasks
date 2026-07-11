const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const loginPage = require('../../pages/LoginPage');

Given('I am on the SauceDemo login page', () => {
  loginPage.visit();
});

Given('I am logged in as {string}', (username) => {
  loginPage.visit();
  loginPage.login(username, 'secret_sauce');
  cy.url().should('include', '/inventory.html');
});

When('I log in as {string} with password {string}', (username, password) => {
  loginPage.login(username, password);
});

Then('I should be redirected to the inventory page', () => {
  cy.url().should('include', '/inventory.html');
});

Then('I should see the error message {string}', (message) => {
  loginPage.errorMessage().should('be.visible').and('contain.text', message);
});
