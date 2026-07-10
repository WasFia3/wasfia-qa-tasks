// Page Object for a Trello board (lists + cards view)

class BoardPage {
  elements = {
    board: '[data-testid="board"]',
    list: '[data-testid="list"]',
    listName: '[data-testid="list-name"]',
    card: '[data-testid="trello-card"]',
    cardName: '[data-testid="card-name"]',
    // template creation flow (list footer)
    createFromTemplateButton: '[data-testid="list-add-card-from-template-button"]',
    newTemplateButton: 'button:contains("Create a new template")',
    cardComposerTextarea: '[data-testid="list-card-composer-textarea"]',
    addCardButton: '[data-testid="list-card-composer-add-card-button"]',
  }

  // Opens a board by its url and waits until the lists are rendered
  open(boardUrl) {
    cy.visit(boardUrl)
    cy.get(this.elements.board, { timeout: 30000 }).should('be.visible')
    cy.get(this.elements.list, { timeout: 30000 }).should('be.visible')
  }

  // Part 2 of the task: full page screenshot of the opened board
  takeFullPageScreenshot(name) {
    cy.screenshot(name, { capture: 'fullPage', overwrite: true })
  }

  // Returns the list container that has the given name
  getList(listName) {
    return cy
      .contains(this.elements.listName, listName, { timeout: 15000 })
      .closest(this.elements.list)
  }

  // Returns the card with the given name (anywhere on the board)
  getCard(cardName) {
    return cy.contains(this.elements.card, cardName, { timeout: 15000 })
  }

  // Opens the card window (card back) of the given card
  openCard(cardName) {
    this.getCard(cardName).click()
  }

  // Creates a card template through the list footer "Create from template" flow
  createTemplateInList(templateName, listName) {
    this.getList(listName).within(() => {
      cy.get(this.elements.createFromTemplateButton).click()
    })
    cy.contains('button', 'Create a new template').click()
    cy.get(this.elements.cardComposerTextarea).type(templateName)
    cy.get(this.elements.addCardButton).click()
    // close the composer / template editor if it stays open
    cy.get('body').type('{esc}')
  }

  // Assertions ---------------------------------------------------------

  assertCardInList(cardName, listName) {
    this.getList(listName).within(() => {
      cy.contains(this.elements.card, cardName, { timeout: 15000 }).should(
        'be.visible'
      )
    })
  }

  assertCardNotVisible(cardName) {
    cy.contains(this.elements.card, cardName).should('not.exist')
  }
}

export default new BoardPage()
