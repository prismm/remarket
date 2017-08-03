const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const models = require('../db');
const User = models.User;
const secrets = process.env.GOOGLE_CLIENT_ID ? null : require('../../google_api.js');

// configure the strategy with our config object
const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID : secrets.clientID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ? process.env.GOOGLE_CLIENT_SECRET : secrets.clientSecret,
    callbackURL: process.env.GOOGLE_CALLBACK ? process.env.GOOGLE_CALLBACK : '/auth/google/callback'
};

// Google will send back the token and profile;
// Here's the function that passport will invoke after google sends -- generates a strategy
const strategy = new GoogleStrategy(googleConfig, function(token, refreshToken, profile, done) {
    const googleId = profile.id;
    const name = profile.displayName;
    const email = profile.emails[0].value;

    User.findOne({ where: { googleId: googleId } })
        .then(user => {
            if (!user) {
                console.log("The user is falsy")
                    //do something over here to note that the user didn't previously exist
                return User.create({ name, email, googleId })
                    .then(() => {
                        console.log("We are here to create the user")
                        done(null, user); //should be sanitized?
                    });
            } else {
                done(null, user); //should be sanitized?
            }
        })
        .catch(done);
});

router.use(passport.initialize());
router.use(passport.session());
passport.use(strategy);

router.get('/auth/google', passport.authenticate('google', { scope: 'email' }));

router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/home', //should say that you have logged in successfully, and redirect to whereever you were browsing before
        failureRedirect: '/login' //should say it didn't work
    }))

//when do these functions (serializeUser and deserializeUser) run?
// stores user's id in the session store upon login
passport.serializeUser((user, done) => {
    try {
        done(null, user.id);
    } catch (err) {
        done(err);
    }
});

// runs when a user has already initiated a session and we want to re-obtain user info from the db
passport.deserializeUser((id, done) => {
    User.findById(id, { include: [{ all: true }] })
        .then(user => done(null, user)) //sanitize?
        .catch(done);
});

router.use('/auth', require('./routes'));

module.exports = router;

/*
security concerns to consider: 
-- when does the user need to be sanitized and when not? 
-- can we prevent "private information" (email, etc) from being included on req/res headers?
-- preventing CSRF attacks --> 
    (1) is this a real concern on a SPA? We don't use req.query for anything as far as i know;
    (2) we should verify that our get requests are safe and not "state-changing" 
        in that they simply produce public info (not private info)
        and that no db changes are made
    (3) consider protecting "post" and "put" and "delete" requests by piping api routes thru a requireLogin function
    (4) protect all mailer requests with requireLogin function
-- verify that app XHR requests are secure under CORS and SOP
-- can api routes be casually protected by changing '/api/' to something a little more customized?
-- should we track HTTP referrers?
-- get HTTPS
-- get bundle off of git
-- get git private

*/