describe('User login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/login');
    cy.get('#email').type('george.bluth@reqres.in');
    cy.get('#password').type('abc123');
    cy.get('form').contains('Sign in').click();
    cy.wait(3000);
  });

  // it('Should intercept request', () => {
  //   cy.intercept('GET', '/users?page=1', {
  //     page: 1,
  //     per_page: 6,
  //     total: 12,
  //     total_pages: 2,
  //     data: [
  //       {
  //         id: 1,
  //         email: 'george.bluth@reqres.in',
  //         first_name: 'George',
  //         last_name: 'Bluth',
  //         avatar: 'https://reqres.in/img/faces/1-image.jpg',
  //       },
  //       {
  //         id: 2,
  //         email: 'janet.weaver@reqres.in',
  //         first_name: 'Janet',
  //         last_name: 'Weaver',
  //         avatar: 'https://reqres.in/img/faces/2-image.jpg',
  //       },
  //       {
  //         id: 3,
  //         email: 'emma.wong@reqres.in',
  //         first_name: 'Emma',
  //         last_name: 'Wong',
  //         avatar: 'https://reqres.in/img/faces/3-image.jpg',
  //       },
  //       {
  //         id: 4,
  //         email: 'eve.holt@reqres.in',
  //         first_name: 'Eve',
  //         last_name: 'Holt',
  //         avatar: 'https://reqres.in/img/faces/4-image.jpg',
  //       },
  //       {
  //         id: 5,
  //         email: 'charles.morris@reqres.in',
  //         first_name: 'Charles',
  //         last_name: 'Morris',
  //         avatar: 'https://reqres.in/img/faces/5-image.jpg',
  //       },
  //       {
  //         id: 6,
  //         email: 'tracey.ramos@reqres.in',
  //         first_name: 'Tracey',
  //         last_name: 'Ramos',
  //         avatar: 'https://reqres.in/img/faces/6-image.jpg',
  //       },
  //     ],
  //     support: {
  //       url: 'https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral',
  //       text: 'Tired of writing endless social media content? Let Content Caddy generate it for you.',
  //     },
  //   }).as('getListUsers');
  //   cy.wait('@getListUsers');
  //   cy.get('table tr').should('have.length', 6);
  // });

  it('Should List Users', () => {
    cy.contains('Hello George').should('exist');
    cy.get('.MuiDataGrid-root').should('exist');
    cy.get('.MuiDataGrid-root').contains('George').should('exist');
    cy.get('[title="Go to next page"]').contains('Go to next page').click();
    cy.get('.MuiDataGrid-root').contains('Byron').should('exist');
  });
});
