//slight advantage in running time when we are using Cypress App Actions
class LogInPage {
    visit() {
      cy.visit('https://www.saucedemo.com/');
    }
  
    getError() {
      return cy.get(`[data-test="error"]`);
    }
  
    fillUserName(value) {
      const field = cy.get(`#user-name`);
      field.clear();
      field.type(value);
  
      return this;
    }
  
    fillPassword(value) {
      const field = cy.get(`#password`);
      field.clear();
      field.type(value);
  
      return this;
    }
  
    submit() {
      const button = cy.get(`#login-button`);
      button.click();
    }    
  }
  
  export default LogInPage;