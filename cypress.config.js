const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    //Your page did not fire its load event within 60000ms > https://github.com/cypress-io/cypress/issues/21213
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },    
  }
});
