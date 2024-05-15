import LogInPage from "./loginPageObj.cy";
import SitePage from "./sitePageObj.cy";

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
  
describe('Website tests', () => {

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

  it.only('Should add item to cart and remove for standard user', () => {
    logIn(users.standard_user);
    cy.url().should('include', '/inventory.html');
    
    const sitePage = new SitePage();
    sitePage.addToCart();
    sitePage.goToCart();
    cy.url().should('include', '/cart.html');
    cy.get('[data-test="inventory-item-name"]').should("have.text","Sauce Labs Backpack");

    sitePage.removeFromCart();
    cy.url().should('include', '/cart.html');
    cy.get('[data-test="inventory-item-name"]').should('not.exist');
  });

  it.only('Should add item to cart and checkout for standard user', () => {
    logIn(users.standard_user);
    cy.url().should('include', '/inventory.html');
    
    const sitePage = new SitePage();
    sitePage.addToCart();
    sitePage.goToCart();
    cy.url().should('include', '/cart.html');
    cy.get('[data-test="inventory-item-name"]').should("have.text","Sauce Labs Backpack");

    sitePage.checkOut();
    cy.url().should('include', '/checkout-step-one.html');

    sitePage.fillCheckOutValues();
    sitePage.continueCheckOut();
    cy.url().should('include', '/checkout-step-two.html');
    cy.get('[data-test="inventory-item-name"]').should("have.text","Sauce Labs Backpack");
    
    sitePage.finishCheckOut();
    cy.url().should('include', '/checkout-complete.html');
    cy.get('[data-test="complete-header"]').should("have.text","Thank you for your order!");
    
  });

});