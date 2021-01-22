

describe('checking that form inputs work and data submits', ()=>{
    beforeEach(() => {
    cy.visit('http://localhost:3000/');
    });
    
    it('adding text to inputs and submits the form ', () => {
        //name input
        cy.get("[data-cy=name]").type('Steve').should('have.value', 'Steve');

        //email input
        cy.get('[data-cy=email]').type('username@email.com').should('have.value','username@email.com');

        //password input
        cy.get('[data-cy=password] ').type('password').should('have.value', 'password');
        //checkbox
        cy.get('[data-cy=terms] ').check().should('be.checked');

        //submit button
        cy.get('[data-cy=submit]').click();
    });

    
})