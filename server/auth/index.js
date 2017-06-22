const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const models = require('../db');
const User = models.User;
const secrets = require('../../google_api.js');

// configure the strategy with our config object
const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID : secrets.clientID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ? process.env.GOOGLE_CLIENT_SECRET : secrets.clientSecret,
    callbackURL: process.env.GOOGLE_CALLBACK ? process.env.GOOGLE_CALLBACK : '/auth/google/callback'
};

// Google will send back the token and profile;
// Here's the function that passport will invoke after google sends
// us the user's profile and access token
const strategy = new GoogleStrategy(googleConfig, function(token, refreshToken, profile, done) {
    const googleId = profile.id;
    const name = profile.displayName;
    const email = profile.emails[0].value;

    console.log("GOOGLE ID type", typeof googleId); //is this a string as expected?

    User.findOne({ where: { googleId: googleId } })
        .then(user => {
            console.log(user);
            if (!user) {
                console.log("The user is falsy")
                    //do something over here to note that the user didn't previously exist
                return User.create({ name, email, googleId })
                    .then(() => {
                        console.log("DID WE GET HERE to create the user?")
                        done(null, user);
                    });
            } else {
                done(null, user);
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
        successRedirect: '/home',
        failureRedirect: '/login'
    }))

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
    User.findById(id)
        .then(user => done(null, user))
        .catch(done);
});

router.use('/auth', require('./routes'));

module.exports = router;