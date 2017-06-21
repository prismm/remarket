const Sequelize = require('sequelize');
const db = require('../_db');

const Network = db.define('network', {
    content: {
        type: Sequelize.ENUM('NYU', 'Columbia', 'Harvard', 'MIT')
    },

    location: {
        type: Sequelize.ENUM('New York', 'Boston')
    }
});

module.exports = Network;