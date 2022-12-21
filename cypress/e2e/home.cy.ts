describe('The Home Page ', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('The page is visitable', () => {});
  it('Contains the title', () => {
    cy.contains('anguLab');
  });
  it('Has a nav element', () => {
    cy.get('nav');
  });
  it('should have a nav element visible', () => {
    cy.get('nav').should('be.visible');
  });
  it('should display a footer element', { defaultCommandTimeout: 500 }, () => {
    cy.get('main ul').should('be.visible');
  });
  it('should navigate to agencies page', () => {
    cy.get('a[href*="agencies"]').click();
  });
  it('should not have a link to profile', () => {
    cy.get('a[href*="profile"]').should('not.exist');
    cy.log('This is a log message');
  });

  it('should not have orphaned links', { defaultCommandTimeout: 5000 }, () => {
    cy.get('a').should('not.have.attr', 'href', '#undefined');
    cy.get('a').each((anchorNode) =>
      expect(anchorNode).to.not.have.attr('href', '#undefined')
    );
  });
});
