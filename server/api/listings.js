/* ROUTES FOR PATH '/api/listings' BELOW */

const express = require('express');
const router = require('express').Router();
const model = require('../db');
const db = model.db;
const Listing = model.Listing;
const User = model.User;
const Network = model.Network;
const Comment = model.Comment;
const Offer = model.Offer;
const listingNotFound = () => (new Error('We can\'t find that listing, sorry!'))


router.get('/', (req, res, next) => {
    Listing.findAll()
        .then(listings => res.json(listings))
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    Listing.findById(req.params.id, {
            include: [
                { model: User },
                { model: Network },
                { model: Comment },
                { model: Offer }
            ]
        })
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
                res.json(req.params.id); // returns the id of the deleted item
            }
        })
        .catch(next)
})

module.exports = router;