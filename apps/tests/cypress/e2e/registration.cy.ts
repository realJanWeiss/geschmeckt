describe('registration', () => {
    beforeEach(() => {
        cy.visit('/');
    })

    const fillAndSubmitRegistrationForm = (user: User) => {
        cy.getBySel('registration-name').type(user.name);
        cy.getBySel('registration-email').type(user.mail);
        cy.getBySel('registration-password').type(user.password);
        cy.getBySel('registration-submit').click();
    };

    const fillAndSubmitLoginForm = (mail: string, password: string) => {
        cy.getBySel('login-email').type(mail);
        cy.getBySel('login-password').type(password);
        cy.getBySel('login-submit').click();
    };

    const checkProfile = (username: string, mail: string) => {
        cy.getBySel('profile-card')
            .should('contain', username)
            .should('contain', mail);
    };

    it('can register a new user and log out and log in', () => {
        cy.generateNewUser();
        cy.getUser().then((user) => {
            fillAndSubmitRegistrationForm(user);

            cy.getBySel('tab-profile').click();
            checkProfile(user.name, user.mail);
            cy.getBySel('profile-logout').click();
            cy.getBySel('welcome-login').click();
            fillAndSubmitLoginForm(user.mail, user.password)
            cy.getBySel('tab-profile').click();
            checkProfile(user.name, user.mail);
        })
    });
});