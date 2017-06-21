const Sequelize = require('sequelize');
const db = require('../_db');

const Offer = db.define('offer', {
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Offer;