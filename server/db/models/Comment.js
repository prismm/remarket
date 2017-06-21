const Sequelize = require('sequelize');
const db = require('../_db');

const Comment = db.define('comment', {
    content: {
        type: Sequelize.TEXT,
        validate: {
            len: [2, 140]
        }
    }
});

module.exports = Comment;