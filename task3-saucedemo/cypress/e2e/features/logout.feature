@logout
Feature: Logout
  As a logged in SauceDemo user
  I want to log out
  So that my session is ended securely

  @smoke
  Scenario: Successful logout
    Given I am logged in as "standard_user"
    When I log out
    Then I should be redirected to the login page
