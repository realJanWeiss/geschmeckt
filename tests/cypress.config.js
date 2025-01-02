const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8100',
    viewportHeight: 812,
    viewportWidth: 375,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
