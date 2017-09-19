const express = require('express');
const app = express();
// var expressStaticGzip = require('express-static-gzip');
const compression = require('compression');
const path = require('path');
const bodyParser = require('body-parser');
const models = require('./db');
const db = models.db;
const session = require('express-session');

//secures app by setting http headers
const helmet = require('helmet');
app.use(helmet());

//loggingware
//const morgan = require('morgan');
//app.use(morgan('dev'));

//compression -- gzip
app.use(compression());

//body-parser middleware set-up for reading req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// sessions -- the session store will save current sessions in the database
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db });

// creates session table
dbStore.sync();
app.use(session({
    secret: process.env.SESSION_SECRET || 'priya is cool',
    store: dbStore,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: 'auto' } //< --should use this option when the site is live using https, will work on https only
}));

//hooks up to auth
app.use('/', require('./auth'));

//serves static files from public folder
app.use(express.static(path.join(__dirname, '../public')));

//serves compressed bundle
// app.use(expressStaticGzip(path.join(__dirname, '../public')));

//matches all requests to api
app.use('/api', require('./api'));

//s3 router for amazon s3 requests (image storage)
app.use('/s3', require('react-s3-uploader/s3router')({
    bucket: 'remarket-123',
    headers: { 'Access-Control-Allow-Origin': '*' }, //optional
    ACL: 'private', // this is default
    region: 'us-east-2',
    signatureVersion: 'v4'
}))

//serves index.html file for non-api routes
app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../index.html'));
})

//catching all other failed routes
app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'oops ... Internal server error. Maybe you hit a route that doesn\'t exist.');
});

module.exports = app;