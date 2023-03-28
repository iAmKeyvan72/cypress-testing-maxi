/// <reference types="Cypress" />

describe('Newsletter', () => {
  beforeEach(() => {
    cy.task('seedDatabase');
  });
  it('should show a success message', () => {
    cy.intercept('POST', '/newsletter*', { status: 201 }).as('subscribe');
    cy.visit('/');
    cy.get('[data-cy="newsletter-email"]').type('test@example.com');
    cy.get('[data-cy="newsletter-submit"]').click();
    cy.wait('@subscribe');
    cy.contains('Thanks for signing up!');
  });

  it('should display validation errors', () => {
    cy.intercept('POST', '/newsletter*', {
      message: 'Email address exists already.',
    }).as('subscribe');
    cy.visit('/');
    cy.get('[data-cy="newsletter-email"]').type('test@example.com');
    cy.get('[data-cy="newsletter-submit"]').click();
    cy.wait('@subscribe');
    cy.contains('Email address exists already.');
  });

  it('should create a newsletter contact', () => {
    cy.request({
      method: 'POST',
      url: '/newsletter',
      form: true,
      body: {
        email: 'test@example.com',
      },
    }).then((res) => {
      expect(res.status).to.be.equal(201);
    });
  });
});
