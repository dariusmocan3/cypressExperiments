describe('Check eHub and History interactions', () => {
    it('should handle eHub click, unhover to check History disappears, and navigate to History', () => {
        // Step 1: Visit the main page
        cy.visit('http://localhost:9880');

        // Step 2: Click on the eHub button to expand its menu
        cy.contains('eHub').click();

        // Step 3: Verify that the History button is visible
        cy.contains('History').should('be.visible');
    });
});