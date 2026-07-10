// Loaded automatically before every spec file.

import './commands'

// Trello / Atlassian pages run analytics and other third-party scripts that
// occasionally throw errors unrelated to the behaviour under test.
// They must not fail our tests.
Cypress.on('uncaught:exception', () => false)
