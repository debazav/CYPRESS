/// <reference types="cypress" />

describe('GET - tests', () => {
    it('GET - Todos', () => {
        cy.request('https://jsonplaceholder.typicode.com/todos').should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body)
        })

    })
})

describe('POST - tests', () => {
    it('POST - POSTS', () => {
        cy.request('POST', 'https://jsonplaceholder.typicode.com/posts', {
            title: 'foo',
            body: 'bar',
            userId: 1,
        }).should((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.id).to.eq(101)
                       
        })
       

    })
})