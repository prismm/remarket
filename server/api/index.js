const express = require('express');
const router = express.Router();


router.use('/users', require('./users')); // matches all requests to /api/users/
router.use('/listings', require('./listings')); // matches all requests to  /api/listings/
router.use('/networks', require('./networks')); // matches all requests to  /api/networks/
router.use('/actions', require('./actions')); // matches all requests to  /api/actions/
router.use('/', (req, res, next) => {
    console.log('you hit an api route that does not exist -- try again!');
    res.sendStatus(404)
})

module.exports = router;