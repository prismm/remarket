/* ROUTES FOR PATH '/api/users' BELOW */

const express = require('express');
const router = require('express').Router();
const model = require('../db');
const User = model.User;
const Network = model.Network;
const Listing = model.Listing;
const Offer = model.Offer;
const Token = model.Token;
const Comment = model.Comment;
const affiliations = model.network_affiliations;
const mailer = require('../mailer');
const crypto = require('crypto');
const domainUrl = process.env.GOOGLE_CLIENT_ID ? 'https://reuse.market/' : 'http://localhost:1337/';

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
router.post('/:userId/networks/:networkId', (req, res, next) => {
    Promise.all([User.findById(req.params.userId, { include: [{ all: true }] }), Network.findById(req.params.networkId)])
        .then(([user, network]) => {
            // user.addNetwork(network, { through: { networkEmail: 'dummy@email.com', confirmed: false } });
            affiliations.create({ userId: user.id, networkId: network.id, networkEmail: req.body.email, confirmed: false })
            let authToken = crypto.randomBytes(16).toString('hex');
            return Token.create({ token: authToken, userId: user.id })
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
                .catch(console.error)
        })
        .catch(next)
})

//a route for PUT: /api/users/${userId} that updates the user info
router.put('/:id', (req, res, next) => {
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
                res.json(result[1][0]) //updated user obj
            }
        })
        .catch(next)
})

//a route for DELETE: /api/users/${user.id}/networks/${network.id} that removes a network from a user's networks
router.delete('/:userId/networks/:networkId', (req, res, next) => {
    affiliations.destroy({ where: { userId: req.params.userId, networkId: req.params.networkId } })
        .then(() => {
            res.sendStatus(204);
        })
        .catch(next)
})


module.exports = router;