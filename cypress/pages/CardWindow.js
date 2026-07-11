// Page Object for the card window (the dialog that opens when clicking a card)
// All data-testid selectors verified against the live Trello DOM.
// Note: in Trello's current UI, Move / Archive / Delete / Hide live behind
// the "Actions" menu button in the card window header.

class CardWindow {
  elements = {
    dialog: '[data-testid="card-back-name"]',
    titleInput: '[data-testid="card-back-title-input"]',
    actionsMenuButton: '[data-testid="card-back-actions-button"]',
    // on template cards this same button is labeled "Hide from list"
    archiveButton: '[data-testid="card-back-archive-button"]',
    deleteButton: '[data-testid="card-back-delete-card-button"]',
    confirmButton: '[data-testid="popover-confirm-button"]',
    moveButton: '[data-testid="card-back-move-card-button"]',
    closeButton: 'button[aria-label="Close dialog"]',
    // move popover (react-select comboboxes)
    listDestinationSelect:
      '[data-testid="move-card-popover-select-list-destination"]',
    listDestinationOption: '[role="option"]',
    moveSubmitButton: '[data-testid="move-card-popover-move-button"]',
  }

  waitUntilOpen() {
    cy.get(this.elements.dialog, { timeout: 15000 }).should('be.visible')
  }

  openActionsMenu() {
    cy.get(this.elements.actionsMenuButton).click()
  }

  close() {
    cy.get(this.elements.closeButton).click()
  }

  // R_0: archive the card first; the actions menu then offers Delete,
  // which needs a confirmation
  deleteCard() {
    this.openActionsMenu()
    cy.get(this.elements.archiveButton).click()
    cy.get(this.elements.deleteButton, { timeout: 10000 }).click()
    cy.get(this.elements.confirmButton, { timeout: 10000 }).click()
  }

  // R_2: rename the open card / template (Enter saves the title)
  rename(newName) {
    cy.get(this.elements.titleInput)
      .click()
      .clear()
      .type(`${newName}{enter}`)
  }

  // R_3: move the open card / template to another list on the same board
  moveToList(listName) {
    this.openActionsMenu()
    cy.get(this.elements.moveButton).click()
    cy.get(this.elements.listDestinationSelect, { timeout: 10000 }).click()
    // anchored regex so "Done" cannot match the "To Do (current)" option
    cy.contains(this.elements.listDestinationOption, new RegExp(`^${listName}`), {
      timeout: 10000,
    }).click()
    cy.get(this.elements.moveSubmitButton).click()
  }

  // R_4: hide a template card from its list ("Hide from list" is the
  // template-card label of the archive action), then close the dialog
  hideFromList() {
    this.openActionsMenu()
    cy.get(this.elements.archiveButton).click()
    this.close()
  }
}

export default new CardWindow()
