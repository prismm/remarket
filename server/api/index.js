const express = require('express');
const router = require('express').Router();


router.use('/users', require('./users')); // matches all requests to /api/users/
router.use('/listings', require('./listings')); // matches all requests to  /api/listings/
router.use('/', (req, res, next) => {
    console.log('you hit an api route that does not exist -- try again!');
    res.sendStatus(404)
})

module.exports = router;