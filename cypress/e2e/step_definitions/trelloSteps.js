import {
  Given,
  When,
  Then,
  After,
} from '@badeball/cypress-cucumber-preprocessor'
import * as trelloApi from '../../support/trelloApi'
import boardPage from '../../pages/BoardPage'
import cardWindow from '../../pages/CardWindow'

// Test data created for the current scenario
let board = null

// Cleanup: every scenario gets a fresh board, so remove it afterwards
After(() => {
  if (board) {
    trelloApi.deleteBoard(board.id)
    board = null
  }
})

// ----------------------------------------------------------------------
// Given
// ----------------------------------------------------------------------

Given('I am logged in to Trello', () => {
  cy.loginToTrello()
})

Given('a board with lists {string} exists', (listNamesCsv) => {
  const listNames = listNamesCsv.split(',').map((name) => name.trim())
  trelloApi
    .createBoard('Wasfia Final Task Board', listNames)
    .then((createdBoard) => {
      board = createdBoard
    })
})

Given('the list {string} contains a card {string}', (listName, cardName) => {
  trelloApi.createCard(board.lists[listName], cardName)
})

Given(
  'the list {string} contains a template card {string}',
  (listName, cardName) => {
    trelloApi.createTemplateCard(board.lists[listName], cardName)
  }
)

// ----------------------------------------------------------------------
// When
// ----------------------------------------------------------------------

When('I open the board', () => {
  boardPage.open(board.shortUrl)
})

When('I take a full page screenshot of the board', () => {
  boardPage.takeFullPageScreenshot('R0-board-full-page')
})

When('I open the card {string}', (cardName) => {
  boardPage.openCard(cardName)
  cardWindow.waitUntilOpen()
})

When('I delete the open card', () => {
  cardWindow.deleteCard()
})

When(
  'I create a card template named {string} in list {string}',
  (templateName, listName) => {
    boardPage.createTemplateInList(templateName, listName)
  }
)

When('I rename the open card to {string}', (newName) => {
  cardWindow.rename(newName)
})

When('I close the card window', () => {
  cardWindow.close()
})

When('I move the open card to list {string}', (listName) => {
  cardWindow.moveToList(listName)
})

When('I hide the open template card from the list', () => {
  cardWindow.hideFromList()
})

// ----------------------------------------------------------------------
// Then
// ----------------------------------------------------------------------

Then(
  'the card {string} should not be visible on the board',
  (cardName) => {
    boardPage.assertCardNotVisible(cardName)
  }
)

Then(
  'the list {string} should contain the card {string}',
  (listName, cardName) => {
    boardPage.assertCardInList(cardName, listName)
  }
)
