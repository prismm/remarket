const Sequelize = require('sequelize');
const db = require('../_db');

const Network = db.define('network', {
    name: {
        type: Sequelize.STRING
    },
    location: {
        type: Sequelize.STRING
    }
});

module.exports = Network;