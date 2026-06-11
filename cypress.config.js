const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: 'https://automationexercise.com', // هنا قمنا بتعريف موقع الاختبار الأساسي
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});