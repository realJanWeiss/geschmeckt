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

Cypress.Commands.add('login', (email, password) => {});

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
      login(email: string, password: string): void;
    }
  }
}

export {}
