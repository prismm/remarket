const app = require('./app');
const db = require('./db').db;

// adjust port here
const PORT = 3000;

db.sync().then(() => {
        app.listen(process.env.PORT || PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    })
    .catch(console.error.bind(this));