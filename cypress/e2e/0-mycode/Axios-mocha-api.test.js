const axios = require('axios');
const { expect } = require('chai');
require('dotenv').config();

describe('Folders', () => {

  const url = `${process.env.BASE_URL}/folders`

  it('Should return all folders', async () => {
    try {
      const response = await axios.get(url);
      expect(response.status).to.equal(200);
      console.log(response.data)

    } catch (error) {
      throw error;
    }
  })
  
  it('Validade response schema', async () => {
   console.log('ahahah')
  })
  
})




