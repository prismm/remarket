const app = require('./app');
const db = require('./db').db;

db.sync().then(() => {
        app.listen(process.env.PORT || 1337, () => {
            console.log('Server is listening on port 1337');
        });
    })
    .catch(console.error.bind(this));