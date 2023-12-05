const { expect } = require('chai');
const axios = require('axios');
const auth = require('../utils/auth')
const logindata = require('../fixtures/users.json')
const chai = require('chai');
const chaiJsonSchema = require('chai-json-schema');
const responseSchema = require('../fixtures/create-folder-response-schema.json');
require('dotenv').config();

chai.use(chaiJsonSchema);

describe('FOLDERS - Validate json schema', () => {
    beforeEach(async () => {
        const response = await auth.authenticate2(logindata.MoreThan3Groups.users[0])
        expect(response.status).to.equal(200);
        token = response.data.access_token
    });
    it('Sending blank city - should validate the JSON schema of the response', async () => {
        endpoint = `${process.env.BASE_URL}/folders`
        let data = {
            "country": "de",
            "city": "",
            "folderName": "CreatedByAutomation",
            "userName": "minio_manager"
        }
        const response = await axios.post(endpoint, data, { headers: { 'Authorization': `Bearer ${token}` } })
        console.log(response.data)
        expect(response.status).to.equal(200);
        chai.expect(response.data).to.be.jsonSchema(responseSchema);
        chai.expect(response.status).to.equal(200);
        chai.expect(response.headers['content-type']).to.include('application/json');
    })
})