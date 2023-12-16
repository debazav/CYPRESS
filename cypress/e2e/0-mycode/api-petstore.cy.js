/// <reference types="cypress" />
const username = 'teste'
describe('Login', () => {
    it('POST - user', () => {
        cy.request('POST', 'https://petstore.swagger.io/v2/user', {
            //id: 0,
            username: username,
            firstName: "teste",
            lastName: "teste",
            email: "teste",
            password: "teste",
            phone: "teste",
            userStatus: 0

        }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body)
        })
    })
    it('POST - ANother example', () => {
        cy.request({
            method: 'POST',
            url: 'https://petstore.swagger.io/v2/',
            body: {//instert the body here
            }
        }).then(response => {
            expect(response.status).to.eq(200)
            expect(response.body)
        })
    })
    it('GET - user', () => {
        cy.request('GET', `https://petstore.swagger.io/v2/user/${username}`).should((response) => {
            expect(response.status).to.eq(200)
            expect(response).property('body').to.contain({
                "id": 9223372036854775807,
                "username": "teste",
                "firstName": "teste",
                "lastName": "teste",
                "email": "teste",
                "password": "teste",
                "phone": "teste",
                "userStatus": 0,
            })
        })
    })
    it('GET - login', () => {
        cy.request({
            url: 'https://jsonplaceholder.cypress.io/comments',
            qs: {
                username: "teste",
                password: "teste",
            }
        },).its('body').should('be.an', 'array').its('0').should('contain', {
            body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
            email: "Eliseo@gardner.biz",
            id: 1,
            name: "id labore ex et quam laborum",
            postId: 1
        })

    })
    it('GET - logout', () => {
        cy.request({
            url: 'https://petstore.swagger.io/v2/user/logout'

        }).should((response) => {
            expect(response.body).property('code').to.be.a('number')
            expect(response.body).property('message').to.be.a('string')
        })
    })
    it('DELETE - user ', () => {
        cy.request('DELETE', `https://petstore.swagger.io/v2/user/${username}`).should((response) => {
            expect(response.status, { failOnStatusCode: false }).to.eq(200)
        })
    })


})