const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://trello.com",
    // Part 2: custom screenshots folder for the full-page board screenshot
    screenshotsFolder: "cypress/TrelloScreenshots",
    viewportWidth: 1400,
    viewportHeight: 900,
    defaultCommandTimeout: 15000,
    // Trello runs a lot of third-party scripts that throw uncaught errors
    // unrelated to our tests, so they must not fail the run
    chromeWebSecurity: false,
    specPattern: ["cypress/e2e/**/*.feature", "cypress/e2e/**/*.cy.js"],
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({ plugins: [createEsbuildPlugin(config)] })
      );
      return config;
    },
  },
});
