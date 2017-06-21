const express = require('express');
const router = express.Router();
const app = express();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const models = require('../db');
const User = models.User;
const secrets = require('../../google_api.js');

// configure the strategy with our config object
const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID : secrets.clientID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ? process.env.GOOGLE_CLIENT_SECRET : secrets.clientSecret,
    callbackURL: process.env.GOOGLE_CALLBACK
};

// Google will send back the token and profile;
// Here's function that passport will invoke after google sends
// us the user's profile and access token
const strategy = new GoogleStrategy(googleConfig, function(token, refreshToken, profile, done) {
    const googleId = profile.id;
    const name = profile.displayName;
    const email = profile.emails[0].value;

    User.findOne({ where: { googleId: googleId } })
        .then(user => {
            if (!user) {
                return User.create({ name, email, googleId })
                    .then(() => {
                        done(null, user);
                    });
            } else {
                done(null, user);
            }
        })
        .catch(done);
});

passport.use(strategy);

app.get('/auth/google', passport.authenticate('google', { scope: 'email' }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
    }))

router.use(passport.initialize());
router.use(passport.session());

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