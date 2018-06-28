const Sequelize = require('sequelize');
const db = require('../db');

const Events = db.define('events', {
    title: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    start: {
        type: Sequelize.DATE,
        allowNull: false
    },
    end: {
        type: Sequelize.DATE,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    },
    day: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Events;
