describe('The agencies page', () => {
  beforeEach(() => {
    cy.viewport(1000, 1200);
    cy.intercept('GET', 'http://localhost:3000/agencies', {
      fixture: 'agencies',
    }).as('get_agencies');
    cy.intercept('GET', 'http://localhost:3000/agency-ranges', {
      fixture: 'agency-ranges',
    }).as('get_agency-ranges');
    cy.intercept('GET', 'http://localhost:3000/agency-statuses', {
      fixture: 'agency-statuses',
    }).as('get_agency-statuses');
    cy.visit('/agencies');
    cy.wait('@get_agencies');
  });
  it('should have a title showing 4 agencies', () => {
    cy.get('header').should('contain', '4 agencies');
  });
  it('should call delete when click on remove button', () => {
    cy.intercept('DELETE', 'http://localhost:3000/agencies/*', {
      statusCode: 204,
    }).as('delete_agencies');
    cy.get(':nth-child(4) > :nth-child(4) > button').click();
    cy.get('@delete_agencies').its('response.statusCode').should('eq', 204);
  });
  it('should post when fill the form and click on submit button', () => {
    cy.intercept('POST', 'http://localhost:3000/agencies', {
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
