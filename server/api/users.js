/* ROUTES FOR PATH '/api/users' BELOW */

const express = require('express');
const router = require('express').Router();

router.get('/', (req, res, next) => {
    User.findAll()
        .then(users => res.json(users))
        .catch(next)
})


//a route for GET: /api/users/${user.id}/networks that returns a user's networks
//a route for POST: /api/users/${user.id}/networks that adds a network to a user's networks
//a route for DELETE: /api/users/${user.id}/networks that removes a network from a user's networks

module.exports = router;