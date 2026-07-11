@login
Feature: Login
  As a SauceDemo user
  I want to log in with different accounts
  So that I can access (or be denied access to) the store

  Background:
    Given I am on the SauceDemo login page

  @smoke
  Scenario Outline: Successful login for valid users
    When I log in as "<username>" with password "<password>"
    Then I should be redirected to the inventory page

    Examples:
      | username                | password     |
      | standard_user           | secret_sauce |
      | problem_user            | secret_sauce |
      | performance_glitch_user | secret_sauce |
      | error_user              | secret_sauce |
      | visual_user             | secret_sauce |

  @smoke
  Scenario: Locked out user cannot log in
    When I log in as "locked_out_user" with password "secret_sauce"
    Then I should see the error message "Epic sadface: Sorry, this user has been locked out."

  Scenario: Login fails with an invalid password
    When I log in as "standard_user" with password "wrong_password"
    Then I should see the error message "Epic sadface: Username and password do not match any user in this service"
