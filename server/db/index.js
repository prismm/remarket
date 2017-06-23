/* eslint-disable camelcase */
const db = require('./_db');
const Network = require('./models/Network')
const Listing = require('./models/Listing');
const User = require('./models/User');
const Offer = require('./models/Offer');
const Comment = require('./models/Comment')

const network_affiliations = db.define('network_affiliations', {}, { freezeTableName: true });

// User has many Networks and Networks have many Users (join table)
User.belongsToMany(Network, { through: network_affiliations });
Network.belongsToMany(User, { through: network_affiliations });

// Network has many Listings (Listing table has networkId foreign key)
Listing.belongsTo(Network);
Network.hasMany(Listing);

// User has many Listings (Listing table has userId foreign key)
Listing.belongsTo(User, { as: 'author' });
Listing.belongsTo(User, { as: 'buyer' });
User.hasMany(Listing);

// User has many Offers (Offer table has userId foreign key)
Offer.belongsTo(User, { as: 'bidder' });
User.hasMany(Offer);

// Listing has many Offers (Offer table has listingId foreign key)
Offer.belongsTo(Listing);
Listing.hasMany(Offer);

//Listing has many Comments
Comment.belongsTo(Listing);
Listing.hasMany(Comment);

module.exports = {
    db,
    Network,
    Listing,
    User,
    Offer,
    Comment,
    network_affiliations
}