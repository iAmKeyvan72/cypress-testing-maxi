/// <reference types="Cypress" />

describe('auth', () => {
  beforeEach(() => {
    cy.task('seedDatabase');
  });
  it('should signup the user', () => {
    cy.visit('/signup');
    cy.get('[data-cy="auth-email"]').click();
    cy.get('[data-cy="auth-email"]').type('test2@example.com');
    cy.get('[data-cy="auth-password"]').click();
    cy.get('[data-cy="auth-password"]').type('passhereisit');
    cy.get('[data-cy="auth-submit"]').click();
    cy.location('pathname').should('equal', '/takeaways');
    cy.getCookie('__session').its('value').should('not.be.empty');
  });

  it('should login', () => {
    cy.visit('/login');
    cy.get('[data-cy="auth-email"]').click();
    cy.get('[data-cy="auth-email"]').type('test@example.com');
    cy.get('[data-cy="auth-password"]').click();
    cy.get('[data-cy="auth-password"]').type('testpassword');
    cy.get('[data-cy="auth-submit"]').click();
    cy.location('pathname').should('equal', '/takeaways');
    cy.getCookie('__session').its('value').should('not.be.empty');
  });

  it('should logout', () => {
    cy.login();
    cy.get('button').contains('Logout').click();
    cy.location('pathname').should('equal', '/');
    cy.getCookie('__session').its('value').should('be.empty');
  });
});
