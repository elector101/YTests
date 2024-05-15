import LogInPage from "./loginPageObj.cy";

const users = {
    standard_user: {
      login: 'standard_user',
      password: 'secret_sauce',
    },
    locked_out_user: {
      login: 'locked_out_user',
      password: 'secret_sauce',
    }
  };

  const loginPage = new LogInPage();

  const logIn = (credential) => {    
    loginPage.fillUserName(credential.login)
    loginPage.fillPassword(credential.password)
    loginPage.submit();
  }
  
  describe('Login tests', () => {

    beforeEach('Log in the user', () => {
      loginPage.visit();
    });
  
    it.only('Should print error and does not redirect to inventory if user is locked out', () => {
      logIn(users.locked_out_user);
      loginPage.getError().should('contain', 'Epic sadface: Sorry, this user has been locked out.');
      cy.url().should('not.include', '/inventory.html');
    });
  
    it.only('Should log in standard user and redirects to inventory page', () => {
      logIn(users.standard_user);
      cy.url().should('include', '/inventory.html');
    });
  
    it.only('Should log in standard user and user can see inventory item', () => {
      logIn(users.standard_user);
      cy.url().should('include', '/inventory.html');
      cy.get('[data-test="inventory-item-name"]').should('exist');
    });

});