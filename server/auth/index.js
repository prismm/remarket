const express = require('express');
const router = express.Router();
const passport = require('passport');
const models = require('../db');
const User = models.User;
const secrets = process.env.GOOGLE_CLIENT_ID ? null : require('../../google_api.js');
const AWS = require('aws-sdk');
const config = process.env.AWS_ACCESS_KEY_ID ? null : require('../../aws-config.json')
const mailer = require('../mailer')

/*--------------------------------------------AWS--------------------------------------------*/
AWS.config.credentials = config;

/*-------------------------------------------GOOGLE-----------------------------------------*/
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// configure the strategy with our config object
const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID : secrets.clientID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ? process.env.GOOGLE_CLIENT_SECRET : secrets.clientSecret,
    callbackURL: process.env.GOOGLE_CALLBACK ? process.env.GOOGLE_CALLBACK : '/auth/google/callback'
};

// Google will send back the token and profile;
// Here's the function that passport will invoke after google sends -- generates a strategy
const googleStrategy = new GoogleStrategy(googleConfig, function(token, refreshToken, profile, callback) {
    console.log(profile);
    const googleId = profile.id;
    const name = profile.displayName;
    const email = profile.emails[0].value;

    User.findOne({ where: { googleId: googleId } })
        .then(user => {
            if (user) return callback(null, user); //logs in the user
            if (!user) {
                User.findOne({ where: { email: email } }) //looks for a user with the same email address
                    .then(emailMatchUser => {
                        if (emailMatchUser) { //if it finds a user with that email address
                            emailMatchUser.update({ googleId: googleId }) //it updates that user to include his/her fcbk account
                                .then(addedGoogleUser => {
                                    return callback(null, addedGoogleUser)
                                }) //then logs in that user
                        } else {
                            return User.create({ name, email, googleId, confirmed: true }) //creates a new user
                                .then(createdUser => {
                                    console.log("ABOUT TO SEND CREATED USER MAIL")
                                    mailer.transporter.sendMail(mailer.welcome(createdUser), (error, info) => {
                                        if (error) console.error(error);
                                        if (!error) console.log('Message %s sent: %s', info.messageId, info.response);
                                    });
                                    return callback(null, createdUser); //logs in the new user
                                });
                        }
                    })
            }
        })
        .catch(callback);
});

/*------------------------------------------------FACEBOOK------------------------------------------*/

const FacebookStrategy = require('passport-facebook');

// configure the strategy with our config object
const FacebookConfig = {
    clientID: process.env.FACEBOOK_CLIENT_ID ? process.env.FACEBOOK_CLIENT_ID : secrets.FacebookAppID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET ? process.env.FACEBOOK_CLIENT_SECRET : secrets.FacebookSecret,
    callbackURL: process.env.FACEBOOK_CALLBACK ? process.env.FACEBOOK_CALLBACK : '/auth/facebook/callback',
    enableProof: true,
    profileFields: ['id', 'displayName', 'photos', 'email']
}

const facebookStrategy = new FacebookStrategy(FacebookConfig, function(accessToken, refreshToken, profile, callback) {
    console.log(profile);
    const facebookId = profile.id;
    const name = profile.displayName;
    const email = profile.emails[0].value;
    // const facebookLink = 

    User.findOne({ where: { facebookId: facebookId } })
        .then(user => {
            if (user) return callback(null, user); //logs in the user
            if (!user) {
                User.findOne({ where: { email: email } }) //looks for a user with the same email address
                    .then(emailMatchUser => {
                        if (emailMatchUser) { //if it finds a user with that email address
                            emailMatchUser.update({ facebookId: facebookId, facebookProfileLink: null }) //it updates that user to include his/her fcbk account
                                .then(addedFacebookUser => {
                                    return callback(null, addedFacebookUser)
                                }) //then logs in that user
                        } else {
                            return User.create({ name, email, facebookId, confirmed: true, facebookProfileLink: null }) //creates a new user
                                .then(createdUser => {
                                    console.log("ABOUT TO SEND CREATED USER MAIL")
                                    mailer.transporter.sendMail(mailer.welcome(createdUser), (error, info) => {
                                        if (error) console.error(error);
                                        if (!error) console.log('Message %s sent: %s', info.messageId, info.response);
                                    });
                                    return callback(null, createdUser); //logs in the new user
                                });
                        }
                    })
            }
        })
        .catch(callback);
});

/*-------------------------------------GENERAL AUTH & TYING IT TOGETHER -----------------------------------*/
router.use(passport.initialize());
router.use(passport.session());
passport.use(googleStrategy);
passport.use(facebookStrategy);

router.get('/auth/google', passport.authenticate('google', { scope: 'email' }));

router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/home', //should say that you have logged in successfully, and redirect to whereever you were browsing before?
        failureRedirect: '/login' //should say it didn't work?
    }),
    (req, res) => {
        const redirect = req.session.oauth2return || '/';
        delete req.session.oauth2return;
        res.redirect(redirect);
    });

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] })); //'publish_actions' will be added once ready to submit to fcbk for review)

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/home',
        failureRedirect: '/login'
    }));

// when do these functions (serializeUser and deserializeUser) run?
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

//why no local passport.authenticate?
router.use('/auth', require('./routes'));

module.exports = router;

/*
security concerns to consider:
-- when does the user need to be sanitized and when not?
X-- can we prevent "private information" (email, etc) from being included on req/res headers?
X-- preventing CSRF attacks -->
    (1) is this a real concern on a SPA? We don't use req.query for anything as far as i know;
    (2) we should verify that our get requests are safe and not "state-changing"
        in that they simply produce public info (not private info)
        and that no db changes are made
    (3) consider protecting "post" and "put" and "delete" requests by piping api routes thru a requireLogin function
    (4) protect all mailer requests with requireLogin function
X-- verify that app XHR requests are secure under CORS and SOP
X-- can api routes be casually protected by changing '/api/' to something a little more customized?
-- should we track HTTP referrers?
-- get HTTPS
X-- get bundle off of git
-- get git private
-- bundle.min

*/