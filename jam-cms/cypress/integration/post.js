/// <reference types="cypress" />

describe('post', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/jam-cms/site/default/collections/page');
  });

  it('post', () => {
    /****************************************************************
    Add Post
    ****************************************************************/
    cy.get('#create-post').click();
    cy.get('.ant-modal-content').should('be.visible');
    cy.get('#post-title').type('This is a test page');
    cy.get('#submit-create-post').click();
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/this-is-a-test-page/');
    });

    /****************************************************************
    Update
    ****************************************************************/

    /****************************************************************
    Delete
    ****************************************************************/
  });
});
