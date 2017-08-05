/* ROUTES FOR PATH '/api/users' BELOW */

const express = require('express');
const router = require('express').Router();
const model = require('../db');
const User = model.User;
const Network = model.Network;
const affiliations = model.network_affiliations;
const mailer = require('../mailer')

router.get('/', (req, res, next) => {
    User.findAll({ include: [{ all: true }] })
        .then(users => res.json(users))
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    User.findById(req.params.id, { include: [{ all: true }] })
        .then(user => res.json(user))
        .catch(next)
})

//a route for GET: /api/users/${user.id}/networks that returns a user's networks
router.get('/:id/networks', (req, res, next) => {
    Network.findAll({ where: { userId: req.params.id } })
        .then(userNetworks => res.json(userNetworks))
        .catch(next)
})

//a route for POST: /api/users/${user.id}/networks/${network.id} that adds a network to a user's networks
//mailer note: need to produce url for confirmation, set confirmed on affil table to true, etc.
router.post('/:userId/networks/:networkId', (req, res, next) => {
    Promise.all([User.findById(req.params.userId), Network.findById(req.params.networkId)])
        .then(([user, network]) => {
            console.log('!!!!!!ABOUT TO TRY TO MAIL!', user.name, network.name)
            mailer.transporter.sendMail(mailer.confirmNetwork(user, network, 'www.google.com'), (error, info) => {
                if (error) console.error(error);
                if (!error) console.log('Message %s sent: %s', info.messageId, info.response);
            });
            return user.addNetwork(req.params.networkId, { through: { networkEmail: 'dummy@email.com', confirmed: false } })
        })
        .then(() => User.findById(req.params.userId, { include: [{ all: true }] }))
        .then(result => res.json(result))
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
                res.json(result[1][0]) //not sure what this -- will have to console log!
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