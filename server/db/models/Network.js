const Sequelize = require('sequelize');
const db = require('../_db');

const Network = db.define('network', {
    name: {
        type: Sequelize.STRING
    },

    location: {
        type: Sequelize.ENUM('New York', 'Boston')
    }
});

module.exports = Network;