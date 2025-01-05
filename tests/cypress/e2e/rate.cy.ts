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

    const getRatingsGroup = (groupName: string, expectedRatingGroupCount: number) => {
        return cy.getBySel('ratings-group').should('have.length', expectedRatingGroupCount).filter((_index, element) => {
            return element.innerText.includes(groupName);
        })
          .first();
    }

    const checkRatingGroup = (groupName: string, expectedRatingGroupCount: number, ratings: { userName: string; rating: string }[]) => {
        getRatingsGroup(groupName, expectedRatingGroupCount).then(ratingGroup => {
            for (const rating of ratings) {
                cy.wrap(ratingGroup).contains('[data-test="ratings-group-rating"]', rating.userName)
                        .find('ion-badge')
                        .should('contain', rating.rating);
            }
        })
        
    }

    it ('can rate a product and see ratings of group members', () => {
        const productEan = '9001475012360';
        const productId = 'f0746b51-fe8c-461f-b3b5-714a7f47b2b1';

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
        cy.getUser('a').then((user) => {
            checkRatingGroup(group1, 1, [{
                userName: user.name,
                rating: '1'
            }]);
        });
        performRating(productId,3);

        cy.logout();

        cy.login('c');
        goToProductPage(productEan);
        getRatingsGroup(group2, 2).contains('No ratings yet').should('exist');
        cy.getUser('a').then((userA) => {
            cy.getUser('b').then((userB) => {
                checkRatingGroup(group1, 2, [
                    { userName: userA.name, rating: '1' },
                    { userName: userB.name, rating: '3' }
                ]);
            });
        });
    })
})