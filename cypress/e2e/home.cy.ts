describe('The Home Page ', () => {
  it('The page is visitable', () => {
    cy.visit('/');
  });
  it('Contains the title', () => {
    cy.visit('/');
    cy.contains('anguLab');
  });
  it('Has a nav element', () => {
    cy.visit('/');
    cy.get('nav');
  });
});
