/* ROUTES FOR PATH '/api/listings' BELOW */

const express = require('express');
const router = express.Router();
const model = require('../db');
const Listing = model.Listing;
const listingNotFound = () => (new Error('We can\'t find that listing, sorry!'))


router.get('/', (req, res, next) => {
    Listing.findAll({ include: [{ all: true }] })
        .then(listings => res.json(listings))
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    Listing.findById(req.params.id, { include: [{ all: true }] })
        .then(listing => res.json(listing))
        .catch(next)
})

router.post('/', (req, res, next) => {
    Listing.create(req.body)
        .then(newListing => res.json(newListing))
        .catch(next)
})

router.put('/:id', (req, res, next) => {
    Listing.update(req.body, {
            where: {
                id: req.params.id
            },
            returning: true
        })
        .then(result => {
            if (!result[0]) {
                next(listingNotFound);
            } else {
                res.json(result[1][0]) //not sure what this -- will have to console log!
            }
        })
        .catch(next)
})

router.delete('/:id', (req, res, next) => {
    Listing.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            if (!result) {
                next(listingNotFound);
            } else {
                res.status(204).json(req.params.id); // returns the id of the deleted item
            }
        })
        .catch(next)
})

module.exports = router;