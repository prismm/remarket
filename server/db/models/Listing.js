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
    subcategory: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT
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
    }
});

module.exports = Listing;