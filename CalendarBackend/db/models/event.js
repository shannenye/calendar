const Sequelize = require('sequelize');
const db = require('../db');

const Events = db.define('events', {
    title: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    start: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    end: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    },
    day: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

module.exports = Events;