const axios = require('axios');
const fs = require('fs');
const now = new Date();
const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}`;
const fileName = `output_${timestamp}.txt`;

function excludeDomain(node) {
    if (Array.isArray(node)) {
        return node.filter(item => excludeDomain(item));
    } else if (typeof node === 'object') {
        if (node.id === 'automation_test_dom') {
            return null; // Exclude this node
        } else {
            const result = {};
            for (const key in node) {
                const value = excludeDomain(node[key]);
                if (value !== null) {
                    result[key] = value;
                }
            }

            return result;
        }
    } else {
        return node;
    }
}
axios.get('https://meurt').then(async response => {
    const responseJson = JSON.stringify(response.data, null, 2);
    await fs.writeFileSync(`backup/${fileName}`, responseJson, 'utf8');
    const dataAfterExclusion = excludeDomain(response.data.domains)
    //await fs.writeFileSync('dataAfterExclusion.json', JSON.stringify(dataAfterExclusion, null, 2));
    console.log(dataAfterExclusion)
    return axios.post('url', dataAfterExclusion);
}).then(postResponse => {
    console.log('Resposta do POST:', postResponse.data);
})
    .catch(error => {
        console.error('Erro:', error.message);
    });

// salvar backup do latest
// post do domains





