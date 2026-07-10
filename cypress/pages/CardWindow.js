// Page Object for the card window (the dialog that opens when clicking a card)

class CardWindow {
  elements = {
    dialog: '[data-testid="card-back-name"]',
    titleInput: '[data-testid="card-back-title-input"]',
    archiveButton: '[data-testid="card-back-archive-button"]',
    deleteButton: '[data-testid="card-back-delete-card-button"]',
    confirmButton: '[data-testid="popover-confirm-button"]',
    moveButton: '[data-testid="card-back-move-card-button"]',
    hideFromListButton: '[data-testid="card-back-hide-from-list-button"]',
    closeButton: 'button[aria-label="Close dialog"]',
    // move popover
    moveListSelect: '[data-testid="move-card-popover-select-list-destination"]',
    movePopoverMoveButton: '[data-testid="move-card-popover-move-button"]',
  }

  waitUntilOpen() {
    cy.get(this.elements.dialog, { timeout: 15000 }).should('be.visible')
  }

  close() {
    cy.get(this.elements.closeButton).click()
  }

  // R_0: a card must be archived first, then it can be deleted permanently
  deleteCard() {
    cy.get(this.elements.archiveButton).click()
    cy.get(this.elements.deleteButton, { timeout: 10000 }).click()
    cy.get(this.elements.confirmButton, { timeout: 10000 }).click()
  }

  // R_2: rename the open card / template
  rename(newName) {
    cy.get(this.elements.titleInput)
      .click()
      .clear()
      .type(`${newName}{enter}`)
  }

  // R_3: move the open card / template to another list on the same board
  moveToList(listName) {
    cy.get(this.elements.moveButton).click()
    cy.get(this.elements.moveListSelect, { timeout: 10000 }).click()
    cy.contains('[role="option"], li', listName, { timeout: 10000 }).click()
    cy.get(this.elements.movePopoverMoveButton).click()
  }

  // R_4: hide a template card from its list
  hideFromList() {
    cy.get(this.elements.hideFromListButton).click()
  }
}

export default new CardWindow()
