const Sequelize = require('sequelize');

// if using Heroku Postgres, use process.env.DATABASE_URL
const databaseUrl = (process.env.NODE_ENV === 'production') ? process.env.DATABASE_URL : 'postgres://localhost:5432/remarket';

const db = new Sequelize(databaseUrl, { logging: false });

module.exports = db;