//FILE NOT IN USE -- SWITCHED TO HEROKU SCHEDULER (see other files in this directory)
// const cron = require('node-cron');
// const model = require('../db');
// const Listing = model.Listing;
// const User = model.User;
// const Token = model.Token;
// const mailer = require('../mailer')


// //prunes listings to convert active --> archived upon expiration
// cron.schedule('*/1 * * * *', function() {
//     let now = new Date();
//     Listing.findAll({
//             where: {
//                 expirationDate: {
//                     $lt: now
//                 },
//                 status: 'active'
//             }
//         })
//         .then(expiredListings => {
//             expiredListings.forEach(listing => {
//                 listing.update({ status: 'archived' })
//             })
//         })
// });

// //auto emails users when listings are about to expire, runs at 00:01 every day and checks for listings expiring within the next two days --> many people will get emailed twice
// cron.schedule('0 1 * * *', function() {
//     let now = new Date();
//     let dayAfterTomorrow = (d => new Date(d.setDate(d.getDate() + 2)))(new Date);
//     Listing.findAll({
//             where: {
//                 expirationDate: {
//                     $gt: now,
//                     $lt: dayAfterTomorrow
//                 },
//                 status: 'active'
//             }
//         })
//         .then(aboutToExpireListings => {
//             aboutToExpireListings.forEach(listing => {
//                 return User.findById(listing.authorId)
//                     .then(author => {
//                         mailer.transporter.sendMail(mailer.listingAboutToArchive(author, listing), (error, info) => {
//                             if (error) console.error(error);
//                             if (!error) console.log('Message %s sent: %s', info.messageId, info.response);
//                         });
//                     })
//             })
//         })
// });

// //auto deletes expired tokens at 00:01 every day
// cron.schedule('0 1 * * *', function() {
//     Token.destroy({
//         where: {
//             expired: true
//         },
//         paranoid: true
//     })
// });

//auto sets tokens {expired: true} that were created before yesterday
// cron.schedule('*/1 * * * *', function() {
//     let yesterday = (d => new Date(d.setDate(d.getDate() - 1)))(new Date);
//     Token.findAll({
//             where: {
//                 expired: false,
//                 createdAt: {
//                     $lt: yesterday
//                 }
//             }
//         })
//         .then(oldTokens => {
//             oldTokens.forEach(token => {
//                 token.update({ expired: true })
//             })
//         })
// })