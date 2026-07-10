describe('Automation Exercise - Comprehensive Test Suite', () => {

  // Base URL of this task's website (the global baseUrl now points to Trello for the final task)
  const BASE = 'https://automationexercise.com';

  // Defining state variables outside so they persist across tests during the run
  let username;
  let email;
  let password;

  // This runs once before any test cases start, generating unique user credentials for the signup test
  before(() => {
    const randomString = Math.random().toString(36).substring(2, 7);
    username = `Wasfia_${randomString}`;
    email = `wasfia_${randomString}@gmail.com`;
    password = 'mypassword333';
  });

  // Test Case 1: Handle the signup process and create a new user profile
  it('1. Should successfully register a new user', () => {
    cy.visit(`${BASE}/`, { failOnStatusCode: false });
    cy.get('a[href="/login"]').click();
    
    cy.get('.signup-form').should('be.visible');
    cy.get('[data-qa="signup-name"]').type(username);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();

    cy.wait(3000); //Wait time due to server slowness

    cy.get('#id_gender1').scrollIntoView().should('be.visible').check(); 
    
    cy.get('[data-qa="password"]').type(password);
    cy.get('[data-qa="days"]').select('20');
    cy.get('[data-qa="months"]').select('February');
    cy.get('[data-qa="years"]').select('2004'); 

    cy.get('[data-qa="first_name"]').type('Wasfia');
    cy.get('[data-qa="last_name"]').type('Awwad');
    cy.get('[data-qa="address"]').type('Main Street Something');
    cy.get('[data-qa="country"]').select('United States');
    cy.get('[data-qa="state"]').type('California');
    cy.get('[data-qa="city"]').type('Los Angeles');
    cy.get('[data-qa="zipcode"]').type('90001');
    cy.get('[data-qa="mobile_number"]').type('059934123');

    cy.get('[data-qa="create-account"]').click();

    cy.get('[data-qa="account-created"]').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();
  });

  // Test Case 2: Verify existing user login functionality
  it('2. Should log in successfully with valid credentials', () => {
    cy.visit(`${BASE}/login`, { failOnStatusCode: false });
    
    cy.get('[data-qa="login-email"]').should('be.visible').type(email);
    cy.get('[data-qa="login-password"]').type(password);
    cy.get('[data-qa="login-button"]').click();

    // Verifying it contains the exact username
    cy.get('header', { timeout: 10000 }).should('contain', `Logged in as ${username}`);
  });

  // Test Case 3: Test the search bar with both realistic and non-existent products
  it('3. Should search for products using valid and invalid names', () => {
    cy.visit(`${BASE}/products`, { failOnStatusCode: false });

    cy.get('#search_product').type('Shirt');
    cy.get('#submit_search').click();
    cy.get('.title').should('contain', 'Searched Products');
    cy.get('.productinfo').should('have.length.at.least', 1); 

    cy.get('#search_product').clear().type('InvalidProductNameXYZ');
    cy.get('#submit_search').click();
    
    cy.get('.productinfo').should('not.exist'); 
  });

  // Test Case 4: Verify adding a product to the shopping cart
  it('4. Should add a product to the cart from the details page', () => {
    cy.visit(`${BASE}/products`, { failOnStatusCode: false });
    
    cy.get('.choose > .nav > li > a').first().click();
    cy.url().should('include', '/product_details/');

    cy.get('#quantity').clear().type('2');
    cy.get('button.cart').click({ force: true }); // Force click in case of any overlay issues

    cy.get('.modal-confirm').should('be.visible');
    cy.get('u').contains('View Cart').click();
    
    cy.get('#cart_info_table').should('be.visible');
  });

  // Test Case 5: Verify that logged-in users can write a review on a product
  it('5. Should allow a user to add a review to a product', () => {
    cy.visit(`${BASE}/login`, { failOnStatusCode: false });
    cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]').type(password);
    cy.get('[data-qa="login-button"]').click();

    cy.visit(`${BASE}/product_details/1`, { failOnStatusCode: false });

    cy.get('#name').type(username);
    cy.get('#email').type(email);
    cy.get('#review').type('Nice product! i recommend it ^_^');
    cy.get('#button-review').click();

    cy.get('.alert-success').should('be.visible').and('contain', 'Thank you for your review.');
  });

});