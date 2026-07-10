@smoke @regression
Feature: R_0 - User Can Delete Existing Card

  As a Trello user
  I want to delete an existing card
  So that I can remove cards that are no longer needed

  Background:
    Given I am logged in to Trello
    And a board with lists "To Do, Doing, Done" exists
    And the list "To Do" contains a card "Card To Delete"

  Scenario: TC_R0_01 - Delete an existing card from the board
    When I open the board
    And I take a full page screenshot of the board
    And I open the card "Card To Delete"
    And I delete the open card
    Then the card "Card To Delete" should not be visible on the board
