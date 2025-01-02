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

Cypress.Commands.add('generateNewUser', (userKey = 'default'): void => {
  const uuid = crypto.randomUUID()
  const user: User = {
    name: `Cypress ${uuid}`,
    mail: `${uuid}@cypress.test`,
    password: 'Password123!',
  };
  cy.wrap(user).as(`user-${userKey}`);
})

Cypress.Commands.add('getUser', (userKey = 'default') => {
  return cy.get(`@user-${userKey}`).then((user) => {
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
      cy.wrap({
        name: user.name,
        mail: user.mail,
        password: user.password,
        id: response.body.user.id,
        token: response.body.jwt
      } satisfies RegisteredUser).as(`registered-user-${userKey}`);
    });
  });
});

Cypress.Commands.add('getRegisteredUser', (userKey = 'default') => {
  return cy.get(`@registered-user-${userKey}`).then((user) => {
    return user as unknown as RegisteredUser;
  });
});


Cypress.Commands.add('login', (userKey = 'default') => {
  cy.getRegisteredUser(userKey).then((user) => {
    storage.create().then(() => {
      storage.set('jwt', user.token);
    });
  })
});

Cypress.Commands.add('createGroup', (name: string, userKeys: string[]) => {
  const userData: RegisteredUser[] = [];
  for (const user of userKeys) {
    cy.getRegisteredUser(user).then((user) => {
      userData.push(user);
    });
  }

  cy.wrap(userData).then(users => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/groups',
      body: {
        name: name,
      },
      headers: {
        Authorization: `Bearer ${users[0].token}`,
      }
    }).then((response) => {
      const groupId = response.body.id;
      for (const user of users) {
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/groups/${groupId}/join`,
          headers: {
            Authorization: `Bearer ${user.token}`,
          }
        }).then((response) => {
          expect(response.status).to.eq(201);
        });
      }
    });
  });

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
      generateNewUser(userKey?: string): void;
      getUser(userKey?: string): Chainable<User>;
      getRegisteredUser(userKey?: string): Chainable<RegisteredUser>;
      register(userKey?: string): void;
      login(userKey?: string): void;
      logout(): void;
      createGroup(name: string, userKeys: string[]): void;
    }
  }
}

export {}
