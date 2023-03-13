/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.submitForm()
     */
    submitForm(): Chainable<Element>;
    getById(id: string): Chainable<JQuery<HTMLElement>>;
  }
}
