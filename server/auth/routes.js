/* ROUTES FOR PATH '/auth' BELOW */

const router = require('express').Router();
const User = require('../db/models/User');
const mailer = require('../mailer')

router.post('/login', (req, res, next) => {
    User.scope('unsanitized').findOne({
            where: {
                email: req.body.email
            },
            include: [{ all: true }]
        })
        .then(user => {
            if (!user) {
                return res.status(401).send('Oops, we don\'t have an account under that email address.') //should link to create an account
            } else if (!user.correctPassword(req.body.password)) {
                return res.status(401).send('That\'s not the right password ... try again!')
            } else { // this will attach the user to our passport, which will save the user in the session store -- req.login() invokes the serialize passport function, it's attached to the req obj
                return req.login(user, err => {
                    if (err) next(err);
                    else return res.json(user.sanitize()).status(200);
                })
            }
        })
        .catch(next);
})

router.post('/forgotpassword', (req, res, next) => {
    User.findOne({
            where: {
                email: req.body.email
            },
            include: [{ all: true }]
        })
        .then(user => {
            if (!user) {
                return res.status(401).send('Sorry, we don\'t have an account under that email address.')
            } else {
                mailer.transporter.sendMail(mailer.changePassword(user, 'www.google.com'), (error, info) => {
                    if (error) console.error(error);
                    if (!error) console.log('Message %s sent: %s', info.messageId, info.response);
                }); //should wait for confirm email url to be visited before req.login and user creation
                return res.status(307).send('It happens to all of us. \n Check your email for a reset password link.')
            }
        })
        .catch(next);
})

// User.create(req.body) //should check to see if user already exists -- if email is not unique this will fail quietly
//     .then(user => {
//         mailer.transporter.sendMail(mailer.verifyEmail(user, 'www.google.com'), (error, info) => {
//             if (error) {
//                 console.error(error);
//                 res.end('error');
//             }
//             if (!error) console.log('Message %s sent: %s', info.messageId, info.response);
//         }); //should wait for confirm email url to be visited before req.login and user creation
//         return req.login(user, err => {
//             if (err) next(err);
//             res.end('sent');
//             // else return res.json(user); //add sanitize?
//         });
//     })
//     .catch(next);
// })

router.post('/logout', (req, res, next) => {
    req.logout();
    return res.sendStatus(200);
});

// fetches the logged in user
router.get('/me', (req, res, next) => {
    return res.json(req.user); //added sanitize?
});

/* --------------------------- VERIFY LINK ---------------------------------*/
let rand, host, confirmUrl;
router.post('/signup', (req, res, next) => {
    rand = Math.floor((Math.random() * 100) + 54);
    host = req.get('host');
    confirmUrl = 'http://' + req.get('host') + '/verify?id=' + rand;

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                res.end('An account with that email address already exists.')
            } else {
                mailer.transporter.sendMail(mailer.verifyEmail(user, confirmUrl), (error, info) => {
                    if (error) {
                        console.error(error);
                        res.end('error');
                    } else {
                        console.log('Message %s sent: %s', info.messageId, info.response)
                    }
                });
            }
        })
        .catch(next)
})

router.get('/verify', (req, res, next) => {
    console.log(req.protocol + '://' + req.get('host'));
    if ((req.protocol + '://' + req.get('host')) == ('http://' + host)) {
        console.log('Domain is matched. Information is from Authentic email');
        if (req.query.id === rand) {
            console.log('email is verified');
            res.end('<h1>Email ' + mailOptions.to + ' is been Successfully verified');
        } else {
            console.log('email is not verified');
            res.end('<h1>Bad Request</h1>');
        }
    } else {
        res.end('<h1>Request is from unknown source</h1>');
    }
});


module.exports = router;