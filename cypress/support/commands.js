import loginPage from '../pages/LoginPage'

// Logs in to Trello once and caches the session cookies across all specs,
// so every scenario starts already authenticated (fast + stable).
Cypress.Commands.add('loginToTrello', () => {
  const email = Cypress.env('TRELLO_EMAIL')
  const password = Cypress.env('TRELLO_PASSWORD')

  if (!email || !password) {
    throw new Error(
      'Missing TRELLO_EMAIL / TRELLO_PASSWORD. Create cypress.env.json (see cypress.env.json.example)'
    )
  }

  cy.session(
    `trello-${email}`,
    () => {
      loginPage.login(email, password)
    },
    {
      cacheAcrossSpecs: true,
      validate() {
        // The session is valid as long as Trello still recognises our cookies
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
