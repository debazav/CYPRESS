// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
 Cypress.Commands.add('login', (email, password) => { 
    cy.get('[data-test="username"]').type(email)
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()
    cy.get('.title').should('have.text', 'Products')
  })

  Cypress.Commands.add('login_with_session', (username, password) => {
    cy.session([username, password], () => {
      cy.visit('/')
      cy.get('#username').type(username)
        cy.get('#password').type(password)
        cy.get('#kc-login').click()
        cy.get('.home-title').should('have.text', 'Logged with success')
    })
  })
//
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })