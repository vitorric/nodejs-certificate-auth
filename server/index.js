const express = require('express')
const helmet = require('helmet')
const passport = require('passport')
const { initializePassport } = require('./middleware_cert')
const fs = require('fs');
const https = require('https');
const path = require('path');

const passportAuthenticate = passport.authenticate('sslAuth', { session: false });
const app = express()

const opts = {
    key: fs.readFileSync(path.join(__dirname, 'server_key.key')),
    cert: fs.readFileSync(path.join(__dirname, 'server_cert.crt')),
    requestCert: true,
    rejectUnauthorized: false, // so we can do own error handling
    ca: [
        fs.readFileSync(path.join(__dirname, 'server_cert.crt'))
    ]
};

app.use(helmet())
initializePassport(app)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/authenticated', passportAuthenticate, (req, res) => {
    res.send(`Hello ${req.user.name}!`)
})

app.listen(3000, () => {
    console.log('Server listening at http://localhost:3000')
})

https.createServer(opts, app).listen(3433, () => {
    console.log('Server listening at https://localhost:3433')
});