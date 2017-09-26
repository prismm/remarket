/* ROUTES FOR PATH '/api/users' BELOW */

const express = require('express');
const router = require('express').Router();
const model = require('../db');
const User = model.User;
const Network = model.Network;
const Message = model.Message;
const Listing = model.Listing;
const Token = model.Token;
const affiliations = model.network_affiliations;
const mailer = require('../mailer');
const crypto = require('crypto');
const domainUrl = process.env.GOOGLE_CLIENT_ID ? 'https://www.reuse.market/' : 'http://localhost:1337/';
var Analytics = require('analytics-node');
var analytics = new Analytics('NxBhoGdVdYkBQtlIQdvKg2ZRwDNxoaYo');

function isLoggedIn(req, res, next) {
    if (!req.user) {
        console.log("FAILED IN isLoggedIn", req)
        res.status(403).send('Access denied. Contact a system administrator if you believe you\'re seeing this message in error.')
            // throw new Error();
    } else {
        next()
    }
}

function isRightUserByUserId(req, res, next) {
    if (req.user.id === Number(req.params.userId)) {
        return next();
    } else {
        console.log("FAILED IN isRightUserByUserId", req)
        res.status(403).send('Access denied. Contact a system administrator if you believe you\'re seeing this message in error.')
        throw new Error();
    }
}

router.get('/', (req, res, next) => {
    User.findAll({ include: [{ all: true }] })
        .then(users => res.json(users))
        .catch(next)
})

//filtering networks {confirmed: true} on front end
router.get('/:id', (req, res, next) => {
    User.findById(req.params.id, { include: [{ all: true }] })
        .then(user => {
            if (!user) {
                res.status('404').send('Failing to fetch me at first keep encouraged, Missing me one place search another, I stop somewhere waiting for you.');
            } else {
                res.json(user)
            }
        })
        .catch(next)
})

//a route for GET: /api/users/${user.id}/networks that returns a user's networks -- as entries in join table
router.get('/:id/networks', (req, res, next) => {
    affiliations.findAll({ where: { userId: req.params.id, confirmed: true } })
        .then(userNetworks => res.json(userNetworks))
        .catch(next)
})

//a route for POST: /api/users/${user.id}/networks/${network.id} that adds a network to a user's networks
router.post('/:userId/networks/:networkId', isLoggedIn, isRightUserByUserId, (req, res, next) => {
    Promise.all([User.findById(req.params.userId, { include: [{ all: true }] }), Network.findById(req.params.networkId)])
        .then(([user, network]) => {
            // user.addNetwork(network, { through: { networkEmail: 'dummy@email.com', confirmed: false } });
            affiliations.create({ userId: user.id, networkId: network.id, networkEmail: req.body.email, confirmed: false })
            let authToken = crypto.randomBytes(16).toString('hex');
            analytics.track({
                userId: user.userId,
                event: 'Added network (unconfirmed)',
                properties: {
                    networkId: network.id
                }
            });
            return Token.create({ token: authToken, userId: user.id, type: 'confirm-network' })
                .then(newToken => {
                    let confirmUrl = domainUrl + 'auth/networkverify?token=' + newToken.token + '&networkId=' + network.id;
                    mailer.transporter.sendMail(mailer.confirmNetwork(user, network, confirmUrl, req.body.email), (error, info) => {
                        if (error) {
                            console.error(error);
                            res.status(401).send('Something went wrong. Try again or <a href="priya@coases.com">contact us</a>.');
                        } else {
                            res.status(307).send('Great! Check your email and follow the confirmation link to confirm your network affiliation.')
                            console.log('Message %s sent: %s', info.messageId, info.response);
                        }
                    });
                })
                .then(() => res.json(user))
        })
        .catch(error => {
            mailer.transporter.sendMail(mailer.contact('prismm@gmail.com', error.toString(), 'ERROR IN ADD NETWORK ROUTE'), (messageError, info) => {
                    if (messageError) {
                        console.error(messageError);
                        res.status(401).send('Something went wrong -- try again later.');
                    } else {
                        res.status(200).send('Message sent. Replies will be directed to your email inbox.')
                        console.log('Message %s sent: %s', info.messageId, info.response);
                    }
                })
                //send myself an email
            next(error)
        })
})

//a POST route for contacting priya
router.post('/contact', (req, res, next) => {
    mailer.transporter.sendMail(mailer.contact(req.body.replyToEmail, req.body.message, req.body.subject), (error, info) => {
        if (error) {
            console.error(error);
            res.status(401).send('Something went wrong -- try again later.');
        } else {
            res.status(200).send('Message sent. Replies will be directed to your email inbox.')
            console.log('Message %s sent: %s', info.messageId, info.response);
        }
    })

});

//a POST route for sending message from user to user
router.post('/msg', isLoggedIn, (req, res, next) => {

    let sender = User.findById(req.body.sender.id);
    let receiver = User.findById(req.body.receiver.id);
    let message = Message.create({ subject: req.body.subject, content: req.body.message, fromId: req.body.sender.id, toId: req.body.receiver.id, listingId: req.body.listingId });

    Promise.all([sender, receiver, message])
        .then(([fromUser, toUser, msg]) => {
            analytics.track({
                userId: fromUser.userId,
                event: 'Sent message',
                properties: {
                    toUser: toUser.id,
                    listing: req.body.listingId
                }
            });
            mailer.transporter.sendMail(mailer.sendMessage(fromUser, toUser, req.body.message, req.body.subject), (error, info) => {
                if (error) {
                    console.error(error);
                    res.status(401).send('Something went wrong -- try again later.');
                } else {
                    res.status(200).send('Message sent. Replies will be directed to your email inbox.')
                    console.log('Message %s sent: %s', info.messageId, info.response);
                }
            })
        })
        .catch(error => {
            console.error(error);
            res.status(400).send('Something went wrong while sending this message.')
        })
});

function isRightUserById(req, res, next) {
    if (req.user.id === Number(req.params.id)) {
        return next();
    } else {
        // console.log("FAILED IN isRightUserById", req)
        res.status(403).send('Access denied. Contact a system administrator if you believe you\'re seeing this message in error.')
        throw new Error();
    }
}

//a route for PUT: /api/users/${id} that updates the user info
router.put('/:id', isLoggedIn, isRightUserById, (req, res, next) => {
    User.update(req.body, {
            where: {
                id: req.params.id
            },
            returning: true
        })
        .then(result => {
            if (!result[0]) {
                next();
            } else {
                analytics.track({
                    userId: req.params.id,
                    event: 'Updated user info'
                });
                res.json(result[1][0]) //updated user obj
            }
        })
        .catch(next)
})

//a route for PUT: /api/users/pw/${userId} that updates the user password
router.put('/pw/:id', isLoggedIn, isRightUserById, (req, res, next) => {
    User.update(req.body, {
            where: {
                id: req.params.id
            },
            individualHooks: true,
            returning: true
        })
        .then(result => {
            if (!result[0]) {
                next();
            } else {
                analytics.track({
                    userId: req.params.id,
                    event: 'Updated user info'
                });
                let user = result[1][0];
                mailer.transporter.sendMail(mailer.passwordReset(user), (error, info) => {
                    if (error) {
                        console.error(user, error);
                    } else {
                        console.log('Message %s sent: %s', info.messageId, info.response)
                    }
                })
                return res.json(user.sanitize()).status(200);
            }
        })
        .catch(next)
})

//a route for DELETE: /api/users/${user.id}/networks/${network.id} that removes a network from a user's networks
router.delete('/:userId/networks/:networkId', isLoggedIn, isRightUserByUserId, (req, res, next) => {
    affiliations.destroy({ where: { userId: req.params.userId, networkId: req.params.networkId } })
        .then(() => {
            res.sendStatus(204);
        })
        .catch(next)
})


module.exports = router;