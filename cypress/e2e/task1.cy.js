describe('Task#1 - Register Page Selectors', () => {


  it('Logo', () => {
    cy.visit('https://demowebshop.tricentis.com/register')
    cy.get('.header-logo')
  })

   it('Log in link', () => {
    cy.visit('https://demowebshop.tricentis.com/register')
    cy.get('.ico-login')
  })

   it('Search store input', () => {
    cy.visit('https://demowebshop.tricentis.com/register')
    cy.get('#small-searchterms')
  })

  it('JEWELRY nav item', () => {
    cy.visit('https://demowebshop.tricentis.com/register')
    cy.get('[href="/jewelry"]') 
   })

   it('Register heading', () => {
    cy.visit('https://demowebshop.tricentis.com/register')
    cy.get('.page-title')
  })

  it('Male radio button', () => {
    cy.visit('https://demowebshop.tricentis.com/register')
    cy.get('#gender-male')
  })

  it('Email field', () => {
    cy.visit('https://demowebshop.tricentis.com/register')
    cy.get('#Email')
  })

  it('Gift Cards link', () => {
    cy.visit('https://demowebshop.tricentis.com/register')
    cy.get('[href="/gift-cards"]')
  })

  it('Manufacturers', () => {
    cy.visit('https://demowebshop.tricentis.com/register')
    cy.get('.title').contains('Manufacturers')
  })

  it('Register button', () => {
    cy.visit('https://demowebshop.tricentis.com/register')
    cy.get('#register-button')
  })

  it('Subscribe button', () => {
    cy.visit('https://demowebshop.tricentis.com/register')
    cy.get('#newsletter-subscribe-button')
  })
  
  it('MY ACCOUNT footer', () => {
    cy.visit('https://demowebshop.tricentis.com/register')
    cy.get('.my-account')
  })

it('Contact us link', () => {
    cy.visit('https://demowebshop.tricentis.com/register')
    cy.get('[href="/contactus"]')
  })

})