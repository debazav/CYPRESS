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

    it.only('POST passing params', async () => {
        endpoint = `${process.env.BASE_URL}/folders`
        const fileBuffer = fs.readFileSync('./fixtures/test.pdf');
        try {
            const response = await axios.post(endpoint, fileBuffer, {
                headers: {
                    'Content-Type': 'application/octet-stream',
                },
                params: {
                    "fileName": "test.pdf",
                    "subFolder": "CreatedByAutomation",
                    "userName": "minio_manager",
                    "country": "de",
                    "city": "tst"
                }
            })
            expect(response.status).to.equal(200);

        } catch (error) {
            throw error;
        }


    })
})