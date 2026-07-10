@regression
Feature: R_4 - User Can Hide Template From List

  As a Trello user
  I want to hide a card template from its list
  So that the list stays clean while the template is still usable

  Background:
    Given I am logged in to Trello
    And a board with lists "To Do, Doing, Done" exists
    And the list "To Do" contains a template card "Card Template"

  Scenario: TC_R4_01 - Hide a template card from its list
    When I open the board
    And I open the card "Card Template"
    And I hide the open template card from the list
    Then the card "Card Template" should not be visible on the board
