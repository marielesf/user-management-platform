describe('User login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/login');
  });

  it('Should show error message to login', () => {
    cy.get('#email').type('test');
    cy.get('#password').type('123');
    cy.get('form').contains('Sign in').click();
    cy.wait(1000);
    cy.get('form').contains('Please enter a valid email.').click();
    cy.get('form').contains('Password must be valid.').click();
  });

  it('Should do login with succesffull', () => {
    cy.get('#email').type('george.bluth@reqres.in');
    cy.get('#password').type('abc123');
    cy.get('form').contains('Sign in').click();
    cy.wait(3000);
  });
});
