/* ROUTES FOR PATH '/api/actions' BELOW */

const express = require('express');
const router = express.Router();
const model = require('../db');
const Endorsement = model.Endorsement;
const User = model.User;
const Listing = model.Listing;
const Comment = model.Comment;
const Offer = model.Offer;

function isLoggedIn(req, res, next) {
    if (!req.user) {
        console.log('FAILED IN isLoggedIn', req)
        res.status(403).send('Access denied. Contact a system administrator if you believe you\'re seeing this message in error.')
    } else {
        next()
    }
}

function isRightUserByUserId(req, res, next) {
    if (req.user.id === Number(req.params.userId)) {
        next();
    } else {
        console.log('FAILED in isRightUserByUserId', req)
        res.status(403).send('Access denied. Contact a system administrator if you believe you\'re seeing this message in error.')
    }
}

//GET ALL ACTIONS
//a route to get all actions by listing
router.get('/listing/:listingId', (req, res, next) => {

    const savesPromise = Endorsement.findAll({
        where: { listingId: req.params.listingId, type: 'save' },
        include: [{ model: User }]
    });
    const endorsementsPromise = Endorsement.findAll({
        where: { listingId: req.params.listingId, type: 'endorse' },
        include: [{ model: User }]
    });
    const commentsPromise = Comment.findAll({
        where: { listingId: req.params.listingId },
        include: [{ model: User }]
    });
    const offersPromise = Offer.findAll({
        where: { listingId: req.params.listingId },
        include: [{ model: User }]
    });
    Promise.all([savesPromise, endorsementsPromise, commentsPromise, offersPromise])
        .then(resultsArr => {
            const actions = []; //building an array of all actions as objects, pushing all actions into it
            resultsArr.forEach(result => {
                result.forEach(action => {
                    actions.push(action)
                })
            })
            actions.sort((action1, action2) => new Date(action1.updatedAt) - new Date(action2.updatedAt));
            res.json(actions); //an array of all actions on the listing, sorted by date (newest first)
        })
        .catch(next)
})


//a route to get all actions by user (actor)
router.get('/user/:userId', isLoggedIn, (req, res, next) => {
    const savesPromise = Endorsement.findAll({
        where: { userId: req.params.userId, type: 'save' },
        include: [{ model: Listing }]
    });
    const endorsementsPromise = Endorsement.findAll({
        where: { userId: req.params.userId, type: 'endorse' },
        include: [{ model: Listing }]
    });
    const commentsPromise = Comment.findAll({
        where: { userId: req.params.userId },
        include: [{ model: Listing }]
    });
    const offersPromise = Offer.findAll({
        where: { userId: req.params.userId },
        include: [{ model: Listing }]
    });
    Promise.all([savesPromise, endorsementsPromise, commentsPromise, offersPromise])
        .then(([saves, endorsements, comments, offers]) => {
            saves.sort((action1, action2) => new Date(action1.updatedAt) - new Date(action2.updatedAt));
            endorsements.sort((action1, action2) => new Date(action1.updatedAt) - new Date(action2.updatedAt));
            comments.sort((action1, action2) => new Date(action1.updatedAt) - new Date(action2.updatedAt));
            offers.sort((action1, action2) => new Date(action1.updatedAt) - new Date(action2.updatedAt));

            const actions = { saves, endorsements, comments, offers };
            res.json(actions); //an object of all actions, stored as 'type': [], done by user, unsorted
        })
        .catch(next)
})

//COMMENTS
//a route to get all comments by listing
router.get('/comments/listing/:listingId', (req, res, next) => {
    Comment.findAll({
            where: { listingId: req.params.listingId },
            include: [{ model: User }]
        })
        .then(comments => {
            comments.sort((action1, action2) => new Date(action1.updatedAt) - new Date(action2.updatedAt));
            res.json(comments);
        })
        .catch(next)
})

//a route to get all comments by user
router.get('/comments/user/:userId', isLoggedIn, (req, res, next) => {
    Comment.findAll({
            where: { userId: req.params.userId },
            include: [{ model: Listing }]
        })
        .then(comments => {
            comments.sort((action1, action2) => new Date(action1.updatedAt) - new Date(action2.updatedAt));
            res.json(comments);
        })
        .catch(next)
})

//a route to get a single comment by id
router.get('/comments/:commentId', (req, res, next) => {
    Comment.findById(req.params.commentId, { include: [{ all: true }] })
        .then(comment => {
            if (!comment) {
                res.status('404').send('Failing to fetch me at first keep encouraged, Missing me one place search another, I stop somewhere waiting for you.');
            } else {
                res.json(comment);
            }
        })
        .catch(next)
})

//a route to post a comment
router.post('/comments', isLoggedIn, (req, res, next) => {
    if (req.body.userId !== req.user.id) { //id check
        res.status(401).send('Something went wrong. You do not have permission to post this comment. Contact a system administrator for details.')
    } else {
        Comment.create(req.body)
            .then(newComment => {
                analytics.track({
                    userId: newComment.userId,
                    event: 'Created comment',
                    properties: {
                        listing: newComment.listingId
                    }
                });
                return res.json(newComment);
            })
            .catch(error => {
                console.log(error);
                res.status(401).send('Something went wrong.')
            })
    }
})

//a route to edit a comment -- needs identity check
router.put('/comments/:id', isLoggedIn, (req, res, next) => {
    Comment.update(req.body, {
            where: {
                id: req.params.id
            },
            returning: true
        })
        .then(result => {
            if (!result[0]) {
                next();
            } else {
                let updatedComment = result[1][0];
                analytics.track({
                    userId: updatedComment.userId,
                    event: 'Updated comment',
                    properties: {
                        listing: updatedComment.listingId
                    }
                });
                res.json(updatedComment); //updated listing
            }
        })
        .catch(error => {
            console.log(error);
            res.status(401).send('Something went wrong.')
        })
})

//a route to delete a comment -- needs identity check
router.delete('/comments/:id', isLoggedIn, (req, res, next) => {
    Comment.destroy({
            where: {
                id: req.params.id
            },
            paranoid: true
        })
        .then(result => {
            if (!result) {
                next();
            } else {
                analytics.track({
                    userId: result.userId,
                    event: 'Deleted comment',
                    properties: {
                        comment: req.params.id
                    }
                });
                res.status(204).json(req.params.id); // returns the id of the deleted item
            }
        })
        .catch(next)
})

//OFFERS
//a route to get all offers by listing
router.get('/offers/listing/:listingId', (req, res, next) => {
    Offer.findAll({
            where: { listingId: req.params.listingId },
            include: [{ model: User }]
        })
        .then(offers => {
            offers.sort((action1, action2) => new Date(action1.updatedAt) - new Date(action2.updatedAt));
            res.json(offers);
        })
        .catch(next)
})

//a route to get all offers by user
router.get('/offers/user/:userId', isLoggedIn, (req, res, next) => {
    Offer.findAll({
            where: { userId: req.params.userId },
            include: [{ model: Listing }]
        })
        .then(offers => {
            offers.sort((action1, action2) => new Date(action1.updatedAt) - new Date(action2.updatedAt));
            res.json(offers);
        })
        .catch(next)
})

//a route to get a single offer by id
router.get('/offers/:offerId', (req, res, next) => {
    Offer.findById(req.params.offerId, { include: [{ all: true }] })
        .then(offer => {
            if (!offer) {
                res.status('404').send('Failing to fetch me at first keep encouraged, Missing me one place search another, I stop somewhere waiting for you.');
            } else {
                res.json(offer);
            }
        })
        .catch(next)
})

//a route to post an offer
router.post('/offers', isLoggedIn, (req, res, next) => {
    if (req.body.userId !== req.user.id) { //id check
        res.status(401).send('Something went wrong. You do not have permission to post this offer. Contact a system administrator for details.')
    } else {
        Offer.create(req.body)
            .then(newOffer => {
                analytics.track({
                    userId: newOffer.userId,
                    event: 'Created offer',
                    properties: {
                        listing: newOffer.listingId
                    }
                });
                return res.json(newOffer);
            })
            .catch(error => {
                console.log(error);
                res.status(401).send('Something went wrong.')
            })
    }
})

//a route to edit an offer
router.put('/offers/:id', isLoggedIn, (req, res, next) => { //need id check
    Offer.update(req.body, {
            where: {
                id: req.params.id
            },
            returning: true
        })
        .then(result => {
            if (!result[0]) {
                next();
            } else {
                let updatedOffer = result[1][0];
                analytics.track({
                    userId: updatedOffer.userId,
                    event: 'Updated comment',
                    properties: {
                        listing: updatedOffer.listingId
                    }
                });
                res.json(updatedOffer); //updated listing
            }
        })
        .catch(error => {
            console.log(error);
            res.status(401).send('Something went wrong.')
        })
})

//a route to delete an offer
router.delete('/offers/:id', isLoggedIn, (req, res, next) => { //need id check
    Offer.destroy({
            where: {
                id: req.params.id
            },
            paranoid: true
        })
        .then(result => {
            if (!result) {
                next();
            } else {
                analytics.track({
                    userId: result.userId,
                    event: 'Deleted offer',
                    properties: {
                        offer: req.params.id
                    }
                });
                res.status(204).json(req.params.id); // returns the id of the deleted item
            }
        })
        .catch(next)
})

//ENDORSEMENTS: either 'save' or 'endorse' (vouching for post)
//ENDORSEMENTS as saves
//a route to get all saves by listing
router.get('/saves/listing/:listingId', (req, res, next) => {
    Endorsement.findAll({
            where: { listingId: req.params.listingId, type: 'save' },
            include: [{ model: User }]
        })
        .then(saves => {
            saves.sort((action1, action2) => new Date(action1.updatedAt) - new Date(action2.updatedAt));
            res.json(saves);
        })
        .catch(next)
})

//a route to get all saves by user
router.get('/saves/user/:userId', isLoggedIn, (req, res, next) => {
    Endorsement.findAll({
            where: { userId: req.params.userId, type: 'save' },
            include: [{ model: Listing }]
        })
        .then(saves => {
            res.json(saves);
        })
        .catch(next)
})

//a route to post a save
router.post('/saves', isLoggedIn, (req, res, next) => {
    if (req.body.userId !== req.user.id) { //id check
        res.status(401).send('Something went wrong. You do not have permission to save this listing. Contact a system administrator for details.')
    } else {
        Endorsement.create(req.body)
            .then(newSave => {
                analytics.track({
                    userId: newSave.userId,
                    event: 'Saved listing',
                    properties: {
                        listing: newSave.listingId
                    }
                });
                return res.json(newSave);
            })
            .catch(error => {
                console.log(error);
                res.status(401).send('Something went wrong.')
            })
    }
})

//a route to delete a save
router.delete('/saves/:id', isLoggedIn, (req, res, next) => { //need id check
    Endorsement.destroy({
            where: {
                id: req.params.id
            },
            paranoid: true
        })
        .then(result => {
            if (!result) {
                next();
            } else {
                analytics.track({
                    userId: result.userId,
                    event: 'Unsaved listing',
                    properties: {
                        save: req.params.id
                    }
                });
                res.status(204).json(req.params.id); // returns the id of the deleted item
            }
        })
        .catch(next)
})

//ENDORSEMENTS as endorsements
//a route to get all endorsements by listing
router.get('/endorsements/listing/:listingId', (req, res, next) => {
    Endorsement.findAll({
            where: { listingId: req.params.listingId, type: 'endorse' },
            include: [{ model: User }]
        })
        .then(endorsements => {
            endorsements.sort((action1, action2) => new Date(action1.updatedAt) - new Date(action2.updatedAt));
            res.json(endorsements);
        })
        .catch(next)
})

//a route to get all endorsements by user
router.get('/endorsements/user/:userId', isLoggedIn, (req, res, next) => {
    Endorsement.findAll({
            where: { userId: req.params.userId, type: 'endorse' },
            include: [{ model: Listing }]
        })
        .then(endorsements => {
            endorsements.sort((action1, action2) => new Date(action1.updatedAt) - new Date(action2.updatedAt));
            res.json(endorsements);
        })
        .catch(next)
})

//a route to post an endorsement
router.post('/endorsements', isLoggedIn, (req, res, next) => {
    if (req.body.userId !== req.user.id) {
        res.status(401).send('Something went wrong. You do not have permission to endorse this listing. Contact a system administrator for details.')
    } else {
        Endorsement.create(req.body)
            .then(newEndorsement => {
                analytics.track({
                    userId: newEndorsement.userId,
                    event: 'Endorsed listing',
                    properties: {
                        listing: newEndorsement.listingId
                    }
                });
                return res.json(newEndorsement);
            })
            .catch(error => {
                console.log(error);
                res.status(401).send('Something went wrong.')
            })
    }
})

//a route to delete an endorsement
router.delete('/endorsements/:id', isLoggedIn, (req, res, next) => {
    Endorsement.destroy({
            where: {
                id: req.params.id
            },
            paranoid: true
        })
        .then(result => {
            if (!result) {
                next();
            } else {
                analytics.track({
                    userId: result.userId,
                    event: 'Unendorsed listing',
                    properties: {
                        endorsement: req.params.id
                    }
                });
                res.status(204).json(req.params.id); // returns the id of the deleted item
            }
        })
        .catch(next)
})

module.exports = router;