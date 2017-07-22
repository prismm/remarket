/* ROUTES FOR PATH '/api/networks' BELOW */

const express = require('express');
const router = require('express').Router();
const model = require('../db');
const Network = model.Network;

module.exports = router;

function isLoggedIn() {
    return true;
}

router.get('/', (req, res, next) => {
    Network.findAll({ include: [{ all: true }] })
        .then(networks => res.json(networks))
        .catch(next)
})

// a route for GET: /api/networks/${networkId} to return a network
router.get('/:id', (req, res, next) => {
    Network.findById(req.params.id, { include: [{ all: true }] })
        .then(network => res.json(network))
        .catch(next)
})