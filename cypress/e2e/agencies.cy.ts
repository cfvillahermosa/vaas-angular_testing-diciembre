import { interceptGet } from 'cypress/support/interceptors';

describe('The agencies page', () => {
  beforeEach(() => {
    cy.viewport(1000, 1200);
    interceptGet('agencies');
    interceptGet('agency-ranges');
    interceptGet('agency-statuses');
    cy.visit('/agencies');
    cy.wait('@get_agencies');
  });
  it('should have a title showing 4 agencies', () => {
    cy.get('header').should('contain', '4 agencies');
  });
  it('should call delete when click on remove button', () => {
    cy.intercept('DELETE', Cypress.env('apiUrl') + 'agencies/*', {
      statusCode: 204,
    }).as('delete_agencies');
    cy.get(':nth-child(4) > :nth-child(4) > button').click();
    cy.get('@delete_agencies').its('response.statusCode').should('eq', 204);
  });
  it('should post when fill the form and click on submit button', () => {
    cy.intercept('POST', Cypress.env('apiUrl') + 'agencies', {
      statusCode: 201,
      body: {},
    }).as('post_agencies');
    cy.get('#name').type('Cypress Moon');
    cy.get('#Interplanetary').click();
    cy.get('#Pending').click();
    cy.get('form button').click();
    const payload = {
      id: 'cypress-moon',
      name: 'Cypress Moon',
      range: 'Interplanetary',
      status: 'Pending',
    };
    cy.get('@post_agencies').its('request.body').should('deep.equal', payload);
  });
});
