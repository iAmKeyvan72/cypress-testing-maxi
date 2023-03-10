describe('tasks management', () => {
  it('should open and close the new task modal', () => {
    cy.visit('http://127.0.0.1:5173');
    cy.get('button').contains('Add Task').click();
    cy.get('dialog.modal').should('exist');
    cy.get('.backdrop').click({ force: true });
    cy.get('.backdrop').should('not.exist');
    cy.get('dialog.modal').should('not.exist');

    cy.get('button').contains('Add Task').click();
    cy.get('button').contains('Cancel').click();
    cy.get('.backdrop').should('not.exist');
    cy.get('dialog.modal').should('not.exist');
  });

  it('should add a new task', () => {
    cy.visit('http://localhost:5173');
    cy.get('button').contains('Add Task').click();
    cy.get('input#title').type('kossher');
    cy.get('textarea#summary').type('kosshere toolani.');
    cy.get('dialog.modal button').contains('Add Task').click();
    cy.get('dialog.modal').should('not.exist');
    cy.get('li.task')
      .should('have.length', 1)
      .and('contain.html', 'h2')
      .and('contain.text', 'kosshere toolani');
  });

  it('should validate task before adding', () => {
    cy.visit('http://localhost:5173');
    cy.get('button').contains('Add Task').click();
    cy.get('dialog.modal button').contains('Add Task').click();
    cy.get('.error-message').should('contain.text', 'Please provide');
  });

  it('should filter the tasks', () => {
    cy.visit('http://localhost:5173');
    cy.get('button').contains('Add Task').click();
    cy.get('select#category').select('important');
    cy.get('dialog.modal button').contains('Add Task').click();
    cy.get('.error-message').should('contain.text', 'Please provide values');
    cy.get('input#title').type('kossher');
    cy.get('textarea#summary').type('kossere toolani.');
    cy.get('dialog.modal button').contains('Add Task').click();
    cy.get('li.task').should('have.length', 1).and('contain.text', 'kossher');
    cy.get('select#filter').select('urgent');
    cy.get('li.task').should('have.length', 0);
    cy.get('select#filter').select('important');
    cy.get('li.task').should('have.length', 1).and('contain.text', 'kosser');
    cy.get('select#filter').select('all');
    cy.get('li.task').should('have.length', 1);
  });
});
