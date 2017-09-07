/* ROUTES FOR PATH '/api/listings' BELOW */

const express = require('express');
const router = express.Router();
const model = require('../db');
const Listing = model.Listing;
const Photo = model.Photo;
const User = model.User;
const listingNotFound = () => (new Error('Sorry, something went wrong ... We can\'t seem to find that listing!'))
const mailer = require('../mailer')

/*
(req, res, next) => {
    if (!req.user)throw new Error();
    else next()
}
*/

function isLoggedIn(req, res, next) {
    console.log("PIPELINE!!!!!!!!!!!!!!");
    if (!req.user) {
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
            mailer.transporter.sendMail(mailer.newListing(user, newListing), (error, info) => {
                if (error) console.error(error);
                if (!error) console.log('Message %s sent: %s', info.messageId, info.response);
            });
            return res.json(newListing);
        })
        .catch(next)
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
                res.json(updatedListing) //updated listing
                return updatedListing;
            }
        })
        .then(updatedListing => Promise.all([updatedListing, User.findById(updatedListing.authorId)]))
        .then(([updatedListing, author]) => {
            if (req.body.status) { //checks to see if status was updated
                mailer.transporter.sendMail(mailer.listingStatusChange(author, updatedListing, req.body.status), (error, info) => {
                    if (error) console.error(error);
                    if (!error) console.log('Message %s sent: %s', info.messageId, info.response);
                });
            }
        })
        .catch(next)
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

router.put('/:id/photos', isLoggedIn, (req, res, next) => {
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