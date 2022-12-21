export function interceptGet(endPoint: string) {
  cy.intercept('GET', Cypress.env('apiUrl') + endPoint, {
    fixture: endPoint,
  }).as('get_' + endPoint);
}
