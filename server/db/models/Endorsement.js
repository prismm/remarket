const Sequelize = require('sequelize');
const db = require('../_db');

const Endorsement = db.define('endorsement', {
    issued: {
        type: Sequelize.BOOLEAN
    }
});

module.exports = Endorsement;