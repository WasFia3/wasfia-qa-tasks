@checkout
Feature: Checkout
  As a logged in SauceDemo user
  I want to add a product to my cart and check out
  So that I can complete a purchase

  Background:
    Given I am logged in as "standard_user"

  @smoke
  Scenario: Add a product to the cart and complete checkout
    When I add the product "Sauce Labs Backpack" to the cart
    Then the cart badge should show "1" item
    When I go to the cart
    And I start the checkout
    And I fill in the checkout information "John" "Doe" "12345"
    And I finish the checkout
    Then I should see the order confirmation "Thank you for your order!"

  Scenario: Cart badge updates after adding a product
    When I add the product "Sauce Labs Bike Light" to the cart
    Then the cart badge should show "1" item
