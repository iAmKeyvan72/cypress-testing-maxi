describe('tasks page', () => {
  it('should render the main image', () => {
    cy.visit('http://127.0.0.1:5174');
    cy.get('.main-header img');
  });

  it('should display the currect page title', () => {
    cy.visit('http://127.0.0.1:5174');
    cy.get('h1').should('have.length', 1).and('contain.text', 'React Tasks');
  });
});
