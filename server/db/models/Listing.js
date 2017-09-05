const Sequelize = require('sequelize');
const db = require('../_db');

const Listing = db.define('listing', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.ENUM('for sale', 'housing', 'community'),
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('active', 'archived', 'deleted'),
        defaultValue: 'active'
    },
    subcategory: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT
    },
    location: {
        type: Sequelize.STRING
    },
    neighborhood: {
        type: Sequelize.STRING
    },
    floorPrice: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    imageUrl: {
        type: Sequelize.STRING
    },
    askingPrice: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    priceDescriptor: {
        type: Sequelize.STRING
    },
    expirationDate: {
        type: Sequelize.DATE,
        defaultValue: new Date(new Date().setMonth(new Date().getMonth() + 2))
    }
}, {
    paranoid: true,
    timestamps: true,
    associations: true,
    getterMethods: {
        expiresIn: function() {
            const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
            let timestamp = new Date(this.expirationDate);
            let mins = ('0' + timestamp.getMinutes()).slice(-2)
            const time = () => {
                if (timestamp.getHours() > 12) {
                    let hours = timestamp.getHours() - 12;
                    return hours + ':' + mins + 'pm';
                } else {
                    return timestamp.getHours() + ':' + mins + 'am';
                }
            }
            if (this.expirationDate && this.status === 'active') return days[timestamp.getDay()] + ' ' + timestamp.toLocaleDateString() + ', ' + time();
            else if (this.status === 'archived') return 'expired';
            else return '---'
        },
        created: function() {
            const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
            let timestamp = new Date(this.createdAt);
            let mins = ('0' + timestamp.getMinutes()).slice(-2)
            const time = () => {
                if (timestamp.getHours() > 12) {
                    let hours = timestamp.getHours() - 12;
                    return hours + ':' + mins + 'pm';
                } else {
                    return timestamp.getHours() + ':' + mins + 'am';
                }
            }
            return days[timestamp.getDay()] + ' ' + timestamp.toLocaleDateString() + ', ' + time();
        },
        modified: function() {
            const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
            let timestamp = new Date(this.updatedAt);
            let mins = ('0' + timestamp.getMinutes()).slice(-2)
            const time = () => {
                if (timestamp.getHours() > 12) {
                    let hours = timestamp.getHours() - 12;
                    return hours + ':' + mins + 'pm';
                } else {
                    return timestamp.getHours() + ':' + mins + 'am';
                }
            }
            return days[timestamp.getDay()] + ' ' + timestamp.toLocaleDateString() + ', ' + time();
        }
    },
    instanceMethods: {
        getListingAuthor: () => {
            return this.getAuthor({ include: [{ all: true }] })
                .catch(console.error)
        }
    },
    hooks: { //this hook adds the author's networks onto the created listings
        afterCreate: function(listing) {
            return listing.getAuthor()
                .then(user => user.getNetworks())
                .then(networks => {
                    let confirmedNetworks = networks.filter(network => network.network_affiliations.confirmed);
                    return listing.addNetworks(confirmedNetworks)
                })
                .catch(console.error)
        }
    }
});

module.exports = Listing;