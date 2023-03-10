describe('contact form', () => {
  it('should submit the form', () => {
    cy.visit('http://localhost:5174/about');
    cy.get('[data-cy="contact-input-message"]').type('Hello Human!');
    cy.get('[data-cy="contact-input-name"]').type('K1');
    cy.get('[data-cy="contact-input-email"]').type('k1@mahmoudi.com');
    cy.get('[data-cy="contact-btn-submit"]').as('submitBtn');
    cy.get('@submitBtn').contains(/send message/i);
    cy.get('@submitBtn').should('not.have.attr', 'disabled');
    cy.get('@submitBtn').click();
    cy.get('@submitBtn').should('have.attr', 'disabled');
    cy.get('@submitBtn').contains(/sending.../i);
    cy.get('@submitBtn').should('not.have.attr', 'disabled');
    cy.get('@submitBtn').contains(/send message/i);
  });
});
