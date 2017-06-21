const db = require('./_db');
const Network = require('./models/Network')
const Listing = require('./models/Listing');
const User = require('./models/User');
const Offer = require('./models/Offer');
const Comment = require('./models/Comment')

// User has many Networks and Networks have many Users (join table)
User.belongsToMany(Network, { through: 'network_affiliations' });
Network.belongsToMany(User, { through: 'network_affiliations' });

// Network has many Listings (Listing table has networkId foreign key)
Listing.belongsTo(Network);
Network.hasMany(Listing);

// User has many Listings (Listing table has userId foreign key)
Listing.belongsTo(User);
User.hasMany(Listing);

// User has many Offers (Offer table has userId foreign key)
Offer.belongsTo(User);
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
    Comment
}