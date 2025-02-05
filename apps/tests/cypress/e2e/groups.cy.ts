describe('groups', () => {

    const checkGroupMembers = (members: Record<string, boolean>) => {
        for(const member in members) {
            cy.getUser(member).then((user) => {
                cy.getBySel('group-detail-member').contains(user.name).should(members[member] ? 'exist' : 'not.exist');
            });
        }
    };

    it('can create a new group and other user can join', () => {
        cy.generateNewUser('a');
        cy.generateNewUser('b');

        cy.register('a');
        cy.login('a');
        cy.visit('/');
            
        cy.getBySel('tab-group').click();
        cy.getBySel('group-create').click();
        cy.getBySel('create-group-name').type('Cypress Test Group');
        cy.getBySel('create-group-submit').click();

        cy.getBySel('group-item').click();

        cy.location('pathname').then((location) => {
            const groupId = location.substring(location.lastIndexOf('/') + 1);
            const groupUrl = `/home/group/${groupId}`;
            cy.logout();
            cy.register('b');
            cy.login('b');
    
            cy.visit(groupUrl);
            checkGroupMembers({ a: true, b: false });

            cy.getBySel('group-detail-join').click();
            checkGroupMembers({ a: true, b: true });

            cy.logout();
            cy.login('a');
            cy.visit(groupUrl);
            checkGroupMembers({ a: true, b: true });
            cy.getBySel('group-detail-leave').click();
            cy.get('.alert-button-role-destructive').click();
            checkGroupMembers({ a: false, b: true });

            cy.logout();
            cy.login('b');
            cy.visit(groupUrl);
            checkGroupMembers({ a: false, b: true });
        });
    });
});