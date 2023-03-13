describe('contact form', () => {
  beforeEach(() => {
    cy.visit('/about');
  });
  it('should submit the form', () => {
    cy.getById('contact-input-message').type('Hello Human!');
    cy.getById('contact-input-name').type('K1');
    cy.getById('contact-btn-submit').then((el) => {
      expect(el.attr('disbaled')).to.be.undefined;
      expect(el.text()).to.be.equal('Send Message');
    });
    cy.getById('contact-input-email').type('k1@mahmoudi.com{enter}');

    cy.getById('contact-btn-submit').should('have.attr', 'disabled');
    cy.getById('contact-btn-submit').contains(/sending.../i);
    cy.getById('contact-btn-submit').should('not.have.attr', 'disabled');
    cy.getById('contact-btn-submit').contains(/send message/i);
  });

  it('should validate form', () => {
    cy.visit('/about');
    cy.submitForm();
    cy.getById('contact-btn-submit').should('not.have.attr', 'disabled');
    cy.getById('contact-btn-submit').should('not.contain', 'Sending...');
    cy.getById('contact-btn-submit').contains('Send Message');

    cy.getById('contact-input-message').focus().blur();
    cy.getById('contact-input-message')
      .parent()
      .should('have.attr', 'class')
      .and('match', /invalid/);

    cy.getById('contact-input-name').focus().blur();
    cy.getById('contact-input-name')
      .parent()
      .should('have.attr', 'class')
      .and('match', /invalid/);

    cy.getById('contact-input-email').focus().blur();
    cy.getById('contact-input-email')
      .parent()
      .should('have.attr', 'class')
      .and('match', /invalid/);
  });
});
