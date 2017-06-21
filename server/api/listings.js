const express = require('express');
const router = require('express').Router();
const model = require('../db');
const db = model.db;
const Listing = model.Listing;
const User = model.User;

router.get('/', (req, res, next) => {
    Listing.findAll()
        .then(listings => res.json(listings))
        .catch(next)
})

router.post('/', (req, res, next) => {
    //something
})

router.put('/:id', (req, res, next) => {
    //something
})

router.delete('/:id', (req, res, next) => {
    //something
})

module.exports = router;