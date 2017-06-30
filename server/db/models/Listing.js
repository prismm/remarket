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
    expirationDate: {
        type: Sequelize.DATE,
        defaultValue: new Date(new Date().setMonth(new Date().getMonth() + 2))
            // get() {
            //     const dateStr = this.getDataValue('expirationDate').toLocaleDateString();
            //     return dateStr;
            // }
    }
}, {
    paranoid: true,
    timestamps: true,
    getterMethods: {
        expiresIn: function() {
            if (this.expirationDate && this.status === 'active') return this.expirationDate + ' (' + (new Date() - this.expirationDate) + ')';
            else if (this.status === 'archived') return 'expired';
            else return '---'
        }
    },
    instanceMethods: {
        getListingAuthor: () => {
            return this.getUser({ include: [{ all: true }] })
                .then(user => Promise.all(user))
        }
    }
});

module.exports = Listing;