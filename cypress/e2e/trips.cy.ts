import { TripsPage } from 'cypress/support/pages/trips.page';

describe('GIVEN The Trips page', () => {
  let tripsPage: TripsPage;
  beforeEach(() => {
    tripsPage = new TripsPage();
  });
  context('WHEN the page is loaded', () => {
    it('THEN should show 5 list items', () => {
      tripsPage.getTripsList().should('have.length', 5);
    });
  });
  context('WHEN form is filled with a correct trip', () => {
    beforeEach(() => {
      tripsPage.getDestinationInput().type('Asteroid B612');
      tripsPage.getAgencySelect().select('space-y');
      tripsPage.getStartDateInput().type('2030-12-31');
    });
    it('THEN should enable submit button', () => {
      tripsPage.getSubmitButton().should('be.enabled');
    });
    it('AND THEN should show submit button', () => {
      tripsPage.getSubmitButton().should('be.visible');
    });
  });
  context('WHEN filling a new trip without destination', () => {
    beforeEach(() => {
      tripsPage.getDestinationInput().clear();
      tripsPage.getAgencySelect().select('space-y');
      tripsPage.getStartDateInput().type('2030-12-31');
    });
    it('THEN should disable submit button', () => {
      tripsPage.getSubmitButton().should('be.disabled');
    });
  });
});
