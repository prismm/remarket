const Sequelize = require('sequelize');
const db = require('../_db');

const Token = db.define('token', {
    token: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Token;