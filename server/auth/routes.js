/* ROUTES FOR PATH '/auth' BELOW */

const router = require('express').Router();
const model = require('../db');
const User = model.User;
const Network = model.Network;
const Token = model.Token;
const affiliations = model.network_affiliations;
const mailer = require('../mailer')
const crypto = require('crypto');
const domainUrl = process.env.GOOGLE_CLIENT_ID ? 'https://reuse.market/' : 'http://localhost:1337/';
//links in RES don't seem to work

router.post('/login', (req, res, next) => {
    User.scope('unsanitized').findOne({
            where: {
                email: req.body.email
            },
            include: [{ all: true }]
        })
        .then(user => {
            if (!user) {
                return res.status(401).send('Oops, we don\'t have an account under that email address.') //should link to create an account
            } else if (!user.confirmed) {
                return res.status(401).send('Your account is not yet confirmed -- click <a href="www.google.com">here</a> to resend the confirmation email.') //link should be real and should send the confirmation email
            } else if (!user.correctPassword(req.body.password)) {
                return res.status(401).send('That\'s not the right password ... try again!')
            } else { // this will attach the user to our passport, which will save the user in the session store -- req.login() invokes the serialize passport function, it's attached to the req obj
                return req.login(user, err => {
                    if (err) next(err);
                    else return res.json(user.sanitize()).status(200);
                })
            }
        })
        .catch(next);
})

router.post('/forgotpassword', (req, res, next) => {
    User.findOne({
            where: {
                email: req.body.email
            },
            include: [{ all: true }]
        })
        .then(user => {
            if (!user) {
                return res.status(401).send('Sorry, we don\'t have an account under that email address.')
            } else {
                mailer.transporter.sendMail(mailer.changePassword(user, 'www.google.com'), (error, info) => { //SHOULDNT BE GOOGLE!
                    if (error) console.error(error);
                    if (!error) console.log('Message %s sent: %s', info.messageId, info.response);
                }); //should wait for confirm email url to be visited before req.login and user creation
                return res.status(307).send('It happens to all of us. \n Check your email for a reset password link.')
            }
        })
        .catch(next);
})

router.post('/logout', (req, res, next) => {
    req.logout();
    return res.sendStatus(200);
});

// fetches the logged in user
router.get('/me', (req, res, next) => {
    return res.json(req.user); //added sanitize?
});

/* --------------------------- SIGNUP & VERIFY EMAIL ---------------------------------*/

router.post('/signup', (req, res, next) => {
    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (user) {
                res.status(401).send('An account with that email address already exists.')
            } else {
                User.create(req.body)
                    .then(newUser => {
                        let authToken = crypto.randomBytes(16).toString('hex');
                        return Token.create({ token: authToken, userId: newUser.id })
                            .then(newToken => {
                                let confirmUrl = domainUrl + 'auth/verify?id=' + newToken.token;
                                mailer.transporter.sendMail(mailer.verifyEmail(newUser, confirmUrl), (error, info) => {
                                    if (error) {
                                        console.error(error);
                                        res.status(401).send('Something went wrong. Try again or <a href="priya@coases.com">contact us</a>.');
                                    } else {
                                        res.status(307).send('Great! Check your email and follow the confirmation link to activate your account.')
                                        console.log('Message %s sent: %s', info.messageId, info.response)
                                    }
                                })
                            })
                    })
            }
        })
        .catch(next)
})

router.post('/reconfirm', (req, res, next) => {
    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            let authToken = crypto.randomBytes(16).toString('hex');
            return Token.create({ token: authToken, userId: user.id })
                .then(newToken => {
                    let confirmUrl = domainUrl + 'auth/verify?id=' + newToken.token;
                    mailer.transporter.sendMail(mailer.verifyEmail(user, confirmUrl), (error, info) => {
                        if (error) {
                            console.error(error);
                            res.status(401).send('Something went wrong. Try again or <a href="priya@coases.com">contact us</a>.');
                        } else {
                            res.status(307).send('Great! Check your email and follow the confirmation link to activate your account.')
                            console.log('Message %s sent: %s', info.messageId, info.response)
                        }
                    })
                })
        })
        .catch(next)
})

router.get('/verify', (req, res, next) => {
    let resendConfirmation = domainUrl + 'login/' //this is a placeholder; it needs to be better, actually a confirm link for a particular user -- not sure how to do it
    Token.findOne({ where: { token: req.query.id } })
        .then(token => {
            if (token.expired) {
                res.status(401).send('Sorry, this confirmation link has expired. Click <a href="' + resendConfirmation + '">here</a> to resend the confirmation email.')
            } else {
                User.findById(token.userId)
                    .then(user => {
                        if (!user) {
                            res.status('401').send('Sorry, user not found.')
                            next();
                        } else {
                            token.update({ expired: true });
                            return user.update({ confirmed: true })
                        }
                    })
                    .then(confirmedUser => {
                        if (!confirmedUser) {
                            next();
                        } else {
                            //some page to say 'success -- redirecting to login'
                            res.redirect('/account-created')
                        }
                    })
                    .catch(next)
            }
        })
        .catch(next)
});

/*ADD NETWORK VERIFY*/
router.get('/networkverify', (req, res, next) => {
    let resendConfirmation = domainUrl + 'login/' //this is a placeholder; it needs to be better, actually a confirm link for a particular user -- not sure how to do it
    console.log(req.query);
    Token.findOne({ where: { token: req.query.token } })
        .then(token => {
            if (!token) {
                res.status(401).send('Sorry, could not locate this token. Click <a href="' + resendConfirmation + '">here</a> to resend the confirmation email.')
            } else if (token.expired) {
                res.status(401).send('Sorry, this confirmation link has expired. Click <a href="' + resendConfirmation + '">here</a> to resend the confirmation email.')
            } else {
                affiliations.findOne({ where: { networkId: req.query.networkId, userId: token.userId } })
                    .then(affiliation => {
                        if (!affiliation) {
                            res.status('404').send('Sorry, affiliation not found.')
                            next();
                        } else {
                            token.update({ expired: true });
                            return affiliation.update({ confirmed: true })
                        }
                    })
                    .then(confirmedAffiliation => {
                        if (!confirmedAffiliation) {
                            next();
                        } else {
                            //some page to say 'success -- redirecting to account'
                            res.redirect('/network-added')
                        }
                    })
                    .catch(next)
            }
        })
        .catch(next)
})

module.exports = router;