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
router.get('/:listingId', (req, res, next) => {
    const savesPromise = Endorsement.findAll({
        where: { listingId: req.params.listingId, issued: null },
        include: [{ model: User }]
    });
    const endorsementsPromise = Endorsement.findAll({
        where: { listingId: req.params.listingId, issued: true },
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
        .then(([saves, endorsements, comments, offers]) => {
            const actions = []; //building an array of all actions as objects, with a 'type' key specifying what type of action it is
            saves.forEach(save => {
                save.type = 'save';
                actions.push(save);
            });
            endorsements.forEach(endorsement => {
                endorsement.type = 'endorsement';
                actions.push(endorsement);
            });
            comments.forEach(comment => {
                comment.type = 'comment';
                actions.push(comment);
            });
            offers.forEach(offer => {
                offer.type = 'offer';
                actions.push(offer);
            });
            actions.sort((action1, action2) => new Date(action1.updatedAt) - new Date(action2.updatedAt));
            res.json(actions); //an array of all actions on the listing, sorted by date (newest first)
        })
        .catch(next)
})


//a route to get all actions by user (actor)
router.get('/:userId', isLoggedIn, (req, res, next) => {
    const savesPromise = Endorsement.findAll({
        where: { endorserId: req.params.userId, issued: null },
        include: [{ model: Listing }]
    });
    const endorsementsPromise = Endorsement.findAll({
        where: { endorserId: req.params.userId, issued: true },
        include: [{ model: Listing }]
    });
    const commentsPromise = Comment.findAll({
        where: { authorId: req.params.userId },
        include: [{ model: Listing }]
    });
    const offersPromise = Offer.findAll({
        where: { bidderId: req.params.userId },
        include: [{ model: Listing }]
    });
    Promise.all([savesPromise, endorsementsPromise, commentsPromise, offersPromise])
        .then(([saves, endorsements, comments, offers]) => {
            const actions = { saves, endorsements, comments, offers }; //building an array of all actions as objects, with a 'type' key specifying what type of action it is
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
            res.json(comments);
        })
        .catch(next)
})

//a route to get all comments by user
router.get('/comments/user/:userId', isLoggedIn, (req, res, next) => {
    Comment.findAll({
            where: { authorId: req.params.userId },
            include: [{ model: Listing }]
        })
        .then(comments => {
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
    if (req.body.authorId !== req.user.id) {
        res.status(401).send('Something went wrong. You do not have permission to post this comment. Contact a system administrator for details.')
    } else {
        Comment.create(req.body)
            .then(newComment => {
                analytics.track({
                    userId: newComment.authorId,
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

//a route to edit a comment
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
                    userId: updatedComment.authorId,
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

//a route to delete a comment
router.delete('/comments/:id', isLoggedIn, (req, res, next) => {
    Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            if (!result) {
                next();
            } else {
                analytics.track({
                    userId: result.authorId,
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
            res.json(offers);
        })
        .catch(next)
})

//a route to get all offers by user
router.get('/offers/user/:userId', isLoggedIn, (req, res, next) => {
    Offer.findAll({
            where: { bidderId: req.params.userId },
            include: [{ model: Listing }]
        })
        .then(offers => {
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
    if (req.body.bidderId !== req.user.id) {
        res.status(401).send('Something went wrong. You do not have permission to post this offer. Contact a system administrator for details.')
    } else {
        Offer.create(req.body)
            .then(newOffer => {
                analytics.track({
                    userId: newOffer.bidderId,
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
router.put('/offers/:id', isLoggedIn, (req, res, next) => {
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
                    userId: updatedOffer.bidderId,
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
router.delete('/offers/:id', isLoggedIn, (req, res, next) => {
    Offer.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            if (!result) {
                next();
            } else {
                analytics.track({
                    userId: result.bidderId,
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

//ENDORSEMENTS: either 'saves' (saving/favoriting the listing; issued: null) or 'endorsements' (vouching for post; issued: true)
//ENDORSEMENTS as saves
//a route to get all saves by listing
router.get('/saves/listing/:listingId', (req, res, next) => {
    Endorsement.findAll({
            where: { listingId: req.params.listingId, issued: null },
            include: [{ model: User }]
        })
        .then(saves => {
            res.json(saves);
        })
        .catch(next)
})

//a route to get all saves by user
router.get('/saves/user/:userId', isLoggedIn, (req, res, next) => {
    Endorsement.findAll({
            where: { endorserId: req.params.userId, issued: null },
            include: [{ model: Listing }]
        })
        .then(saves => {
            res.json(saves);
        })
        .catch(next)
})

//a route to post a save
router.post('/saves', isLoggedIn, (req, res, next) => {
    if (req.body.endorserId !== req.user.id) {
        res.status(401).send('Something went wrong. You do not have permission to save this listing. Contact a system administrator for details.')
    } else {
        Endorsement.create(req.body)
            .then(newSave => {
                analytics.track({
                    userId: newSave.endorserId,
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
router.delete('/saves/:id', isLoggedIn, (req, res, next) => {
    Endorsement.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            if (!result) {
                next();
            } else {
                analytics.track({
                    userId: result.endorserId,
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
            where: { listingId: req.params.listingId, issued: true },
            include: [{ model: User }]
        })
        .then(endorsements => {
            res.json(endorsements);
        })
        .catch(next)
})

//a route to get all endorsements by user
router.get('/endorsements/user/:userId', isLoggedIn, (req, res, next) => {
    Endorsement.findAll({
            where: { endorserId: req.params.userId, issued: true },
            include: [{ model: Listing }]
        })
        .then(endorsements => {
            res.json(endorsements);
        })
        .catch(next)
})

//a route to post an endorsement
router.post('/endorsements', isLoggedIn, (req, res, next) => {
    if (req.body.endorserId !== req.user.id) {
        res.status(401).send('Something went wrong. You do not have permission to endorse this listing. Contact a system administrator for details.')
    } else {
        Endorsement.create(req.body)
            .then(newEndorsement => {
                analytics.track({
                    userId: newEndorsement.endorserId,
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
            }
        })
        .then(result => {
            if (!result) {
                next();
            } else {
                analytics.track({
                    userId: result.endorserId,
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