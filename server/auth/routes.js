/* ROUTES FOR PATH '/auth' BELOW */

const router = require('express').Router();
const model = require('../db');
const User = model.User;
const Network = model.Network;
const Listing = model.Listing;
const Offer = model.Offer;
const Comment = model.Comment;
const Token = model.Token;
const affiliations = model.network_affiliations;
const mailer = require('../mailer')
const crypto = require('crypto');
const domainUrl = process.env.GOOGLE_CLIENT_ID ? 'https://shielded-earth-43160.herokuapp.com/' : 'http://localhost:1337/';

//filtering networks {confirmed: true} on front end
router.post('/login', (req, res, next) => {
    User.scope('unsanitized').findAll({
            where: {
                email: req.body.email
            },
            include: [{ all: true }]
        })
        .then(([user]) => {
            if (!user) {
                return res.status(401).send('Oops, we don\'t have an account under that email address.') //should link to create an account
            } else if (!user.confirmed) {
                return res.status(401).send('Your account is not yet confirmed -- check your email or click below to resend the confirmation email.') //FYI -- Do not change error message text without changing corresponding text in Auth component
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
            }
        })
        .then(user => {
            if (!user) {
                return res.status(401).send('Sorry, we don\'t have an account under that email address.')
            } else if (!user.confirmed) {
                return res.status(401).send('Your account is not yet confirmed -- check your email or click below to resend the confirmation email.') //FYI -- Do not change error message text without changing corresponding text in Auth component
            } else {
                let authToken = crypto.randomBytes(16).toString('hex');
                return Token.create({ token: authToken, userId: user.id, type: 'retrieve-password' })
                    .then(newToken => {
                        let forgotPwUrl = domainUrl + 'auth/forgotpassword?id=' + newToken.token;
                        mailer.transporter.sendMail(mailer.changePassword(user, forgotPwUrl), (error, info) => {
                            if (error) console.error(error);
                            if (!error) console.log('Message %s sent: %s', info.messageId, info.response);
                        }); //should wait for confirm email url to be visited before req.login and user creation
                        return res.status(307).send('It happens to all of us. \n Check your email for a reset password link.')
                    })
            }

        })
        .catch(next);
})

router.post('/resendconfirmlink', (req, res, next) => {
    User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if (user.confirmed) return res.status(200).send('Actually, your account is already confirmed. Go ahead and login.'); //double-checking -- this should actually never occur
            let authToken = crypto.randomBytes(16).toString('hex');
            return Token.create({ token: authToken, userId: user.id, type: 'confirm-account' })
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
        .catch(next);
})

router.post('/logout', (req, res, next) => {
    req.logout();
    return res.sendStatus(200);
});

// fetches the logged in user
router.get('/me', (req, res, next) => {
    return res.json(req.user); //add sanitize?
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
                        return Token.create({ token: authToken, userId: newUser.id, type: 'confirm-account' })
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
                    .catch(error => {
                        console.log(error);
                        res.status(401).send('Something went wrong. Make sure to use a valid email address & contact us if you believe you\'re seeing this message in error.')
                    })
            }
        })
        .catch(next)
})

router.get('/verify', (req, res, next) => {
    let loginPage = domainUrl + 'login/'
    Token.findOne({ where: { token: req.query.id, type: 'confirm-account' } })
        .then(token => {
            if (!token) {
                res.status(401).send('Sorry, something went wrong. This token doesn\'t work. Contact us if you think you are seeing this message in error.')
            } else if (token.expired) {
                res.status(401).send('Sorry, this confirmation link has expired. Click <a href="' + loginPage + '">here</a> to resend the confirmation email.')
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
                            res.redirect('/account-created') //some page to say 'success -- redirecting to login'
                        }
                    })
                    .catch(next)
            }
        })
        .catch(next)
});

router.get('/forgotpassword', (req, res, next) => {
    let resendConfirmation = domainUrl + 'login/' //this is a placeholder; it needs to be better, actually a confirm link for a particular user -- not sure how to do it
    Token.findOne({ where: { token: req.query.id, type: 'retrieve-password' } })
        .then(token => {
            if (!token) {
                res.status(401).send('Sorry, something went wrong. This token doesn\'t work. Contact us if you think you are seeing this message in error.')
            } else if (token.expired) {
                res.status(401).send('Sorry, this link has expired. Click <a href="' + resendConfirmation + '">here</a> to resend the email.')
            } else {
                User.findById(token.userId)
                    .then(user => {
                        if (!user) {
                            res.status('401').send('Sorry, user not found.')
                            next();
                        } else if (!user.confirmed) {
                            res.status('401').send('Your account is not yet confirmed -- check your email or click below to resend the confirmation email.') //FYI -- if you change text of this error message, edit corresponding text in route above and in Auth component
                        } else {
                            token.update({ expired: true });
                            mailer.transporter.sendMail(mailer.passwordReset(user), (error, info) => {
                                if (error) {
                                    console.error(user, error);
                                } else {
                                    console.log('Message %s sent: %s', info.messageId, info.response)
                                }
                            })
                            return req.login(user, err => {
                                if (err) next(err);
                                // else return res.json(user.sanitize()).status(200);
                            })
                        }
                    })
                    .then(() => {
                        res.redirect('/account') //some page to say 'success -- redirecting to login'
                    })
                    .catch(next)
            }
        })
        .catch(next)
});

/*ADD NETWORK VERIFY*/
router.get('/networkverify', (req, res, next) => {
    Token.findOne({ where: { token: req.query.token, type: 'confirm-network' } })
        .then(token => {
            if (!token) {
                res.status(401).send('Sorry, something went wrong. This token doesn\'t work. Contact us if you think you are seeing this message in error.')
            } else if (token.expired) {
                res.status(401).send('Sorry, this confirmation link has expired. Try adding your network again to resend the confirmation email.')
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
                            res.redirect('/network-added') //some page to say 'success -- redirecting to account'
                        }
                    })
                    .catch(next)
            }
        })
        .catch(next)
})

module.exports = router;