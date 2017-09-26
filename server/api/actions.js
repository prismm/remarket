/* ROUTES FOR PATH '/api/actions' BELOW */

const express = require('express');
const router = require('express').Router();
const model = require('../db');
const User = model.User;
const Comment = model.Comment;
const Offer = model.Offer;

function isLoggedIn(req, res, next) {
    if (!req.user) {
        console.log("FAILED IN isLoggedIn", req)
        res.status(403).send('Access denied. Contact a system administrator if you believe you\'re seeing this message in error.')
    } else {
        next()
    }
}

function isRightUserByUserId(req, res, next) {
    if (req.user.id === Number(req.params.userId)) {
        return next();
    } else {
        console.log("FAILED IN isRightUserByUserId", req)
        res.status(403).send('Access denied. Contact a system administrator if you believe you\'re seeing this message in error.')
    }
}

//GET ALL ACTIONS
//a route to get all actions by listing

//a route to get all actions by user (actor)

//COMMENTS
//a route to get all comments by listing

//a route to get all comments by user

//a route to get a single comment by id

//a route to post a comment

//a route to edit a comment

//a route to delete a comment

//OFFERS
//a route to get all offers by listing

//a route to get all offers by user

//a route to get a single offer by id

//a route to post an offer

//a route to edit an offer

//a route to delete an offer

//ENDORSEMENTS: either 'saves' (saving/favoriting the listing; issued: null) or 'endorsements' (vouching for post; issued: true)
//ENDORSEMENTS as saves
//a route to get all saves by listing

//a route to get all saves by user

//a route to post a save

//a route to delete a save

//ENDORSEMENTS as endorsements
//a route to get all endorsements by listing

//a route to get all endorsements by user

//a route to post an endorsement

//a route to delete an endorsement

module.exports = router;