'use strict';
const nodemailer = require('nodemailer');

const remarket = '"Remarket 👻" <hello@reuse.market>'
    // create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'username@example.com',
        pass: 'userpass'
    }
});

// setup email data with unicode symbols
/*-------------------emails regarding user accounts below-------------------*/
let verifyEmail = {
    from: remarket, // sender address
    to: user, // list of receivers
    subject: 'Hi! Please verify your email', // Subject line
    text: 'Hello, thanks for signing up with remarket! Please confirm your emaill address by {clicking here}.', // plain text body
    html: '<p>Hello, thanks for signing up with remarket! Please confirm your emaill address by <a href="{confirm email link}">clicking here</a>.</p>' // html body
};

let changePassword = {
    from: remarket, // sender address
    to: user, // list of receivers
    subject: 'Reset your password', // Subject line
    text: 'We hear you wanted to reset your password -- {go for it}.', // plain text body
    html: '<p>We hear you wanted to reset your password -- <a href="{my account link}">go for it</a>.</p>' // html body
};

let confirmNetwork = {
    from: remarket, // sender address
    to: user, // list of receivers
    subject: 'Confirm network', // Subject line
    text: 'Hi {user.name}, please confirm your affiliation to {network} by {clicking here}.', // plain text body
    html: '<p>Hi {user.name}, please confirm your affiliation to {network} by <a href="{confirm network link}">clicking here</a>.</p>' // html body
};

let deleteAccount = {
    from: remarket, // sender address
    to: user, // list of receivers
    subject: 'Sad to see you go', // Subject line
    text: 'Hi {user.name}, your account with us has successfully been deleted. Can you let us know why? {why delete form} Thank you for using remarket.', // plain text body
    html: '<p>Hi {user.name}, your account with us has successfully been deleted. Can you let us know why? {why delete form} Thank you for using remarket.</p>' // html body
}

/*-------------------emails regardling listings below--------------------*/
let newListing = {};

let newComment = {
    from: remarket, // sender address
    to: author, // list of receivers
    subject: '[{listing.name}] New comment on your listing', // Subject line
    text: 'Hi {author.name}, {buyer.name} made a new comment on your listing {listing.name}. {View it here.} {To opt out of future messages like this, please click here.}', // plain text body
    html: '<p>Hi {author.name}, {buyer.name} made a new comment on your listing {listing.name}. <a href="{confirm email link}">View it here.</a><a href="{email prefs link}">To opt out of future messages like this, please click here.</a>' // html body
};

let newOffer = {
    from: remarket, // sender address
    to: author, // list of receivers
    subject: '[{listing.name}] New offer on your listing', // Subject line
    text: 'Hi {author.name}, {buyer.name} made a new offer on your listing {listing.name}. {View it here.} {To opt out of future messages like this, please click here.}', // plain text body
    html: '<p>Hi {author.name}, {buyer.name} made a new offer on your listing {listing.name}. <a href="{confirm email link}">View it here.</a><a href="{email prefs link}">To opt out of future messages like this, please click here.</a>' // html body
};

let anotherOffer = {
    from: remarket,
    to: buyer,
    subject: '[{listing.name}] Another offer was made'
};

let offerAccepted = {
    from: remarket, // sender address
    to: buyer, // list of receivers
    subject: '[{listing.name}] Good news!', // Subject line
    text: 'Hi {buyer.name}, good news! {author.name} has accepted your offer of {offer.amount} for {listing.name}. {Author.name} is cc\'ed, so you two can take it from here. Thanks for using Remarket!', // plain text body
    html: '<p>Hi {buyer.name}, good news! {author.name} has accepted your offer of {offer.amount} for {listing.name}. {Author.name} is cc\'ed, so you two can take it from here. Thanks for using Remarket!</p>' // html body
};

let youAcceptedOffer = {
    from: remarket, // sender address
    to: author, // list of receivers
    subject: '[{listing.name}] We\'re glad you accepted the offer', // Subject line
    text: 'Hi {buyer.name}, good news! {author.name} has accepted your offer of {offer.amount} for {listing.name}. {Author.name} is cc\'ed, so you two can take it from here. Thanks for using Remarket!', // plain text body
    html: '<p>Hi {buyer.name}, good news! {author.name} has accepted your offer of {offer.amount} for {listing.name}. {Author.name} is cc\'ed, so you two can take it from here. Thanks for using Remarket!</p>' // html body
};

let listingStatusChange = {
    from: remarket,
    to: buyer,
    subject: '[{listing.name}] Another offer was made'
};

let listingAboutToArchive = {};


// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});