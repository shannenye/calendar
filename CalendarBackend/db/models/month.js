const Sequelize = require('sequelize');
const db = require('../db');

const Month = db.define('month', {
    name: Sequelize.STRING,
});

module.exports = Month;