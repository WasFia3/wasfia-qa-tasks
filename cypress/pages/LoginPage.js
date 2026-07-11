// Page Object for the Trello / Atlassian login page (id.atlassian.com)

class LoginPage {
  elements = {
    emailInput: 'input[name="username"], #username',
    passwordInput: 'input[name="password"], #password',
    submitButton: '#login-submit',
  }

  // Types email -> continue -> password -> submit.
  // Extra screens (emailed verification code, "Security review") may follow
  // on first login from a new device; those are completed manually.
  enterCredentials(email, password) {
    cy.visit('https://id.atlassian.com/login?application=trello')
    cy.get(this.elements.emailInput, { timeout: 30000 })
      .should('be.visible')
      .type(email)
    cy.get(this.elements.submitButton).click()
    cy.get(this.elements.passwordInput, { timeout: 30000 })
      .should('be.visible')
      .type(password, { log: false })
    cy.get(this.elements.submitButton).click()
  }

  // Polls the browser cookie jar until Atlassian has issued its session
  // cookie. Cookie access is origin-independent, so this keeps working no
  // matter which page the login flow lands on while the user finishes the
  // emailed-code / security screens manually. Waits up to 10 minutes.
  waitForAtlassianSession(attempt = 0) {
    if (attempt > 120) {
      throw new Error('Atlassian login was not completed within 10 minutes')
    }
    return cy.getAllCookies({ log: false }).then((cookies) => {
      if (!cookies.some((cookie) => cookie.name === 'cloud.session.token')) {
        return cy
          .wait(5000, { log: false })
          .then(() => this.waitForAtlassianSession(attempt + 1))
      }
    })
  }

  // Polls until trello.com recognises the browser session (SSO handoff
  // finished). cy.request uses the same cookie jar as the page, so this is
  // also origin-independent. Waits up to 10 minutes.
  waitForTrelloSession(attempt = 0) {
    if (attempt > 120) {
      throw new Error('Trello session was not established within 10 minutes')
    }
    return cy
      .request({
        url: 'https://trello.com/1/members/me',
        failOnStatusCode: false,
        log: false,
      })
      .then((resp) => {
        if (resp.status !== 200) {
          return cy
            .wait(5000, { log: false })
            .then(() => this.waitForTrelloSession(attempt + 1))
        }
      })
  }
}

export default new LoginPage()
