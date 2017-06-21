const Sequelize = require('sequelize');
const db = require('../_db');
const crypto = require('crypto');
const _ = require('lodash');

const User = db.define('user', {
    name: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    salt: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
                // unique: true
        }
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}, {
    defaultScope: {
        attributes: { exclude: ['password', 'salt'] }
    },
    scopes: {
        unsanitized: {}
    },
    instanceMethods: {
        // this function will omit password and salt from user instance
        sanitize: function() {
            return _.omit(this.toJSON(), ['password', 'salt']);
        },
        correctPassword: function(candidatePassword) {
            const encryptedPassword = User.encryptPassword(candidatePassword, this.getDataValue('salt'));
            return encryptedPassword === this.password;
        }
    },
    classMethods: {
        generateSalt: function() {
            return crypto.randomBytes(16).toString('base64');
        },
        encryptPassword: function(plainText, salt) {
            return crypto.createHash('sha256')
                .update(plainText)
                .update(salt)
                .digest('base64');
        }
    },
    hooks: {
        beforeCreate: setSaltAndPassword,
        beforeUpdate: setSaltAndPassword
    }
});

function setSaltAndPassword(user) {
    if (user.changed('password')) {
        user.salt = User.generateSalt();
        user.password = User.encryptPassword(user.password, user.salt);
    }
}

module.exports = User;