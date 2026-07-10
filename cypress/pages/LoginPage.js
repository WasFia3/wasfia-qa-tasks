// Page Object for the Trello / Atlassian login page (id.atlassian.com)

class LoginPage {
  elements = {
    emailInput: 'input[name="username"], #username',
    passwordInput: 'input[name="password"], #password',
    submitButton: '#login-submit',
  }

  // Full login flow: email -> continue -> password -> submit,
  // then wait until Atlassian redirects us back to Trello.
  login(email, password) {
    cy.visit('https://id.atlassian.com/login?application=trello')
    cy.get(this.elements.emailInput, { timeout: 30000 })
      .should('be.visible')
      .type(email)
    cy.get(this.elements.submitButton).click()
    cy.get(this.elements.passwordInput, { timeout: 30000 })
      .should('be.visible')
      .type(password, { log: false })
    cy.get(this.elements.submitButton).click()

    // After a successful login Atlassian redirects back to trello.com
    cy.origin('https://trello.com', () => {
      cy.location('hostname', { timeout: 60000 }).should('eq', 'trello.com')
    })
  }
}

export default new LoginPage()
