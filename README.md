# Wasfia QA Tasks

Cypress automation tasks.

- **Task 3** ([task3-saucedemo/](task3-saucedemo/)) automates **SauceDemo**
  (https://www.saucedemo.com) — Login, Checkout, and Logout flows — using
  **Cucumber (Gherkin)** and the **Page Object Model (POM)** design pattern.
- The **Final Task** (this root project) automates **Trello** (https://trello.com)
  using **Cucumber (Gherkin)** and the **Page Object Model (POM)** design pattern.

## Final Task structure

```
cypress/
├── e2e/
│   ├── features/                 # Gherkin feature files (one per requirement R_0..R_4)
│   │   ├── R0_delete_card.feature            @smoke @regression
│   │   ├── R1_create_card_template.feature   @smoke @regression
│   │   ├── R2_update_template_name.feature   @regression
│   │   ├── R3_move_template_to_list.feature  @regression
│   │   └── R4_hide_template_from_list.feature @regression
│   ├── step_definitions/
│   │   └── trelloSteps.js        # Glue between Gherkin steps and page objects
│   ├── task1.cy.js               # (previous task)
│   └── task2.cy.js               # (previous task)
├── pages/                        # Page Object Model
│   ├── LoginPage.js              # Atlassian/Trello login
│   ├── BoardPage.js              # Board, lists, cards, template creation
│   └── CardWindow.js             # Card dialog: delete / rename / move / hide
├── support/
│   ├── commands.js               # cy.loginToTrello() with cached cy.session
│   ├── trelloApi.js              # Trello REST API helper (test data setup/cleanup)
│   └── e2e.js
└── TrelloScreenshots/            # Part 2: full-page board screenshot output
```

## Setup

1. `npm install`
2. Copy `cypress.env.json.example` to `cypress.env.json` and fill in:
   - `TRELLO_EMAIL` / `TRELLO_PASSWORD` — your Trello account login
   - `TRELLO_KEY` / `TRELLO_TOKEN` — from https://trello.com/power-ups/admin
     (API docs: https://developer.atlassian.com/cloud/trello/rest)

`cypress.env.json` is git-ignored so the credentials never reach GitHub.

## Running the tests

```bash
npm run test:smoke        # smoke suite (@smoke)
npm run test:regression   # full regression suite (@regression)
npm run test:trello       # all Trello feature files
npm run cy:open           # interactive Cypress runner
```

## How it works

- **Test data via API:** every scenario creates a fresh board with lists
  (To Do / Doing / Done) plus the needed card/template through the Trello REST
  API, and deletes the board again afterwards — so tests are independent and
  repeatable.
- **Login once:** `cy.session` with `cacheAcrossSpecs` logs in a single time and
  reuses the session for all scenarios.
- **Test cases:** see [TestCases.md](TestCases.md) for the written test cases
  separated into smoke and regression.
