# Task 3 - SauceDemo Automation

Cypress + Cucumber (Gherkin) automation for **https://www.saucedemo.com**,
covering **Login**, **Checkout**, and **Logout**, using the Page Object Model.

## Structure

```
task3-saucedemo/
├── cypress/
│   ├── e2e/
│   │   ├── features/                 # Gherkin feature files
│   │   │   ├── login.feature         # Multiple users (valid + locked out + invalid password)
│   │   │   ├── checkout.feature      # Add product to cart + full checkout flow
│   │   │   └── logout.feature        # Logout flow
│   │   └── step_definitions/
│   │       ├── loginSteps.js
│   │       ├── checkoutSteps.js
│   │       └── logoutSteps.js
│   ├── pages/                        # Page Object Model
│   │   ├── LoginPage.js
│   │   ├── InventoryPage.js
│   │   ├── CartPage.js
│   │   └── CheckoutPage.js
│   └── support/
│       ├── commands.js
│       └── e2e.js
├── cypress.config.js
└── package.json
```

## Setup

```bash
cd task3-saucedemo
npm install
```

## Running the tests

```bash
npm test              # all feature files, headless
npm run test:login    # login.feature only
npm run test:checkout # checkout.feature only
npm run test:logout   # logout.feature only
npm run cy:open        # interactive Cypress runner
```

## Test coverage

- **Login**: valid login for `standard_user`, `problem_user`, `performance_glitch_user`,
  `error_user`, `visual_user`; blocked login for `locked_out_user`; invalid password rejection.
- **Checkout**: add a product to the cart, verify the cart badge, proceed through checkout
  (shipping info) and complete the order, verifying the confirmation message.
- **Logout**: log in, log out via the burger menu, and verify redirection back to the login page.
