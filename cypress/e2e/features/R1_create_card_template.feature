@smoke @regression
Feature: R_1 - User Can Create New Template "Card Template"

  As a Trello user
  I want to create a new card template
  So that I can quickly create cards with a predefined structure

  Background:
    Given I am logged in to Trello
    And a board with lists "To Do, Doing, Done" exists

  Scenario: TC_R1_01 - Create a new card template in a list
    When I open the board
    And I create a card template named "Card Template" in list "To Do"
    Then the list "To Do" should contain the card "Card Template"
