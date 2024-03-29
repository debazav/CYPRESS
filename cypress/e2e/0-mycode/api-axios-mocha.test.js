const axios = require('axios');
const { expect } = require('chai');
require('dotenv').config(); //can put these snippet in config file

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
  it('Validate response schema', async () => {
    console.log('ahahah')
  })
  it('expect an error example - Should not DELETE FILES, ', async () => {
    endpoint = `${process.env.BASE_URL}/file`
    try {
      const response = await axios.delete(endpoint, {
        headers: { 'Authorization': `Bearer ${token}` }, params: {
          "path": "Files/ww/de/aut/CreatedByAutomation/test.pdf"
        }
      });
      console.log(response.data)
      expect(response.status).to.not.exist;

    } catch (error) {
      expect(error.response.status).to.equal(403);
    }
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
  }),

  
  it('should filter the response, create and array with the results', async () => {
    const specificPath = "Files/ww/cn/"
    const res = await auth.authenticate(logindata.MoreThan3Groups.users[1])
    let token = res.data.access_token
    const filteredResults = FILE_LIST.foldersById.filter(item => item.path.startsWith(specificPath));
    const endpoint = `${process.env.BASE_URL}/download`
    let path = `?path=${filteredResults[0].path}`
    console.log(path)
    const response = await axios.get(endpoint + path, { headers: { 'Authorization': `Bearer ${token}` }, });
    //console.log(response.data)
    expect(response.status).to.equal(200);
})
})







