const Sequelize = require('sequelize');
const db = require('../_db');

const Photo = db.define('photo', {
    link: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Photo;