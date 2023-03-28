/// <reference types="Cypress" />

describe('Takeaways', () => {
  beforeEach(() => {
    cy.task('seedDatabase');
  });
  it('should display a list of fetched takeaways', () => {
    cy.visit('/');
    cy.get('[data-cy="takeaway-item"]').should('have.length', 2);
  });
  it('should create a new task', () => {
    cy.intercept('POST', '/takeaways/new*', 'success').as('addNew');
    cy.login();
    cy.visit('/takeaways/new');
    cy.get('[data-cy="title"]').click();
    cy.get('[data-cy="title"]').type('Title1');
    cy.get('[data-cy="body"]').type('Body1');
    cy.get('[data-cy="create-takeaway"]').click();
    cy.wait('@addNew')
      .its('request.body')
      .should('match', /Title1.*Body1/);
  });
});
