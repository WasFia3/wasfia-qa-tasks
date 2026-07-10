@regression
Feature: R_2 - User Can Update Name Of Template

  As a Trello user
  I want to rename an existing card template
  So that its name stays meaningful

  Background:
    Given I am logged in to Trello
    And a board with lists "To Do, Doing, Done" exists
    And the list "To Do" contains a template card "Card Template"

  Scenario: TC_R2_01 - Update the name of an existing template
    When I open the board
    And I open the card "Card Template"
    And I rename the open card to "Card Template Updated"
    And I close the card window
    Then the list "To Do" should contain the card "Card Template Updated"
