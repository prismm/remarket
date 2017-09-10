const model = require('../db');
const Listing = model.Listing;
const User = model.User;
const Token = model.Token;
const mailer = require('../mailer');

//prunes listings to convert active --> archived upon expiration
(function() {
    console.log('pruning listings ... ')
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
                console.log('archived listing: ', listing.name)
            })
        })
})();

//auto sets tokens {expired: true} that were created before yesterday
(function() {
    console.log('setting tokens to expired')
    let yesterday = (d => new Date(d.setDate(d.getDate() - 1)))(new Date);
    Token.findAll({
            where: {
                expired: false,
                createdAt: {
                    $lt: yesterday
                }
            }
        })
        .then(oldTokens => {
            oldTokens.forEach(token => {
                token.update({ expired: true })
            })
        })
})();