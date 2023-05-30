var passport = require('passport');
const { validateUser } = require('./validate_user');
var ClientCertStrategy = require('passport-client-cert').Strategy;

exports.initializePassport = (app) => {
    app.use(passport.initialize());

    passport.use(
        'sslAuth',
        new ClientCertStrategy(function (clientCert, done) {
            const subject = clientCert.subject;
            if (!subject) {
                done(null, null)
            }

            const { CN } = subject;

            let user = validateUser(CN);
console.log(user)
            if (user) {
                done(null, user);
                return;
            }

            done(null, null)
        }));

    return passport;
}