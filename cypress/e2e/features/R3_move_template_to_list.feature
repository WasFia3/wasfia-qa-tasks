@regression
Feature: R_3 - User Can Move Template To Any List

  As a Trello user
  I want to move a card template to another list
  So that the template lives in the list where it is used

  Background:
    Given I am logged in to Trello
    And a board with lists "To Do, Doing, Done" exists
    And the list "To Do" contains a template card "Card Template"

  Scenario: TC_R3_01 - Move a template from one list to another
    When I open the board
    And I open the card "Card Template"
    And I move the open card to list "Done"
    And I close the card window
    Then the list "Done" should contain the card "Card Template"
