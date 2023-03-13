describe('contact form', () => {
  beforeEach(() => {
    cy.visit('/about');
  });
  it('should submit the form', () => {
    cy.get('[data-cy="contact-input-message"]').type('Hello Human!');
    cy.get('[data-cy="contact-input-name"]').type('K1');
    cy.get('[data-cy="contact-btn-submit"]').as('submitBtn');
    cy.get('@submitBtn').then((el) => {
      expect(el.attr('disbaled')).to.be.undefined;
      expect(el.text()).to.be.equal('Send Message');
    });
    cy.get('[data-cy="contact-input-email"]').type('k1@mahmoudi.com{enter}');

    cy.get('@submitBtn').should('have.attr', 'disabled');
    cy.get('@submitBtn').contains(/sending.../i);
    cy.get('@submitBtn').should('not.have.attr', 'disabled');
    cy.get('@submitBtn').contains(/send message/i);
  });

  it('should validate form', () => {
    cy.visit('/about');
    cy.get('[data-cy="contact-btn-submit"]').as('submitBtn');
    cy.submitForm();
    cy.get('@submitBtn').should('not.have.attr', 'disabled');
    cy.get('@submitBtn').should('not.contain', 'Sending...');
    cy.get('@submitBtn').contains('Send Message');

    cy.get('[data-cy="contact-input-message"]').focus().blur();
    cy.get('[data-cy="contact-input-message"]')
      .parent()
      .should('have.attr', 'class')
      .and('match', /invalid/);

    cy.get('[data-cy="contact-input-name"]').focus().blur();
    cy.get('[data-cy="contact-input-name"]')
      .parent()
      .should('have.attr', 'class')
      .and('match', /invalid/);

    cy.get('[data-cy="contact-input-email"]').focus().blur();
    cy.get('[data-cy="contact-input-email"]')
      .parent()
      .should('have.attr', 'class')
      .and('match', /invalid/);
  });
});
