'use strict';
const nodemailer = require('nodemailer');
const secrets = process.env.GOOGLE_CLIENT_ID ? null : require('../../google_api.js');
const domainUrl = process.env.GOOGLE_CLIENT_ID ? 'https://reuse.market/' : 'http://localhost:1337/';

const remarket = '"Remarket 👻" <hello@coases.com>';

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: process.env.MAILER_ID ? process.env.MAILER_ID : secrets.mailerId,
        pass: process.env.MAILER_PASSWORD ? process.env.MAILER_PASSWORD : secrets.mailerPassword
    }
});

// setup email data with unicode symbols
/*-------------------emails regarding user accounts below-------------------*/
const verifyEmail = function(user, confirmUrl) {
    return {
        from: remarket,
        to: user.email,
        subject: 'Hi! Please verify your email',
        text: 'Hello, thanks for signing up with remarket! Please confirm your emaill address by clicking below.\n' + confirmUrl, // plain text body
        html: '<p>Hello, thanks for signing up with remarket! Please confirm your emaill address by <a href="' + confirmUrl + '">clicking here</a>.</p>' // html body
    }
};

const changePassword = function(user, resetPwUrl) {
    return {
        from: remarket,
        to: user.email,
        subject: 'Reset your password',
        text: 'We hear you wanted to reset your password -- go for it. \n' + resetPwUrl,
        html: '<p>We hear you wanted to reset your password -- <a href="' + resetPwUrl + '">go for it</a>.</p>'
    }
};

const confirmNetwork = function(user, network, confirmNetworkUrl) {
    return {
        from: remarket,
        to: user.email, //actually should send to supplied network email, and should capture network email in db
        subject: 'Confirm network',
        text: 'Hi ' + user.name + ', please confirm your affiliation to ' + network.name + ' by clicking here: ' + confirmNetworkUrl,
        html: '<p>Hi ' + user.name + ', please confirm your affiliation to ' + network.name + 'by <a href="' + confirmNetworkUrl + '">clicking here</a>.</p>'
    }
};

//havent incorporated this one yet, since the delete route isnt written
const deleteAccount = function(user, deleteFormUrl) {
    return {
        from: remarket,
        to: user.email,
        subject: 'Sad to see you go',
        text: 'Hi ' + user.name + ', your account with us has successfully been deleted. Can you let us know why? \n' + deleteFormUrl + '\n Thank you for using remarket.',
        html: '<p>Hi' + user.name + ', your account with us has successfully been deleted. <a href="' + deleteFormUrl + '">Can you let us know why?</a>.</p> Thank you for using remarket.</p>' // html body
    }
}

/*-------------------emails regardling listings below--------------------*/
const newListing = function(author, listing) {
    const listingLink = domainUrl + 'listings/' + listing.id;
    return {
        from: remarket,
        to: author.email,
        subject: '[' + listing.name.slice(0, 10) + '...] Your listing was published',
        text: 'Hi ' + author.name + ', you just published your listing ' + listing.name + ' on remarket. To view or share this listing, access the link below. \n' + listingLink + '\n To manage this listing, visit My Account -> My Listings (you can edit, renew, or archive/delete the listing there). Please keep your listing updated, and make sure to archive it if it\'s no longer applicable. Thanks and good luck!',
        html: '<p>Hi ' + author.name + ', you just published your listing <a href="' + listingLink + '">' + listing.name + '</a> on remarket. To manage this listing, visit My Account -> My Listings (you can edit, renew, or archive/delete the listing there). Please keep your listing updated, and make sure to archive it if it\'s no longer applicable. Thanks and good luck!</p>'
    }
};

//hasnt been incorporated yet, comments have not been implemented
const newComment = function(listingAuthor, commenter, listing) {
    const listingLink = domainUrl + 'listings/' + listing.id;
    return {
        from: remarket, // sender address
        to: listingAuthor.email, // list of receivers
        subject: '[' + listing.name.slice(0, 10) + '...] New comment on your listing',
        text: 'Hi ' + listingAuthor.name + ', ' + commenter.username || commenter.userId + ' made a new comment on your listing ' + listing.name + '. View it here. \n' + listingLink, //{To opt out of future messages like this, please click here.}',
        html: '<p>Hi ' + listingAuthor.name + ', ' + commenter.username || commenter.userId + ' made a new comment on your listing ' + listing.name + '. <a href="' + listingLink + '">View it here.</a></p>', //<a href="{email prefs link}">To opt out of future messages like this, please click here.</a>'
    }
};

/* offer related emails
const newOffer = {
    from: remarket, // sender address
    to: author, // list of receivers
    subject: '[{listing.name}] New offer on your listing', // Subject line
    text: 'Hi ' + author.name + ', {buyer.name} made a new offer on your listing {listing.name}. {View it here.} {To opt out of future messages like this, please click here.}', // plain text body
    html: '<p>Hi ' + author.name + ', {buyer.name} made a new offer on your listing {listing.name}. <a href="{confirm email link}">View it here.</a><a href="{email prefs link}">To opt out of future messages like this, please click here.</a>' // html body
};

const anotherOffer = {
    from: remarket,
    to: buyer,
    subject: '[{listing.name}] Another offer was made'
};

const offerAccepted = {
    from: remarket, // sender address
    to: buyer, // list of receivers
    subject: '[{listing.name}] Good news!', // Subject line
    text: 'Hi {buyer.name}, good news! {author.name} has accepted your offer of {offer.amount} for {listing.name}. {Author.name} is cc\'ed, so you two can take it from here. Thanks for using Remarket!', // plain text body
    html: '<p>Hi {buyer.name}, good news! {author.name} has accepted your offer of {offer.amount} for {listing.name}. {Author.name} is cc\'ed, so you two can take it from here. Thanks for using Remarket!</p>' // html body
};

const anotherOfferAccepted = {
    from: remarket,
    to: buyer,
    subject: '[{listing.name}] Another offer was accepted'
};

const youAcceptedOffer = {
    from: remarket, // sender address
    to: author, // list of receivers
    subject: '[{listing.name}] We\'re glad you accepted the offer', // Subject line
    text: 'Hi {buyer.name}, good news! {author.name} has accepted your offer of {offer.amount} for {listing.name}. {Author.name} is cc\'ed, so you two can take it from here. Thanks for using Remarket!', // plain text body
    html: '<p>Hi {buyer.name}, good news! {author.name} has accepted your offer of {offer.amount} for {listing.name}. {Author.name} is cc\'ed, so you two can take it from here. Thanks for using Remarket!</p>' // html body
};
*/

const listingStatusChange = function(listingAuthor, listing, newStatus) {
    let newStatusVerb = newStatus === 'active' ? 'reactivated' : newStatus;
    return {
        from: remarket,
        to: listingAuthor.email,
        subject: '[' + listing.name.slice(0, 14) + '...] Your listing has been ' + newStatusVerb,
        text: 'Hi ' + listingAuthor.name + ', your listing "' + listing.name + '" has been ' + newStatusVerb + ' on remarket. \n To manage your listings, visit My Account -> My Listings. Thanks and good luck!',
        html: '<p>Hi ' + listingAuthor.name + ', your listing "' + listing.name + '" has been ' + newStatusVerb + ' on remarket. \n To manage your listings, visit My Account -> My Listings. Thanks and good luck!</p>'
    }
};

//this one is tricky -- has to be triggered by a setTimeout in db?
let listingAboutToArchive = function(listingAuthor, listing, renewUrl) {
    return {
        from: remarket,
        to: listingAuthor.email,
        subject: '[' + listing.name.slice(0, 10) + '...] Your listing is about to expire',
        text: 'Hi ' + listingAuthor.name + ', your listing ' + listing.name + 'is about to expire on remarket. \n To manage this listing, visit My Account -> My Listings (you can edit, renew, or archive/delete the listing there). Thanks and good luck!',
        html: '<p>Hi ' + listingAuthor.name + ', your listing ' + listing.name + 'is about to expire on remarket. \n To manage this listing, visit My Account -> My Listings (you can edit, renew, or archive/delete the listing there). Thanks and good luck!</p>'
    }
};

module.exports = {
    transporter,
    remarket,
    confirmNetwork,
    verifyEmail,
    changePassword,
    deleteAccount,
    newListing,
    newComment,
    listingStatusChange,
    listingAboutToArchive
}