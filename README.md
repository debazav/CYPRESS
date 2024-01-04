# cypress-personal-recipes
    - This project contains some of my personal recipes. It may not run correctly because most of the code are samples did on companies projects
## Dependencias

    dotenv = creates env variables for the project
```
    require('dotenv').config();
    const url = `${process.env.BASE_URL}/folders`

```




### Work with Multiple environments ####
- create a cypress.env.name.json
- put the environment variables
```
    {
    "keycloak_url": "url here",
    "client_secret": "data here"
    }
```
- create a custom command to read the environment like this one:

```
Cypress.Commands.add('loadEnvironmentConfig', (env) => {
  cy.readFile(`cypress.env.${env}.json`).then((config) => {
    Cypress.env('config', config);
  });
});
```
- use it on your test

```
cy.loadEnvironmentConfig('uk');
Cypress.env('config').keycloak_url
```

