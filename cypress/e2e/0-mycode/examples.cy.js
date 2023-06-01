/// <reference types="cypress" />

describe('example to-do app', () => {
    beforeEach(() => {
        cy.clearAllLocalStorage()
        cy.clearAllSessionStorage()
        cy.clearAllCookies
        cy.visit('/')
    })

    it('Login - Success', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('.title').should('have.text', 'Products')
    })
    it('Login - Failed', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('213231')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    })
    it('Add a item to cart', () => {
        cy.login('standard_user', 'secret_sauce')
        //small logic to get all itens displayed and aliases them
        let i = 0
        cy.get('.inventory_item').each((elemento) => {
            cy.wrap(elemento).as(`elemento${i}`) //here I set dynamic Aliases to the itens
            i++
        })
        cy.get('@elemento0').find('.btn_inventory').click() // then I can work them the way I want  
        cy.get('@elemento0').find('.btn_inventory').should(`have.text`, `Remove`)
        cy.get(`.shopping_cart_badge`).should(`have.text`, `1`)
    })

    it(`add more than one item to cart - cart badge test`, () => {
        cy.login('standard_user', 'secret_sauce')
        let i = 0
        cy.get('.inventory_item').each((elemento) => {
            cy.wrap(elemento).as(`elemento${i}`)
            i++
        })
        cy.get('@elemento0').find('.btn_inventory').click()
        cy.get('@elemento1').find('.btn_inventory').click()
        cy.get('@elemento3').find('.btn_inventory').click()
        cy.get(`.shopping_cart_badge`).should(`have.text`, `3`)
    })
    it(`remove item from cart`, () => {
        cy.login('standard_user', 'secret_sauce')
        let i = 0
        cy.get('.inventory_item').each((elemento) => {
            cy.wrap(elemento).as(`elemento${i}`)
            i++
        })
        cy.get('@elemento0').find('.btn_inventory').click()
        cy.get('@elemento1').find('.btn_inventory').click()
        cy.get('@elemento3').find('.btn_inventory').click()
        cy.get(`.shopping_cart_badge`).should(`have.text`, `3`)
        cy.get('@elemento0').contains('Remove').click()
        cy.get(`.shopping_cart_badge`).should(`have.text`, `2`)
    })
    it.only('Complete checkout', () => {
        cy.login('standard_user', 'secret_sauce')
        let i = 0
        cy.get('.inventory_item').each((elemento) => {
            cy.wrap(elemento).as(`elemento${i}`)
            i++
        })
        cy.get('@elemento0').find('.inventory_item_name').invoke('text').then(item_name => {
            cy.get('@elemento0').find('.btn_inventory').click()
            cy.get('.shopping_cart_link').click()
            cy.get('.title').should('have.text', 'Your Cart')
            cy.get('.cart_item').should('contain', item_name)
        })
        cy.contains('Checkout').click()
        cy.get('[data-test="firstName"').type('Cypress')
        cy.get('[data-test="lastName"').type('Test')
        cy.get('[data-test="postalCode"]').type('51545755')
        cy.contains('Continue').click()
        cy.get('.title').should('have.text', 'Checkout: Overview')
        cy.get('.summary_info').should('contain', 'Payment Information')
        cy.get('.summary_info').should('contain', 'Shipping Information')
        cy.get('.summary_info').should('contain', 'Price Total')
        cy.get('.summary_info').should('contain', 'Total: $32.39')
        cy.contains('Finish').click()
        cy.contains('Thank you for your order!')
        cy.get('[data-test="back-to-products"]').should('have.text', 'Back Home')
    })

})  