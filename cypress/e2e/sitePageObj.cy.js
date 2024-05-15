class SitePage {
    addToCart() {
      const button = cy.get(`[data-test="add-to-cart-sauce-labs-backpack"]`);
      button.click();
    }

    removeFromCart() {
      const button = cy.get(`[data-test="remove-sauce-labs-backpack"]`);
      button.click();
    }
    
    goToCart() {
      const button = cy.get(`[data-test="shopping-cart-link"]`);
      button.click();
    }

    checkOut() {
      const button = cy.get(`[data-test="checkout"]`);
      button.click();
    }   

    fillCheckOutValues() {
      cy.get(`#first-name`).clear();
      cy.get(`#first-name`).type("John");
      cy.get(`#last-name`).clear();
      cy.get(`#last-name`).type("Doe");
      cy.get(`#postal-code`).clear();
      cy.get(`#postal-code`).type("12345");
    }

    continueCheckOut() {
      const button = cy.get(`[data-test="continue"]`);
      button.click();
    }   

    finishCheckOut() {
      const button = cy.get(`[data-test="finish"]`);
      button.click();
    }      
    
  }
  
  export default SitePage;