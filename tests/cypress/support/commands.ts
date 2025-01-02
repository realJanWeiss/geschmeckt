import { Storage } from '@ionic/storage';

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const storage = new Storage;

Cypress.Commands.add('getBySel', (value) => {
  return cy.get(`[data-test=${value}]`)
})

Cypress.Commands.add('generateNewUser', (key = 'default'): void => {
  const uuid = crypto.randomUUID()
  const user: User = {
    name: `Cypress ${uuid}`,
    mail: `${uuid}@cypress.test`,
    password: 'Password123!',
  };
  cy.wrap(user).as(`user-${key}`);
})

Cypress.Commands.add('getUser', (key = 'default') => {
  return cy.get(`@user-${key}`).then((user) => {
    return user as unknown as User;
  });
});

Cypress.Commands.add('register', (userKey = 'default') => {
  cy.getUser(userKey).then((user) => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/authentication/register',
      body: {
        name: user.name,
        email: user.mail,
        password: user.password,
      },
    }).then((response) => {
      expect(response.status).to.eq(201)
      cy.log(response.body);
      cy.wrap(response.body).as(`user-jwt-${userKey}`);
    });
  });
});

Cypress.Commands.add('login', (userKey = 'default') => {
  cy.get(`@user-jwt-${userKey}`).then((jwt) => {
    storage.create().then(() => {
      storage.set('jwt', jwt);
    });
  })
});

Cypress.Commands.add('logout', () => {
  storage.remove('jwt')
});

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-test attribute.
       * @example cy.getBySel('greeting')
       */
      getBySel(value: string): Chainable<JQuery<HTMLElement>>;
      generateNewUser(key?: string): void;
      getUser(key?: string): Chainable<User>;
      register(userKey?: string): void;
      login(userKey?: string): void;
      logout(): void;
    }
  }
}

export {}
