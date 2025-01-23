describe('User login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/login');
  });

  it('Should show error to create user with different passwords', () => {
    cy.contains('Sign up').click();
    cy.get('#userName').type('Joao Silva');
    cy.get('#email').type('test@teste.com');
    cy.get('#password').type('abc123');
    cy.get('#passwordConfirmation').type('abc123');
    cy.get('form').contains('Sign up').click();
    //cy.get('form').contains('Passwords do not match.');
  });

  // it('Should navigate to signup page and create user', () => {
  //   cy.contains('Sign up').click();
  //   cy.get('#userName').type('Joao Silva');
  //   cy.get('#email').type('test@teste.com');
  //   cy.get('#password').type('abc12');
  //   cy.get('#passwordConfirmation').type('abc12');
  //   cy.get('form').contains('Sign up').click();
  //   cy.wait(3000);
  //   cy.on('window:alert', 'created successfully');
  // });
});
