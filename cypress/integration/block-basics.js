import { setupBeforeEach, tearDownAfterEach } from '../support';
import 'cypress-file-upload';
describe('Blocks Tests', () => {
  beforeEach(setupBeforeEach);
  afterEach(tearDownAfterEach);

  it('Add Block: Empty', () => {
    // without this the clear command below does nothing sometimes
    cy.wait(500);

    // Change page title
    cy.get('[contenteditable=true]').first().clear();

    cy.get('[contenteditable=true]').first().type('My Add-on Page');

    cy.get('.documentFirstHeading').contains('My Add-on Page');

    cy.get('[contenteditable=true]').first().type('{enter}');

    // Add block


    cy.get('[contenteditable=true]').first().type('{enter}');
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active .button.imagecards').contains('Image Cards').click();

    //add block image cards
    cy.get('[id="sidebar-properties"] .field-wrapper-title #field-title').last().type('Test');
    cy.get('[id="sidebar-properties"] .field-wrapper-text .slate-editor').type('Test text');
    cy.get('.field-wrapper-display #field-display').click();
    cy.get('.react-select__menu').contains('Splashy Carousel').click();
    cy.get('.field-wrapper-align .buttons').eq(2).click();
    cy.get('.field-wrapper-cards button').click();

    //upload 1st image
    cy.get('.field-wrapper-title-0-cards-0 #field-title-0-cards-0').type('Image1');
    cy.get('.field-wrapper-text-1-cards-0 .slate-editor').type('Image1 text');

    //add new image
    cy.get('.field-wrapper-cards button').click();


    //upload second image
    cy.get('.field-wrapper-title-0-cards-1 #field-title-0-cards-1').type('Image2');
    cy.get('.field-wrapper-text-1-cards-1 .slate-editor').type('Image1 text');


    //add new block
    cy.get('.block-editor-text [contenteditable=true]').first().click({force: true}).type('{enter}');
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active .button.imagecards').contains('Image Cards').click();

    cy.get('[id="sidebar-properties"] .field-wrapper-title #field-title').last().type('Test');
    cy.get('[id="sidebar-properties"] .field-wrapper-text .slate-editor').type('Test text');
    cy.get('.field-wrapper-display #field-display').click();
    cy.get('.react-select__menu').contains('Discreet Carousel').click();
    cy.get('.field-wrapper-align .buttons').eq(1).click();
    cy.get('.field-wrapper-cards button').click();

    //upload 1st image
    cy.get('[id="sidebar-properties"] .field-wrapper-title-0-cards-0 #field-title-0-cards-0').type('Image1');
    cy.get('[id="sidebar-properties"] .field-wrapper-text-1-cards-0 .slate-editor').type('Image1 text');


    //add new block
    cy.get('.block-editor-text [contenteditable=true]').first().click({force: true}).type('{enter}');
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active .button.imagecards').contains('Image Cards').click();

    cy.get('[id="sidebar-properties"] .field-wrapper-title #field-title').last().type('Test');
    cy.get('[id="sidebar-properties"] .field-wrapper-text .slate-editor').type('Test text');
    cy.get('.field-wrapper-display #field-display').click();
    cy.get('.react-select__menu').contains('Round Tile').click();
    cy.get('.field-wrapper-align .buttons').eq(0).click();
    cy.get('.field-wrapper-cards button').click();

    //upload 1st image
    cy.get('.field-wrapper-title-0-cards-0 #field-title-0-cards-0').type('Image1');
    cy.get('.field-wrapper-text-1-cards-0 .slate-editor').type('Image1 text');


    // Save
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/cypress/my-page');

    // then the page view should contain our changes
    cy.contains('My Add-on Page');

    cy.get('.imagecards-block .slider-arrow .right-arrow').click();
    cy.get('.imagecards-block .slider-arrow .left-arrow').click();
  });
});
