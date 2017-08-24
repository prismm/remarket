const Sequelize = require('sequelize');
const db = require('../_db');

const Photo = db.define('photo', {
    link: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING
    },
    index: {
        type: Sequelize.INTEGER
    }
}, {
    paranoid: true
});

module.exports = Photo;