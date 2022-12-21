import { interceptGet } from '../interceptors';

export class TripsPage {
  constructor() {
    cy.visit('/trips');
    interceptGet('trips');
    interceptGet('agencies');
  }
  getTripsList() {
    return cy.get('app-trips-list > ul li');
  }
  getDestinationInput() {
    return cy.get('input[formcontrolname="destination"]');
  }
  getAgencySelect() {
    return cy.get('select[formcontrolname="agencyId"]');
  }
  getStartDateInput() {
    return cy.get('input[formcontrolname="startDate"]');
  }
  getSubmitButton() {
    return cy.get('button[type="submit"]');
  }
}
