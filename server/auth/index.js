const express = require('express');
const router = express.Router();
const app = express();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const models = require('../db');
const User = models.User;

const googleCodes = process.env.NODE_ENV === 'development' ? require('../google_api') : {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
}

passport.use(
    new GoogleStrategy({
            clientID: googleCodes.clientID,
            clientSecret: googleCodes.clientSecret,
            callbackURL: '/auth/google/callback'
        },
        // Google will send back the token and profile
        function(token, refreshToken, profile, done) {
            User.findOrCreate({
                    where: {
                        name: profile.displayName,
                        email: profile.emails[0].value
                    }
                })
                .then(() => done())
        })
);

app.get('/auth/google', passport.authenticate('google', { scope: 'email' }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/'
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