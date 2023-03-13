describe('share location', () => {
  beforeEach(() => {
    cy.fixture('user-location.json').as('userLocation');
    cy.visit('/').then((win) => {
      cy.get('@userLocation').then((fakeLocation) => {
        cy.stub(win.navigator.geolocation, 'getCurrentPosition')
          .as('getUserLocation')
          .callsFake((cb) => {
            setTimeout(() => {
              cb(fakeLocation);
            }, 100);
          });
      });
      cy.stub(win.navigator.clipboard, 'writeText')
        .as('copyLocation')
        .resolves();
    });
  });
  it('should fetch the user location', () => {
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('@getUserLocation').should('have.been.called');
    cy.get('[data-cy="get-loc-btn"').should('be.disabled');
    cy.get('[data-cy="actions"').should('contain.text', 'Location fetched');
  });

  it('should share the location', () => {
    cy.get('[data-cy="name-input"]').type('kire khar');
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get('@copyLocation').should('have.been.called');
    cy.get('@userLocation').then((fakeLocation: any) => {
      const { latitude, longitude } = fakeLocation.coords;
      cy.get('@copyLocation').should(
        'be.calledWithMatch',
        new RegExp(`${latitude}.*${longitude}.*${encodeURI('kire khar')}`)
      );
    });
  });
});
