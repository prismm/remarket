const express = require('express');
const router = require('express').Router();

router.get('/', (req, res, next) => {
    User.findAll()
        .then(users => res.json(users))
        .catch(next)
})

module.exports = router;