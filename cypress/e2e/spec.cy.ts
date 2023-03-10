describe('tasks page', () => {
  it('should render the main image', () => {
    cy.visit('http://127.0.0.1:5174');
    cy.get('.main-header img');
  });
});
