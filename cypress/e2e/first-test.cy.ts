describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:5174/');
    cy.get('li').should('have.length', 6);
  });
});
