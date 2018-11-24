const Sequelize = require('sequelize');
const db = require('../db');


const Message = db.define('Message', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    bottleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    country: {
        type: Sequelize.STRING,
    },
    city: {
        type: Sequelize.STRING,
    },
    weather: {
        type: Sequelize.STRING,
    },
    content: {
        type: Sequelize.STRING,
    },
    createdTimestamp: {
        type: Sequelize.INTEGER,
    },
});


module.exports = Message;
