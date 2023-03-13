describe('share location', () => {
  it('should fetch the user location', () => {
    cy.visit('/').then((win) => {
      cy.stub(win.navigator.geolocation, 'getCurrentPosition')
        .as('getUserLocation')
        .callsFake((cb) => {
          setTimeout(() => {
            cb({
              coords: {
                latitude: 37.3,
                longitude: 29.53,
              },
            });
          }, 100);
        });
    });
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('@getUserLocation').should('have.been.called');
    cy.get('[data-cy="get-loc-btn"').should('be.disabled');
    cy.get('[data-cy="actions"').should('contain.text', 'Location fetched');
  });
});
