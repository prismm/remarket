const Sequelize = require('sequelize');
const db = require('../_db');

const Message = db.define('message', {
    content: {
        type: Sequelize.TEXT
    },
    subject: {
        type: Sequelize.STRING
    }
});

module.exports = Message;