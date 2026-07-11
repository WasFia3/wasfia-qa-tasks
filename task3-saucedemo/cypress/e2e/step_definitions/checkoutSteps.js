const { When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const inventoryPage = require('../../pages/InventoryPage');
const cartPage = require('../../pages/CartPage');
const checkoutPage = require('../../pages/CheckoutPage');

When('I add the product {string} to the cart', (productName) => {
  inventoryPage.addToCartByName(productName);
});

Then('the cart badge should show {string} item', (count) => {
  inventoryPage.cartBadge().should('have.text', count);
});

When('I go to the cart', () => {
  inventoryPage.goToCart();
});

When('I start the checkout', () => {
  cartPage.startCheckout();
});

When('I fill in the checkout information {string} {string} {string}', (firstName, lastName, postalCode) => {
  checkoutPage.fillInfo(firstName, lastName, postalCode);
});

When('I finish the checkout', () => {
  checkoutPage.finishCheckout();
});

Then('I should see the order confirmation {string}', (message) => {
  checkoutPage.completeHeader().should('be.visible').and('contain.text', message);
});
