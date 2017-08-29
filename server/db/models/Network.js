const Sequelize = require('sequelize');
const db = require('../_db');

const Network = db.define('network', {
    name: {
        type: Sequelize.STRING
    },
    location: {
        type: Sequelize.STRING
    }
}, {
    getterMethods: {
        suggestedDomain: function() {
            return 'you@' + this.name.toLowerCase() + '.edu';
        }
    },
    instanceMethods: {
        getAllListings: function() {
            return this.getUsers({ include: [{ all: true }] })
                .then(users => users.map(user => user.listings))
                .then(listings => listings)
                .catch(console.error)
        }
    }
});

module.exports = Network;