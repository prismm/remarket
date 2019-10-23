const nodemailer = require('nodemailer');
const secrets = process.env.GOOGLE_CLIENT_ID ? null : require('../../google_api.js');
const domainUrl = process.env.DOMAIN_OK ? process.env.DOMAIN_OK : 'http://localhost:1337/'; //'https://reuse.market/'
// var allowedOrigins = ['https://www.reuse.market/', 'https://remarket-example1.herokuapp.com/'];
// var origin = req.headers.origin;

// const isAllowedOrigin = origin => {
//     return allowedOrigins.indexOf(origin) > -1
// };

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

const welcome = function(user) {
    const account = domainUrl + 'account/';
    const networks = account + 'managenetworks/';

    return {
        from: remarket,
        to: user.email,
        subject: 'Welcome to remarket',
        text: 'Hello, welcome to remarket! Please take a moment to set up your account and to affiliate with your networks by clicking below.\n ' + account, // plain text body
        html: '<p>Hello, welcome to remarket! Please take a moment to <a href="' + account + '">set up your account</a> and to <a href="' + networks + '">affiliate with your networks</a>.</p>' // html body
    }
};

const adminCreateUserWelcome = function(user, tempPassword) {
    const account = domainUrl + 'account/';

    return {
        from: remarket,
        to: user.email,
        subject: 'Welcome to remarket',
        text: 'Hello, welcome to remarket! Your temporary password is ' + tempPassword + '. When you have a second, set up your account by clicking below.\n ' + account, // plain text body
        html: '<p>Hello, welcome to remarket! Your temporary password is ' + tempPassword + '. When you have a second, <a href="' + account + '">set up your account</a> here.</p>' // html body
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

const confirmNetwork = function(user, network, confirmNetworkUrl, verificationEmail) {
    return {
        from: remarket,
        to: verificationEmail, //should send to supplied network email, and should capture network email in db
        subject: 'Confirm network',
        text: 'Hi ' + user.userId + ', please confirm your affiliation to ' + network.name + ' by clicking here: ' + confirmNetworkUrl,
        html: '<p>Hi ' + user.userId + ', please confirm your affiliation to ' + network.name + ' by <a href="' + confirmNetworkUrl + '">clicking here</a>.</p>'
    }
};

const sendMessage = function(sender, receiver, message, subject) {
    const senderId = sender.userId;
    const senderUrl = domainUrl + 'user/' + sender.id;
    return {
        from: remarket,
        to: receiver.email,
        subject: subject,
        replyTo: sender.email,
        text: senderId + ' (' + senderUrl + ') wrote: \n' + message + '\n Sent from remarket',
        html: '<div><a href="' + senderUrl + '">' + senderId + '</a> wrote: \n' + message + '</div><p>\n Sent from remarket</p>'
    }
}

const contact = function(replyToEmail, message, subject) {
        return {
            from: remarket,
            to: 'prismm@gmail.com',
            subject: subject,
            replyTo: replyToEmail,
            text: replyToEmail + ' wrote: \n' + message + '\n Sent from remarket',
            html: '<div>' + replyToEmail + ' wrote: \n' + message + '<p>\n Sent from remarket</p><div>',
        }
    }
    //havent incorporated this one yet, since the delete route isn't written
const passwordReset = function(user) {
        return {
            from: remarket,
            to: user.email,
            subject: 'Your password was reset',
            text: 'Hi ' + user.userId + ', we wanted to let you know that your password was recently reset on remarket. If you did not reset your password, reply to this email to let us know. Otherwise, you can disregard this message. Thanks!',
            html: '<p>Hi ' + user.userId + ', we wanted to let you know that your password was recently reset on remarket. If you did not reset your password, reply to this email to let us know. Otherwise, you can disregard this message. Thanks!</p>' // html body
        }
    }
    //havent incorporated this one yet, since the delete route isn't written
const deleteAccount = function(user, deleteFormUrl) {
    return {
        from: remarket,
        to: user.email,
        subject: 'Sad to see you go',
        text: 'Hi ' + user.userId + ', your account with us has successfully been deleted. Can you let us know why? \n' + deleteFormUrl + '\n Thank you for using remarket.',
        html: '<p>Hi ' + user.userId + ', your account with us has successfully been deleted. <a href="' + deleteFormUrl + '">Can you let us know why?</a>.</p> Thank you for using remarket.</p>' // html body
    }
}

/*-------------------emails regardling listings below--------------------*/
const newListing = function(author, listing) {
    const listingLink = domainUrl + 'listings/' + listing.id;
    return {
        from: remarket,
        to: author.email,
        subject: '[' + listing.name.slice(0, 10) + '...] Your listing was published',
        text: 'Hi ' + author.userId + ', you just published your listing "' + listing.name + '" on remarket. To view or share this listing, access the link below. \n' + listingLink + '\n To manage this listing, visit My Account -> My Listings (you can edit, renew, or archive/delete the listing there). Please keep your listing updated, and make sure to archive it if it\'s no longer applicable. Thanks and good luck!',
        html: '<p>Hi ' + author.userId + ', you just published your listing <a href="' + listingLink + '">' + listing.name + '</a> on remarket. To manage this listing, visit My Account -> My Listings (you can edit, renew, or archive/delete the listing there). Please keep your listing updated, and make sure to archive it if it\'s no longer applicable. Thanks and good luck!</p>'
    }
};

//hasn't been incorporated yet, comments have not been implemented
const newComment = function(listingAuthor, commenter, listing) {
    const listingLink = domainUrl + 'listings/' + listing.id;
    return {
        from: remarket, // sender address
        to: listingAuthor.email, // list of receivers
        subject: '[' + listing.name.slice(0, 10) + '...] New comment on your listing',
        text: 'Hi ' + listingAuthor.userId + ', ' + commenter.userId + ' made a new comment on your listing "' + listing.name + '". View it here. \n' + listingLink, //{To opt out of future messages like this, please click here.}',
        html: '<p>Hi ' + listingAuthor.userId + ', ' + commenter.userId + ' made a new comment on your listing "' + listing.name + '". <a href="' + listingLink + '">View it here.</a></p>', //<a href="{email prefs link}">To opt out of future messages like this, please click here.</a>'
    }
};

/* offer related emails
const newOffer = {
    from: remarket, // sender address
    to: author, // list of receivers
    subject: '[{listing.name}] New offer on your listing', // Subject line
    text: 'Hi ' + author.userId + ', {buyer.userId} made a new offer on your listing {listing.name}. {View it here.} {To opt out of future messages like this, please click here.}', // plain text body
    html: '<p>Hi ' + author.userId + ', {buyer.userId} made a new offer on your listing {listing.name}. <a href="{confirm email link}">View it here.</a><a href="{email prefs link}">To opt out of future messages like this, please click here.</a>' // html body
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
    text: 'Hi {buyer.userId}, good news! {author.userId} has accepted your offer of {offer.amount} for {listing.name}. {Author.name} is cc\'ed, so you two can take it from here. Thanks for using Remarket!', // plain text body
    html: '<p>Hi {buyer.userId}, good news! {author.userId} has accepted your offer of {offer.amount} for {listing.name}. {Author.name} is cc\'ed, so you two can take it from here. Thanks for using Remarket!</p>' // html body
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
    text: 'Hi {buyer.userId}, good news! {author.userId} has accepted your offer of {offer.amount} for {listing.name}. {Author.name} is cc\'ed, so you two can take it from here. Thanks for using Remarket!', // plain text body
    html: '<p>Hi {buyer.userId}, good news! {author.userId} has accepted your offer of {offer.amount} for {listing.name}. {Author.name} is cc\'ed, so you two can take it from here. Thanks for using Remarket!</p>' // html body
};
*/

const listingStatusChange = function(listingAuthor, listing, newStatus) {
    let newStatusVerb = newStatus === 'active' ? 'renewed' : newStatus;
    const listingLink = domainUrl + 'listings/' + listing.id;
    return {
        from: remarket,
        to: listingAuthor.email,
        subject: '[' + listing.name.slice(0, 14) + '...] Your listing has been ' + newStatusVerb,
        text: 'Hi ' + listingAuthor.userId + ', your listing "' + listing.name + '" has been ' + newStatusVerb + ' on remarket. \n To manage your listings, visit My Account -> My Listings. Thanks and good luck!',
        html: '<p>Hi ' + listingAuthor.userId + ', your listing <a href="' + listingLink + '">' + listing.name + '</a> has been ' + newStatusVerb + ' on remarket. \n To manage your listings, visit My Account -> My Listings. Thanks and good luck!</p>'
    }
};

let listingAboutToArchive = function(listingAuthor, listing, renewUrl) {
    const listingLink = domainUrl + 'listings/' + listing.id;
    return {
        from: remarket,
        to: listingAuthor.email,
        subject: '[' + listing.name.slice(0, 10) + '...] Your listing is about to expire',
        text: 'Hi ' + listingAuthor.userId + ', your listing "' + listing.name + '" is about to expire in ' + listing.expiresIn + ' on remarket. \n To manage this listing, visit My Account -> My Listings (you can edit, renew, or archive/delete the listing there). Thanks and good luck!',
        html: '<p>Hi ' + listingAuthor.userId + ', your listing <a href="' + listingLink + '">' + listing.name + '</a> is about to expire in ' + listing.expiresIn + ' on remarket. \n To manage this listing, visit My Account -> My Listings (you can edit, renew, or archive/delete the listing there). Thanks and good luck!</p>'
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
    listingAboutToArchive,
    sendMessage,
    passwordReset,
    welcome,
    contact,
    adminCreateUserWelcome
}