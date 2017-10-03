/* eslint-disable camelcase */
const Sequelize = require('sequelize');
const db = require('./_db');
const Network = require('./models/Network')
const Listing = require('./models/Listing');
const User = require('./models/User');
const Offer = require('./models/Offer');
const Comment = require('./models/Comment');
const Token = require('./models/Token');
const Photo = require('./models/Photo');
const Message = require('./models/Message');
const Endorsement = require('./models/Endorsement')

const network_affiliations = db.define('network_affiliations', {
    networkEmail: { type: Sequelize.STRING },
    confirmed: { type: Sequelize.BOOLEAN }
}, {
    freezeTableName: true
        // defaultScope: { https://stackoverflow.com/questions/45685981/sequelize-issue-with-filtering-on-the-join-model-for-belongstomany-associations
        //     attributes: { where: { confirmed: true } }
        // },
});
const listing_networks = db.define('listing_networks', {}, { freezeTableName: true });
// const listing_feed = db.define('listing_feed', {}, { freezeTableName: true })

//Token belongs to User (every token has one user, not all users have tokens)
Token.belongsTo(User);

// User belongs to many Networks and Networks belong to many Users (join table)
User.belongsToMany(Network, { through: network_affiliations });
Network.belongsToMany(User, { through: network_affiliations });

// Networks belong to many Listings and Listings belong to many Networks (join table)
Listing.belongsToMany(Network, { through: listing_networks });
Network.belongsToMany(Listing, { through: listing_networks });

// User has many Listings (Listing table has userId foreign key)
Listing.belongsTo(User, { as: 'author' });
Listing.belongsTo(User, { as: 'buyer' });

// User has many Messages (Listing table has userId foreign keys as sender and receiver), and Listing has many messages
Message.belongsTo(User, { as: 'from' });
Message.belongsTo(User, { as: 'to' });
Message.belongsTo(Listing)

// User has many Offers (Offer table has userId foreign key)
Offer.belongsTo(User);

// Listing has many Offers (Offer table has listingId foreign key)
Offer.belongsTo(Listing);
Listing.hasMany(Offer);

// Listing has many Photos (Photo table has listingId foreign key)
Photo.belongsTo(Listing);
Listing.hasMany(Photo);

// User has many Comments (Comments table has userId foreign key)
Comment.belongsTo(User);

//Listing has many Comments
Comment.belongsTo(Listing);
Listing.hasMany(Comment);

// User has many Endorsements (Endorsement table has userId foreign key)
Endorsement.belongsTo(User);

//Listing has many Endorsements
Endorsement.belongsTo(Listing);
Listing.hasMany(Endorsement);

module.exports = {
    db,
    Network,
    Listing,
    User,
    Offer,
    Comment,
    network_affiliations,
    listing_networks,
    Token,
    Photo,
    Message,
    Endorsement
}