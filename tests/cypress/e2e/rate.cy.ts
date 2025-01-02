describe('rate', () => {
    const initUsers = (users: string[]) => {
        for (const user of users) {
            cy.generateNewUser(user);
            cy.register(user);
        }
    }

    const goToProductPage = (ean: string) => {
        cy.intercept('GET', `http://localhost:3000/products/${ean}`).as('getProduct');
        cy.visit(`/home/rate/${ean}`);
        cy.wait('@getProduct');
    };

    /**
     * @param rating number between 1 and 5
     */
    const performRating = (productId: string, rating: number) => {
        cy.intercept('POST', `http://localhost:3000/ratings/products/${productId}`).as('rateProduct');
        cy.getBySel('ratings-personal').find('ion-button').eq(rating - 1).click();
        cy.wait('@rateProduct');
    }

    const getRatingsGroup = (groupName: string, expectedCount: number) => {
        return cy.getBySel('ratings-group').should('have.length', expectedCount).filter((_index, element) => {
            return element.innerText.includes(groupName);
        })
          .first();
    }

    it ('can rate a product and see ratings of group members', () => {
        const productEan = '123';
        const productId = 'd0c9aeba-d0dc-43f6-a079-566e59255082';

        const group1 = 'Cypress Test Group 1';
        const group2 = 'Cypress Test Group 2';

        initUsers(['a', 'b', 'c'])
        cy.createGroup(group1, ['a', 'b', 'c']);
        cy.createGroup(group2, ['c']);

        cy.login('a');
        goToProductPage(productEan);
        getRatingsGroup(group1, 1).contains('No ratings yet').should('exist');
        performRating(productId,1);

        cy.logout();

        cy.login('b');
        goToProductPage(productEan);
        getRatingsGroup(group1, 1);
        cy.getUser('a').then((user) => {
            cy.getBySel('ratings-group-rating').should('have.length', 1).contains(user.name).should('contain', '1');
        });
        performRating(productId,3);

        cy.logout();

        cy.login('c');
        goToProductPage(productEan);
        getRatingsGroup(group2, 2).contains('No ratings yet').should('exist');
        cy.getUser('a').then((user) => {
            cy.getBySel('ratings-group-rating').should('have.length', 2).contains(user.name).should('contain', '1');
        });
        cy.getUser('b').then((user) => {
            cy.getBySel('ratings-group-rating').contains(user.name).should('contain', '3');
        });
    })
})