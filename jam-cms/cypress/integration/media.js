/// <reference types="cypress" />

describe('media', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/jam-cms/site/default/media');

    // Wait until images are loaded
    cy.wait(5000);
  });

  it('media', () => {
    /****************************************************************
    Upload
    ****************************************************************/
    cy.get('#upload-media').click();
    cy.get('#file-dropzone').attachFile('derek-sutton-uouH1bGxeeU-unsplash.jpg', {
      subjectType: 'drag-n-drop',
    });
    cy.get('.media-upload-success', { timeout: 20000 }).should('be.visible');

    /****************************************************************
    Update
    ****************************************************************/
    cy.get('.media-item').first().click();
    cy.get('.ant-modal-content').should('be.visible');
    cy.get('input[name="altText"]').type('This is an alternative text dummy description');
    cy.get('#update-media').click();
    cy.get('.media-update-success', { timeout: 5000 }).should('be.visible');
    cy.get('.ant-modal-close').click();

    /****************************************************************
    Search
    ****************************************************************/
    cy.get('#search-media').type('derek-sutton-uouH1bGxeeU-unsplash{enter}');
    cy.get('.media-item').should('be.visible');

    /****************************************************************
    Delete
    ****************************************************************/
    cy.get('.media-item').first().click();
    cy.get('.ant-modal-content').should('be.visible');
    cy.get('#delete-media').click();
    cy.get('#delete-media-confirm').click();
    cy.get('.media-delete-success', { timeout: 5000 }).should('be.visible');
  });
});
