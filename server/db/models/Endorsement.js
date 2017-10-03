const Sequelize = require('sequelize');
const db = require('../_db');

const Endorsement = db.define('endorsement', {
    type: {
        type: Sequelize.ENUM('save', 'endorse')
    }
}, {
    paranoid: true
});

module.exports = Endorsement;