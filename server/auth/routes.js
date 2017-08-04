/* ROUTES FOR PATH '/auth' BELOW */

const router = require('express').Router();
const User = require('../db/models/User');

router.post('/login', (req, res, next) => {
    User.scope('unsanitized').findOne({
            where: {
                email: req.body.email
            },
            include: [{ all: true }]
        })
        .then(user => {
            if (!user) {
                res.status(401).send('We don\'t have an account under that email address') //should link to create an account
            } else if (!user.correctPassword(req.body.password)) {
                res.status(401).send('That\'s not the right password ... try again!')
            } else { // this will attach the user to our passport, which will save the user in the session store -- req.login() invokes the serialize passport function, it's attached to the req obj
                req.login(user, err => {
                    if (err) next(err);
                    else res.json(user.sanitize()).status(200);
                })
            }
        })
        .catch(next);
})

router.post('/signup', (req, res, next) => {
    User.create(req.body) //should check to see if user already exists -- if email is not unique this will fail quietly
        .then(user => {
            req.login(user, err => {
                if (err) next(err);
                else res.json(user); //add sanitize?
            });
        })
        .catch(next);
})

router.post('/logout', (req, res, next) => {
    req.logout();
    res.sendStatus(200);
});

// fetches the logged in user
router.get('/me', (req, res, next) => {
    res.json(req.user); //added sanitize?
});

module.exports = router;