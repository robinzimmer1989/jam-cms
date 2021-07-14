import 'cypress-file-upload';

Cypress.Commands.add('login', () => {
  cy.visit('/jam-cms');

  cy.get('#email').type(Cypress.env('editor_email'));
  cy.get('#password').type(`${Cypress.env('editor_password')}{enter}`);

  cy.get('#form').submit();

  cy.location({ timeout: 10000 }).should((location) => {
    expect(location.pathname).to.eq('/jam-cms/site/default');
  });
});
