/* ROUTES FOR PATH '/api/listings' BELOW */

const express = require('express');
const router = express.Router();
const model = require('../db');
const Listing = model.Listing;
const Photo = model.Photo;
const User = model.User;
const listingNotFound = () => (new Error('Sorry, something went wrong ... We can\'t seem to find that listing!'))
const mailer = require('../mailer')
var Analytics = require('analytics-node');
var analytics = new Analytics('NxBhoGdVdYkBQtlIQdvKg2ZRwDNxoaYo');

//setting up google analytics reporting api to query page views
const google = require('googleapis');
const key = require('remarket-reporting-api.json'); //will be gitignored -- need to handle thru heroku on deploy
const VIEW_ID = 'ga:121605325';
let jwtClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key, ['https://www.googleapis.com/auth/analytics.readonly'],
    null
);

//creating analytics route to query pageviews
router.get('/googleanalytics/:listingId', (req, res, next) => {
    function queryData(analyticsObj) {
        analyticsObj.data.ga.get({
            auth: jwtClient,
            ids: VIEW_ID,
            metrics: 'ga:pageviews', //switch to pageviews for basic views -- this is unique visitors
            dimensions: 'ga:pagePath',
            filters: `ga:pagePath==/listings/${req.params.listingId}`,
            'start-date': '2005-01-01',
            'end-date': 'today'
        }, function(err, response) {
            if (err) {
                console.log(err);
                return;
            }
            // return response;
            if (response && response.rows) {
                // console.log('response', response.rows, response.rows[0][1])
                res.json(response.rows[0]) //if the route exists send back an array with length = 1, [{listingRoute}, {number of views}]
            } else {
                res.json([]) //if the route is invalid then send back an empty array
            }
        })
    }
    jwtClient.authorize(function(err) {
        if (err) {
            console.log(err);
            return;
        }
        let googleAnalytics = google.analytics('v3');
        queryData(googleAnalytics);
    });
})

function isLoggedIn(req, res, next) {
    if (!req.user) {
        console.log("FAILED IN isLoggedIn")
        res.status(403).send('Access denied. Contact a system administrator if you believe you\'re seeing this message in error.')
        throw new Error();
    } else {
        next()
    }
}

router.get('/', (req, res, next) => {
    Listing.findAll({ where: { status: 'active' }, include: [{ all: true }] })
        .then(listings => res.json(listings))
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    Listing.findById(req.params.id, { include: [{ all: true }] })
        .then(listing => {
            if (!listing) {
                res.status('404').send('Failing to fetch me at first keep encouraged, Missing me one place search another, I stop somewhere waiting for you.');
            } else {
                res.json(listing);
            }
        })
        .catch(next)
})

//gets all listings by user
router.get('/user/:userId', (req, res, next) => {
    Listing.findAll({
            where: { authorId: req.params.userId },
            include: [{ all: true }]
        })
        .then(listings => res.json(listings))
        .catch(next)
})

router.post('/', isLoggedIn, (req, res, next) => {
    Listing.create(req.body)
        .then(newListing => Promise.all([User.findById(newListing.authorId), newListing]))
        .then(([user, newListing]) => {
            analytics.track({
                userId: user.id,
                event: 'Created listing',
                properties: {
                    listing: newListing.id
                }
            });
            mailer.transporter.sendMail(mailer.newListing(user, newListing), (error, info) => {
                if (error) console.error(error);
                if (!error) console.log('Message %s sent: %s', info.messageId, info.response);
            });
            return res.json(newListing);
        })
        .catch(error => {
            console.log(error);
            res.status(401).send('Something went wrong.')
        })
})

router.put('/:id', isLoggedIn, (req, res, next) => {
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
                let updatedListing = result[1][0];
                analytics.track({
                    userId: updatedListing.authorId,
                    event: 'Updated listing',
                    properties: {
                        listing: updatedListing.id
                    }
                });
                res.json(updatedListing) //updated listing
                return updatedListing;
            }
        })
        .then(updatedListing => Promise.all([updatedListing, User.findById(updatedListing.authorId)]))
        .then(([updatedListing, author]) => {
            if (req.body.status) { //checks to see if status was updated
                analytics.track({
                    userId: author.id,
                    event: 'Updated listing status',
                    properties: {
                        listing: updatedListing.id,
                        status: req.body.status
                    }
                });
                mailer.transporter.sendMail(mailer.listingStatusChange(author, updatedListing, req.body.status), (error, info) => {
                    if (error) console.error(error);
                    if (!error) console.log('Message %s sent: %s', info.messageId, info.response);
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(401).send('Something went wrong.')
        })
})

router.delete('/:id', isLoggedIn, (req, res, next) => {
    Listing.destroy({
            where: {
                id: req.params.id
            },
            paranoid: true
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

router.post('/:id/photos', isLoggedIn, (req, res, next) => {
    let photos = req.body;
    if (photos.length) {
        let PromiseArr = photos.map(photo => Photo.findOrCreate({ where: { id: photo.id, name: photo.name, listingId: photo.listingId, link: photo.link } }));
        return Promise.all(PromiseArr)
            .then(() => Listing.findById(req.params.id, { include: [{ all: true }] }))
            .then(listing => res.json(listing))
            .catch(next)
    } else {
        return Listing.findById(req.params.id, { include: [{ all: true }] })
            .then(listing => res.json(listing))
            .catch(next)
    }
})

router.put('/:id/photos', isLoggedIn, (req, res, next) => { //this is a put and not delete because it alters the array of photos and the request has a payload
    let deletePhotos = req.body;
    if (deletePhotos.length) {
        let PromiseArr = deletePhotos.map(photo => Photo.destroy({ where: { id: photo.id, name: photo.name }, paranoid: true }));
        return Promise.all(PromiseArr)
            .then(() => Listing.findById(req.params.id, { include: [{ all: true }] }))
            .then(listing => res.json(listing))
            .catch(next)
    } else {
        return Listing.findById(req.params.id, { include: [{ all: true }] })
            .then(listing => res.json(listing))
            .catch(next)
    }
})

module.exports = router;