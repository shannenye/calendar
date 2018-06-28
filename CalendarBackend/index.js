const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const db = require('./db/index.js');
const PORT = process.env.PORT || 9999;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../CalendarFrontEnd/public')));
app.use('/api', require('./api'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../CalendarFrontEnd/public/index.html'));
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error');
});

db.sync({ force: false })
    .then(() => {
        console.log('Database has been synced');
        app.listen(PORT, () => console.log(`Server is listening on Port ${PORT}`));
    });

module.exports = app;
