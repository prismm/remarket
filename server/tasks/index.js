const cron = require('node-cron');
const model = require('../db');
const Listing = model.Listing;
const User = model.User;
const mailer = require('../mailer')

//prunes listings to convert active --> archived upon expiration
cron.schedule('*/5 * * * *', function() {
    let now = new Date();
    Listing.findAll({
            where: {
                expirationDate: {
                    $lt: now
                },
                status: 'active'
            }
        })
        .then(expiredListings => {
            expiredListings.forEach(listing => {
                listing.update({ status: 'archived' })
            })
        })
    console.log('running a task every five minutes');
});

//auto emails users when listings are about to expire, runs at 00:01 every day and checks for listings expiring within the next two days --> many people will get emailed twice
cron.schedule('1 0 * * *', function() {
    let now = new Date();
    let dayAfterTomorrow = (d => new Date(d.setDate(d.getDate() + 2)))(new Date);
    Listing.findAll({
            where: {
                expirationDate: {
                    $gt: now,
                    $lt: dayAfterTomorrow
                },
                status: 'active'
            }
        })
        .then(aboutToExpireListings => {
            aboutToExpireListings.forEach(listing => {
                return User.findById(listing.authorId)
                    .then(author => {
                        mailer.transporter.sendMail(mailer.listingAboutToArchive(author, listing), (error, info) => {
                            if (error) console.error(error);
                            if (!error) console.log('Message %s sent: %s', info.messageId, info.response);
                        });
                    })
            })
        })
});

//clears sessions data -- how often?