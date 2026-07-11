// Page Object for a Trello board (lists + cards view)
// All data-testid selectors verified against the live Trello DOM.

class BoardPage {
  elements = {
    boardCanvas: '[data-testid="board-canvas"]',
    list: '[data-testid="list"]',
    listName: '[data-testid="list-name"]',
    card: '[data-testid="trello-card"]',
    cardName: '[data-testid="card-name"]',
    acceptCookiesButton: '[data-testid="accept-all-button"]',
    // template creation flow (list footer)
    createFromTemplateButton: '[data-testid="card-template-list-button"]',
    newTemplateButton: '[data-testid="create-new-template-card-button"]',
  }

  // Opens a board by its url and waits until the lists are rendered
  open(boardUrl) {
    cy.visit(boardUrl)
    cy.get(this.elements.boardCanvas, { timeout: 30000 }).should('be.visible')
    cy.get(this.elements.list, { timeout: 30000 }).should('be.visible')
    this.dismissCookieBannerIfPresent()
  }

  // The Atlassian cookie-consent banner overlays the board on fresh sessions
  dismissCookieBannerIfPresent() {
    cy.get('body').then(($body) => {
      if ($body.find(this.elements.acceptCookiesButton).length) {
        cy.get(this.elements.acceptCookiesButton).click()
      }
    })
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
    cy.contains(this.elements.cardName, cardName, { timeout: 15000 }).click()
  }

  // Creates a card template through the list footer "Create from template" flow
  createTemplateInList(templateName, listName) {
    this.getList(listName).within(() => {
      cy.get(this.elements.createFromTemplateButton).click()
    })
    cy.get(this.elements.newTemplateButton, { timeout: 10000 }).click()
    // the new-template composer focuses its title textarea; Enter submits
    cy.focused().type(`${templateName}{enter}`)
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
