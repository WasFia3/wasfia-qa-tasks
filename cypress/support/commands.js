// Logs in to Trello by restoring the session cookies captured once by
// cypress/e2e/loginSetup.cy.js (see that file for why). The session is
// cached across all specs, and validated against the Trello API.
Cypress.Commands.add('loginToTrello', () => {
  cy.session(
    'trello-session',
    () => {
      cy.readFile('cypress/fixtures/trelloSession.json').then((cookies) => {
        cookies.forEach((cookie) => {
          cy.setCookie(cookie.name, cookie.value, {
            domain: cookie.domain,
            path: cookie.path,
            secure: cookie.secure,
            httpOnly: cookie.httpOnly,
            expiry: cookie.expiry,
          })
        })
      })
    },
    {
      cacheAcrossSpecs: true,
      validate() {
        // Session is valid as long as Trello recognises our cookies
        cy.request({
          url: 'https://trello.com/1/members/me',
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 200)
      },
    }
  )
})
