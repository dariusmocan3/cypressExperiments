describe('Check eHub and History interactions', () => {
    it('check eHub history button', () => {
        // Step 1: Visit the main page
        cy.visit('http://0.0.0.0:9880', { retryOnStatusCodeFailure: true, retryOnNetworkFailure: true });

        // Step 2: Click on the eHub button to expand its menu
        cy.contains('eHub').click();

        // Step 3: Verify that the History button is visible
        cy.contains('History').should('be.visible');
    });
});
