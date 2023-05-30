const axios = require('axios');
const agent = require('./agent');

const serverUrlAuth = 'https://localhost:3433/authenticated';
const serverUrlPublic = 'http://localhost:3000';
let opts = { httpsAgent: agent('client') };

axios.get(serverUrlAuth, opts)
    .then((res) => {
        console.log(res.data);
    })
    .catch((err) => {
        console.error(err.response.data);
    });


axios.get(serverUrlPublic)
    .then((res) => {
        console.log(res.data);
    })
    .catch((err) => {
        console.error(err.response.data);
    });
