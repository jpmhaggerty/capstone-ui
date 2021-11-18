describe('The Weather App', () => {
    it('/ should successfully load', () => {
        cy.visit('/weatherApp')
    });

    it('there should be clickable launch commit criteria', () => {
        cy.get('button').contains('Change Environmental Data').click()
    })

    it('a modal should pop up and allow for inputs to be made into a launch commit criteria', () => {
        cy.get('checkbox').click()
    })
});