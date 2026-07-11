class LoginPage {
  visit() {
    cy.visit('/');
  }

  usernameInput() {
    return cy.get('#user-name');
  }

  passwordInput() {
    return cy.get('#password');
  }

  loginButton() {
    return cy.get('#login-button');
  }

  errorMessage() {
    return cy.get('[data-test="error"]');
  }

  login(username, password) {
    this.usernameInput().clear().type(username);
    this.passwordInput().clear().type(password, { log: false });
    this.loginButton().click();
  }
}

module.exports = new LoginPage();
