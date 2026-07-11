// One-time interactive login capture.
//
// Atlassian asks for an emailed verification code (and shows a "Security
// review" screen) the first time it sees a new device. Run this spec HEADED
// once, complete those screens manually in the opened browser, and the
// Trello session cookies are saved to cypress/fixtures/trelloSession.json
// (git-ignored). All feature tests then reuse that session and never see a
// login screen again.
//
//   npx cypress run --spec cypress/e2e/loginSetup.cy.js --headed --browser edge
//
// testIsolation is off so the cookies from test 1 survive into test 2.

import loginPage from '../pages/LoginPage'

describe('One-time Trello login capture', { testIsolation: false }, () => {
  it('logs in at Atlassian (finish code / security screens manually)', () => {
    loginPage.enterCredentials(
      Cypress.env('TRELLO_EMAIL'),
      Cypress.env('TRELLO_PASSWORD')
    )
    // Waits for the Atlassian session cookie regardless of which page the
    // flow ends on - even the broken home.atlassian.com page is fine.
    loginPage.waitForAtlassianSession()
  })

  it('opens Trello through SSO and saves the session cookies', () => {
    // With the Atlassian session in place, Trello's login page completes
    // the single-sign-on by itself (click "Continue as ..." if it appears).
    cy.visit('https://trello.com/login')
    loginPage.waitForTrelloSession()

    cy.getAllCookies().then((cookies) => {
      cy.writeFile('cypress/fixtures/trelloSession.json', cookies)
      cy.log(`Saved ${cookies.length} cookies`)
    })
  })
})
